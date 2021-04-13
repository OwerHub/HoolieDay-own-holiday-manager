"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dayTypesNew = exports.months = void 0;
var months = ["January", "February", "March", "April", "May", "June", "July", "Aug", "September", "October", "November", "December"];
exports.months = months;
var dayTypes = ["Birth Of", "Day Of", "Birthday", "Egyéb"];
var dayTypesNew = [{
  name: "Birth Of",
  color: "#120c5a",
  description: "valmely, számodra fontos ember születési dátuma"
}, {
  name: "Day of",
  color: "#630001",
  description: "emléknap"
}, {
  name: "Birthday",
  color: "blue",
  description: "valmely, számodra fontos ember születési dátuma"
}, {
  name: "Egyéb",
  color: "#105001",
  description: "valmely, számodra fontos ember születési dátuma"
}];
exports.dayTypesNew = dayTypesNew;