<template>
  <div class="title-block">
    <router-link to="/" class="go-back">Go back!</router-link>
    <h2 class="title">Detailed info</h2>
    <button class="btn-edit" ref="btnEdit" @click="onEdit">
      edit
    </button>
    <button ref="addContact" @click="addContact" class="btn">
      +
    </button>
  </div>
  <Details
    v-for="data in contactForDetails"
    v-bind:data="data"
    v-bind:isEdit="isEdit"
    v-bind:key="data.id"
  />
  <button
    class="btn-add animate__animated animate__zoomIn animate__faster"
    v-if="isEdit"
    @click="updateContacts"
  >
    Save
  </button>
  <form @submit.prevent="AddDetail" v-if="isAdded">
    <input
      type="text"
      name="detail_key"
      maxlength="10"
      placeholder="Enter key..."
      class="input"
      required
      ref="key"
    />
    <input
      type="text"
      name="detail_key"
      maxlength="16"
      required
      class="input"
      placeholder="Enter value..."
      ref="value"
    />
    <button class="btn-add">A:D:D</button>
  </form>
</template>

<script>
import Details from "@/components/Details";
import "animate.css";

export default {
  data() {
    return {
      id: this.$route.params.id,
      contactForDetails: {},
      contactForLocal: {},
      isAdded: false,
      isEdit: false,
    };
  },
  mounted() {
    const contacts = JSON.parse(localStorage.getItem("contacts"));
    this.contactForLocal = contacts.find((el) => el.id === this.id);
    localStorage.setItem("currentUser", JSON.stringify(this.contactForLocal));
    this.contactForDetails = Object.entries(this.contactForLocal);
  },
  components: {
    Details,
  },
  methods: {
    updateContacts() {
      const contactsToUpdate = JSON.parse(
        localStorage.getItem("contactsToUpdate")
      );
      localStorage.setItem("contacts", JSON.stringify(contactsToUpdate));
      this.isEdit = false;
      this.$refs.btnEdit.textContent = "edit";
    },
    onEdit() {
      if (this.isEdit) {
        this.$refs.btnEdit.textContent = "edit";
        return (this.isEdit = !this.isEdit);
      }
      this.isEdit = !this.isEdit;
      this.$refs.btnEdit.textContent = "X";
    },
    AddDetail() {
      const newDetail = [this.$refs.key.value, this.$refs.value.value];
      this.contactForDetails.push(newDetail);
      this.contactForLocal = {
        ...this.contactForLocal,
        [this.$refs.key.value]: this.$refs.value.value,
      };
      const contacts = JSON.parse(localStorage.getItem("contacts"));
      const updatedContacts = contacts.filter(
        (el) => el.id !== this.contactForLocal.id
      );
      updatedContacts.push(this.contactForLocal);
      localStorage.setItem("contacts", JSON.stringify(updatedContacts));
      localStorage.setItem("contactsToUpdate", JSON.stringify(updatedContacts));
      localStorage.setItem("currentUser", JSON.stringify(this.contactForLocal));
      this.isAdded = !this.isAdded;
      this.$refs.addContact.classList.remove("btn-active");

      this.$refs.key.value = "";
      this.$refs.value.value = "";
    },
    addContact() {
      if (this.isAdded) {
        this.$refs.addContact.classList.remove("btn-active");
        return (this.isAdded = !this.isAdded);
      }
      this.$refs.addContact.classList.add("btn-active");
      this.isAdded = !this.isAdded;
    },
  },
};
</script>

<style scoped>
.details-section {
  position: relative;
}
.btn-edit {
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 50px;
  color: #fff;
  border: none;
  width: 40px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
  text-align: center;
  font-size: 12px;
  vertical-align: middle;
  font-weight: 700;
  text-align: center;
  overflow: hidden;
  background-image: -webkit-linear-gradient(45deg, #872294 0%, #ff71b6 100%);
  background-image: linear-gradient(45deg, #872294 0%, #ff71b6 100%);
  transition: 0.4s;
}
.btn {
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
  color: #fff;
  border: none;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
  text-align: center;
  font-size: 20px;
  font-weight: 900;
  vertical-align: middle;
  overflow: hidden;
  background-image: -webkit-linear-gradient(45deg, #872294 0%, #ff71b6 100%);
  background-image: linear-gradient(45deg, #872294 0%, #ff71b6 100%);
  transition: 0.4s;
}

.btn-active {
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
.go-back {
  position: absolute;
  text-decoration: none;
  font-weight: 900;
  color: purple;
  top: 10px;
  left: 5px;
}
.go-back:hover {
  text-decoration: underline;
}
.title {
  margin-top: 24px;
  text-align: center;
}
.input {
  display: block;
  margin: 0 auto;
  width: 95%;
  height: 20px;
  border: 1px solid #7c7c7c;
  font-family: "Ariel", sans-serif;
  border-radius: 8px;
  margin-bottom: 10px;
  padding-left: 10px;
  font-size: 14px;
  color: #8a2be2;
}
.btn-add {
  display: block;
  height: 25px;
  margin: 0 auto;
  border: none;
  border-radius: 5px;
  background-color: #ff08de;
  color: snow;
  text-transform: uppercase;
  width: 80px;
  cursor: pointer;
  font-weight: 600;
  margin-bottom: 10px;
}
.btn-add:hover {
  background-color: #6b075e;
  transition-duration: 0.3s;
}

.btn-active {
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
