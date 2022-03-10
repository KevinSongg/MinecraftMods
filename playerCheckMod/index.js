ChatLib.chat("&b============>&6&kX&b<===========");
ChatLib.chat("&6   \"Are they online\" by riuna   ");
ChatLib.chat("&b============>&6&kX&b<===========");

const key = require("./userConfig.js").api_key
const requests = require("requestV2/index.js")

function checkPlayer(playerName){
  requests.request({
    url: `https://api.mojang.com/users/profiles/minecraft/${playerName}`,
    json: true
  }).then(function(response) {
    requests.request({
      url: `https://api.hypixel.net/status?key=${key}&uuid=${response.id}`,
      json: true
    }).then(function(response1) {
      if (response1.session.online){
        ChatLib.chat(`&6${playerName}&b is &aonline`);
      } else {
        ChatLib.chat(`&6${playerName}&b is &cnot online`);
      }
    });
  });

  
}

register('command', (name) => {
  checkPlayer(name)
}).setName('check');

register('command', (name) => {
  var data = [];
  var Loadedlist = FileLib.read("playerCheckMod", "people.json");
  if (Loadedlist != null && Loadedlist != "" && Loadedlist != undefined) {
    data = JSON.parse(Loadedlist);
  }
  data.push(name);
  FileLib.write("playerCheckMod", "people.json", JSON.stringify(data));
  ChatLib.chat(`&6${name}&b has been &aadded`);
}).setName('add');

register('command', (name) => {
  var data = [];
  var Loadedlist = FileLib.read("playerCheckMod", "people.json");
  if (Loadedlist != null && Loadedlist != "" && Loadedlist != undefined) {
    data = JSON.parse(Loadedlist);
  }
  data.pop(name);
  FileLib.write("playerCheckMod", "people.json", JSON.stringify(data));
  ChatLib.chat(`&6${name}&b has been &cremoved`);
}).setName('remove');

register('command', (name) => {
  var data = [];
  var Loadedlist = FileLib.read("playerCheckMod", "people.json");
  if (Loadedlist != null && Loadedlist != "" && Loadedlist != undefined) {
    data = JSON.parse(Loadedlist);
  }

  ChatLib.chat("&b============>&6&kX&b<===========");
  for (let i = 0; i < data.length; i++) {
    checkPlayer(data[i])
  }
  setTimeout(()=>{
    ChatLib.chat("&b============>&6&kX&b<===========");
  },500*data.length)
  
}).setName('people');
