/*
  Author: Yunxin Sun
  2018.12.24
*/


//TO distinguish whether a dimension is categorical or numerical

/*
@para index: the index of the dimensions
@para data: the csv data
@para dim: the name of the selected dimension
@Return whether the dimension is numerical, true if numerical, false if categorical 
*/

function isNum(index, data, dim) {

  let categSet = new Set(["id", "weekday", "month", "year", "day", "date"]);
  if (categSet.has(dim.toLowerCase())) {
    return false;
  }

  let col_data = new Array();
  for (let col_data_item of jStat.col(data, index)) {
    if (col_data_item != "") {
      col_data.push(col_data_item[0]);
    }
  }
  let cateProb = 0, dataEqlLength = true, uvPercent, isInteger = true, dataLength = 0;
  uvPercent = new Set(col_data).size / col_data.length;
  for (let datum of col_data) {
    if (datum != "") {
      dataLength = datum.length;
      break;
    }
  }
  
  if (dataLength == 0) {
    return false;
  }

  //uvPercent: unique value percent
  //If the unique value percent is less than .35, there is more of a possibility that it is categorical
  if (uvPercent < 0.35) {
    cateProb += 1;
  }
  
  for (let datum of col_data) {
    
    if (datum != "") {
      //if there is a not number obj, return as category
      if (!jStat.utils.isNumber(Number(datum))) {
        return false;
      }

      if (!Number.isInteger(Number(datum))) {
        isInteger = false;
      }

      if (dataLength != datum.length) {
        dataEqlLength = false;
      }
    }

  }

  //if it contains a float number, return true
  if (!isInteger) {
    return true;
  }

  //If all the data items are equal length, there is more of a possibility that it is categorical
  if (dataEqlLength) { 
    cateProb += 1;
  }
  
  if (cateProb >= 2) {
    return false;
  }
  return true;
}


function preprocess(file) {
  let that = this;
  Papa.parse(file, {
    complete: function (results) {
      console.log(file.name);
      let rows = jStat(results.data).rows();
      that.values = results.data.slice(1, rows);
      that.dimensions = results.data.slice(0, 1)[0];
      if (that.values.slice(-1)[0] == "") {
        that.values.pop();
      }
      for (let i = 0; i < that.dimensions.length; ++i) {
        if (isNum(i, that.values, that.dimensions[i])) {
          
          that.numeric.push(i);
        }
        else {
          that.category.push(i);
        }
      }
      that.categ();
      let task = document.getElementById("task").value;
      switch (task) {
        case "outlier":
          // console.log("Numerics:");
          // console.log(that.outlier().numeric);
          // console.log("Categorical:");
          // console.log(that.category);
          break;
        case "cluster":
          // console.log("Numerics:");
          // console.log(that.cluster().numeric);
          // console.log("Categorical:");
          // console.log(that.category);
          break;
        case "correlation":
          // console.log("Numerics:");
          // console.log(that.correlation().numeric);
          // console.log("Categorical");
          // console.log(that.category);
          break;
        default: ;//console.log("Wrong Task!");
      }
      
    }
  })
  return this;
}

