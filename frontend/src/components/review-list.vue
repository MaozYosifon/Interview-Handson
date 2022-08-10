<template>
    <div class="review-list-container">
        <reviewPrev v-for="review in revies" :review="review" :key="review._id"></reviewPrev>
    </div>
</template>
 <script>
import reviewPrev from './review-prev.vue';
export default {
    name: 'reviewList',
    components: {
        reviewPrev
    },
    data() {
        return {};
    },
    created() { },
    methods: {},
    computed: {},
    unmounted() { },
};
</script>
 <style>
</style>