<script setup lang='ts'>
import { defineAsyncComponent } from 'vue';

  const InfiniteScroll = defineAsyncComponent(()=>import('./components/InfiniteScroll.vue'))
</script>

<template>
  <div class="container">
    <Suspense>
      <!-- component with nested async dependencies -->
        <InfiniteScroll/>

      <!-- loading state via #fallback slot -->
      <template #fallback>
        <h1>Loading...</h1>
      </template>
    </Suspense>
  </div>
</template>

<style scoped>
  .container{
    max-width: 768px;
    margin-right: auto;
    margin-left: auto;
  }
</style>