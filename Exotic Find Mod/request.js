
function requestHypixel(playerName, API_KEY) {
  const requestLib = require("requestV2/index.js")
  let uuid;
  let resolved = false
  //get player's uuid
  let uuidReq = requestLib.request({
    url: `https://api.mojang.com/users/profiles/minecraft/${playerName}`,
    json: true
  })
  uuidReq.then(function(response) {
    uuid = response.id

    //gets the player's inv and stuff

    let profiles = []

      let itemReq = requestLib.request({
        url: `https://api.hypixel.net/skyblock/profiles?key=${API_KEY}&uuid=${uuid}`,
        json: true
      })
      itemReq.then(function(response) {
        //ChatLib.chat(JSON.stringify(response))
        for (let i = 0; i < response.profiles.length; i++) {
          profiles.push(response.profiles[i])
        }

        require("./checkPlayer.js").playerChecker(profiles, playerName, uuid)
      })

      //catch error from hypixel
      itemReq.catch(function(err) {
        ChatLib.chat(JSON.stringify(err))
      })




  })
  //catch error from mojang
  uuidReq.catch(function(err) {
    ChatLib.chat(JSON.stringify(err))
  })

}
export {requestHypixel}
