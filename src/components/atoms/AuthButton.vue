<script>
import googleLoginHandler from '../../utils/google.js';

export default {
  props: ['method', 'company'],
  methods: {
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
  created() {
    this.src = `src/assets/${this.company}.svg`;
    if (this.company === "google") googleLoginHandler(window);
  }
}
</script>

<template>
  <button :id="company">
    <img :src="src" class="white-svg logo"/>
    <p>{{capitalize(method)}} with {{capitalize(company)}}</p>
  </button>
</template>