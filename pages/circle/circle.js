//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    
  },
  onLoad: function () {
    var colors = ['#9A10FF']
    var a = 100;
    var b = 100;
    var r1 = 75;
    var r2 = 100;
    var context = wx.createCanvasContext('firstCanvas')
    for(var i = 0 ; i <100;i++ ){
      var hudu = (2 * Math.PI / 360) * 3.6 * i;
      var X1 = a + Math.sin(hudu) * r1;
      var Y1 = b - Math.cos(hudu) * r1;
      var X2 = a + Math.sin(hudu) * r2;
      var Y2 = b - Math.cos(hudu) * r2;
      context.beginPath();
      context.moveTo(X1, Y1);
      context.lineTo(X2, Y2);
      context.lineWidth = 2;      
      context.setStrokeStyle('#cdcdcd');
      context.stroke();      
      context.closePath();
      
      //实际值
      if(i < 60 ){
        context.beginPath();
        context.moveTo(X1, Y1);
        context.lineTo(X2, Y2);
        context.lineWidth = 2;
        context.setStrokeStyle('#41b882');
        context.stroke();
        context.closePath();
      }

      //值
      // context.setFontSize(40)
      // context.fillStyle = "red";
      // context.fillText('79', 70, 100)
      // context.setFontSize(16)
      // context.fillText('个', 120, 100)
      
    }
    context.draw()
    
  }
})
