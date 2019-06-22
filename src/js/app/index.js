require('../../less/index.less')
var $ = require('../lib/jquery.min.js')
var NoteManage = require('../mod/noteManage')
var Waterfall =  require('../mod/waterfall')
var Event = require('../mod/event')

NoteManage.load()

$('.add-note').on('click', function() {
  console.log("click")
  NoteManage.add();
})

Event.on('waterfall', function(){
  Waterfall.init($('#content'))
})
