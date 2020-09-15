<template>
  <li class="item">
    <div>
      <p>
        Name:
        <span class="universal-info">{{ item.name }}</span>
      </p>
      <p>
        Number:
        <span class="universal-info">{{ item.number }}</span>
      </p>
    </div>

    <router-link
      class="more-details"
      :to="{
        name: 'ContactInfo',
        params: { id: item.id },
      }"
      >More</router-link
    >
    <button class="deleteBtn" v-on:click="$emit('remove-contact', item.id)">
      x
    </button>
  </li>
</template>

<script>
import "animate.css";

export default {
  props: ["contact"],
  data() {
    return {
      item: this.contact,
    };
  },
};
</script>

<style>
body {
  font-family: "Ariel", sans-serif;
}
a {
  display: block;
}
p {
  margin-top: 0;
  margin-bottom: 2px;
}
.item {
  display: flex;
  margin-bottom: 10px;
  box-shadow: 0 0 4px #666;
  align-items: center;
  padding: 10px 15px;
}
.item:hover {
  animation: headShake; /* referring directly to the animation's @keyframe declaration */
  animation-duration: 1s; /* don't forget to set a duration! */
}

.universal-info {
  display: block;
  font-weight: 700;
  color: purple;
}
.deleteBtn {
  width: 20px;
  height: 20px;
  padding: 0;
  font-weight: 700;
  margin-left: 10px;
  color: snow;
  border: none;
  background-color: red;
  cursor: pointer;
}
.more-details {
  margin-left: auto;
  display: block;
  font-weight: 700;
  color: #31d382;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
}
.more-details:hover {
  color: #076e3a;
  transition-duration: 0.3s;
}
</style>
