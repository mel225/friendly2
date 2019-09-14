javascript:
(function(){
  alert("start");
  var url = "https://ongeki-net.com/ongeki-mobile/character/";
  if(location.href != url){
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.responseType = "document";
    request.send("");
    request.onreadystatechange = function() {
      if (request.readyState == 4 && request.status == 200) {
        alert("loaded");
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
    
    /* character name table */
    var name = ["星咲 あかり", "藤沢 柚子", "三角 葵", "高瀬 梨緒", "結城 莉玖", "藍原 椿", "桜井 春菜", "早乙女 彩華", "井之原 小星", "柏木 咲姫", "九條 楓", "逢坂 茜", "珠洲島 有栖", "日向 千夏", "柏木 美亜", "東雲 つむぎ"];
    var containers = d.getElementsByClassName("character_friendly_conainer");
    var friendlies = [].map.call(containers, function(item){
      return item.firstElementChild;
    });
    var parcentages = friendlies.map(function(item){
      return item.getAttribute("style").split("(")[1].split("px")[0] - 12;
    });
    var friendlyCount = [].map.call(containers, function(item){
      var ch = item.children;
      var t = 0;
      if(ch[4]) t += parseInt(ch[4].getAttribute("src").split("num_")[1].split(".png")[0])*100;
      t += parseInt(ch[2].getAttribute("src").split("num_")[1].split(".png")[0]);
      t += parseInt(ch[1].getAttribute("src").split("num_")[1].split(".png")[0]);
      return t;
    });
    var s = "";
    for(i=0; i<name.length; i++){
      f = friendlyCount[i];
      c = counter[parseInt(f/100)] * parseInt((f - parseInt(f / 100))/10 + 1);
      t = parseInt(parcentages[i] * c / 6 + 0.5) / 10;
      s += "[" + name[i] + "] " + f + " + " + (c-t) + "/" + c + " (あと " + t + " Track)\n";
    }
    window.open().document.body.innerText = s;
  };
}) (document)
