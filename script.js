//퀴즈 페이지로 넘어간다
function vocaQuiz(){
    window.location.href = "gptquiz.html";
}

// 데이터 입력
function setVoca(){
  const key = document.getElementById('wordInput').value;
  const data = document.getElementById('meaningInput').value;
  localStorage.setItem(key, data);
  //alert("입력 성공 "); // 출력: apple
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

//엑셀 파일 업로드
function handleFile(file) {
  const reader = new FileReader();

  reader.onload = function(e) {
    const data = new Uint8Array(e.target.result);
    const workbook = XLSX.read(data, { type: 'array' });

    // Get the first sheet name
    const sheetName = workbook.SheetNames[0];

    // Get the worksheet
    const worksheet = workbook.Sheets[sheetName];

    // Convert worksheet to JSON object
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Extract keys and values from JSON data
    const keys = jsonData.map(row => row[0]);
    const values = jsonData.map(row => row[1]);

    // Store keys and values in local storage
    for (let i = 0; i < keys.length; i++) {
      localStorage.setItem(keys[i], values[i]);
    }

    // Print stored data to console
    console.log(localStorage);
  };

  reader.readAsArrayBuffer(file);
}

function handleFileInputChange(event) {
  const file = event.target.files[0];
  handleFile(file);
}

