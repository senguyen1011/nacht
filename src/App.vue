<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router';
  import { routes } from './router';
</script>

<template>
  <RouterView/>

  <div class="footer-offset"></div>
  <footer>
    <nav>
      <RouterLink
        v-for="route in routes"
        class="nav-link"
        :to="route.path"
        :key="`nav-link-${route.name}`"
      >
        <Icon :name="route.icon" />
        {{ route.name }}
      </RouterLink>
    </nav>
  </footer>
</template>

<style>
  :root {
    --footer-height: calc(var(--size-16) + (var(--space-lg) * 2));
  }
  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: var(--footer-height);
    /* width: var(--screen-xs); */
    margin: 0 auto;
    padding: var(--space-lg) 0;
  }

  nav {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    align-items: center;
    width: 100%;
    font-size: var(--font-xs);
    text-align: center;
    background-color: var(--background-nav);
    border: 1px solid var(--border);
    border-radius: var(--radius-2xl);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(2px);
  }

  nav .nav-link {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    padding: var(--space-md) var(--space-xs);
    gap: var(--space-xs);
    color: var(--text-muted);
  }
  nav .nav-link:hover {
    color: var(--text-accent);
  }
  nav .nav-link:is(:active, :focus) {
    color: var(--text-accent-hover);
  }

  .footer-offset {
    height: var(--footer-height);
    min-height: var(--footer-height);
    width: 100%;
  }
</style>
