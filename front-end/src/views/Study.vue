<template>
    <v-app class="study">
        <StudyHeader @filter="filter($event)" />
        <div class="proffys" v-for="proffy in proffys" :key="proffy.index">
            <ProffyCard :proffy="proffy" />
        </div>
        <div>
            <p class="no-results" v-if="proffys.length === 0">
                Nenhum professor encontrado com a sua pesquisa
            </p>
        </div>
    </v-app>
</template>

<script>
import StudyHeader from "@/components/StudyHeader";
import ProffyCard from "@/components/ProffyCard";

export default {
    components: {
        StudyHeader,
        ProffyCard,
    },
    computed: {
        proffys() {
            return this.$store.getters.filteredProffys;
        },
    },
    beforeRouteLeave(to, from, next) {
        this.$store.dispatch("resetStore");
        next();
    },
    methods: {
        filter(search) {
            this.$store.dispatch("filterProffys", search);
        },
    },
};
</script>
<style src="@/assets/styles/partials/study.css" scoped>
</style>