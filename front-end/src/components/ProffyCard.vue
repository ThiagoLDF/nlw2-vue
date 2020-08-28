<template>
    <v-card elevation="15" class="teacher-item">
        <div class="header">
            <img :src="proffy.avatar" alt />
            <div>
                <strong>{{proffy.name}}</strong>
                <span>{{proffy.subject}}</span>
            </div>
        </div>
        <p>{{proffy.bio}}</p>

        <div class="footer">
            <p>
                Preço/hora
                <strong>R$ {{proffy.cost}}</strong>
            </p>
            <v-btn elevation="10" class="green accent-4">
                <a
                    class="button"
                    :href="whatsapp"
                    target="_blank"
                >
                    <img src="@/assets/images/icons/whatsapp.svg" alt="Whatsapp" />Entrar em contato
                </a>
            </v-btn>
        </div>
    </v-card>
</template>

<script>
export default {
    props: ["proffy"],
    data() {
        return {
            whatsapp: "https://api.whatsapp.com/send?1=pt_BR&phone=55" + this.proffy.whatsapp + "&text=Tenho interesse na sua aula de " + this.proffy.subject + " " + this.proffy.name
        }
    }
};
</script>
<style src="@/assets/styles/partials/proffy-card.css" scoped>
</style>