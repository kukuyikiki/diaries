<number-input v-model="number"></number-input>

import NumberInput from "./NumberInput"

export default {
  components: {
    NumberInput
  },
  data() {
    return {
      number: 10
    }
  }
}