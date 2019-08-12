addEventListener("DOMContentLoaded", exec);

function exec(){
  var fr_from = document.getElementById("fr_from");
  var fr_to = document.getElementById("fr_to");
 
  console.log(document.getElementById("fr_from"));
  
  for(var i=0; i<=800; i++){
    var from = fr_from.appendChild(document.createElement("option"));
    var to = fr_to.appendChild(document.createElement("option"));
    if(i==0){
      from.innerText = i;
      from.setAttribute("value", i);
      from.setAttribute("selected", "");
      fr_to.removeChild(to);
    }
    else if(i==800){
      to.innerText = i;
      to.setAttribute("value", i);
      to.setAttribute("selected", "");
      fr_from.removeChild(from);
    }
    else{
      from.innerText = i;
      from.setAttribute("value", i);
      to.innerText = i;
      to.setAttribute("value", i);
    }
  }
  
  document.getElementById("fr_from").addEventListener("change", (box) => {
    setTableData(parseInt(fr_from.value), parseInt(fr_to.value));
  });
  document.getElementById("fr_to").addEventListener("change", (box) => {
    setTableData(parseInt(fr_from.value), parseInt(fr_to.value));
  });
  
  setTableData(parseInt(fr_from.value), parseInt(fr_to.value));
}

function setTableData(from, to){
  if(from >= to){
    alert("値が逆転しています！");
    var fr_table = document.getElementById("fr_table");
    for(var i=0; i<fr_table.rows.length; i++){
      table.rows[i].cells[1].innerText = "0";
    }
    return;
  }
  var fr_table = document.getElementById("fr_table");
  // 先日Chromeでバグったため余剰演算子は使用しない方向で。
  var from100 = parseInt(from / 100);
  var from10 = parseInt(from / 10 - parseInt(from / 100) * 10);
  var from1 = parseInt(from - parseInt(from / 10) * 10);
  var to100 = parseInt(to / 100);
  var to10 = parseInt(to / 10  - parseInt(to / 100) * 10);
  var to1 = parseInt(to - parseInt(to / 10) * 10);
  console.log("from,to: ", from100, from10, from1, to100, to10, to1);
  
  var counter = [];
  for(i=0; i<6; i++){
    counter[i] = 60 + 12 * i;
  }
  counter[6] = 228;
  counter[7] = 312;
  counter[8] = 0;
  var reviver = [];
  reviver[10] = 0;
  for(i=10; i>=0; i--){ // -- xyzzyエディタがバグるので補完()
    reviver[i-1] = reviver[i] + i;
  }
  
  // 必要親密度値
  var fr_want = 0;
  for(i = from100 + 1; i < 8; i++)
    fr_want += counter[i] * 55;
  for(i = to100 + 1; i < 8; i++)
    fr_want -= counter[i] * 55;
  fr_want += counter[from100] * reviver[from10] - counter[to100] * reviver[to10];
  fr_want -= (counter[from100] * (from10 + 1) * from1 - counter[to100] * (to10 + 1) * to1) / 10;
  document.getElementById("fr_want").innerText = fr_want;
  
  // プレゼント(大, 中, 小)
  var prBig = parseInt(fr_want / 200);
  var prMid = parseInt((fr_want - prBig * 200) / 20); 
  var prSml = parseInt((fr_want - prBig * 200 - prMid * 20 + 5) / 6);
  document.getElementById("fr_present").innerText = prBig + ", " + prMid + ", " + prSml;
  
  // 必要マニー
  var money = prBig * 20000 + prMid * 2500 + prSml * 900;
  document.getElementById("fr_money").innerText = money;
  
  // 即終了回数(A設定) [回]
  var endA = parseInt((money + 15 * 370 - 1) / (15 * 370));
  document.getElementById("fr_endA").innerText = endA;
  
  // 即終了回数(B設定) [回]
  var endB = parseInt((money + 15 * 360 - 1) / (15 * 360));
  document.getElementById("fr_endB").innerText = endB;
  
  // リアルマニー(A設定) [円]
  document.getElementById("fr_rmoneyA").innerText = endA * 300;
  
  // リアルマニー(B設定) [円]
  document.getElementById("fr_rmoneyB").innerText = endB * 300;
}