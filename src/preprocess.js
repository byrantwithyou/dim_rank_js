//categorical or numerical

function isNum(index, data) {
  let col_data = jStat.col(data, index);
  let cateProb = 0, dataEqlLength = true, uvPercent;
  uvPercent = new Set(col_data).size / col_data.length;
  let dataLength = col_data[0].length;
  
  if (uvPercent < 0.35) {
    cateProb += 1;
  }
  
  for (let datum of col_data) {
    
    if (!jStat.utils.isNumber(Number(datum))) {
      return false;
    }

    if (dataLength != datum.length) {
      dataEqlLength = false;
    }
  }

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
      let rows = jStat(results.data).rows();
      that.values = results.data.slice(1, rows);
      that.dimensions = results.data.slice(0, 1)[0];
      if (that.values.slice(-1)[0] == "") {
        that.values.pop();
      }
      for (let i = 0; i < that.dimensions.length; ++i) {
        if (isNum(i, that.values)) {
          that.numeric.push(i);
        }
        else {
          that.category.push(i);
        }
      }
    }
  })
  console.log(this);
  return this;
}

