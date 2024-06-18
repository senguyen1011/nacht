<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router';
  import { routes } from './router';
</script>

<template>
  <RouterView/>
  <!-- <div class="footer-offset">&nbsp;</div> -->
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
    --footer-height: calc(var(--size-16) + var(--space-xl));
  }
  footer {
    position: sticky;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: flex-end;
    width: 100%;
    height: var(--footer-height);
    margin: 0 auto;
    z-index: 100;
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
