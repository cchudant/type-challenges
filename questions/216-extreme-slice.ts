/*
  216 - Slice
  -------
  by Anthony Fu (@antfu) #extreme #array
  
  ### Question
  
  Implement the JavaScript `Array.slice` function in the type system. `Slice<Arr, Start, End>` takes the tree argument. The output should be a subarray of `Arr` from index `Start` to `End`. Indexes with negative numbers should be counted from reversely.
  
  For example
  
  ```ts
  type Arr = [1, 2, 3, 4, 5]
  type Result = Slice<Arr, 2, 4> // expected to be [3, 4]
  ```
  
  > View on GitHub: https://tsch.js.org/216
*/


/* _____________ Your Code Here _____________ */

type IsNever<T> = [T] extends [never] ? true : false
type SubN<N1 extends readonly any[], N2 extends readonly any[]> =
    N1 extends [infer _, ...infer Rest1]
        ? (N2 extends [infer _, ...infer Rest2]
            ? SubN<Rest1, Rest2>
            : N1)
        : (N2 extends [] ? N1 : never)
type IsNegative<N extends number> = `${N}` extends `-${string}` ? true : false
type AbsoluteN<N extends number, Arr extends readonly any[] = []> =
    `${N}` extends `-${Arr['length']}` ? Arr : AbsoluteN<N, [...Arr, 0]>
type NumToArr<N extends number, Arr extends readonly any[] = []> =
    Arr['length'] extends N ? Arr
        : NumToArr<N, [...Arr, 0]>
type PickN<Arr extends readonly any[], NArr extends readonly any[], Ret extends readonly any[] = []> =
    NArr extends [infer _, ...infer Rest]
        ? (Arr extends [infer ArrFst, ...infer ArrRest]
            ? PickN<ArrRest, Rest, [...Ret, ArrFst]>
            : Ret)
        : Ret
type SkipN<Arr extends readonly any[], NArr extends readonly any[]> =
    NArr extends [infer _, ...infer Rest]
        ? (Arr extends [infer _, ...infer ArrRest]
            ? SkipN<ArrRest, Rest>
            : [])
        : Arr
type Slice2<Arr extends readonly any[], Start extends readonly any[], End extends readonly any[]> =
    IsNever<SubN<End, Start>> extends true
        ? []
        : PickN<SkipN<Arr, Start>, SubN<End, Start>>
type NormalizeSliceIndex<Arr extends readonly any[], N extends number> =
    IsNegative<N> extends true ? SubN<NumToArr<Arr['length']>, AbsoluteN<N>> : NumToArr<N>
type Slice<Arr extends readonly any[], Start extends number = 0, End extends number = Arr['length']> =
    Slice2<Arr, NormalizeSliceIndex<Arr, Start>, NormalizeSliceIndex<Arr, End>>


/* _____________ Test Cases _____________ */
import { Equal, Expect } from '@type-challenges/utils'

type Arr = [1, 2, 3, 4, 5]

type cases = [
  // basic
  Expect<Equal<Slice<Arr, 0, 1>, [1]>>,
  Expect<Equal<Slice<Arr, 0, 0>, []>>,
  Expect<Equal<Slice<Arr, 2, 4>, [3, 4]>>,

  // optional args
  Expect<Equal<Slice<[]>, []>>,
  Expect<Equal<Slice<Arr>, Arr>>,
  Expect<Equal<Slice<Arr, 0>, Arr>>,
  Expect<Equal<Slice<Arr, 2>, [3, 4, 5]>>,

  // negative index
  Expect<Equal<Slice<Arr, 0, -1>, [1,2,3,4]>>,
  Expect<Equal<Slice<Arr, -3, -1>, [3,4]>>,

  // invalid
  Expect<Equal<Slice<Arr, 10>, []>>,
  Expect<Equal<Slice<Arr, 1, 0>, []>>,
  Expect<Equal<Slice<Arr, 10, 20>, []>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/216/answer
  > View solutions: https://tsch.js.org/216/solutions
  > More Challenges: https://tsch.js.org
*/

