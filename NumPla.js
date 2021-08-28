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

// let  queue = [
//     [0, 0, 0, 0, 0, 3, 2, 1, 4],
//     [0, 0, 4, 5, 0, 2, 0, 0, 0],
//     [0, 0, 0, 8, 0, 0, 3, 5, 0],
//     [0, 5, 0, 0, 0, 4, 7, 6, 0],
//     [6, 4, 2, 0, 0, 0, 8, 3, 5],
//     [0, 7, 9, 6, 0, 0, 0, 4, 0],
//     [0, 8, 1, 0, 0, 5, 0, 0, 0],
//     [0, 0, 0, 1, 0, 7, 4, 0, 0],
//     [4, 2, 7, 3, 0, 0, 0, 0, 0],
//   ]; 

//297
  // let  queue = [
  //   [9, 4, 0, 5, 0, 7, 0, 1, 2],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [0, 0, 0, 1, 0, 4, 0, 0, 0],
  //   [4, 0, 0, 0, 0, 0, 0, 0, 1],
  //   [0, 0, 0, 6, 0, 3, 0, 0, 0],
  //   [0, 2, 0, 0, 0, 0, 0, 3, 0],
  //   [0, 0, 6, 8, 0, 9, 3, 0, 0],
  //   [0, 0, 0, 0, 0, 0, 0, 0, 0],
  //   [8, 1, 0, 4, 0, 2, 0, 6, 7],
  // ];  

  //254
  let  queue = [
    [0, 0, 0, 4, 0, 0, 0, 0, 8],
    [0, 0, 0, 0, 0, 0, 9, 4, 1],
    [0, 0, 1, 0, 0, 8, 7, 0, 3],
    [1, 8, 7, 0, 0, 0, 0, 0, 0],
    [6, 0, 0, 0, 0, 0, 0, 0, 5],
    [0, 0, 0, 0, 0, 0, 8, 1, 7],
    [7, 0, 8, 3, 0, 0, 4, 0, 0],
    [9, 6, 4, 0, 0, 0, 0, 0, 0],
    [3, 0, 0, 0, 0, 7, 0, 0, 0],
  ];  

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
        if (queue[i][j] != 0) {
          td.textContent = queue[i][j];
          td.classList.add("clickdisable");
        } else {
          td.textContent = null;
          td.classList.add("clickenable");
        }
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
    // console.log(e);
    if (place != undefined) {
      place.classList.remove("mainClick");
    }
    place = e.target;
    place.classList.add("mainClick");
  }
  
  // 数字選択のマスが押された時の処理
  function selectClick(e) {
    // console.log(place.textContent);
    if(place.textContent == e.target.value){
      place.textContent = null;
    }else{
      place.textContent = e.target.value;
    }
  }

  function check1(tr){
    let checkFlag = true;
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
    //3かける3のチェック
    for(let i=0;i<9;i++){
      for(let j=0;j<9;j++){
        for(let t=i-(i%3);t<i+3-(i%3);t++){
          for(let k=j-(j%3);k<j+3-(j%3);k++){
            if(t==i&&k==j){
              continue;
            }
            
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






  async function answer(flag){
    const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    let tr = document.querySelectorAll(".main tr");
    const h2 = document.querySelector("h2");
    let underNum =document.querySelectorAll(".select td");
    if(check1(tr)==false){
      h2.textContent = "おかしい";
      return;
    }else{
      h2.textContent = "考え中";
    }

    for(let i=0;i<9;i++){
      underNum[i].classList.add("clickdisable");
      for(let j=0;j<9;j++){
        let td = tr[i].querySelectorAll("td");
        td[j].classList.add("clickdisable");
        if(Number(td[j].textContent)!=0){
          td[j].classList=[];
          td[j].classList.add("clickdisable");
        }
      }
    }

    await _sleep(100);
    if(flag=="m"){
      // まず、総当たりを考える。
      all(tr);
    }else{
      // 人間ぽく
      let flag = true;
      solve(tr,flag);
    }

    // await _sleep(100);
    // for(let i=0;i<9;i++){
    //   underNum[i].classList.add("clickenable");
    //   for(let j=0;j<9;j++){
    //     let td = tr[i].querySelectorAll("td");
    //     td[j].classList.add("clickenable");
    //     if(Number(td[j].textContent)!=0){
    //       td[j].classList=[];
    //       td[j].classList.add("clickenable");
    //     }
    //   }
    // }



  }


  async function solve(tr,flag){
    let arrayi=[[],[],[],[],[],[],[],[],[],[]];
    let arrayj=[[],[],[],[],[],[],[],[],[],[]];
    const h2 = document.querySelector("h2");
    const h3 = document.querySelector("h3");
    const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    let brank=0;
    let brank2=0;
    brank=countBrank(tr);
    console.log(brank);
    while(brank>0){
      for(let k=1;k<=9;k++){//入れる数字
        h3.textContent=("k="+k);
        let count=0;
        // await _sleep(50);
        [count,arrayi,arrayj]=canSelect(tr,k);
        // await _sleep(100);
        fillLine(tr,arrayi,arrayj,k,count);
      }
      brank=countBrank(tr);
      console.log(brank);
      if(brank==0){
        break;
      }
      if(brank2==brank){
        h2.textContent = "まだできません";
        h3.textContent=null;
        if(flag!=false){
          await _sleep(50);
          choiceOne(tr,flag,brank2);
        }
        break;
      }else{
        brank2=brank;
      }
    }
    h3.textContent=null;
    h2.textContent = "おわり";
  }

  function countBrank(tr){
    let brank=0;
    for(let i=0;i<9;i++){
      let td = tr[i].querySelectorAll("td");
      for(let j=0;j<9;j++){
        if(Number(td[j].textContent)>0){
          continue;
        }else{
          brank+=1;
        }
      }
    }
    return brank;
  }

  let array = [];

  function choiceOne(tr,flag,brank2){
    let brank=0;
    let array = [];
    for(let i=0;i<9;i++){
      array.push([]);
      let td = tr[i].querySelectorAll("td");
      for(let j=0;j<9;j++){
        if(td[j].className=="clickdisable"||td[j].className=="clickenable clickdisable answer"){
          array[i].push([])
          continue;
        }
        td[j].click();
        let num =[];
        for(let k=1;k<=9;k++){
          td[j].textContent=k;
          if(check1(tr)==true){
            num.push(k);
          }
          td[j].textContent=null;
        }
        // console.log(num)
        // console.log(num.length)
        array[i].push(num)
        if(num.length==1){
          td[j].textContent=num[0]
          num[0]=[];
          td[j].classList.add("answer")
        }
      }
      for(let j=0;j<9;j++){
        let point=[j];
        
        for(let k=j+1;k<9;k++){
          // console.log("i,j,k=",i,j,k)
          if(array[i][j].length==array[i][k].length&&array[i][j].length>0){
            // console.log("j",array[i][j].length)
            // console.log("k",array[i][k].length)
            let kflag=true;
            for(let t=0;t<array[i][k].length;t++){
              if(array[i][j][t]!=array[i][k][t]){
                kflag=false;
                break;
              }
              // c+=1;
            // console.log("nnnnnn",i,j,k);
            }
            if(kflag==true){
              // console.log("kkkkkkkkki,j,k=",i,j,k)
              point.push(k)
            }
          }
        }
        if(point.length==array[i][j].length&&point.length>1){
          console.log("i,j,k=",i,j)
          console.log(point)
          for(let j=0;j<9;j++){
            if(array[i][j].length==0){
              continue;
            }
            for(let k=0;k<point.length;k++){
              if(point.indexOf(j)!=-1){
                break;
              }
              console.log("jjj",array[i][point[k]][k])
              console.log("hhh",i,j,array[i][j],array[i][j].indexOf(array[i][point[k]][k]))
              if(array[i][j].indexOf(array[i][point[k]][k])!=-1){
                var numB=array[i][j].splice(array[i][j].indexOf(array[i][point[k]][k]),1)
              }
            }
          }
        }
      }
    }
    console.log(array);
    brank=countBrank(tr);
    if(brank2==brank){
      flag=false;
    }
    solve(tr,flag)
  }

  function canSelect(tr,k){
    let arrayi=[[],[],[],[],[],[],[],[],[],[]];
    let arrayj=[[],[],[],[],[],[],[],[],[],[]];
    let count =0;
    for(let i=0;i<9;i++){
      let td = tr[i].querySelectorAll("td");
      for(let j=0;j<9;j++){
        if(td[j].className=="clickdisable"||td[j].className=="clickenable clickdisable answer"){
          continue;
        }
        td[j].textContent=k;
        if(check1(tr)==true){
          count+=1;
          td[j].classList.add('canSelect')
          arrayi[k].push(i)
          arrayj[k].push(j)
        }
        td[j].textContent=null;
      }
    }
    return [count,arrayi,arrayj];
  }

  function fillLine(tr,arrayi,arrayj,k,count){
    let checkFlag = true;
    for(let i=0;i<count;i++){
      for(let j=0;j<count;j++){
        if(i==j){
          continue;
        }
        if(arrayi[k][i]==arrayi[k][j]){
          checkFlag=false;
          break;
        }
      }
      if(checkFlag==true){
        for(let j=0;j<count;j++){
          if(i==j){
            continue;
          }
          if(arrayj[k][i]==arrayj[k][j]){
            checkFlag=false;
            break;
          }
        }
      }
      if(checkFlag==true){
        let td = tr[arrayi[k][i]].querySelectorAll("td");
        td[arrayj[k][i]].textContent=k;
        td[arrayj[k][i]].classList.add("answer")
      }
      checkFlag = true;
    } 
    checkFlag = true;
    //3かける3のチェック
    for(let i=0;i<count;i++){
      for(let j=0;j<count;j++){
        for(let t=arrayi[k][i]-(arrayi[k][i]%3);t<arrayi[k][i]+3-(arrayi[k][i]%3);t++){
          for(let s=arrayj[k][i]-(arrayj[k][i]%3);s<arrayj[k][i]+3-(arrayj[k][i]%3);s++){
            if(i==j){
              continue;
            }
            if(t==arrayi[k][j]&&s==arrayj[k][j]){
              checkFlag=false;
              break;
            }
          }
        }
      }
      if(checkFlag==true){          
        let td = tr[arrayi[k][i]].querySelectorAll("td");
        td[arrayj[k][i]].textContent=k;
        td[arrayj[k][i]].classList.add("answer")
      }
      checkFlag = true;
    }

    for(let i=0;i<count;i++){
      let td = tr[arrayi[k][i]].querySelectorAll("td");
      td[arrayj[k][i]].classList.remove('canSelect')
    }
  }



  
  async function all(tr){
    const h2 = document.querySelector("h2");
    const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    let che =true;
    let n=9
    for(let i=0;i<9;i++){
      for(let j=0;j<n;j++){
        let td = tr[i].querySelectorAll("td");
        if(td[j].className=="clickdisable"){
          continue;
        }
        if(Number(td[j].textContent)>0&&che==true){
          continue;
        }
        che=true
        for(let k=1;k<10;k++){//入れる数字
          td[j].classList.add('answer')
          td[j].textContent = k;
          td[j].click();
          await _sleep(50);
          if(check1(tr)==true){
            break;
          }
          if(k==9){
            che=false;
            [tr,i,j,che]=await back(tr,i,j,che);
            if(j>0){
              j=j-1;
            }else{
              i=i-1;
              j=n-1;
            }
          }
        }
      }
    }
    h2.textContent = "おわり";
  }




 async function back(tr,i,j,che){
  const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await _sleep(50);
    let n=8;
    // console.log(i+j+tr[i].querySelectorAll("td")[j].className=="clickdisable")
    if(tr[i].querySelectorAll("td")[j].className!="clickdisable"){
       tr[i].querySelectorAll("td")[j].textContent=null;
      tr[i].querySelectorAll("td")[j].click();
    }
      if(j>0){
        // console.log(i)
        // console.log(Number(tr[i].querySelectorAll("td")[j-1].textContent))
        if(Number(tr[i].querySelectorAll("td")[j-1].textContent)==9){
          if(tr[i].querySelectorAll("td")[j-1].className!="clickdisable"){
            tr[i].querySelectorAll("td")[j-1].click();
            tr[i].querySelectorAll("td")[j-1].textContent=null;
          }
            [tr,i,j,che]=await back(tr,i,j-1,che);  
            return [tr,i,j,true];
        }else{
          if(tr[i].querySelectorAll("td")[j-1].className!="clickdisable"){
            tr[i].querySelectorAll("td")[j-1].click();
            tr[i].querySelectorAll("td")[j-1].textContent=Number(tr[i].querySelectorAll("td")[j-1].textContent)+1;
            if(check1(tr)==true){
              return [tr,i,j,true];
            }else{
              [tr,i,j,che]=await back(tr,i,j,che);
              return [tr,i,j,true];
            }
          }else{
            [tr,i,j,che]=await back(tr,i,j-1,che);
            return [tr,i,j,true];
          }
          
        }
      }else{
        if(Number(tr[i-1].querySelectorAll("td")[n].textContent)==9){
          if(tr[i-1].querySelectorAll("td")[n].className!="clickdisable"){
            tr[i-1].querySelectorAll("td")[n].click();
            tr[i-1].querySelectorAll("td")[n].textContent=null;
          }
          [tr,i,j,che]=await back(tr,i-1,n,che);
          return [tr,i,j,true];
        }else{
          if(tr[i-1].querySelectorAll("td")[n].className!="clickdisable"){
            tr[i-1].querySelectorAll("td")[n].click();
            tr[i-1].querySelectorAll("td")[n].textContent=Number(tr[i-1].querySelectorAll("td")[n].textContent)+1;
            if(check1(tr)==true){
              return [tr,i,j,true];
            }else{
              [tr,i,j,che]=await back(tr,i-1,n,che);
              return [tr,i,j,true];
            }
          }else{
            [tr,i,j,che]=await back(tr,i-1,n-1,che);
            return [tr,i,j,true];
          }
        }
      }
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
  function remove(str) {
    let tr = document.querySelectorAll(".main tr");
    if(str=='p'){
      place.textContent = null;
    }else{
      for(let i=0;i<9;i++){
        let td = tr[i].querySelectorAll("td");
        td[j].textContent=null;
      }
    }
  }
