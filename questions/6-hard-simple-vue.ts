/*
  6 - Simple Vue
  -------
  by Anthony Fu (@antfu) #hard #this #application #vue
  
  ### Question
  
  Implement a simpiled version of a Vue-like typing support.
  
  By providing a function name `SimpleVue` (similar to `Vue.extend` or `defineComponent`), it should properly infer the `this` type inside computed and methods.
  
  In this challenge, we assume that SimpleVue take an Object with `data`, `computed` and `methods` fields as it's only argument,
  
  - `data` is a simple function that returns an object that exposes the context `this`, but you won't be accessible to other computed values or methods.
  
  - `computed` is an Object of functions that take the context as `this`, doing some calculation and returns the result. The computed results should be exposed to the context as the plain return values instead of functions.
  
  - `methods` is an Object of functions that take the context as `this` as well. Methods can access the fields exposed by `data`, `computed` as well as other `methods`. The different between `computed` is that `methods` exposed as functions as-is.
  
  The type of `SimpleVue`'s return value can be arbitrary.
  
  ```ts
  const instance = SimpleVue({
    data() {
      return {
        firstname: 'Type',
        lastname: 'Challenges',
        amount: 10,
      }
    },
    computed: {
      fullname() {
        return this.firstname + ' ' + this.lastname
      }
    },
    methods: {
      hi() {
        alert(this.fullname.toLowerCase())
      }
    }
  })
  ```
  
  > View on GitHub: https://tsch.js.org/6
*/


/* _____________ Your Code Here _____________ */

type ComputedProperties<Computed> =  { [x in keyof Computed]: Computed[x] extends (...args: any[]) => any ? ReturnType<Computed[x]> : never }
type Options<Data, Computed, Methods> = {
    data?: (this: void) => Data,
    methods?: Methods & ThisType<Data & Methods & ComputedProperties<Computed>>,
    computed?: Computed & ThisType<Data & Methods & ComputedProperties<Computed>>,
}
declare function SimpleVue<Data, Computed, Methods>(options: Options<Data, Computed, Methods>): Data & Computed & Methods


/* _____________ Test Cases _____________ */

import { Equal, Expect } from '@type-challenges/utils'

SimpleVue({
  data() {
    // @ts-expect-error
    this.firstname
    // @ts-expect-error
    this.getRandom()
    // @ts-expect-error
    this.data()

    return {
      firstname: 'Type',
      lastname: 'Challenges',
      amount: 10,
    }
  },
  computed: {
    fullname() {
      return `${this.firstname} ${this.lastname}`
    },
  },
  methods: {
    getRandom() {
      return Math.random()
    },
    hi() {
      alert(this.fullname.toLowerCase())
      alert(this.getRandom())
    },
    test() {
      const fullname = this.fullname
      const cases: [
        Expect<Equal<typeof fullname, string>>,
      ] = [] as any
    },
  },
})



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/6/answer
  > View solutions: https://tsch.js.org/6/solutions
  > More Challenges: https://tsch.js.org
*/

