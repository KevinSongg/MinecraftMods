
let isOn = false;

function onWorldLoad() {
	if (isOn) {
  let formattedPlayerList = []
  let firstStop = 0
  let playerList = TabList.getNames()
  for (let i = 1; i < playerList.length; i++) {
    //console.log(playerList[i]);
    if (playerList[i].includes(" ")) {
      break
    }
    if (playerList[i].length < 3) {
      break
    }
    formattedPlayerList.push(playerList[i].substring(4, playerList[i].length-2))
    firstStop++

  }
  for (let i = firstStop+2; i < playerList.length; i++) {
    //console.log(playerList[i]);
    if (playerList[i].includes(" ")) {
      break
    }
    if (playerList[i].length < 3) {
      break
    }
    formattedPlayerList.push(playerList[i].substring(4, playerList[i].length-2))

  }


  console.log(JSON.stringify(formattedPlayerList));
  //let formattedPlayerList = ["mezzyowo"]
  let API_KEY = require("./apikey.js").api_key
  //ChatLib.chat(API_KEY);
  let requests = require("./request.js")
  for (let i = 0; i < formattedPlayerList.length; i++) {
    requests.requestHypixel(formattedPlayerList[i], API_KEY)

  }
	}
}
register("worldLoad", () => {
  setTimeout(()=>{
    onWorldLoad()
  },5000)
});



var wKeyBind = getKeyBindFromKey(Keyboard.KEY_J, "Toggle my thing");

function getKeyBindFromKey(key, description) {
  var mcKeyBind = Client.getKeyBindFromKey(key);

  if (mcKeyBind == null || mcKeyBind == undefined) {
    mcKeyBind = new KeyBind(description, key);
  }

  return mcKeyBind;
}
register("tick", () => {


if (wKeyBind.isPressed()) {
	if (isOn) {
		  ChatLib.chat("");

  ChatLib.chat("[ExoticFinder] Off");
		  ChatLib.chat("");

  isOn = false;
	} else {
				  ChatLib.chat("");

		  ChatLib.chat("[ExoticFinder] On");
		  		  ChatLib.chat("");

		  isOn = true;
	}
}
});
