<!--<script>-->
<!--export default {-->
<!--  data () {-->
<!--    return {-->
<!--      userId : '',-->
<!--      userPw : '',-->
<!--      sex: 'male'-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    login () {-->
<!--      alert(`id: ${this.userId} / pw: ${this.userPw} / sex: ${this.sex}`)-->
<!--    }-->
<!--  }-->
<!--}-->
<!--</script>-->
<script setup>
  import { ref } from 'vue'

  const user = ref({
    id: '',
    pw: '',
    sex: 'male'
  })

  const login = () => {
    alert(`id: ${user.value.id} / pw: ${user.value.pw} / sex: ${user.value.sex}`)
  }

  const onInputHandler = (e) => {
    const attr = e.target.getAttribute("id");
    const key = attr.substring(attr.lastIndexOf('.')+1);
    user.value[key] = e.target.value
  }
</script>

<template>
  <form id="loginForm">
    <div>
      ID: <span >{{user.id}} </span>
      <div>
        <label for="user.id"><input type="text" @input="onInputHandler" id="user.id" /></label>
      </div>
    </div>
    <div>
      PASSWORD: <span>{{user.pw}} </span>
      <div>
        <label for="user.pw"><input type="password" @input="onInputHandler" id="user.pw"/></label>
      </div>
    </div>
    <div>
      SEX: <span>{{user.sex}} </span>
      <div>
        <label for="male"> <input type="radio" v-model="user.sex" id="male" value="male"/>male</label>
        <label for="female"> <input type="radio" v-model="user.sex" id="female" value="female"/>female</label>
      </div>
    </div>

    <button type="button" @click="login">LOGIN</button>
  </form>
</template>

<style scoped>
span {
  font-weight: bold;
}

#loginForm {
  margin: 10em;
}
</style>
