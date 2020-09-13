<template>
    <div class="title-block">
      <router-link to="/" class="go-back">Go back!</router-link>
      <h2 class="title">Detailed info</h2>
      <button ref="addContact" @click="addContact" class="btn">
        +
      </button>
    </div>
    <Details
      v-for="data in contactForDetails"
      v-bind:data="data"
      v-bind:key="data.id"
    />
    <form @submit.prevent="AddDetail" v-if="isAdded">
      <input
        type="text"
        name="detail_key"
        placeholder="Enter key..."
        class="input"
        required
        ref="key"
      />
      <input
        type="text"
        name="detail_key"
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
export default {
  data() {
    return {
      id: this.$route.params.id,
      contactForDetails: {},
      contactForLocal: {},
      isAdded: false,
    };
  },
  mounted() {
    const contacts = JSON.parse(localStorage.getItem("contacts"));
    this.contactForLocal = contacts.find((el) => el.id === this.id);
    this.contactForDetails = Object.entries(this.contactForLocal);
  },
  components: {
    Details,
  },
  methods: {
    AddDetail() {
      const newDetail = [this.$refs.key.value, this.$refs.value.value];
      this.contact.push(newDetail);
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
.details-section{
  position: relative;
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
}

.btn-active {
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
