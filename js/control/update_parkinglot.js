var update_btn =
  '<a href="#" id="info" class="btn btn-success btn-default">' +
  '<span class="icon text-white-50">' +
  '<i class="fas fa-check"></i>' +
  "</span>" +
  "</a>";
var cancel_btn =
  '<a href="#" id="cancel" class="btn btn-danger btn-default">' +
  '<span class="icon text-white-50">' +
  '<i class="fas fa-times"></i>' +
  "</span>" +
  "</a>";
var currentParkingrCookie = document.cookie
  .split("; ")
  .find((row) => row.startsWith("currentParkinglot="))
  .split("=")[1];

var latitudeE = document.getElementById("lat");
var longitudeE = document.getElementById("long");
var numberE = document.getElementById("address_number");
var streetE = document.getElementById("address_street");
var districtE = document.getElementById("address_district");
var cityE = document.getElementById("address_city");
var countryE = document.getElementById("address_country");
var nameE = document.getElementById("name");
var thumnailE = document.getElementById("img");
var parkinglottable = document.getElementById("areatable");
var addareatable = document.getElementById("addareatable");

// var areaname = document.getElementById("name");
// var areaslot = document.getElementById("slot");
// var areaprice = document.getElementById("price");
function updateParkinglotInfo() {
  var latitude = latitudeE.value;
  var longitude = longitudeE.value;
  var number = numberE.value;
  var street = streetE.value;
  var district = districtE.value;
  var city = cityE.value;
  var country = countryE.value;
  var name = nameE.value;
  var thumnail = thumnailE.value;
  var data = { info: {} };
  //   console.log(latitude);
  if (latitude.length > 0 && longitude.length > 0) {
    // console.log("Run");
    data.info = { coordinate: { longitude: latitude, latitude: longitude } };
  }
  if (country != "")
    data.info = {
      ...data.info,
      detail_address: {
        country: country,
      },
    };
  if (city != "") {
    if (data.info.detail_address) {
      data.info.detail_address = {
        ...data.info.detail_address,
        city_province: city,
      };
    } else {
      data.info = {
        ...data.info,
        detail_address: {
          city_province: city,
        },
      };
    }
  }
  if (district != "") {
    if (data.info.detail_address) {
      data.info.detail_address = {
        ...data.info.detail_address,
        district: district,
      };
    } else {
      data.info = {
        ...data.info,
        detail_address: {
          district: district,
        },
      };
    }
  }
  if (street != "") {
    if (data.info.detail_address) {
      data.info.detail_address = {
        ...data.info.detail_address,
        street: street,
      };
    } else {
      data.info = {
        ...data.info,
        detail_address: {
          street: street,
        },
      };
    }
  }

  if (number != "") {
    if (data.info.detail_address) {
      data.info.detail_address = {
        ...data.info.detail_address,
        number: number,
      };
    } else {
      data.info = {
        ...data.info,
        detail_address: {
          number: number,
        },
      };
    }
  }
  if (name != "") {
    data.info = { ...data.info, name: name };
  }
  if (thumnail != "") {
    data.info = { ...data.info, image: thumnail };
  }
  console.log(data);
  putUserInfo(data);
}
function getOldData() {
  // console.log("get old data");
  // getParkingLotsList()
  if (JSON.parse(currentUserCookie).userType == "Admin") {
    parkinglottable.style.display = "none";
    addareatable.style.display = "none";
  }
  getAreaData();
  var currentParkinglotID = document.cookie
    .split("; ")
    .find((row) => row.startsWith("currentParkinglot="))
    .split("=")[1];
  console.log(API_PARKINGLOTS_LIST + "/" + currentParkinglotID);
  fetch(API_PARKINGLOTS_LIST + "/" + currentParkinglotID)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      latitudeE.placeholder = data.coordinate.longitude;
      longitudeE.placeholder = data.coordinate.latitude;
      nameE.placeholder = data.name;
      numberE.placeholder = data.detail_address.number;
      streetE.placeholder = data.detail_address.street;
      districtE.placeholder = data.detail_address.district;
      cityE.placeholder = data.detail_address.city_province;
      countryE.placeholder = data.detail_address.country;
    });
}
function putUserInfo(dataIn) {
  var currentParkinglotID = document.cookie
    .split("; ")
    .find((row) => row.startsWith("currentParkinglot="))
    .split("=")[1];
  console.log(JSON.stringify(dataIn));
  fetch(API_PARKINGLOTS_LIST + "/" + currentParkinglotID, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataIn),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data._id != null) {
        alert("Update parking lot successfully");
        window.location.href = "parkinglots.php";
      } else {
        console.log(data);
        latitudeE.value = "";
        longitudeE.value = "";
        numberE.value = "";
        streetE.value = "";
        districtE.value = "";
        cityE.value = "";
        countryE.value = "";
        nameE.value = "";
        thumnailE.value = "";
        alert("Failed to update parking lot");
      }
    })
    .catch((error) => {
      console.log(error);
      console.log(error.response);
    });
}

