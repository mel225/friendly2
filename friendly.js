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
    
    /* character name table */
    var name = ["¯ç ‚ ‚©‚è", "“¡‘ò —MŽq", "ŽOŠp ˆ¨", "‚£ —œ", "Œ‹é ä»‹è", "—•Œ´ ’Ö", "÷ˆä tØ", "‘‰³— Ê‰Ø", "ˆä”VŒ´ ¬¯", "”–Ø ç•P", "‹ãžŠ •–", "ˆ§â ˆ©", "ŽìF“‡ —L²"];
    var containers = d.getElementsByClassName("character_friendly_conainer");
    var friendlies = [].map.call(containers, function(item){
      return item.firstElementChild;
    });
    var parcentages = friendlies.map(function(item){
      return 1 - (parseFloat(item.getAttribute("style").split("(")[1].split("px")[0]) - 12) / 60;
    });
    var friendlyCount = [].map.call(containers, function(item){
      var ch = item.children;
      var t = 0;
      if(ch[4]) t += parseInt(ch[4].getAttribute("src").split("num_")[1].split(".png")[0])*100;
      t += parseInt(ch[2].getAttribute("src").split("num_")[1].split(".png")[0]);
      t += parseInt(ch[1].getAttribute("src").split("num_")[1].split(".png")[0]);
      return t;
    });
    var s = [];
    for(i=0; i<name.length; i++){
      var f = friendlyCount[i];
      var f100 = parseInt(f/100);
      var f10 = parseInt((f - f100) / 10);
      var c = counter[f100] * f10 / 10;
      var t = parseInt(parcentages[i] * counter[f100] * f10 + 0.5) / 10 ;
      s[name[i]] =  [f, c, t];
    }
    var w = window.open('about:blank', null);
    w.console.log(s);
  };
}) (document)