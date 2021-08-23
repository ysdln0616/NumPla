// 問題
const question = [
    [8, 7, 1, 0, 0, 0, 5, 6, 4],
    [0, 9, 5, 0, 1, 7, 2, 3, 8],
    [2, 0, 3, 4, 5, 8, 0, 7, 1],
    [0, 2, 0, 1, 0, 3, 7, 9, 5],
    [0, 1, 9, 2, 7, 0, 8, 4, 3],
    [7, 0, 4, 0, 8, 5, 0, 0, 2],
    [1, 5, 0, 0, 0, 4, 3, 8, 0],
    [0, 8, 7, 5, 0, 0, 0, 0, 6],
    [0, 0, 0, 0, 3, 2, 1, 0, 7],
  ];

let  queue = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];
// let array = [1,2,3,4,5,6,7,8,9];

  
  // クリックされた要素を保持
  let place;
  
  init();
  // ゲーム画面生成
  function init() {
    const main = document.querySelector(".main");
    const select = document.querySelector(".select");
    
    for (let i = 0; i < 9; i++) {
      let tr = document.createElement("tr");
      for (let j = 0; j < 9; j++) {
        let td = document.createElement("td");
        td.onclick = mainClick;
        tr.appendChild(td);
        // if (question[i][j] != 0) {
        //   td.textContent = question[i][j];
        //   td.classList.add("clickdisable");
        // } else {
          td.textContent = null;
          td.classList.add("clickenable");
        // }
      }
      main.appendChild(tr);
    }
  
    for (let i = 0; i < 9; i++) {
      let td = document.createElement("td");
      td.onclick = selectClick;
      td.value = i + 1;
      select.appendChild(td);
      td.textContent = i + 1;
    }
  }
  
  // 問題パネルのマスが押された時の処理
  function mainClick(e) {
    if (place != undefined) {
      place.classList.remove("mainClick");
    }
    place = e.target;
    place.classList.add("mainClick");
  }
  
  // 数字選択のマスが押された時の処理
  function selectClick(e) {
    place.textContent = e.target.value;
  }
  
  function check1(){
    let checkFlag = true;
    let tr = document.querySelectorAll(".main tr");
    for(let i=0;i<9;i++){
      for(let j=0;j<9;j++){
        for(let k=j+1;k<9;k++){
          // 横
          if(Number(tr[i].querySelectorAll("td")[j].textContent)>0&&tr[i].querySelectorAll("td")[j].textContent==tr[i].querySelectorAll("td")[k].textContent){
            checkFlag=false;
          }
          // 縦
          if(Number(tr[j].querySelectorAll("td")[i].textContent)>0&&tr[j].querySelectorAll("td")[i].textContent==tr[k].querySelectorAll("td")[i].textContent){
            checkFlag=false;
            break;
          }
        }
      }
    }

    for(let i=0;i<9;i++){
      for(let j=0;j<9;j++){
        for(let t=i-(i%3);t<i+3-(i%3);t++){
          for(let k=j-(j%3);k<j+3-(j%3);k++){
            if(t==i&&k==j){
              continue;
            }
            //3かける3のチェック
            if(Number(tr[i].querySelectorAll("td")[j].textContent)>0&&tr[i].querySelectorAll("td")[j].textContent==tr[t].querySelectorAll("td")[k].textContent){
              checkFlag=false;
              break;
            }
          }
        }
      }
    }
    return checkFlag;
  }

  function answer(){
    const h2 = document.querySelector("h2");
    if(check1()==false){
      h2.textContent = "おかしい";
      return;
    }else{
      h2.textContent = "あってる";
    }
    const tr = document.querySelectorAll(".main tr");
    console.log(tr[0].querySelectorAll("td")[0].textContent);
    // 横
    let s="";
    let a=0;
    for(let k=0;k<9;k++){
        s+=tr[k].textContent;
        a+=Number(tr[k].textContent);
        for(let j=0;j<9;j++){

        }
    }
    console.log(Number(s));
    console.log(a);
  }
  // 正解判定
  function check() {
    const h2 = document.querySelector("h2");
    const tr = document.querySelectorAll(".main tr");
    let checkFlag = true;
    // 横計算
    for (let i = 0; i < 9; i++) {
      let sum = 0;
      let td = tr[i].querySelectorAll("td");
      for (let j = 0; j < 9; j++) {
        sum += Number(td[j].textContent);
      }
      if (sum != 45) {
        checkFlag = false;
        break;
      }
    }
    // 縦計算
    for (let i = 0; i < 9; i++) {
      let sum = 0;
      for (let j = 0; j < 9; j++) {
        let td = tr[j].querySelectorAll("td");
        sum += Number(td[i].textContent);
      }
      if (sum != 45) {
        checkFlag = false;
        break;
      }
    }
    if (checkFlag) {
      h2.textContent = "正解です!!";
    } else {
      h2.textContent = "間違いがあります";
    }
  }
  
  //消す処理
  function remove() {
    place.textContent = null;
    console.log(place);
  }
  