// 제곱 계산을 합니다.
const pow = (num1, num2) => {
  return Math.pow(num1, num2);
};

// 숫자를 음수로 만듭니다.
const negate = num => {
  return num * -1;
};

// 숫자에 더하기 1을 합니다.
const inc = num => {
  return num + 1;
};

// 의미 없는 값
const anyVal = inc(negate(pow(2, 4))); // -15

// 함수 합성
// 1. 실행할 함수 목록을 넘겨주면 새로운 함수를 반환합니다.
// 2. 새로 반환 받은 함수에 초깃값을 파라미터로 넘겨줍니다.
// 3. 초깃값을 가지고 실행할 함수 목록을 역순으로 순차적으로 실행해서 최종 결과를 반환합니다.
const compose = (...fns) => {
  // ..., fn3, fn2, fn1
  return (...args) => {
    return fns.reduceRight(
      (res, fn) => [fn.call(null, ...res)], // 입력 받은 fns 를 오른쪽부터 실행
      args // 초기값으로 받은 파라미터
    )[0];
  };
};

// compose로 anyVal을 다시 구현 해보자
// pow => negate => inc 순으로 실행
compose(
  num => inc(num),
  num => negate(num),
  (num1, num2) => pow(num1, num2)
)(2, 4);

// Pointfree Style로 변경
compose(inc, negate, pow)(2, 4);

// 합성을 읽기 좋게 왼쪽부터 보고싶다.
// Pipe
const pipe = (...fns) => {
  // ..., fn3, fn2, fn1
  return (...args) => {
    // 예제에선 reverse 후 reduceRight 하던데 그냥 보여주기 용으로 한거 같음
    // 나는 그냥 reduce로 구현함
    return fns.reduce(
      (res, fn) => [fn.call(null, ...res)], // 입력 받은 fns 를 오른쪽부터 실행
      args // 초기값으로 받은 파라미터
    )[0];
  };
};

// 편 - 안
pipe(pow, negate, inc)(2, 4);

export default pipe;
