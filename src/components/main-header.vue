<template>
    <header class="main-header">
        <div class="logo">Logo Img</div>
        <nav>
            <RouterLink to="/main">Main</RouterLink>
            <RouterLink to="/">Page1</RouterLink>
            <RouterLink to="/">Page2</RouterLink>
        </nav>
    </header>
</template>
 <script>
export default {
    name: 'main-header',
    components: {},
    data() {
        return {

        };
    },
    created() { },
    methods: {},
    computed: {},
    unmounted() { },
};
</script>
 <style>
 </style>