// 위치를 인식 했을 경우의 function
function onGeoOk(position) {
  // console.log(position);
  const lat = position.coords.latitude;
  const lng = position.coords.longitude;
  console.log(lat);
  console.log(lng);
}
// 위치를 인식하지 못했을 경우의 function
function onGeoError() {
  alert("Can't find you. No Weather for You");
}
console.log(navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError));
