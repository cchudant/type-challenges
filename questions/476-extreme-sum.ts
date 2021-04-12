/*
  476 - Sum
  -------
  by null (@uid11) #extreme #math #template-literal
  
  ### Question
  
  Implement a type `Sum<A, B>` that summing two non-negative integers and returns the sum as a string. Numbers can be specified as a string, number, or bigint.
  
  For example,
  
  ```ts
  type T0 = Sum<2, 3> // '5'
  type T1 = Sum<'13', '21'> // '34'
  type T2 = Sum<'328', 7> // '335'
  type T3 = Sum<1_000_000_000_000n, '123'> // '1000000000123'
  ```
  
  > View on GitHub: https://tsch.js.org/476
*/


/* _____________ Your Code Here _____________ */

type CreateNumberMap<A extends any[] = []> =
    A['length'] extends 10 ? {}
        : { [K in `${A['length']}`]: A } & CreateNumberMap<[...A, 0]>
type Simplify<T> = { [K in keyof T]: T[K] }
type NumberMap = Simplify<CreateNumberMap>
type NumToArr<N extends string> = N extends `${infer Fst}${infer Rest}`
    ? (Fst extends keyof NumberMap ? [...NumToArr<Rest>, NumberMap[Fst]] : [])
    : (N extends keyof NumberMap ? [NumberMap[N]] : [])

type AssertArray<N> = N extends any[] ? N : never
type ArrSum1<N1 extends any[][], N2 extends any[][]> =
    [N1, N2] extends [[infer Fst1, ...infer Rest1], [infer Fst2, ...infer Rest2]]
        ? [[...AssertArray<Fst1>, ...AssertArray<Fst2>], ...ArrSum1<AssertArray<Rest1>, AssertArray<Rest2>>]
        : (N1 extends [] ? N2 : N1)

type Minus10<N extends any[]> = N extends [any,any,any,any,any,any,any,any,any,any,...infer Rest] ? Rest : N
type IsGreaterThan10<N extends any[]> = N extends [any,any,any,any,any,any,any,any,any,any,...any[]] ? true : false

type AddOne<N extends any[]> =
    N extends [infer Fst, ...infer Rest]
        ? [[...AssertArray<Fst>, 0], ...Rest]
        : [[0]]
type ProcessCarry<Arr extends any[]> =
    Arr extends [infer Fst, ...infer Rest]
        ? (IsGreaterThan10<AssertArray<Fst>> extends true
            ? [Minus10<AssertArray<Fst>>, ...ProcessCarry<AddOne<Rest>>]
            : [Fst, ...ProcessCarry<Rest>])
        : []

type ArrToNum<Arr extends any[]> =
    Arr extends [infer Fst, ...infer Rest]
        ? `${ArrToNum<Rest>}${AssertArray<Fst>['length']}`
        : ''

type Sum<A extends string | number | bigint, B extends string | number | bigint> =
    ArrToNum<ProcessCarry<ArrSum1<NumToArr<`${A}`>, NumToArr<`${B}`>>>>


/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Sum<2, 3>, '5'>>,
  Expect<Equal<Sum<'13', '21'>, '34'>>,
  Expect<Equal<Sum<'328', 7>, '335'>>,
  Expect<Equal<Sum<1_000_000_000_000n, '123'>, '1000000000123'>>,
  Expect<Equal<Sum<9999, 1>, '10000'>>,
  Expect<Equal<Sum<4325234, '39532'>, '4364766'>>,
  Expect<Equal<Sum<728, 0>, '728'>>,
  Expect<Equal<Sum<'0', 213>, '213'>>,
  Expect<Equal<Sum<0, '0'>, '0'>>
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/476/answer
  > View solutions: https://tsch.js.org/476/solutions
  > More Challenges: https://tsch.js.org
*/

