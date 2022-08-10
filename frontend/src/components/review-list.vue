<template>
    <div class="review-list-container">
        <reviewPrev v-for="review in reviews" :review="review" :key="review._id"></reviewPrev>
    </div>
</template>
 <script>
import reviewPrev from './review-prev.vue';
export default {
    props: {
        reviews: Array
    },
    name: 'reviewList',
    components: {
        reviewPrev
    },
    data() {
        return {};
    },
    created() {
        console.log(this.reviews);
    },
    methods: {},
    computed: {},
    unmounted() { },
};
</script>
 <style>
</style>