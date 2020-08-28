const Database = require('./database/db')

const { subjects, weekdays, convertHoursToMinutes } = require('./utils/format')

async function pageStudy(filters) {
    // converter horas em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
    SELECT classes.*, proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE EXISTS (
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = classes.id
        AND class_schedule.weekday = ${weekdays.indexOf(filters.weekday)}
        AND class_schedule.time_from <= ${timeToMinutes}
        AND class_schedule.time_to > ${timeToMinutes}
        )
    AND classes.subject = ${subjects.indexOf(filters.subject)}
    `
    // caso haja erro na hora da consulta do banco de dados.
    try {
        const db = await Database
        const proffys = await db.all(query)
        proffys.map((proffy) => {
            proffy.subject = subjects[proffy.subject]
        })
        return proffys
    } catch (error) {
        console.log(error)
    }
}

async function saveClasses(proffy) {
    const createProffy = require('./database/createProffy')

    const proffyValue = proffy.proffyValue

    const classValue = {
        subject: subjects.indexOf(proffy.classValue.subject),
        cost: proffy.classValue.cost
    }

    const classScheduleValues = proffy.schedulesValues.map(weekday => {
        return {
            weekday: weekdays.indexOf(weekday.weekday),
            time_from: convertHoursToMinutes(weekday.timeFrom),
            time_to: convertHoursToMinutes(weekday.timeTo),
        }
    })
    try {
        const db = await Database
        await createProffy(db, { proffyValue, classValue, classScheduleValues })

        return {
            subject: proffy.classValue.subject,
            weekday: proffy.schedulesValues[0].weekday,
            time: proffy.schedulesValues[0].timeFrom
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    pageStudy,
    saveClasses
}