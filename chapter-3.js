import { pipe, curry } from './util/index.js';

// 아래 조건을 만족하는 객체로 만들고 싶다.
// 1. age 삭제
// 2. work 라는 키를 job으로 변경
const person = {
  name: 'nakta',
  age: 10,
  work: 'developer'
};

// 키 삭제 함수
const dissocWithoutCurry = (dissocKey, obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (key === dissocKey) return acc;
    acc[key] = obj[key];
    return acc;
  }, {});
};

// 키 변경 함수
const renameWithoutCurry = (keysMap, obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    acc[keysMap[key] || key] = obj[key];
    return acc;
  }, {});
};

// 구현은 했으나 person이 넘어와도 파라미터로 받아서 써야한다.
pipe(
  person => dissocWithoutCurry('age', person),
  person =>
    renameWithoutCurry({ work: 'job' }, person)
)(person);

// 파라미터를 전부 채워야 함수가 실행되도록 변경
// 키 삭제 함수 (수동 커링)
const dissocWithCurry = dissocKey => obj => {
  return Object.keys(obj).reduce((acc, key) => {
    if (key === dissocKey) return acc;
    acc[key] = obj[key];
    return acc;
  }, {});
};

// 키 변경 함수 (수동 커링)
const renameWithCurry = keysMap => obj => {
  return Object.keys(obj).reduce((acc, key) => {
    acc[keysMap[key] || key] = obj[key];
    return acc;
  }, {});
};

// 깔끔해졌다.
pipe(
  dissocWithCurry('age'),
  renameWithCurry({ work: 'job' })
)(person);

// 키 삭제 함수 (자동 커링)
const dissoc = curry((dissocKey, obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    if (key === dissocKey) return acc;
    acc[key] = obj[key];
    return acc;
  }, {});
});

// 키 변경 함수 (자동 커링)
const rename = curry((keysMap, obj) => {
  return Object.keys(obj).reduce((acc, key) => {
    acc[keysMap[key] || key] = obj[key];
    return acc;
  }, {});
});

// pipe(dissocWithCurry('age'), renameWithCurry({ work: 'job' }))(person);
// 같은 결과
pipe(
  dissoc('age'),
  rename({ work: 'job' })
)(person);
