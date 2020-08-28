<template>
    <v-card elevation="15" class="classes-form">
        <v-form ref="form" v-model="valid" id="create-class">
            <fieldset>
                <legend>Seus dados</legend>
                <div class="input-block">
                    <p>Nome completo</p>
                    <v-text-field
                        v-model="proffyValue.name"
                        :rules="rule"
                        required
                        single-line
                        filled
                        color="#512DA8"
                    ></v-text-field>
                </div>
                <div class="input-block">
                    <p>
                        Link da sua foto
                        <small>(comece com https://)</small>
                    </p>
                    <v-text-field
                        v-model="proffyValue.avatar"
                        :rules="avatarRule"
                        type="url"
                        required
                        single-line
                        filled
                        color="#512DA8"
                    ></v-text-field>
                </div>
                <div class="input-block">
                    <p>
                        Whatsapp
                        <small>(somente números)</small>
                    </p>
                    <v-text-field
                        v-model="proffyValue.whatsapp"
                        :rules="rule"
                        type="number"
                        required
                        single-line
                        filled
                        color="#512DA8"
                    ></v-text-field>
                </div>
                <div class="textarea-block">
                    <p>Biografia</p>
                    <v-textarea
                        filled
                        color="#512DA8"
                        v-model="proffyValue.bio"
                        :rules="rule"
                        required
                    ></v-textarea>
                </div>
            </fieldset>
            <fieldset>
                <legend>Sobre a aula</legend>
                <div class="subjects">
                    <p>Matéria</p>
                    <v-select
                        color="#512DA8"
                        item-color="black"
                        filled
                        :items="subjects"
                        v-model="classValue.subject"
                        :rules="rule"
                        required
                    ></v-select>
                </div>
                <div class="input-block">
                    <p>
                        Custo da sua hora/aula
                        <small>(R$)</small>
                    </p>
                    <v-text-field
                        v-model="classValue.cost"
                        :rules="rule"
                        type="number"
                        required
                        single-line
                        filled
                        color="#512DA8"
                    ></v-text-field>
                </div>
            </fieldset>
            <fieldset id="schedule-items">
                <legend>
                    Horários disponíveis
                    <v-btn
                        @click="addSchedule"
                        text
                        color="#512DA8"
                        id="add-time"
                        :disabled="!validSchedules"
                    >+ Novo Horário</v-btn>
                </legend>
                <v-form
                    ref="form"
                    v-model="valid"
                    v-for="(schedule, index) in schedules"
                    :key="index"
                >
                    <ScheduleItem :schedule="schedule" @validSchedule="validSchedule" />
                </v-form>
            </fieldset>
            <div class="footer">
                <p>
                    <img src="@/assets/images/icons/warning.svg" alt="Aviso importante" />
                    Importante!
                    <br />Preencha todos os dados
                </p>
                <v-btn
                    elevation="10"
                    class="green accent-4"
                    @click="saveProffy"
                    :disabled="!validate"
                >Salvar cadastro</v-btn>
            </div>
            <v-overlay color="#512da8" opacity="1" :value="showOverlay">
                <v-img class="overlay" src="@/assets/images/success-background.svg">
                    <div class="container">
                        <img src="@/assets/images/icons/success-check-icon.svg" />
                        <h1>Cadastro salvo!</h1>
                        <p>
                            Tudo certo, seu cadastro está na nossa lista de professores.
                            Agora é só ficar de olho no seu WhatsApp.
                        </p>
                        <v-btn elevation="15" class="redirect green accent-4">
                                Redirecionando...{{counter}}
                        </v-btn>
                    </div>
                </v-img>
            </v-overlay>
        </v-form>
    </v-card>
</template>

<script>
import ScheduleItem from "@/components/ScheduleItem";
export default {
    components: {
        ScheduleItem,
    },
    data() {
        return {
            valid: true,
            validSchedules: false,
            rule: [(v) => !!v || "Campo obrigatório"],
            avatarRule: [
                (v) => !!v || "Campo obrigatório",
                (v) =>
                    /(www|http:|https:)+[^\s]+[\w]/.test(v) ||
                    "Insira um endereço válido",
            ],
            proffyValue: {},
            classValue: {},
            showOverlay: false,
            counter: null,
        };
    },
    computed: {
        subjects() {
            return this.$store.getters.subjects;
        },
        schedules() {
            return this.$store.getters.currentSchedules;
        },
        validate() {
            return this.validateForm();
        },
    },
    methods: {
        validateForm() {
            if (this.valid === true && this.validSchedules === true) {
                return true;
            } else {
                return false;
            }
        },
        validSchedule(event) {
            this.validSchedules = event;
        },
        addSchedule() {
            this.$store.dispatch("addSchedule");
        },
        saveProffy() {
            this.$store.state.proffy = {
                proffyValue: this.proffyValue,
                classValue: this.classValue,
                schedulesValues: this.schedules,
            };
            this.$store.dispatch("saveClasses");
            this.overlay();
        },
        overlay() {
            this.counter = 5;
            this.showOverlay = true;
            let timer = setInterval(() => {
                if (this.counter > 0) {
                    this.counter--;
                } else {
                    clearInterval(timer);
                    this.$router.push("/study");
                }
            }, 1000);
        },
    },
    created() {
        if (this.schedules.length === 0) {
            this.addSchedule();
        } else {
            this.$store.dispatch("resetStore");
            this.addSchedule();
        }
    },
};
</script>
<style src="@/assets/styles/partials/classes-form.css" scoped>
</style>