<template>
  <div v-if="key !== 'id' && isDeleted" class="detail-item">
    <div>{{ key }}:</div>
    <div class="detail-value">{{ value }}</div>
    <div class="edit-block animate__animated animate__zoomIn animate__faster">
      <button
        v-if="key !== 'id' && key !== 'name' && key !== 'number'"
        @click="deleteEntry"
        class="btn-delete"
      >
        x
      </button>
      <button @click="visibleInput" v-if="isEdit" class="btn-change">
        ...
      </button>
    </div>
  </div>

  <form @submit.prevent="changeValue" v-if="isEdit && isChange">
    <input
      v-if="key !== 'number'"
      ref="newValue"
      type="text"
      maxlength="20"
      oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
    />
    <input v-else ref="newValue" type="number" maxlength="14" />
    <button type="submit">+</button>
  </form>
</template>

<script>
export default {
  props: ["data", "isEdit"],
  data() {
    return {
      key: this.data[0],
      value: this.data[1],
      isChange: false,
      isDeleted: true,
    };
  },
  updated() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const contacts = JSON.parse(localStorage.getItem("contacts"));
    const findedUser = contacts.find((el) => el.id === currentUser.id);

    if (!this.isEdit && currentUser[this.key] !== findedUser[this.key]) {
      this.value = this.data[1];
    }
  },
  methods: {
    visibleInput() {
      this.isChange = !this.isChange;
    },
    changeValue() {
      this.value = this.$refs.newValue.value;
      const currentId = JSON.parse(localStorage.getItem("currentUser")).id;
      const contacts = JSON.parse(localStorage.getItem("contacts"));
      const currentUser = contacts.find((el) => el.id === currentId);
      currentUser[this.key] = this.value;
      const updatedContacts = contacts.filter((el) => el.id !== currentId);
      updatedContacts.push(currentUser);
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      localStorage.setItem("contactsToUpdate", JSON.stringify(updatedContacts));
      this.isChange = !this.isChange;
    },
    deleteEntry() {
      if (confirm(`Delete this ${this.key}?`)) {
        if (this.isChange) {
          this.isChange = !this.isChange;
        }
        this.isDeleted = false;
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        delete currentUser[this.key];
        const contacts = JSON.parse(localStorage.getItem("contacts"));
        const updatedContacts = contacts.filter(
          (el) => el.id !== currentUser.id
        );
        updatedContacts.push(currentUser);
        localStorage.setItem("contacts", JSON.stringify(updatedContacts));
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
      }
    },
  },
};
</script>

<style scoped>
.edit-block {
  display: block;
}
.btn-change {
  border: 1px solid black;
  font-weight: 900;
  padding: 0;

  cursor: pointer;
}
.btn-change:hover {
  border: 1px dotted black;
}
.btn-delete {
  border: none;
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin-right: 5px;
  color: white;
  border-radius: 5px;
  font-weight: 700;
  padding: 0;

  background-color: darkred;
}
.btn-delete:hover {
  background-color: chocolate;
  transition-duration: 0.3s;
}
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
  text-align: right;
}
</style>
