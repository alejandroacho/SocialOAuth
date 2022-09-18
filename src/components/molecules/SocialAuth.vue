<script>
import AuthButton from '../atoms/AuthButton.vue';

export default {
  name: 'SocialAuth',
  components: {
    AuthButton,
  },
  data() {
    return {
      method: "login",
    };
  },
  methods: {
    changeMethod() {
      this.method = this.otherMethod;
    },
  },
  computed: {
    otherMethod() {
      return this.method === 'login' ? 'sign up' : 'login';
    },
  },
};
</script>

<template>
  <h1>Social OAuth</h1>
  <hr>
  <div class="social-auth">
    <AuthButton :method="method" company="google"/>
    <AuthButton :method="method" company="facebook"/>
    <AuthButton :method="method" company="twitter"/>
  </div>
  <br>
  <a v-on:click="changeMethod">Or {{otherMethod}}</a>
</template>

<style scoped>
  hr{
    margin-bottom: 50px
  }
  .social-auth{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
  }
</style>
