var url = "https://ongeki-net.com/ongeki-mobile/character/";
alert("DOM を取得します。");
var request = new XMLHttpRequest();
request.open("GET", url, true);
request.responseType = "document";
request.send("");
request.onload = function() {
  if(request.responseURL != url){
    alert("エラーが発生しました。エラーページを表示します。");
    location.href = request.responseURL;
  }else{
    exec(request.response);
  }
};

function exec(d){
  /* friendly counter table */
  counter = [];
  for(i=0; i<6; i++){
    counter[i] = 60 + 12 * i;
  }
  counter[6] = 228;
  counter[7] = 312;
  counter[8] = 0;
  
  /* forms to access for character page */
  var forms = Array.from(d.forms);
  
  /* data creation. format: json */
  var data = {
    "1000": {name: "星咲 あかり"},
    "1001": {name: "藤沢 柚子"},
    "1002": {name: "三角 葵"},
    "1003": {name: "高瀬 梨緒"},
    "1004": {name: "結城 莉玖"},
    "1005": {name: "藍原 椿"},
    "1007": {name: "桜井 春菜"},
    "1006": {name: "早乙女 彩華"},
    "1010": {name: "井之原 小星"},
    "1009": {name: "柏木 咲姫"},
    "1008": {name: "九條 楓"},
    "1011": {name: "逢坂 茜"},
    "1012": {name: "珠洲島 有栖"},
    "1014": {name: "日向 千夏"},
    "1013": {name: "柏木 美亜"},
    "1015": {name: "東雲 つむぎ"},
  };
  
  var containers = forms.forEach(form => {
    /* get necessaly data from form element */
    var container = form.getElementsByClassName("character_friendly_container")[0];
    var idx;
    Array.from(form.getElementsByTagName("input")).forEach(input=>{
      if(input.name == "idx") idx = input.value;
    });
    
    /* reference easily */
    var t = data["" + idx];
    
    /* 端数取得 */
    t.fraction = 1 - (parseFloat(container.firstElementChild.getAttribute("style").split("rect(")[1].split("px")[0]) - 12) / 60;
    
    /* 親密度取得 */
    var ch = container.children;
    t.friendly = 0;
    if(ch[4]) t.friendly += parseInt(ch[4].getAttribute("src").split("num_")[1].split(".png")[0])*100;
    t.friendly += parseInt(ch[2].getAttribute("src").split("num_")[1].split(".png")[0]);
    t.friendly += parseInt(ch[1].getAttribute("src").split("num_")[1].split(".png")[0]);
    
    /* 端数からカウント取得 */
    var f10 = parseInt(t.friendly / 10) % 10 + 1;
    var c = counter[parseInt(t.friendly/100)];
    t.nowCount = Math.round(t.fraction * c * f10) / 10;
    t.fullCount = c * f10 / 10;
    t.nextCount = Math.round((t.fullCount - t.nowCount) * 10) / 10;
  });
  
  /* 別窓オープン、情報整列 */
  var w = window.open();
  var table = w.document.body.appendChild(w.document.createElement("table"));
  table.style.textAlign = "center";
  table.style.border = 1;
  var addTextRow = function(row, str){
    row.insertCell().appendChild(d.createElement("span")).innerText = str;
  }
    
  Object.keys(data).forEach(idx=>{
    /* ヘッダーがなければ生成 */
    if(table.header === undefined){
      table.header = table.createTHead().insertRow();
      addTextRow(table.header, "キャラ名");
      addTextRow(table.header, "親密度");
      addTextRow(table.header, "端数（％）");
      addTextRow(table.header, "端数カウント");
    }
    
    /* 情報を載せていく */
    var t = data[idx];
    if(table.body === undefined){
      table.body = table.createTBody();
    }
    var row = table.body.insertRow();
    addTextRow(row, t.name);
    addTextRow(row, t.friendly);
    addTextRow(row, t.fraction);
    addTextRow(row, t.nowCount + " / " + t.fullCount + " (残り " + t.nextCount + " カウント)");
  });
};