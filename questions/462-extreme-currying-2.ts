/*
  462 - Currying 2
  -------
  by Kim (@hubvue) #extreme 
  
  ### Question
  
  [Currying](https://en.wikipedia.org/wiki/Currying) is the technique of converting a function that takes multiple arguments into a sequence of functions that each take a single argument.
  
  But in our daily life, currying dynamic arguments is also commonly used, for example, the `Function.bind(this, [...params])` API.
  
  ```ts
  const func = (a: number, b: number, c: number) => {
    return a + b + c
  }
  
  const bindFunc = func(null, 1, 2)
  
  const result = bindFunc(3) // result: 6
  ```
  
  Thus, based on `Currying 1`, we would need to have the dynamic argument version:
  
  ```ts
  const add = (a: number, b: number, c: number) => a + b + c
  const three = add(1, 1, 1) 
  
  const curriedAdd = DynamicParamsCurrying(add)
  const six = curriedAdd(1, 2, 3)
  const seven = curriedAdd(1, 2)(4)
  const eight = curriedAdd(2)(3)(4)
  ```
  
  In this challenge, `DynamicParamsCurrying` may take a function with zero to multiple arguments, you need to correctly type it. The returned function may accept at least one argument. When all the arguments as satisfied, it should yield the return type of the original function correctly.
  
  > View on GitHub: https://tsch.js.org/462
*/


/* _____________ Your Code Here _____________ */

type SkipN<Arr extends readonly any[], NArr extends readonly any[]> =
    NArr extends [infer _, ...infer Rest]
        ? (Arr extends [infer _, ...infer ArrRest]
            ? SkipN<ArrRest, Rest>
            : [])
        : Arr

type PopLast<A extends any[]> =
    A extends [any] ? []
    : (A extends [infer A, ...infer Rest] ? [A, ...PopLast<Rest>] : [])
type PossibleArgs<Params extends any[]> =
    Params extends [any, ...any]
    ? Params | PossibleArgs<PopLast<Params>>
    : never
type GetRestFromParams<All extends any[], Head extends any[]> =
    SkipN<All, Head> extends [] ? never : SkipN<All, Head>

type Curried<Fn> =
    Fn extends (...arg: infer Params) => infer Ret
        ? <T extends PossibleArgs<Params>>(...arg: T) =>
            GetRestFromParams<Params, T> extends []
                ? Ret
                : Curried<(...arg: GetRestFromParams<Params, T>) => Ret>
        : never
declare function DynamicParamsCurrying<Fn>(fn: Fn): Curried<Fn>


/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

const curried1 = DynamicParamsCurrying((a: string, b: number, c: boolean) => true)
const curried2 = DynamicParamsCurrying((a: string, b: number, c: boolean, d: boolean, e: boolean, f: string, g: boolean) => true)

const curried1Return1 = curried1('123')(123)(true)
const curried1Return2 = curried1('123', 123)(false)
const curried1Return3 = curried1('123', 123, true)

const curried2Return1 = curried2('123')(123)(true)(false)(true)('123')(false)
const curried2Return2 = curried2('123', 123)(true, false)(true, '123')(false)
const curried2Return3 = curried2('123', 123)(true)(false)(true, '123', false)
const curried2Return4 = curried2('123', 123, true)(false, true, '123')(false)
const curried2Return5 = curried2('123', 123, true)(false)(true)('123')(false)
const curried2Return6 = curried2('123', 123, true, false)(true, '123', false)
const curried2Return7 = curried2('123', 123, true, false, true)('123', false)
const curried2Return8 = curried2('123', 123, true, false, true)('123')(false)
const curried2Return9 = curried2('123', 123, true, false, true, '123')(false)
const curried2Return10 = curried2('123', 123, true, false, true, '123', false)

type cases = [
  Expect<Equal< typeof curried1Return1, true>>,
  Expect<Equal< typeof curried1Return2, true>>,
  Expect<Equal< typeof curried1Return3, true>>,

  Expect<Equal< typeof curried2Return1, true>>,
  Expect<Equal< typeof curried2Return2, true>>,
  Expect<Equal< typeof curried2Return3, true>>,
  Expect<Equal< typeof curried2Return4, true>>,
  Expect<Equal< typeof curried2Return5, true>>,
  Expect<Equal< typeof curried2Return6, true>>,
  Expect<Equal< typeof curried2Return7, true>>,
  Expect<Equal< typeof curried2Return8, true>>,
  Expect<Equal< typeof curried2Return9, true>>,
  Expect<Equal< typeof curried2Return10, true>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/462/answer
  > View solutions: https://tsch.js.org/462/solutions
  > More Challenges: https://tsch.js.org
*/

