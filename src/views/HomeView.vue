<template>
  <div class="home">
    <ShowData/>
  </div>
</template>

<script>
// @ is an alias to /src
import ShowData from '@/components/ShowData.vue'

export default {
  name: 'HomeView',
  components: {
    ShowData
  }
}
</script>
