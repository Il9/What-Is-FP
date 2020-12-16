import { curry } from './index.js';

// 전달받은 Functor의 map 메소드를 실행
export const map = curry((fn, functor) => {
  return functor.map(fn);
});

// 전달받은 Functor의 값을 추출
export const getOrElse = curry((defaultValue, maybe) => {
  return maybe.isNothing ? defaultValue : maybe.$value;
});
