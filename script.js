//퀴즈 페이지로 넘어간다
function vocaQuiz(){
    window.location.href = "quiz.html";
}

// 데이터 입력
function setVoca(){
  const key = document.getElementById('wordInput').value;
  const data = document.getElementById('meaningInput').value;
  localStorage.setItem(key, data);
  alert("입력 성공 "); // 출력: apple
}


//데이터 가져오기
function getVoca(){
  for(let key in localStorage) {
    if (!localStorage.hasOwnProperty(key)) {
      continue; // setItem, getItem 등의 키를 건너뜁니다.
    }
    alert(`${key}: ${localStorage.getItem(key)}`);
  }
}


//데이터 수정

//데이터 삭제
//데이터 모두 삭제
function removeAllVoca(){
  localStorage.clear();
}