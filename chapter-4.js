import { pipe, curry, map, getOrElse, Maybe } from './util/index.js';

// Functor(함수자)
// 박스에 값을 담는다.
class Box {
  // 그냥 값을 Box에 담음
  constructor(value) {
    this.$value = value;
  }

  // 함수 합성 때 point free 스타일로 쓰기 위해서 존재함
  static of(value) {
    return new Box(value);
  }

  // Functor의 조건
  // 함수를 받아서 지금 값으로 실행한 후 새로운 박스를 반환
  // Array.prototype.map도 같은 원리. Array에 map에 전달한 함수를 값에 적용 후 새로운 Array를 반환
  map(fn) {
    return new Box(fn(this.$value));
  }
}

// 상자에 들어있는 값을 바꾸기
const books = [
  { id: 'book1', title: 'coding with javascript' },
  { id: 'book2', title: 'speaking javaScript' }
];

// 첫 글자 대문자 변경
const startCase = str => str.charAt(0).toUpperCase() + str.slice(1);

// 객체에서 해당 prop 값 반환
const prop = curry((propName, obj) => obj[propName]);

// id로 책 반환
const findBookById = curry((id, books) => books.find(book => book.id === id));

const getUpperBookTitleById = (id, books) => {
  // map으로 인해 Box로 감싸진 채로 진행됨
  return pipe(
    Box.of, // Box(books)
    map(findBookById(id)), // Box(book)
    map(prop('title')), // Box('book title');
    map(startCase) // Box('Book title');
  )(books);
};

getUpperBookTitleById('book1', books); // Box("Coding with javascript")
getUpperBookTitleById('book2', books); // Box("Speaking javaScript")

// 그래서 이게 왜 필요하냐?
// 예외 처리를 해야한다.

// book3이라는 book은 없기떄문에 undefined가 넘어가서 실패남
// 해당 예외만 넘어가기 위해 prop함수를 수정한다고 해도 다음 함수에서 또 에러가 날 것이며, 계속 이렇게 수정할 순 없다.
// getUpperBookTitleById('book3', books); // Cannot read property 'title' of undefined

// 이 경우를 위해 만든 새로운 박스 "Maybe"
// 중간에 값이 없으면 Nothing 상태로 그 뒤 함수들은 전부 무시된다.
// 따라서 에러 없이 pipe를 마치고 값을 판단할 수 있다.
// 이걸 기찻길 같다고 해서 "Railway Oriented Programming" 라고 부른다고 한다.
// 성공 rail과 실패 rail을 타고 중간에 실패하면 실패 rail로 쭉 가는 식
const getUpperBookTitleByIdWithMaybe = (id, books) => {
  return pipe(
    Maybe.of,
    map(findBookById(id)),
    map(prop('title')),
    map(startCase),
    getOrElse(`${id} Not Found`) // Nothing일 때는 다른 값을 출력
  )(books);
};

getUpperBookTitleByIdWithMaybe('book1', books); // "Coding with javascript"
getUpperBookTitleByIdWithMaybe('book2', books); // "Speaking javaScript"
getUpperBookTitleByIdWithMaybe('book3', books); // "book3 Not Found"

// ============================================================
// 점점 복잡해지기 시작하는 Functor 까지 들어왔다.
// 접해보니 Javascript 패턴인 RORO(Recieve Object Return Object) 와 비슷한 듯
// RORO도 파이핑을 위해 하나의 객체로 연결 시키는데 Functor도 한개의 박스로 감싸서 진행시키는게 비슷해 보였다.
// 아직 까지는 쉬워서 재밌음
