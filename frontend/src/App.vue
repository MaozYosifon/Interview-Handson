
<template>
  <div class="app-vue main-layout">
    <main-header />
    <main :reviews="reviews" class="app-container">
      <RouterView />
    </main>
  </div>
</template>
 <script>
import { RouterLink, RouterView } from 'vue-router'
import mainHeader from './components/main-header.vue';

export default {
  name: 'app-vue',
  components: {
    mainHeader
  },
  data() {
    return {};
  },
  created() {
    // this.$store.dispatch('getReviews')
  },
  methods: {},
  computed: {

  },
  unmounted() { },
};
</script>

