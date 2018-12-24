/*
  Auther: Yunxin Sun
  2018.12.24
  */

function clear() {
  this.task = "";
  this.numeric = [];
  this.category = [];
  this.values = [];
  this.dimensions = [];
  return this;
}

//Wrapper
function Data() {
  this.task = "";
  this.preprocess = preprocess;
  this.cluster = cluster;
  this.outlier = outlier;
  this.correlation = correlation;
  this.numeric = [];
  this.category = [];
  this.values = [];
  this.dimensions = [];
  this.categ = categ;
  this.clear = clear;
}

let data = new Data();

//upload file and preprocess it
function upload() {
  let file = document.getElementById("file_input").files[0];
  data.clear().preprocess(file).categ();
}

//rank dimension
function rank() {
  if (!data.values.length) {
    console.log("Wrong Data!");
  }
  else {
    let task = document.getElementById("task").value;
    switch (task) {
      case "outlier":
        console.log("Numerics:");
        console.log(data.outlier().numeric);
        console.log("Categorical:");
        console.log(data.category);
        break;
      case "cluster":
        console.log("Numerics:");
        console.log(data.cluster().numeric);
        console.log("Categorical:");
        console.log(data.category);
        break;
      case "correlation":
        console.log("Numerics:");
        console.log(data.correlation().numeric);
        console.log("Categorical");
        console.log(data.category);
        break;
      default: console.log("Wrong Task!");
    }
  }
}