function getAreaData() {
  var currentParkinglotID = document.cookie
    .split("; ")
    .find((row) => row.startsWith("currentParkinglot="))
    .split("=")[1];
  fetch(API_PARKINGLOTS_LIST + "/" + currentParkinglotID)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (var i = 0; i < data.area.length; i++) {
        console.log(data.area[i].name);
        createNewRow(
          data.area[i].name,
          data.area[i].slots.length,
          data.area[i].price,
          currentParkinglotID,
          i
        );
      }
      $(document).ready(function () {
        $("#dataTable").DataTable();
      });
    });
}
function createNewRow(name, slot, price, id, number) {
  var body = document.getElementById("tableBodyArea");

  var row = document.createElement("tr");

  createSingleBox(name, row, id, 1, number);
  createSingleBox(slot, row, id, 2, number);
  createSingleBox(price, row, id, 3, number);
  addButton(row, id, name, number);
  body.appendChild(row);
}

function createSingleBox(content, row, id, option, number) {
  var p = document.createElement("td");
  var inputTxt;
  switch (option) {
    case 1:
      inputTxt = document.createTextNode(content);
      inputTxt.id = "name" + id + number;
      break;
    case 2:
      inputTxt = document.createTextNode(content);
      inputTxt.id = "slot" + id + number;
      break;
    case 3:
      inputTxt = document.createElement("input");
      inputTxt.value = content;
      inputTxt.id = "price" + id + number;
      break;
  }
  p.appendChild(inputTxt);
  row.appendChild(p);
}

function addButton(row, id, name, number) {
  var btn = document.createElement("td");
  btn.id = id;
  btn.innerHTML = update_btn + cancel_btn;
  document.body.appendChild(btn);
  row.appendChild(btn);

  matchFunction(btn, name, id, number);
}

function matchFunction(btnGroup, name, id, number) {
  var id = btnGroup.id;
  var updateBtn = btnGroup.children[0];
  var cancelBtn = btnGroup.children[1];
  updateBtn.onclick = function () {
    updateAreaData(name, id, number);
  };
  cancelBtn.onclick = function () {
    handleCancelButtonPress(id, name);
  };
}

function updateAreaData(name, id, number) {
  // var nameE = document.getElementById("name" + id + number);
  var priceE = document.getElementById("price" + id + number);

  // var name = nameE.innerHTML;
  var price = priceE.value;

  console.log({
    area: {
      name: name,
      price: price,
    },
  });

  fetch(API_PARKINGLOTS_LIST + "/" + id + "/area/price", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      area: {
        name: name,
        price: price,
      },
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert("Change area successfully!");
    })
    .catch((error) => {
      alert("Failed to change area!");
      // console.log(error);
      console.log(error.response);
    });
}

function handleCancelButtonPress(id, name) {
  console.log(id);
  if (confirm("Are you sure to DELETE this area?")) {
    confirmDeleteArea(id, name);
    // window.location.href("parkinglots.php");
  }
}

function confirmDeleteArea(id, name) {
  console.log({area: {
    name: name,
  },});
  fetch(API_PARKINGLOTS_LIST + "/" + id  + "/area", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      area: {
        name: name,
      },
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert("Delete area successfully!");
      location.reload();
    })
    .catch((error) => {
      alert("Failed to delete area!");
    });
  // location.reload();
}


function addArea() {
  var nameE = document.getElementById("areaname");
  var slotE = document.getElementById("areaslot");
  var priceE = document.getElementById("areaprice");

  var name = nameE.value;
  var slot = slotE.value;
  var price = priceE.value;
  var slotsStatus = [];
  for (var i = 0; i < slot; i++) {
    slotsStatus.push(0);
  }
  console.log({
    area: {
      name: name,
      price: price,
      slots: slotsStatus,
    },
  });
  fetch(API_PARKINGLOTS_LIST + "/" + currentParkingrCookie + "/area", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      area: {
        name: name,
        price: price,
        slots: slotsStatus,
      },
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      alert("Add area successfully!");
      window.location.href = "update_parkinglot.php";
    })
    .catch((error) => {
      console.log(error);
      console.log(error.response);
      alert("Failed to add area!");
      nameE.value = "";
      priceE.value = "";
      slotE.value = "";
    });
}
