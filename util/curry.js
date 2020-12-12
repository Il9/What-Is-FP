// 커링
// 파라미터를 다 채우지 않으면 채운만큼의 함수르 반환
// 파라미터가 다 채워지면 함수를 실행하여 결과를 반환
export const curry = fn => {
  // 필요 파라마터의 갯수를 구할 수 있음
  const arity = fn.length;

  return function _curry(...args) {
    if (args.length < arity) {
      return _curry.bind(null, ...args);
    }

    return fn.call(null, ...args);
  };
};
