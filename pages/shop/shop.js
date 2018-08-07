var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    currrntShop: { 
      id: 1, 
      name: '广州天河总店', 
      isBrand: 1, 
      isShop: 1, 
      isSend: 1, 
      onTime: 1, 
      distance: 1000, 
      start: 1, 
      shipfee: 1, 
      shipfree: 1, 
      rest: 0, 
      image: '/images/canteen/5.png' 
    },
    curTab : 1,
    pages: [],
    
  },
  changeTab : function(e){
    let way = e.currentTarget.dataset.way;
    this.setData({
      curTab : way
    })
    console.log(this.data.curTab)
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var pages = [];
    for (var i = 1; i < 30; i++) {
      pages.push('cate'+i);
    }
    this.setData({
      pages: pages
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})