<template>
    <div class="main-app">
        <div class="reviews-container">
            <form action="" class="reviews-form">
                <input v-model="email" placeholder="Email" type="email">
                <textarea v-model="txtArea" placeholder="Massage" name="" id="" cols="30" rows="10"></textarea>
            </form>
            <button @click.stop.prevent="submitReview">Submit</button>
        </div>
        <reviewList v-if="reviews" :reviews="reviews"></reviewList>
    </div>

</template>
 <script>
import reviewList from '../components/review-list.vue';
export default {
    name: 'main-app',
    props: {
    },
    components: {
        reviewList
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
    computed: {
        reviews() {
            console.log(this.$store.getters.reviews);
            return this.$store.getters.reviews
        }
    },
    unmounted() { },
};
</script>
 <style>
</style>