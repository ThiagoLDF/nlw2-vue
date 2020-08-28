import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        proffy: [],
        schedules: [],
        currentIndex: 0,
        weekdays: [
            "Domingo",
            "Segunda-feira",
            "Terça-feira",
            "Quarta-feira",
            "Quinta-feira",
            "Sexta-feira",
            "Sábado",
        ],
        subjects: [
            "Artes",
            "Biologia",
            "Ciências",
            "Educação física",
            "Física",
            "Geografia",
            "História",
            "Matemática",
            "Português",
            "Química"
        ],
        search: {
            subject: '',
            weekday: '',
            time: ''
        },
        filteredProffys: []
    },
    getters: {
        proffy(state) {
            return state.proffy
        },
        subjects(state) {
            return state.subjects
        },
        currentSchedules(state) {
            return state.schedules
        },
        currentIndex(state) {
            return state.currentIndex
        },
        weekdays(state) {
            return state.weekdays
        },
        filteredProffys(state) {
            return state.filteredProffys
        }
    },
    mutations: {
        addSchedule(state) {
            state.schedules.push(new Object({
                id: state.currentIndex,
                weekday: null,
                timeFrom: null,
                timeTo: null,
            }))
        },
        incrementIndex(state) {
            state.currentIndex++
        },
        removeSchedule(state, id) {
            const index = state.schedules.findIndex(i => i.id === id)
            state.schedules.splice(index, 1);
        },
        resetStore(state) {
            state.schedules = []
            state.currentIndex = 0
            state.proffy = {}
            state.search = {
                subject: '',
                weekday: '',
                time: ''
            },
            state.filteredProffys = []
        },
        filterProffys(state, payload) {
            state.filteredProffys = payload;
        },
        saveClasses(state, payload) {
            state.search = payload
        }
    },
    actions: {
        addSchedule(context) {
            context.commit('addSchedule')
            context.commit('incrementIndex')
        },
        removeSchedule(context, id) {
            context.commit('removeSchedule', id)
        },
        resetStore(context) {
            context.commit('resetStore')
        },
        async filterProffys({commit}, payload) {
            const filter = await axios
            .post("http://localhost:3000/search", payload)
            
            commit('filterProffys', filter.data)
        },
        async saveClasses({commit, dispatch, state}) {
            const save = await axios.post("http://localhost:3000/save", state.proffy)
            commit('saveClasses', save.data)
            dispatch('filterProffys', save.data)
        }
    }
})