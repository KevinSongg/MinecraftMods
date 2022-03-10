function playerChecker(playerBody, playerName, uuid) {


  //will be parsed into the format [[player, hex], [player, hex]]
  let data = [playerName]
  const parser = require("./parseJSON.js")
  const hexCodes = require("./hexCodes.js")

  for (let i = 0; i < playerBody.length; i++) {
    for (let j = 0; j < Object.keys(playerBody[i]["members"]).length; j++) {
      //console.log(JSON.stringify(Object.keys(playerBody[i]["members"])[j]));
      if (uuid == Object.keys(playerBody[i]["members"])[j]) {

      //for armour
      if (playerBody[i]["members"][Object.keys(playerBody[i]["members"])[j]].inv_armor) {
        let bytearray = java.util.Base64.getDecoder().decode(playerBody[i]["members"][Object.keys(playerBody[i]["members"])[j]].inv_armor.data);
        let inputstream = new java.io.ByteArrayInputStream(bytearray);
        let nbt = net.minecraft.nbt.CompressedStreamTools.func_74796_a(inputstream);
        let items = nbt.func_150295_c("i", 10)//NBTTagList
        let length = items.func_74745_c()
        for (let i = 0; i < length; i++) {
          let item = items.func_150305_b(i); //NBTTagList.getCompoundTagAt()
          if (!item.func_82582_d()) {
            //console.log(JSON.stringify(item.toString()))
            let armourData = parser.parse_armour(item.toString())
            if (armourData) {
              for (let i = 0; i < armourData.length; i++) {
                if (armourData != undefined) {
                  data.push(armourData[i])
                }
                //}
              }
            }
          }
        }
      }
      //end of armour
      //wardrobe
      if (playerBody[i]["members"][Object.keys(playerBody[i]["members"])[j]].wardrobe_contents) {
        let bytearray = java.util.Base64.getDecoder().decode(playerBody[i]["members"][Object.keys(playerBody[i]["members"])[j]].wardrobe_contents.data);
        let inputstream = new java.io.ByteArrayInputStream(bytearray);
        let nbt = net.minecraft.nbt.CompressedStreamTools.func_74796_a(inputstream);
        let items = nbt.func_150295_c("i", 10)//NBTTagList
        let length = items.func_74745_c()
        for (let i = 0; i < length; i++) {
          let item = items.func_150305_b(i); //NBTTagList.getCompoundTagAt()
          if (!item.func_82582_d()) {

            let wardrobeData = parser.parse_wardrobe(item.toString())
            if (wardrobeData) {
              for (let i = 0; i < wardrobeData.length; i++) {
                if (wardrobeData != undefined) {
                  data.push(wardrobeData[i])
                }
                //}
              }
            }
          }
        }
      }
    }
      //wardrobe
    }
  }
console.log(JSON.stringify(data));
for (let i = 1; i < data.length; i++) {
  //is it a piece we want?
  let isWanted = false
  for (let j = 0; j < hexCodes.wanted_pieces.length; j++) {
    //console.log(`ssss ${JSON.stringify(hexCodes.wanted_pieces[j][0])}`);
    if (hexCodes.wanted_pieces[j][0] == data[i][1]) {
      isWanted = true;
    }
  }
  if (isWanted) {
    //is it a crystal or fairy colour?
    let isCrystalOrFairy = false;
    for (let j = 0; j < hexCodes.fairy_crystal_colors.length; j++) {
      //console.log(`jjjj ${JSON.stringify(data[i][0])}`);
      if (hexCodes.fairy_crystal_colors[j] == data[i][0]) {
        isCrystalOrFairy = true
      }
    }
    if (!isCrystalOrFairy) {
      //is it it's intended colour? no...? epic, tell the user that.
      for (let j = 0; j < hexCodes.wanted_pieces.length; j++) {
        if (hexCodes.wanted_pieces[j][0] == data[i][1]) {
          if (hexCodes.wanted_pieces[j][1] != data[i][0]) {
            //console.log(hexCodes.wanted_pieces[j][1]);
            //console.log(data[i][0]);
            ChatLib.chat(`${data[0]} : ${data[i][1]} : ${data[i][0]}`)
            FileLib.append("./log.txt", `${data[0]} : ${data[i][1]} : ${data[i][0]}`);
          }
        }
      }
    }
  }
}

//console.log(JSON.stringify(data));
}

export {playerChecker}
