<template>
    <div class="review">
        <img review-img :src="review.img" alt="">
        <div class="review-content">
            <div class=review-email>{{review.email}}</div>
            <div class="review-txt">{{review.txt}}</div>
        </div>
    </div>

</template>
 <script>
export default {
    props: {
        review: Object
    },
    name: 'reviewPrev',
    components: {},
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