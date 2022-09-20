<script>
import googleLoginHandler from '../../utils/google.js';
import facebookLoginHandler from '../../utils/facebook.js';

export default {
  props: ['method', 'company'],
  data() {
    return {
      possibleCompanies: ['google', 'facebook', 'twitter', 'apple'],
    };
  },
  methods: {
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
  created() {
    this.src = `src/assets/${this.company}.svg`;
  },
  mounted() {
    if (this.company === "google") googleLoginHandler(window);
    if (this.company === "facebook") facebookLoginHandler(window);
  }
}
</script>

<template>
  <button :id="company" v-if="possibleCompanies.includes(company)">
    <img :src="src" class="white-svg logo"/>
    <p>{{capitalize(method)}} with {{capitalize(company)}}</p>
  </button>
</template>