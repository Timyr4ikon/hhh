<template>
  <div class="section">
    <h1 class="title animate__animated animate__pulse animate__infinite ">
      Phonebook
    </h1>
    <button ref="addContact" @click="addContact" class="btn">
      +
    </button>
    <form
      v-if="isAdded"
      ref="form"
      class="form animate__animated animate__fadeInDown"
      @submit.prevent="addTodo"
    >
      <span class="label">Name</span>
      <input
        ref="name"
        type="text"
        class="input"
        name="user-name"
        maxlength="20"
        required
      />
      <span class="label">Number</span>
      <input
        oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
        type="number"
        maxlength="14"
        ref="number"
        class="input"
        name="user-number"
        required
      />
      <button type="submit" class="submit-btn">ADD</button>
    </form>
    <Contacts
      v-if="contacts.length"
      @remove-contact="removeContact"
      v-bind:contacts="contacts"
      >sdASD</Contacts
    >
    <p v-else class="add-first">Add your first Contact!</p>
  </div>
</template>

<script>
import Contacts from "@/components/Contacts";
import id from "shortid";
import "animate.css";

export default {
  name: "phonebook",
  data() {
    return {
      contacts: [],
      isAdded: false,
    };
  },
  components: {
    Contacts,
  },
  methods: {
    removeContact(id) {
      if (confirm("Are you shure?")) {
        this.contacts = this.contacts.filter((t) => t.id !== id);
        localStorage.setItem("contacts", JSON.stringify(this.contacts));
      }
    },
    addContact() {
      if (this.isAdded) {
        this.$refs.addContact.classList.remove("btn-active");
        return (this.isAdded = !this.isAdded);
      }
      this.$refs.addContact.classList.add("btn-active");

      this.isAdded = !this.isAdded;
    },
    addTodo() {
      if (
        this.$refs.name.value.trim() === "" ||
        this.$refs.number.value === ""
      ) {
        this.$refs.name.value = "";
        return alert("Mischievous!!!");
      }
      const existingUser = this.contacts.find(
        (el) => el.number === this.$refs.number.value
      );
      if (existingUser) {
        this.$refs.number.value = "";
        return alert(`The number is already in use (${existingUser.name})!`);
      }
      const newContact = {
        id: id.generate(),
        name: this.$refs.name.value,
        number: this.$refs.number.value,
      };
      this.contacts.push(newContact);
      this.$refs.name.value = "";
      this.$refs.number.value = "";
      localStorage.setItem("contacts", JSON.stringify(this.contacts));
      this.$refs.addContact.classList.remove("btn-active");

      this.isAdded = !this.isAdded;
    },
  },
  mounted() {
    if (localStorage.getItem("currentUser")) {
      localStorage.removeItem("currentUser");
    }
    if (localStorage.getItem("contacts")) {
      this.contacts = JSON.parse(localStorage.getItem("contacts"));
    }
  },
};
</script>

<style scoped>
.btn {
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  position: absolute;
  top: 4px;
  right: 0px;
  color: #fff;
  border: none;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 10px;
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

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.section {
  position: relative;
}
.add-contact {
  position: absolute;
  top: 0;
  width: 20px;
  height: 20px;
  background-color: red;
}
.title {
  display: block;
  font-size: 24px;
  color: purple;
  font-weight: 900;
  margin: 0 auto;
  margin-bottom: 15px;
  width: -webkit-fit-content;
  width: -moz-fit-content;
  font-family: "Ariel", sans-serif;
  width: fit-content;
}
.form {
  padding: 10px;
  margin-bottom: 15px;
}
.label {
  margin-left: 5px;
  color: purple;
  font-weight: 700;
  font-family: "Ariel", sans-serif;
}
.input {
  display: block;
  margin: 0 auto;
  width: 95%;
  height: 40px;
  border: 1px solid #7c7c7c;
  font-family: "Ariel", sans-serif;
  border-radius: 8px;
  padding-left: 10px;
  font-size: 18px;
  color: #8a2be2;
}
.add-first {
  color: #8a2be2;
  font-weight: 700;
  font-family: "Ariel", sans-serif;
  text-align: center;
}
.submit-btn {
  display: block;
  height: 30px;
  margin: 10px auto 0;
  border: none;
  border-radius: 5px;
  background-color: #ff08de;
  color: snow;
  text-transform: uppercase;
  width: 100px;
  cursor: pointer;
  font-weight: 600;
}
.submit-btn:hover {
  transition-duration: 0.25s;
  background-color: #7e0f78;
}
</style>
