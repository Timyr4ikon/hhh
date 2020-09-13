<template>
  <ul>
    <Item
      v-for="todo in todos"
      v-on:remove-todo="removeTodo"
      v-bind:todo="todo"
      v-bind:key="todo.id"
    />
  </ul>
</template>

<script>
import Item from "./Item";
export default {
  props: ["todos"],
  components: {
    Item,
  },
  methods: {
    removeTodo(id) {
      this.$emit("remove-todo", id); 
    },
  },
};
</script>
