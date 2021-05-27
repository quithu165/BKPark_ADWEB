function getParkingLotsList() {
 
  console.log("create Booking List");
  fetch(API_PARKINGLOTS_LIST)
    .then((response) => response.json())
    .then((data) => {
      for (var i = 0; i < data.length; i++){
        var totalslot = 0;
        var totalarea = data[i].area.length;
        for (var j = 0; j < totalarea; j++){
          totalslot = totalslot + data[i].area[j].freeslot + data[i].area[j].fullslot;
        }
        createNewRow(data[i]._id, data[i].name, data[i].address, totalarea, totalslot, Math.round(data[i].status*100)+"%");
      }
    });
}

function createNewRow(id, userid, parkingid, areaname, slotid, status) {
  var body = document.getElementById("tableBodyParkingLots");

  var row = document.createElement("tr");

  createSingleBox(id, row);
  createSingleBox(userid, row);
  createSingleBox(parkingid, row);
  createSingleBox(areaname, row);
  createSingleBox(slotid, row);
  createSingleBox(status, row);

  body.appendChild(row);
}

function createSingleBox(content, row) {
  var p = document.createElement("td");
  var pTxt = document.createTextNode(content);
  p.appendChild(pTxt);
  row.appendChild(p);
}