<script setup lang='ts'>

  import { ref } from 'vue';
  import { useInfiniteScroll } from '@vueuse/core'
  import useRequest from '../api/useRequest';
  import { Post, Posts } from '../interfaces';

  const {handlerRequest} = useRequest()
  const postToShow:number = 10

  const response = ref<Posts>( await handlerRequest(postToShow,0) )
  const posts = ref<Post[]>( response.value.posts )
  const isProcesingRequest = ref<boolean>(false)

  async function loadMorePosts() {
    console.log('loading data scroll infinite')
    isProcesingRequest.value = true
    try {
      const response = await handlerRequest(postToShow, posts.value.length)
      const newPosts = response.posts
      posts.value.push(...newPosts)
      isProcesingRequest.value = false
    } catch (error) {
      throw new Error('Error en la recarga de datos')
    }
  }

  useInfiniteScroll(
    document,
    async () => {
      await loadMorePosts()
    },
    {distance:0}
  )
</script>

<template>
  <section class="section">
    <div class="post" v-for="({title,body,tags}) in posts" :key="title">
      <h1>{{ title }}</h1>
      <p>{{ body }}</p>
      <footer>
        <span v-for="tag in tags">{{ tag }}</span>
      </footer>
    </div>
    <h1 class="procesing" v-if="isProcesingRequest">Loading data ...</h1>
  </section>
</template>

<style scoped>
.section{
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  height: 100%;
  gap: 2rem;
}
.post{
  border: .5px solid #ddd;
  padding: 1rem;
}
.procesing {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
}
</style>