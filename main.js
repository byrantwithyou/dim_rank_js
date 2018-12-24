/*
  Auther: Yunxin Sun
  2018.12.24
  */

function Data() {
  this.task = "";
  this.preprocess = preprocess;
  this.cluster = cluster;
  this.outlier = outlier;
  this.correlation = correlation;
  this.numeric = [];
  this.category = [];
  this.values = [];
}

let data = new Data();

//upload file and preprocess it
function upload() {
  console.log(data);
}

//rank dimension
function rank() {
  if (!data.task) {
    console.log("No Data!")
  }
}