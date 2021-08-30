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

// 297
  let  queue = [
    [9, 4, 0, 5, 0, 7, 0, 1, 2],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 4, 0, 0, 0],
    [4, 0, 0, 0, 0, 0, 0, 0, 1],
    [0, 0, 0, 6, 0, 3, 0, 0, 0],
    [0, 2, 0, 0, 0, 0, 0, 3, 0],
    [0, 0, 6, 8, 0, 9, 3, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0],
    [8, 1, 0, 4, 0, 2, 0, 6, 7],
  ];  

  // //254
  // let  queue = [
  //   [0, 0, 0, 4, 0, 0, 0, 0, 8],
  //   [0, 0, 0, 0, 0, 0, 9, 4, 1],
  //   [0, 0, 1, 0, 0, 8, 7, 0, 3],
  //   [1, 8, 7, 0, 0, 0, 0, 0, 0],
  //   [6, 0, 0, 0, 0, 0, 0, 0, 5],
  //   [0, 0, 0, 0, 0, 0, 8, 1, 7],
  //   [7, 0, 8, 3, 0, 0, 4, 0, 0],
  //   [9, 6, 4, 0, 0, 0, 0, 0, 0],
  //   [3, 0, 0, 0, 0, 7, 0, 0, 0],
  // ];  

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
    if (place != undefined) {
      place.classList.remove("mainClick");
    }
    place = e.target;
    place.classList.add("mainClick");
  }
  
  // 数字選択のマスが押された時の処理
  function selectClick(e) {
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

    // await _sleep(100);
    if(flag=="m"){
      // まず、総当たりを考える。
      all(tr);
    }else{
      // 人間ぽく
      let flag = 0;
      solve(tr,flag,array);
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


  async function solve(tr,flag,array){
    let arrayi=[[],[],[],[],[],[],[],[],[],[]];
    let arrayj=[[],[],[],[],[],[],[],[],[],[]];
    const h2 = document.querySelector("h2");
    const h3 = document.querySelector("h3");
    const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    let brank=0;
    let brank2=0;
    brank=countBrank(tr);
    // console.log(brank);
    while(brank>0){
      for(let k=1;k<=9;k++){//入れる数字
        h3.textContent=("k="+k);
        let count=0;
        // await _sleep(50);
        [count,arrayi,arrayj]=canSelect(tr,k);
        // await _sleep(50);
        fillLine(tr,arrayi,arrayj,k,count);
      }
      brank=countBrank(tr);
      if(brank==0){
        break;
      }
      if(brank2==brank){
        h2.textContent = "ランク1検証中";
        h3.textContent=null;
        if(flag==0){
          [flag,array]=await choiceOne(tr,flag,brank2);
          
        }else{
          break;
        }
        
      }else{
        brank2=brank;
        flag=0;
      }
    }
    if(flag<2){
      h2.textContent="ランク3検証中";
      flag=await rankup3(tr,array);
      brank=countBrank(tr);
      if(brank2==brank){
        h2.textContent = "まだできません";
      }else{
        h2.textContent = "おわり";
      }
    }else if(brank==0){
      h3.textContent=null
      h2.textContent = "おわり";

    }
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

  async function choiceOne(tr,flag,brank2){
    const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
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
        let num =[];
        for(let k=1;k<=9;k++){
          td[j].textContent=k;
          if(check1(tr)==true){
            num.push(k);
          }
          td[j].textContent=null;
        }
        array[i].push(num)
        if(num.length==1){
          td[j].textContent=num[0]
          for(let s=0;s<j;s++){
            if(array[i][s].includes(num[0])){
              let aa = array[i][s].findIndex((element)=>element==num[0])
              array[i][s].splice(aa,1)
            }
          }
          num=[];
          array[i][j]=[];
          td[j].classList.add("answer")
        }
      }
      for(let j=0;j<9;j++){
      //yoko
        let point=[j];
        for(let k=j+1;k<9;k++){
          if(array[i][j].length==array[i][k].length&&array[i][j].length>0){
            let kflag=true;
            for(let t=0;t<array[i][k].length;t++){
              if(array[i][j][t]!=array[i][k][t]){
                kflag=false;
                break;
              }
            }
            if(kflag==true){
              point.push(k)
            }
          }
        }
        if(point.length==array[i][j].length&&point.length>1){
          for(let j=0;j<9;j++){
            if(array[i][j].length==0){
              continue;
            }
            for(let k=0;k<point.length;k++){
              if(point.indexOf(j)!=-1){
                break;
              }
              if(array[i][j].indexOf(array[i][point[k]][k])!=-1){
                // await _sleep(50);
                var numB=array[i][j].splice(array[i][j].indexOf(array[i][point[k]][k]),1)
              }
            }
            if(array[i][j].length==1){
              // await _sleep(50);
              td[j].textContent=array[i][j]
              td[j].classList.add("answer")
              array[i][j]=[];
            }
          }
        }
      }
    }

    for(let i=0;i<9;i++){
      for(let j=0;j<9;j++){
        // tate
        let td = tr[j].querySelectorAll("td");
        if(td[i].className=="clickdisable"||td[i].className=="clickenable clickdisable answer"){
          continue;
        }
        let hpoint=[j];
        for(let k=j+1;k<9;k++){
          if(array[j][i].length==array[k][i].length&&array[j][i].length>0){
            let hflag=true;
            for(let t=0;t<array[j][i].length;t++){
              if(array[j][i][t]!=array[k][i][t]){
                hflag=false;
                break;
              }
            }
            if(hflag==true){
              hpoint.push(k);
            }
          }
        }
        if(hpoint.length==array[j][i].length&&hpoint.length>1){
          for(let j=0;j<9;j++){
            if(array[j][i].length==0){
              continue;
            }
            for(let k=0;k<hpoint.length;k++){
              if(hpoint.indexOf(j)!=-1){
                break;
              }
              if(array[j][i].indexOf(array[hpoint[k]][i][k])!=-1){
                // await _sleep(50);
                var numB=array[j][i].splice(array[j][i].indexOf(array[hpoint[k]][i][k]),1)
              }
            }
            if(array[j][i].length==1&&Number(array[j][i][0])>0){
              // await _sleep(50);
              let td = tr[j].querySelectorAll("td");
              td[i].textContent=array[j][i]
              td[i].classList.add("answer")
              array[j][i]=[];
            }
          }
        }
      }
    }


    //3,3
    for(let z=1;z<=9;z++){
      for(let i=0;i<9;i+=3){
        for(let j=0;j<9;j+=3){
          let num = 0;
          let tnumi=[];
          let tnumj=[];
          for(let t=i;t<i+3;t++){
            let td = tr[t].querySelectorAll("td")
            for(let k=j;k<j+3;k++){
              if(td[k].className=="clickdisable"||td[k].className=="clickenable clickdisable answer"){
                continue;
              }
              if(array[t][k].includes(z)){
                num+=1;
                tnumi.push(t);
                tnumj.push(k);
              }
            }
          }
          if(num>0&&num<3){
            let samei=true;
            let samej=true;
            let tnum=tnumi.length;
            for(let r=1;r<tnum;r++){
              if(tnumi[0]!=tnumi[r]){
                samei=false;
              }
              if(tnumj[0]!=tnumj[r]){
                samej=false
              }
            }
            if(samei==true){
              // console.log(z,i,j,num,tnumi,tnumj)
              for(let r=0;r<9;r++){
                if(tnumj.includes(r)){
                  continue;
                }
                if(array[tnumi[0]][r].includes(z)){
                  let tt = array[tnumi[0]][r].findIndex((element)=>element==z)
                  array[tnumi[0]][r].splice(tt,1)
                }
              }
            }

            if(samej==true){
              // console.log(z,i,j,num,tnumi,tnumj)
              for(let r=0;r<9;r++){
                if(tnumi.includes(r)){
                  continue;
                }
                if(array[r][tnumj[0]].includes(z)){
                  let tt = array[r][tnumj[0]].findIndex((element)=>element==z)
                  array[r][tnumj[0]].splice(tt,1)
                }
              }
            }
          }
        }
      }
    }

    // console.log(array);
    brank=await countBrank(tr);
    if(brank2==brank){
      flag=1;
    }
    return [flag,array];
  }

  async function rankup3(tr,array){
    const _sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    let ri=-1;
    let rj=-1;
    let flag =0;
    for(let i=0;i<9;i++){
      let td = tr[i].querySelectorAll("td");
      for(let j=0;j<9;j++){
        if(array[i][j].length==2){
          // console.log(i,j,array[i][j],array[i][j].length)
          ri=i;
          rj=j;

          let array1=[];
          let array2=[];
          for(let I=0;I<9;I++){
            array1.push([])
            array2.push([])
            for(let J=0;J<9;J++){
              array1[I].push([])
              array2[I].push([])
            }
          }
          
          for(let a=0;a<array[i][j].length;a++){
            td[j].textContent=array[i][j][a]
            td[j].classList.add("answer")
            // await _sleep(50);

            let brank=0;
            let brank2=0;
            brank=countBrank(tr);
            // console.log(brank)
            while(brank>0){
              for(let k=1;k<=9;k++){//入れる数字
                let count=0;
                // await _sleep(50);
                [count,arrayi,arrayj]=canSelect(tr,k);
                // await _sleep(50);
                fillLine(tr,arrayi,arrayj,k,count);
              }
              brank=countBrank(tr);
              if(brank==0){
                return 1;
              }
              if(brank2==brank){
                if(flag==0){
                  // await _sleep(50);
                  [flag,array]=await choiceOne(tr,flag,brank2);
                }else{
                  break;
                }
              }else{
                brank2=brank;
                flag=0;
              }
            }

            for(let I=0;I<9;I++){
              let td = tr[I].querySelectorAll("td");
              for(let J=0;J<9;J++){
                if(td[J].className=="clickdisable"){
                  continue;
                }
                if(a==0){
                  if(Number(td[J].textContent)>0){
                    array1[I][J]=Number(td[J].textContent)
                  }else{
                    continue;
                  }
                }else{
                  if(Number(td[J].textContent)>0){
                    if(array1[I][J]>0){
                      // console.log(I,J,"pppp")
                      if(array1[I][J]!=td[J].textContent){
                        array1[I][J]=[]
                      }
                    }
                    array2[I][J]=Number(td[J].textContent)
                  }else{
                    array1[I][J]=[];
                    continue;
                  }
                  
                }
                // console.log(I,J,array[I][J],array[I][J].length)
                if(array[I][J].length>0){
                  td[J].textContent=null;
                  td[J].classList.remove("answer");
                }
              }
            }
          }
          for(let I=0;I<9;I++){
            let td = tr[I].querySelectorAll("td");
            for(let J=0;J<9;J++){
              if(array1[I][J]>0){
                td[J].textContent=array1[I][J]
                td[J].className="clickenable clickdisable answer"
              }
            }
          }
        }
      }
    }
    return 2;

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

  async function fillLine(tr,arrayi,arrayj,k,count){
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
          // await _sleep(50);
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
  // await _sleep(50);
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
