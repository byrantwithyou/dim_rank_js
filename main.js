/*
  Author: Yunxin Sun
  2018.12.24
*/

//Wrapper for data
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
}


//upload file and preprocess it

function rank() {
  for (let file of document.getElementById("file_input").files) {
    let data = new Data();
    data.preprocess(file);
  }
}
