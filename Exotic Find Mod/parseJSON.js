
function getdata(data, start, end, startIndex) {
  if (!startIndex) {
    startIndex = 0;
  }
  data = data.substring(startIndex, data.length)
  return data.substring(data.indexOf(start) + start.length, data.indexOf(end, data.indexOf(start) + start.length))
}

function lat(data, char) {
  if (data == '#0') {
    return '#0'
  } else {
    while (true) {
      if (data.startsWith(char)) {
        data = data.slice(0, 1) + data.slice(2);
      } else {
        break
      }
    }
    while (true) {
      if (data.endsWith(char)) {
        data = data.slice(0, data.length-1) + data.slice(data.length)
      } else {
        break
      }
    }
    return data
  }
}

function parse_armour(data) {
		console.log(data)

  const ids = [298, 299, 300, 301]
  //will end up like [hex, skyblock_id] or ["#c109fd", "SUPERIOR_DRAGON_HELMET"]
  let colours = []
  //if it's leather armour
  for (let i = 0; i < ids.length; i++) {
    if (getdata(data, '{id:', 's,') == ids[i]) {
      let decimal = getdata(data, 'color:',',').split(":")
      decimal = parseInt(decimal);
	  console.log(decimal);
      let hex = "#" + ((decimal)>>>0).toString(16).toUpperCase();
      hex = lat(hex, "0")
      console.log(hex);

      const ID = getdata(data, ',id:"','"')
	  if (decimal != NaN) {
      colours.push([hex, ID])
	  }
    }
  }
  return colours
}


function parse_wardrobe(data) {
	console.log(data)
  const ids = [298, 299, 300, 301]
  //will end up like [hex, skyblock_id] or ["#c109fd", "SUPERIOR_DRAGON_HELMET"]
  let colours = []
  //if it's leather armour
  for (let i = 0; i < ids.length; i++) {
    if (getdata(data, '{id:', 's,') == ids[i]) {
      let decimal = getdata(data, 'color:',',').split(":")
      decimal = parseInt(decimal);
	  console.log(decimal);
      let hex = "#" + ((decimal)>>>0).toString(16).toUpperCase();
      hex = lat(hex, "0")
      console.log(hex);

      const ID = getdata(data, ',id:"','"')
      colours.push([hex, ID])
    }
  }
  return colours
}

export {parse_armour, parse_wardrobe}
