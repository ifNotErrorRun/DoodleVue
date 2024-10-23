<!--<script>-->
// export default {
//   data() {
//     return {
//       output: null,
//       prev: null,
//       cur: null,
//       operator: null,
//       operatorActions: {
//         '+' : (a, b) => a + b,
//         '-' : (a, b) => a - b,
//         '*' : (a, b) => a * b,
//         '/' : (a, b) => a / b
//       }
//     }
//   },
//   methods: {
//     clear() {
//       this.output = null
//       this.prev = null
//       this.cur = null
//       this.operator = null
//     },
//     calculate(n) {
//       if (!this.cur && !this.prev) {
//         alert('숫자를 먼저 입력하세요. ')
//         return
//       }
//       // 사칙연산 기호를 연달아 클릭한 경우
//       if (this.operator !== '' && !this.cur) {
//         alert('사칙연산 기호를 연달아 누를 수 없습니다. ')
//         return
//       }
//       // 등호를 클릭해 결과를 노출한 후 다시 등호를 클릭한 경우
//       if (n === '=' && this.prev === this.cur) {
//         return
//       }
//       this.cur = Number(this.cur)
//       if (this.operator) {
//         this.prev = this.operatorActions[this.operator](this.prev, this.cur)
//         if (n === '=') {
//           this.output = this.prev
//           this.operator = null
//           this.cur = this.prev
//         } else {
//           this.output = null
//           this.operator = n
//           this.cur = null
//         }
//       } else {
//         this.output = null
//         this.operator = n
//         this.prev = this.cur
//         this.cur = null
//       }
//     },
//     userInput (n) {
//       this.cur = this.cur ? (this.cur += n) : n
//       this.output = this.cur
//     },
//     operation (e) {
//       const n = e.currentTarget.value
//       if (n === 'C') {
//         this.clear()
//       } else if (['+', '-', '/', '*', '='].includes(n)) {
//         this.calculate(n)
//       } else {
//         this.userInput(n)
//       }
//     }
//   }
// }
<script setup>
import { ref } from 'vue'

const state = ref({
  output: null,
  prev: null,
  cur: null,
  operator: null,
})

const operatorActions = {
  '+' : (a, b) => a + b,
  '-' : (a, b) => a - b,
  '*' : (a, b) => a * b,
  '/' : (a, b) => a / b
}

const clear = () => {
  state.value.output = null
  state.value.prev = null
  state.value.cur = null
  state.value.operator = null
}
const calculate = (n) => {
  if (!state.value.cur && !state.value.prev) {
    alert('숫자를 먼저 입력하세요. ')
    return
  }
  // 사칙연산 기호를 연달아 클릭한 경우
  if (state.value.operator !== '' && !state.value.cur) {
    alert('사칙연산 기호를 연달아 누를 수 없습니다. ')
    return
  }
  // 등호를 클릭해 결과를 노출한 후 다시 등호를 클릭한 경우
  if (n === '=' && state.value.prev === state.value.cur) {
    return
  }
  state.value.cur = Number(state.value.cur)
  if (state.value.operator) {
    state.value.prev = operatorActions[state.value.operator](state.value.prev, state.value.cur)
    if (n === '=') {
      state.value.output = state.value.prev
      state.value.operator = null
      state.value.cur = state.value.prev
    } else {
      state.value.output = null
      state.value.operator = n
      state.value.cur = null
    }
  } else {
    state.value.output = null
    state.value.operator = n
    state.value.prev = state.value.cur
    state.value.cur = null
  }
}

const userInput= (n) => {
  state.value.cur = state.value.cur ? (state.value.cur += n) : n
  state.value.output = state.value.cur
}

const operation = (e) => {
  const n = e.currentTarget.value
  if (n === 'C') {
    clear()
  } else if (['+', '-', '/', '*', '='].includes(n)) {
    calculate(n)
  } else {
    userInput(n)
  }
}
</script>

<template>
  <div class="calculator">
    <form name="forms">
      <input v-model="state.output" type="text" name="output" readonly />
      <input type="button" class="clear" value="C" @click="operation" />
      <input type="button" class="operator" value="/" @click="operation" />
      <input type="button" value="1" @click="operation" />
      <input type="button" value="2" @click="operation" />
      <input type="button" value="3" @click="operation" />
      <input type="button" class="operator" value="*" @click="operation" />
      <input type="button" value="4" @click="operation" />
      <input type="button" value="5" @click="operation" />
      <input type="button" value="6" @click="operation" />
      <input type="button" class="operator" value="+" @click="operation" />
      <input type="button" value="7" @click="operation" />
      <input type="button" value="8" @click="operation" />
      <input type="button" value="9" @click="operation" />
      <input type="button" class="operator" value="-" @click="operation" />
      <input type="button" class="dot" value="." @click="operation" />
      <input type="button" value="0" @click="operation" />
      <input type="button" class="operator result" value="=" @click="operation" />
    </form>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.calculator {
  width: 287px;
  border: 1px solid #333;
  background-color: #ccc;
  padding: 5px;
}

.calculator form {
  display: grid;
  grid-template-columns: repeat(4, 65px);
  grid-auto-rows: 65px;
  grid-gap: 5px;
}

.calculator form input {
  border: 2px solid #333;
  cursor: pointer;
  font-size: 19px;
}

.calculator form input:hover {
  box-shadow: 1px 1px 2px #333;
}

.calculator form .clear {
  background-color: #ed4848;
}

.calculator form .operator {
  background-color: orange;
}

.calculator form .dot {
  background-color: green;
}

.calculator form input[type='text'] {
  grid-column: span 4;
  text-align: right;
  padding: 0 10px;
}

.calculator form .clear {
  grid-column: span 3;
}

.calculator form .result {
  grid-column: span 2;
}
</style>
