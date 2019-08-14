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
    var name = ["¯ç ‚ ‚©‚è", "“¡‘ò —MŽq", "ŽOŠp ˆ¨", "‚£ —œ", "Œ‹é ä»‹è", "—•Œ´ ’Ö", "÷ˆä tØ", "‘‰³— Ê‰Ø", "ˆä”VŒ´ ¬¯", "”–Ø ç•P", "‹ãžŠ •–", "ˆ§â ˆ©", "ŽìF“‡ —L²"];
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
      c = counter[parseInt(f/100)] * parseInt((f % 100)/10 + 1);
      t = parseInt(parcentages[i] * c / 6 + 0.5) / 10;
      s += "[" + name[i] + "] " + f + " + " + (c-t) + "/" + c + " (‚ ‚Æ " + t + " Track)\n";
    }
    window.open().document.body.innerText = s;
  };
}) (document)