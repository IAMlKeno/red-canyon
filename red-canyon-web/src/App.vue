<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { welcomeMsg, subtitle } from './constants';

import WelcomeMessage from './components/WelcomeMessage.vue';
import Footer from './components/Footer.vue';
</script>

<template>
  <header>

    <div class="wrapper">
      <img alt="Avanti Insieme logo" class="logo" src="@/assets/av-sign.png" width="600" height="350" />
      <WelcomeMessage :msg=welcomeMsg :subtitle="subtitle"/>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>

  <div>
    <RouterView />
  </div>
  <Footer />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--vt-c-text-light-1);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    justify-content: center;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    flex-direction: column;
  }

  nav {
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
