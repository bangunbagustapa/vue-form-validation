<template>
  <form @submit.prevent="onSubmit">
    <div>
      <label for="name">Name</label>
      <input id="name" type="text" name="name" v-model="name">
    </div>
    <div>
      <label for="address">Address</label>
      <textarea id="address" type="text" name="address" v-model="address"></textarea>
    </div>
    <div>
      <label for="age">Age</label>
      <input id="age" type="number" name="age" v-model="age">
    </div>
    <div>
      <label for="photo">Photo</label>
      <input type="file" id="photo" name="photo" accept="image/*" @change="onChange">
    </div>
    <div>
      <label for="gender">Gender</label>
      <select name="gender" id="gender" v-model="gender">
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    </div>
    <div>
      Plan
      <input type="radio" id="starter" value="starter" v-model="plan">
      <label for="starter">Starter</label>
      <input type="radio" id="pro" value="pro" v-model="plan">
      <label for="pro">Pro</label>
      <input type="radio" id="business" value="business" v-model="plan">
      <label for="business">Business</label>
      <input type="radio" id="enterprise" value="enterprise" v-model="plan">
      <label for="enterprise">Enterprise</label>
    </div>
    <div>
      <input type="checkbox" name="terms" id="terms" v-model="terms">
      <label for="terms">I agree to Terms</label>
    </div>
    <button>Submit</button>
  </form>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      address: '',
      age: null,
      photo: {},
      gender: '',
      plan: '',
      terms: false
    }
  },
  methods: {
    onSubmit () {},
    onChange (event) {
      this.photo = event.target.files[0]
    }
  }
}
</script>
