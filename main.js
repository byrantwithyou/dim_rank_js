/*
  Auther: Yunxin Sun
  2018.12.24
  */

function Data() {
  this.task = "";
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