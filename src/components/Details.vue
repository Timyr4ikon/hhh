<template>
  <div v-if="key !== 'id'" class="detail-item">
    <div>{{ key }}:</div>
    <div class="detail-value">{{ value }}</div>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      key: this.data[0],
      value: this.data[1],
    };
  },
};
</script>

<style>
.detail-item {
  border-bottom: 2px solid black;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-between;
}
.detail-value {
  color: purple;
  font-weight: 700;
}
</style>
