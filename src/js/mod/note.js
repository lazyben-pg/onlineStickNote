require('../../less/note.less')
var Event = require('./event')
var $ = require('../lib/jquery.min.js')

function Note(opts){
  this.initOpts(opts);
  this.createNote();
  this.bindEvent();
}

Note.prototype = {

  defaultOpts: {
    id: '',
    $ct: $('#content').length>0?$('#content'):$('body'),
    context: 'input here'
  },

  initOpts: function(opts){
    this.opts = $.extend({}, this.defaultOpts, opts||{});
    if(this.opts.id){
      this.id = this.opts.id
    }
  },

  createNote: function(){
    var tpl =  '<div class="note">'
              + '<div class="note-head"><span class="username"></span><span class="delete">&times;</span></div>'
              + '<div class="note-ct" contenteditable="true"></div>'
              +'</div>';
    
    this.$note = $(tpl)
    this.$note.find('.note-ct').text(this.opts.context)
    this.opts.$ct.append(this.$note)
    if(!this.id){
      this.$note.css("left", "10px")
    }
  },

  setLayout: function(){
    var self = this
    if(self.clk){
      clearTimeout(self.clk)
    }
    self.clk = setTimeout(function(){
      Event.fire("waterfall")
    },100)
  },

  bindEvent: function(){
    var self = this,
        $note = this.$note,
        $noteHead = $note.find('.note-head'),
        $noteCt = $note.find('.note-ct'),
        $delete = $note.find('.delete')

    $delete.on('click', function(){
      self.delete();
    })

    //contenteditable没有 change 事件，所有这里做了模拟通过判断元素内容变动，执行 save
    $noteCt.on('focus', function() {
      if($noteCt.html()=='input here') $noteCt.html('');
      $noteCt.data('before', $noteCt.html());
    }).on('blur paste', function() {
      if( $noteCt.data('before') != $noteCt.html() ) {
        $noteCt.data('before',$noteCt.html());
        self.setLayout();
        if(self.id){
          self.edit($noteCt.html())
        }else{
          self.add($noteCt.html())
        }
      }
    });

    //设置笔记的移动
    $noteHead.on('mousedown', function(e){
      var evtX = e.pageX - $note.offset().left,   //evtX 计算事件的触发点在 dialog内部到 dialog 的左边缘的距离
          evtY = e.pageY - $note.offset().top;
      $note.addClass('draggable').data('evtPos', {x:evtX, y:evtY}); //把事件到 dialog 边缘的距离保存下来
    }).on('mouseup', function(){
       $note.removeClass('draggable').removeData('pos');
    });

    $('body').on('mousemove', function(e){
      $('.draggable').length && $('.draggable').offset({
        top: e.pageY-$('.draggable').data('evtPos').y,    // 当用户鼠标移动时，根据鼠标的位置和前面保存的距离，计算 dialog 的绝对位置
        left: e.pageX-$('.draggable').data('evtPos').x
      });
    });
  
  },

  add: function (msg){
    console.log('addd...');
    var self = this;
    console.log(msg)
   $.post('/api/note/add', {note: msg}).done(function(ret){
      if(ret.state === 0){
        Toast('add success');
      }else{
        self.$note.remove();
        Event.fire('waterfall')
        Toast(ret.errorMsg);
      }
    });
  },

  edit: function (msg) {
    var self = this;
    $.post('/api/note/edit',{
        id: this.id,
        note: msg
    }).done(function(ret){
      if(ret.state === 0){
        Toast('update success');
      }else{
        Toast(ret.errorMsg);
      }
      })
  },

  delete: function(){
    var self = this;
   $.post('/api/note/delete', {id: this.id})
    .done(function(ret){
      if(ret.state === 0){
        Toast('delete success');
        self.$note.remove();
        Event.fire('waterfall')
      }else{
        Toast(ret.errorMsg);
      }
  });

  }
}

module.exports.Note  = Note