//퀴즈 페이지로 넘어간다
function vocaQuiz(){
    window.location.href = "quiz.html";
}

// script.js

// 단어장 데이터를 저장할 배열
var vocaList = [];

// 단어 추가 함수
function appendVoca() {
  // 사용자 입력 가져오기
  var wordInput = document.getElementById("wordInput").value;
  var meaningInput = document.getElementById("meaningInput").value;
  
  // 입력값 유효성 검사
  if (wordInput.trim() === "" || meaningInput.trim() === "") {
    alert("단어와 뜻을 모두 입력해주세요.");
    return;
  }
  
  // 단어 객체 생성
  var voca = {
    word: wordInput,
    meaning: meaningInput
  };
  
  // 단어 리스트에 추가
  vocaList.push(voca);
  
  // 단어 리스트 업데이트
  updateDataList();
  
  // 입력 필드 초기화
  document.getElementById("wordInput").value = "";
  document.getElementById("meaningInput").value = "";
}

// 단어 리스트 업데이트 함수
function updateDataList() {
  var dataList = document.getElementById("dataList");
  dataList.innerHTML = ""; // 리스트 초기화
  
  // 단어 리스트 순회하며 아이템 생성
  for (var i = 0; i < vocaList.length; i++) {
    var vocaItem = document.createElement("li");
    vocaItem.innerText = vocaList[i].word + " - " + vocaList[i].meaning;
    dataList.appendChild(vocaItem);
  }
}