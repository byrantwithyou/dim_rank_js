/*
  Author: Yunxin Sun
  2018.12.24
*/

//rank for categorical variable

function categ () {
  catego_array = new Array();
  for (let catego of this.category) {
    catego_array.push(this.dimensions[catego]);
  }
  console.log(catego_array);  
  return this;
}