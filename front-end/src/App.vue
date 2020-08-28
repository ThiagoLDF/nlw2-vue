<template>
    <v-app>
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
        <!-- 
          # Desafios

        ## 01 - Página de sucesso

        - Mostrar página de sucesso após o cadastro do proffy
        - aguardar 2 segundos na página e redirecionar para a listagem dos proffys, com filtro
        - use setTimeout para aguardar os 2 segundos
        - location.href = ""

        ## 02 - Correção de bugs

        - Não permitir o usuário colocar um novo campo de dia e horário, se o dia e hora anterior estiver vazio
        - Funcionalidade de deletar um campo de dia e hora
        -->
    </v-app>
</template>

<script>
export default {
    name: "App",

    components: {},

    data: () => ({
        //
    }),
};
</script>
<style>
.fade-enter-active,
.fade-leave-active {
    transition: opacity .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
}
.fade-leave, .fade-enter-to {
    opacity: 1;
}
</style>
