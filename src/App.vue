<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router';
  import { routes } from './router';
</script>

<template>
  <RouterView/>
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
  footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: var(--space-lg);
  }

  nav {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    align-items: center;
    width: 100%;
    font-size: var(--font-xs);
    text-align: center;
    background-color: var(--background-nav);
    border-radius: var(--radius-3xl);
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
</style>
