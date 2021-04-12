/*
  517 - Multiply
  -------
  by null (@uid11) #extreme #math #template-literal
  
  ### Question
  
  **This challenge continues from [476 - Sum](https://tsch.js.org/476), it is recommended that you finish that one first, and modify your code based on it to start this challenge.**
  
  Implement a type `Multiply<A, B>` that multiplies two non-negative integers and returns their product as a string. Numbers can be specified as string, number, or bigint.
  
  For example,
  
  ```ts
  type T0 = Multiply<2, 3> // '6'
  type T1 = Multiply<3, '5'> // '15'
  type T2 = Multiply<'4', 10> // '40'
  type T3 = Multiply<0, 16> // '0'
  type T4 = Multiply<'13', '21'> // '273'
  type T5 = Multiply<'43423', 321543n> // '13962361689'
  ```
  
  > View on GitHub: https://tsch.js.org/517
*/


/* _____________ Your Code Here _____________ */

type CreateNumberMap<A extends any[] = []> =
    A['length'] extends 10 ? {}
        : { [K in `${A['length']}`]: A } & CreateNumberMap<[...A, []]>
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

type DivMod10<N extends any[], D extends any[] = []> =
    N extends [any,any,any,any,any,any,any,any,any,any,...infer Rest] ? DivMod10<Rest, [...D, []]> : [D, N]
type AddD<N extends any[], P extends any[]> =
    P extends [] ? N
        : (N extends [infer Fst, ...infer Rest]
            ? [[...AssertArray<Fst>, ...P], ...Rest]
            : [P])

type ProcessCarry<Arr extends any[]> =
    Arr extends [infer Fst, ...infer Rest]
        ? (DivMod10<AssertArray<Fst>> extends [infer Div, infer Mod]
            ? [Mod, ...ProcessCarry<AddD<Rest, AssertArray<Div>>>]
            : never)
        : []

type ArrMul10<N extends any[], M extends any[]> =
    M extends [any, ...infer Rest]
        ? ArrSum1<N, ArrMul10<N, Rest>>
        : []

type ArrMulBy10<N extends any[]> = N extends [] ? [] : [[], ...N]

type ArrMul<N extends any[], M extends any[]> =
    M extends [infer Fst, ...infer Rest]
        ? ArrSum1<ArrMul10<N, AssertArray<Fst>>, ArrMulBy10<ArrMul<N, Rest>>>
        : []

type ArrToNum<Arr extends any[], First extends boolean = true> =
    Arr extends [infer Fst, ...infer Rest]
        ? `${ArrToNum<Rest, false>}${AssertArray<Fst>['length']}`
        : (First extends true ? '0' : '')

type NormalizeArr<Arr extends any[]> =
    Arr extends [...infer Rest, []]
        ? NormalizeArr<Rest>
        : Arr

type Multiply<A extends string | number | bigint, B extends string | number | bigint> =
    ArrToNum<NormalizeArr<ProcessCarry<ArrMul<NumToArr<`${A}`>, NumToArr<`${B}`>>>>>


/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<Multiply<2, 3>, '6'>>,
  Expect<Equal<Multiply<3, '5'>, '15'>>,
  Expect<Equal<Multiply<'4', 10>, '40'>>,
  Expect<Equal<Multiply<0, 16>, '0'>>,
  Expect<Equal<Multiply<'13', '21'>, '273'>>,
  Expect<Equal<Multiply<'43423', 321543n>, '13962361689'>>,
  Expect<Equal<Multiply<9999, 1>, '9999'>>,
  Expect<Equal<Multiply<4325234, '39532'>, '170985150488'>>,
  Expect<Equal<Multiply<100_000n, '1'>, '100000'>>,
  Expect<Equal<Multiply<259, 9125385>, '2363474715'>>,
  Expect<Equal<Multiply<9, 99>, '891'>>,
  Expect<Equal<Multiply<315, '100'>, '31500'>>,
  Expect<Equal<Multiply<11n, 13n>, '143'>>,
  Expect<Equal<Multiply<728, 0>, '0'>>,
  Expect<Equal<Multiply<'0', 213>, '0'>>,
  Expect<Equal<Multiply<0, '0'>, '0'>>
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/517/answer
  > View solutions: https://tsch.js.org/517/solutions
  > More Challenges: https://tsch.js.org
*/

