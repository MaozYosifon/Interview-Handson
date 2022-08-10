
<template>
  <div class="app-vue main-layout">
    <main-header />
    <main v-if="reviews" :reviews="reviews" class="app-container">
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
    this.$store.dispatch('getReviews')
  },
  methods: {},
  computed: {
    reviews() {
      return this.$store.getters.reviews
    }
  },
  unmounted() { },
};
</script>

