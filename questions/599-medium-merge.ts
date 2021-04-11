/*
  599 - Merge
  -------
  by ZYSzys (@ZYSzys) #medium #object
  
  ### Question
  
  Merge two types into a new type. Keys of the second type overrides keys of the first type.
  
  > View on GitHub: https://tsch.js.org/599
*/


/* _____________ Your Code Here _____________ */

type Simplify<T> = { [K in keyof T]: T[K] }
type Merge<F, S> = Simplify<Omit<F, keyof S> & S>;


/* _____________ Test Cases _____________ */
import { Equal, Expect, ExpectFalse, NotEqual } from '@type-challenges/utils'

type Foo = {
  a: number;
  b: string;
};
type Bar = {
  b: number;
};

type cases = [
  Expect<Equal<Merge<Foo, Bar>, {
	a: number;
	b: number;
  }>>
]



/* _____________ Further Steps _____________ */
/*
  > Share your solutions: https://tsch.js.org/599/answer
  > View solutions: https://tsch.js.org/599/solutions
  > More Challenges: https://tsch.js.org
*/

