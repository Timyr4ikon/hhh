<template>
  <form @submit.prevent="onSubmit">
    <input type="text" v-model="title" />
    <button type="submit">Add</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      title: "",
    };
  },
  methods: {
    onSubmit() {
      const newTodo = {
        id: Date.now(),
        title: this.title,
        completed: false,
      };

      this.$emit("add-todo", newTodo);
    },
  },
};
</script>
