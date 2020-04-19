<template>
<div class="container">
     <h1 class="title">
        Timer reminder
      </h1>
      <todo-list />
</div>
</template>

<script>
import TodoList from '~/components/TodoList.vue'
export default {
  components: {
   TodoList
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
.title {
  color:black;
  margin-bottom: 20px;
}
.container {
  width: 700px;
  margin:0 auto;
  padding:40px;
}
</style>

