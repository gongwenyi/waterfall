window.onload = function(){
  var oWaterfall = document.getElementById('waterfall'),
      oBoxs = getByClass('box', oWaterfall);
      
  waterfall('waterfall', 'box');
  
  var data = [{'src':'18.jpg'}, {'src':'22.jpg'}, {'src':'19.jpg'}, {'src':'24.jpg'}];
  window.onscroll = function(){
    if(canLoad('waterfall', 'box')){
      for(var i=0; i<data.length; i++){
        var oBox = document.createElement('div');
        oBox.className = 'box';
        oBox.innerHTML = '<div class="picture"><img src="images/'+data[i].src+'"></div>';
        oWaterfall.appendChild(oBox);
      } 
      waterfall('waterfall', 'box');
    }
  }
};

function waterfall(waterfall, box){
  var oWaterfall = document.getElementById(waterfall),
      oBoxs = getByClass(box, oWaterfall),
      oBoxW = oBoxs[0].offsetWidth, //每一个box的宽度
      clientW = document.body.clientWidth || document.documentElement.clientWidth, //可视区的宽度
      cols = parseInt(clientW/oBoxW), //列数
      colsHeight = []; //记录每一列的总高度
  oWaterfall.style.width = oBoxW * cols + 'px';  //设置父元素的宽度

  for(var i=0; i<oBoxs.length; i++){
    if(i<cols){
      colsHeight.push(oBoxs[i].offsetHeight); //记录第一行的每一列的高度
    }else{
      var minHeight = Math.min.apply(null, colsHeight),  //获取数组中最小值
          index = getIndex(minHeight, colsHeight);  //数组中最小值的下标
      oBoxs[i].style.position = 'absolute'; //将下一张图片绝对定位到高度最小的那一列的后面
      oBoxs[i].style.top = minHeight + 'px';
      oBoxs[i].style.left = index * oBoxW + 'px';
      colsHeight[index] += oBoxs[i].offsetHeight; //修改最小列的值
    }
  }
};

//如果最后一张图片显示了一半就加载数据
function canLoad(waterfall, box){
  var oWaterfall = document.getElementById(waterfall),
      oWaterfallOffsetTop = oWaterfall.offsetTop, //父元素距离页面顶部的距离
      oBoxs = getByClass(box, oWaterfall),
      oBoxsLast = oBoxs[oBoxs.length-1],  //最后一张图
      oBoxsLastHeight = oBoxsLast.offsetTop + oBoxsLast.offsetHeight/2, //最后一张图中间距离父元素顶部的高度
      clientHeight = document.documentElement.clientHeight || document.body.clientHeight, //可视区的高度 
      scrollHeight = document.documentElement.scrollTop || document.body.scrollTop; //页面滚过的高度
      //console.log(oBoxsLastHeight+"  "+clientHeight+"  "+scrollHeight);
      console.log(oWaterfall.offsetTop);
      if(oBoxsLastHeight+oWaterfallOffsetTop<clientHeight+scrollHeight){
        return true;
      }else{
        return false;
      }
}
//通过class获取元素
function getByClass(className, oParent){
  var oElements,
      result = [];
  if(oParent){  //如果提供了父元素，在父元素中获取
    oElements = oParent.getElementsByTagName('*');
  }else{        //没有提供父元素，在整个document中获取
    oElements = document.getElementsByTagName('*');
  }
  //oElements = oParent ? oParent.getElementsByTagName('*') : document.getElementsByTagName('*');

  for(var i=0; i<oElements.length; i++){
    if(oElements[i].className.indexOf(className)>-1){
      result.push(oElements[i]);
    }
  }

  return result;
};

//获取数组中某一个值对应的下标
function getIndex(value, array){
  for(var i=0; i<array.length; i++){
    if(array[i] == value){
      return i;
    }
  }
}
