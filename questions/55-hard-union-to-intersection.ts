/*
  55 - Union to Intersection
  -------
  by Zheeeng (@zheeeng) #hard #utils #infer
  
  ### Question
  
  Implement the advanced util type `UnionToIntersection<U>`
  
  For example
  
  ```ts
  type I = Union2Intersection<'foo' | 42 | true> // expected to be 'foo' & 42 & true
  ```
  
  > View on GitHub: https://tsch.js.org/55
*/


/* _____________ Your Code Here _____________ */

// https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-8.html#type-inference-in-conditional-types
type UnionToIntersection<U> =
    (U extends U
        ? (k: U) => void
        : never) extends (k: infer I) => void
            ? I
            : never


/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from '@type-challenges/utils'

type cases = [
    Expect<Equal<UnionToIntersection<'foo' | 42 | true>, 'foo' & 42 & true>>,
    Expect<Equal<UnionToIntersection<(() => 'foo') | ((i: 42) => true)>, (() => 'foo') & ((i: 42) => true)>>,
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/55/answer
  > View solutions: https://tsch.js.org/55/solutions
  > More Challenges: https://tsch.js.org
*/

