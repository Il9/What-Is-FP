import { compose, pipe } from './util/index.js';

// 제곱 계산을 합니다.
const pow = (num1, num2) => Math.pow(num1, num2);

// 숫자를 음수로 만듭니다.
const negate = num => num * -1;

// 숫자에 더하기 1을 합니다.
const inc = num => num + 1;

// 함수를 합성해서 값을 하나 만들어 보자
// 한눈에 파악이 힘들다.
inc(negate(pow(2, 4))); // -15

// compose로 anyVal을 다시 구현 해보자
// 오른쪽에서 왼쪽으로 실행
compose(
  num => inc(num),
  num => negate(num),
  (num1, num2) => pow(num1, num2)
)(2, 4);

// Pointfree Style로 변경
compose(inc, negate, pow)(2, 4);

// pipe로 구현
// 왼쪽에서 오른쪽으로 실행
// 편 - 안
pipe(pow, negate, inc)(2, 4);
