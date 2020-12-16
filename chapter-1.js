// 자바스크립트는 어떻게 함수형을 구현하는가

// 일급 합수

// 1. 함수를 변수에 할당 가능
const firstClass1 = () => true;
firstClass1(); // true

// 2. 함수를 인자로 받을 수 있음
// 많이 쓰는 콜백의 형식
const firstClass2 = func => func();
firstClass2(firstClass1); // true

// 3. 함수를 리턴함
// pipe 에서 함수의 결과로 이어주는 처리와 같다는걸 알 수 있음
const firstClass3 = func => () => func();
firstClass3(firstClass2(firstClass1))(); // true

// ============================================================

// 순수 함수
// 같은 파라미터면 같은 결과를 뱉음
// pureAdd1(1); 는 몇번을 실해해도 2가 나옴
const pureAdd1 = num => num + 1;

// 1. 참조 투명
// 위처럼 1이 들어있다면 순수하지만 함수 밖에 있는 값을 참조하여 쓴다면 순수하지 않다.
let one = 1;
const impureAdd1 = num => num + one;

// 같은 파라미터 인데 값이 다르다!
// 순수 하지 않다
impureAdd1(1); // 2
one = 2;
impureAdd1(1); // 3

// 2. 불변
// 입력받은 파라미터나 외부 변수를 변경하면 안됨
let myHome = ['mom', 'dad', 'me'];

// 입력 받은 파라미터를 변경 시키면 불변성이 지켜지지 않는다.
const night = anyHome => {
  anyHome.push('baby');
};

// 밤이 지나니까 갑자기 아기가 생겼다?
console.log(myHome); // ['mom', 'dad', 'me']
night(myHome);
console.log(myHome); // ['mom', 'dad', 'me', 'baby]

// 외부의 어떤 변수를 변경 시키면 불변성이 지켜지지 않는다.
const night2 = () => {
  myHome = myHome.filter(
    person => person !== 'me'
  );
};

// 이번엔 그저 두번째 밤이 지나갔을 뿐인데 내가 가출했다.
console.log(myHome); // ['mom', 'dad', 'me', 'baby]
night2();
console.log(myHome); // ['mom', 'dad', 'baby]

// 그럼 어떻게 하냐?
// 새로운걸 만들어서 반환해라
const newNight = anyHome =>
  anyHome.concat('baby');
const newNight2 = anyHome =>
  anyHome.filter(person => person !== 'me');

// 이제는 아무리 밤이 지나가도 내 가정은 안전하다
newNight(myHome); // ['mom', 'dad', 'me', 'baby]
newNight2(myHome); // ['mom', 'dad']

// ============================================================

// 근데 이거 왜쓰냐? 귀찮은데

// 1. 캐싱에 좋다
// 같은 파라미터라면 같은 값이 나온다는걸 알고있으니 처리해놓은 결과중에 뽑아서 반환이 가능하다.

// 2. 테스트가 아주 쉽다
// 이거 또한 같은 입력에는 같은 출력이기 때문에 테스트 작성이 쉬워진다.

// 3. 병렬 처리에 좋다
// 이건 뭔가 느껴지는게 없어서 나중에 하다보면 깨닫는 순간이 올거같다.
