<template>
    <div class="main-app">
        <div class="reviews-container">
            <form action="" class="reviews-form">
                <input v-model="email" placeholder="Email" type="email">
                <textarea v-model="txtArea" placeholder="Massage" name="" id="" cols="30" rows="10"></textarea>
            </form>
            <button @click="submitReview">Submit</button>
        </div>
    </div>
</template>
 <script>

export default {
    name: 'main-app',
    components: {
    },
    data() {
        return {
            txtArea: '',
            email: ''
        };
    },
    created() { },
    methods: {
        submitReview() {
            if (this.txtArea.length < 1 || this.email.length < 1) return
            let review = {
                email: this.email,
                txt: this.textArea
            }
            this.$store.dispatch('addReview', { review })
        }
    },
    computed: {},
    unmounted() { },
};
</script>
 <style>
 </style>