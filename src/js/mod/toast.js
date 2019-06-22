const $ = require('../lib/jquery.min.js')
require('../../less/toast.less')

function toast(msg, time){
  this.msg = msg
  this.time = time||1000
  this.createToast()
  this.showToast()
}

toast.prototype = {
  createToast: function(){
    var html = '<div class="toast">' + this.msg + '</div>'
    this.$toast = $(html)
    $('body').append(this.$toast)
  },
  showToast: function(){
    var self = this
    this.$toast.fadeIn(300, function(){
      setTimeout(function(){
        self.$toast.fadeOut(300, function(){
          self.$toast.remove()
        })
      }, self.time)
    })
  }
}

function Toast(msg, time){
  return new toast(msg, time)
}

window.Toast = Toast

module.exports.Toast = Toast