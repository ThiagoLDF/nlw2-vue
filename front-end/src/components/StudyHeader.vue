<template>
    <v-card rounded="0" elevation="15" class="deep-purple darken-2 page-header">
        <div class="top-bar-container">
            <router-link to="/">
                <img class="voltar" src="@/assets/images/icons/back.svg" alt="Voltar" />
            </router-link>
            <img class="proffy" src="@/assets/images/logo.svg" alt="Proffy" />
        </div>
        <div class="header-content">
            <strong>Estes são os proffys disponíveis</strong>
            <form id="search-teachers">
                <div class="select-block">
                    <label>Matéria</label>
                    <v-select solo :items="subjects" v-model="search.subject"></v-select>
                </div>
                <div class="select-block">
                    <label>Dia da semana</label>
                    <v-select solo :items="weekdays" v-model="search.weekday" required></v-select>
                </div>
                <div class="input-block">
                    <label for="time">Hora</label>
                    <v-text-field type="time" label="Solo" solo v-model="search.time"></v-text-field>
                </div>
                <v-btn elevation="10" class="green accent-4" @click="$emit('filter', search)">Filtrar</v-btn>
            </form>
        </div>
    </v-card>
</template>

<script>

export default {
    data() {
        return {
        }
    },
    computed: {
        subjects() {
            return this.$store.getters.subjects
        },
        weekdays() {
            return this.$store.getters.weekdays
        },
        search() {
            return this.$store.state.search
        }
    }
};
</script>
<style src="@/assets/styles/partials/study-header.css" scoped>
</style>