<template>
  <ul>
    <Item
      v-for="contact in contacts"
      v-bind:contact="contact"
      @remove-contact="removeContact"
      v-bind:key="contact.id"
    />
  </ul>
</template>

<script>
import Item from "./Item";

export default {
  props: ["contacts"],
  components: {
    Item,
  },
  methods: {
    removeContact(id) {
      this.$emit("remove-contact", id);
    },
  },
};
</script>

<style>
ul {
  list-style: none;
  padding-inline-start: 0;
  margin-block-start: 0;
  margin-block-end: 0;
}
</style>
