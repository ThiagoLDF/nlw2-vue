<template>
    <div class="classes">
        <div class="header">
            <ClassesHeader />
        </div>
        <div class="form">
            <ClassesForm />
        </div>
    </div>
</template>

<script>
import ClassesHeader from "@/components/ClassesHeader";
import ClassesForm from "@/components/ClassesForm";
export default {
    components: {
        ClassesHeader,
        ClassesForm,
    },
};
</script>
<style src="@/assets/styles/partials/classes.css">
</style>