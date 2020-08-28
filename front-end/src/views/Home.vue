<template>
    <v-app class="v-app deep-purple darken-2">
        <div class="page-landing">
            <div class="container">
                <div class="logo-container">
                    <img class="proffy" src="@/assets/images/logo.svg" alt="Proffy" />
                    <h2>Sua plataforma de estudos online</h2>
                </div>
                <img
                    class="hero-image"
                    src="@/assets/images/landing.svg"
                    alt="Plataforma de estudos"
                />
                <div class="buttons-container">
                    <v-btn elevation="15" to="/study" class="deep-purple darken-1">
                        <img src="@/assets/images/icons/study.svg" alt="Estudar" />
                        <span>Estudar</span>
                    </v-btn>
                    <v-btn elevation="15" to="/give-classes" class="green accent-4">
                        <img src="@/assets/images/icons/give-classes.svg" alt="Dar aulas" />
                        Dar aulas
                    </v-btn>
                </div>
                <p class="total-connections">
                    Total de 200 conexões já realizadas
                    <img
                        src="@/assets/images/icons/purple-heart.svg"
                        alt="Coração roxo"
                    />
                </p>
            </div>
        </div>
    </v-app>
</template>

<script>
export default {};
</script>
<style src="@/assets/styles/partials/home.css" scoped>
</style>