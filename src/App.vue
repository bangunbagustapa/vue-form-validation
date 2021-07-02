<template>
  <form @submit.prevent="onSubmit">
    <div>
      <label for="name">Name</label>
      <input id="name" type="text" name="name" v-model="name">
      <span v-if="v$.name.$error">{{ v$.name.$errors[0].$message }}</span>
    </div>
    <div>
      <label for="address">Address</label>
      <textarea id="address" type="text" name="address" v-model="address"></textarea>
      <span v-if="v$.address.$error">{{ v$.address.$errors[0].$message }}</span>
    </div>
    <div>
      <label for="age">Age</label>
      <input id="age" type="number" name="age" v-model="age">
      <span v-if="v$.age.$error">{{ v$.age.$errors[0].$message }}</span>
    </div>
    <div>
      <label for="photo">Photo</label>
      <input type="file" id="photo" name="photo" accept="image/png, image/jpeg, image/jpg" @change="onChange">
      <span v-if="v$.photo.$error">{{ v$.photo.$errors[0].$message }}</span>
    </div>
    <div>
      <label for="gender">Gender</label>
      <select name="gender" id="gender" v-model="gender">
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
      <span v-if="v$.gender.$error">{{ v$.gender.$errors[0].$message }}</span>
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
      <span v-if="v$.plan.$error">{{ v$.plan.$errors[0].$message }}</span>
    </div>
    <div>
      <input type="checkbox" name="terms" id="terms" v-model="terms">
      <label for="terms">I agree to Terms</label>
      <span v-if="v$.terms.$error">{{ v$.terms.$errors[0].$message }}</span>
    </div>
    <button>Submit</button>
    <pre>{{ JSON.stringify(v$['photo.size'], null, 2)}}</pre>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, maxLength, integer, between, sameAs, helpers } from '@vuelidate/validators'
import { maxSize, image } from './helpers/validators'

export default {
  setup () {
    return { v$: useVuelidate() }
  },
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
    onSubmit () {
      this.v$.$touch()

      if (!this.v$.$error) {
        console.table({
          name: this.name,
          address: this.address,
          age: this.age,
          photo: this.photo.name,
          gender: this.gender,
          plan: this.plan,
          terms: this.terms
        })
        this.reset()
      }
    },
    onChange (event) {
      this.photo = event.target.files[0]
    },
    reset () {
      this.v$.$reset()
      this.name = ''
      this.address = ''
      this.age = null
      this.photo = {}
      this.gender = ''
      this.plan = ''
      this.terms = false
    }
  },
  validations () {
    return {
      name: {
        required: helpers.withMessage('Please enter your name', required)
      },
      address: {
        required: helpers.withMessage('Please enter your address', required),
        maxLength: helpers.withMessage('Address cannot be longer than 255 characters', maxLength(255))
      },
      age: {
        required: helpers.withMessage('Please enter your age', required),
        integer: helpers.withMessage('Age must be a number', integer),
        betweenValue: helpers.withMessage('Age must be between 17 and 30', between(17, 30))
      },
      photo: {
        required: helpers.withMessage('Please upload your photo', required),
        image: helpers.withMessage('The file must be an image', image),
        maxSize: helpers.withMessage('The maximum file size is 4 KB', maxSize)
      },
      gender: {
        required: helpers.withMessage('Please select your gender', required)
      },
      plan: {
        required: helpers.withMessage('Please choose your plan', required)
      },
      terms: {
        sameAs: helpers.withMessage('You must agree to the terms', sameAs(true))
      }
    }
  }
}
</script>
