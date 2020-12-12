// 함수 합성
// 1. 실행할 함수 목록을 넘겨주면 새로운 함수를 반환합니다.
// 2. 새로 반환 받은 함수에 초깃값을 파라미터로 넘겨줍니다.
// 3. 초깃값을 가지고 실행할 함수 목록을 순차적으로 실행해서 최종 결과를 반환합니다.

// 합성을 오른쪽 부터
// Compose
export const compose = (...fns) => {
  // ..., fn3, fn2, fn1
  return (...args) => {
    return fns.reduceRight(
      (res, fn) => [fn.call(null, ...res)], // 입력 받은 fns 를 오른쪽부터 실행
      args // 초기값으로 받은 파라미터
    )[0];
  };
};

// 합성을 왼쪽 부터
// Pipe
export const pipe = (...fns) => {
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
