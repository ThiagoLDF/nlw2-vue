<template>
    <v-form v-model="valid" ref="form">
        <div class="schedule-item">
            <div class="select-block">
                <p>Dia da semana</p>
                <v-select
                    color="#512DA8"
                    item-color="black"
                    v-model="schedule.weekday"
                    :items="weekdays"
                    :rules="rule"
                    filled
                    required
                ></v-select>
            </div>
            <div class="input-block">
                <p>Das</p>
                <v-text-field
                    color="#512DA8"
                    v-model="schedule.timeFrom"
                    :rules="rule"
                    type="time"
                    name="time_from[]"
                    filled
                    required
                ></v-text-field>
            </div>
            <div class="input-block">
                <p>Até</p>
                <v-text-field
                    color="#512DA8"
                    v-model="schedule.timeTo"
                    :rules="timeRule"
                    type="time"
                    name="time_to[]"
                    select
                    filled
                    required
                ></v-text-field>
            </div>
            <div class="remove">
                <v-btn v-if="schedule.id > 0" @click="remove" icon color="#512DA8">
                    <v-icon color="#512DA8">mdi-delete</v-icon>
                </v-btn>
            </div>
        </div>
    </v-form>
</template>

<script>
export default {
    props: ["schedule"],
    data() {
        return {
            valid: true,
            rule: [(v) => !!v || "Campo obrigatório"],
            timeRule: [
                (v) => !!v || "Campo obrigatório",
                v => v > this.schedule.timeFrom || "Horário inválido"
            ],
        };
    },
    watch: {
        valid() {
            this.$emit('validSchedule', this.valid)
        }
    },
    computed: {
        weekdays() {
            return this.$store.getters.weekdays;
        },
        schedules() {
            return this.$store.getters.currentSchedules;
        },
    },
    methods: {
        remove() {
            this.$emit('validSchedule', !this.valid)
            this.$store.dispatch("removeSchedule", this.schedule.id);
        },
    },
};
</script>
<style src="@/assets/styles/partials/schedule-item.css" scoped>
</style>