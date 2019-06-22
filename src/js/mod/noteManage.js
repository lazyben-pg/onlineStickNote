var Note = require('./note').Note
var Toast = require('./toast').Toast
var Event = require('./event')
var $ = require('../lib/jquery.min.js')

var NoteManage = (function noteManage(){
  function load(){
    $.get('/api/notes').done(function(ret){
      if(ret.state === 0){
        $.each(ret.data, function(idx, content){
          new Note({
            id: content.id,
            context: content.text
          })
        })
        Event.fire('waterfall')
      }else{
        Toast(ret.errormsg)
      }
    }).fail(function(){
      Toast('网络异常')
    })
  }

  function add(){
    new Note()
  }

  return{
    load: load,
    add: add
  }
})()

module.exports = NoteManage