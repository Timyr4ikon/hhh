
<template>
  <div>
    <AddTodo @add-todo="addTodo" />
    <router-link to="/">Home</router-link>
    <Lol v-if="todos.length" @remove-todo="removeTodo" v-bind:todos="todos" />
    <p v-else>NoToods</p>
  </div>
</template>
<script>
import Lol from "@/components/Lol";
import AddTodo from "@/components/AddTodo";

export default {
  name: "app",
  data() {
    return {
      todos: [
        { id: 1, title: "fsd", completed: true },
        { id: 2, title: "fsdasdfasdf", completed: false },
        { id: 22, title: "fsdasdfasdadfasfsaf", completed: false }
      ],
    };
  },
  components: {
    Lol,
    AddTodo,
  },
  methods: {
    removeTodo(id) {
      this.todos = this.todos.filter(t => t.id !== id);
    },
    addTodo(todo) {
      this.todos.push(todo);
      this.title = "";
    }
  }
};
</script>