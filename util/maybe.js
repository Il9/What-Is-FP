// 예외 처리용 박스
// 값이 있는 상태인 Just, 없는 상태인 Nothing이 있다.
// Nothing 일 때, 즉 값이 없을 때 에러 없이 pipe를 끝낼 수 있다.
export class Maybe {
  constructor(value) {
    this.$value = value;
  }

  static of(value) {
    return new Maybe(value);
  }

  // 현재 값이 null or undefined 라면 Nothing 상태
  get isNothing() {
    return this.$value === null || this.$value === undefined;
  }

  // 상태가 Nothing 이면 자신을 반환
  // 상태가 Just 라면 받은 함수에 현재 값으로 실행해 새로운 Maybe를 반환
  map(fn) {
    return this.isNothing ? this : Maybe.of(fn(this.$value));
  }

  // 출력용
  toString() {
    return this.isNothing ? 'Nothing' : `Just(${this.$value})`;
  }
}
