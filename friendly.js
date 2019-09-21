javascript:
(function(){
  var url = "https://ongeki-net.com/ongeki-mobile/character/";
  if(location.href != url){
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "document";
    request.send("");
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        d = request.response;
        exec(d);
      }
    }
  }
  else{
    exec(document);
  }
  
  function exec(d){
    /* friendly counter table */
    counter = [];
    for(i=0; i<6; i++){
      counter[i] = 60 + 12 * i;
    }
    counter[6] = 228;
    counter[7] = 312;
    counter[8] = 0;
    
    /* character name table */
    var name = [];
    [].forEach.call(d.forms, function(form){
      switch(parseInt(form.idx.value)){
        case 1000: name.push("星咲 あかり"); break;
        case 1001: name.push("藤沢 柚子"); break;
        case 1002: name.push("三角 葵"); break;
        case 1003: name.push("高瀬 梨緒"); break;
        case 1004: name.push("結城 莉玖"); break;
        case 1005: name.push("藍原 椿"); break;
        case 1007: name.push("桜井 春菜"); break;
        case 1006: name.push("早乙女 彩華"); break;
        case 1010: name.push("井之原 小星"); break;
        case 1009: name.push("柏木 咲姫"); break;
        case 1008: name.push("九條 楓"); break;
        case 1011: name.push("逢坂 茜"); break;
        case 1012: name.push("珠洲島 有栖"); break;
        case 1014: name.push("日向 千夏"); break;
        case 1013: name.push("柏木 美亜"); break;
        case 1015: name.push("東雲 つむぎ"); break;
      };
    });
    
    var containers = d.getElementsByClassName("character_friendly_conainer");
    var friendlies = [].map.call(containers, function(item){
      return item.firstElementChild;
    });
    var parcentages = friendlies.map(function(item){
      return 1 - (parseFloat(item.getAttribute("style").split("rect(")[1].split("px")[0]) - 12) / 60;
    });
    var friendlyCount = [].map.call(containers, function(item){
      var ch = item.children;
      var t = 0;
      if(ch[4]) t += parseInt(ch[4].getAttribute("src").split("num_")[1].split(".png")[0])*100;
      t += parseInt(ch[2].getAttribute("src").split("num_")[1].split(".png")[0]);
      t += parseInt(ch[1].getAttribute("src").split("num_")[1].split(".png")[0]);
      return t;
    });
    var data = [];
    console.log(parcentages);
    for(i=0; i<name.length; i++){
      var f = friendlyCount[i];
      var f100 = parseInt(f/100);
      var f10 = parseInt((f - f100 * 100) / 10) + 1;
      var c = counter[f100] * f10;
      var t = Math.round(parcentages[i] * counter[f100] * f10);
      data[name[i]] =  [f, c, t, f100, f10, f, counter[f100]];
    }
    console.log(data);
    var w = window.open();
    var p = w.document.body.appendChild(w.document.createElement("p"));
    p.innerText = name.map(function(item){
      var f = data[item][0];
      var c = data[item][1];
      var t = data[item][2];
      var s = "[" + item + "] " + f + " + " + t/10 + "/" + c/10 + " (あと " + (c-t)/10 + " steps）";
      console.log(s);
      return s;
    }).join("\n");
  };
}) (document)
