var express = require('express');
var router = express.Router();
var Note = require('../model/note')

/*接口定义
1. 获取note GET:  /api/notes       req:{} res:{state:0, data:[]}||{state:1, errormsg}
2. 添加note POST: /api/note/add req:{note: "hello"} res:{state: 0}||{state:1, errormsg}
3. 编辑note POST: /api/note/edit   req:{note: "new note", id: 100} res:{state: 0}||{state:1, errormsg}
4. 删除note POST: /api/note/delete req:{id: 100} res:{state: 0}||{state:1, errormsg}
*/

router.get('/notes', function(req, res, next) {
  Note.findAll({row: true}).then(notes => {
    res.send({state: 0, data: notes})
  })
});

router.post('/note/add', function(req, res, next){
  var note = req.body.note
  console.log(note)
  Note.create({text: note}).then(function(){
    res.send({state: 0})
  })
})

router.post('/note/edit', function(req, res, next){
  var noteId = req.body.id;
  var note = req.body.note;
  Note.update({text: note}, {where:{id: noteId}}).then(function(lists){
    res.send({state: 0})
  }).catch(function(e){
    res.send({ status: 1,errorMsg: '数据库异常或者你没有权限'});
  })
})

router.post('/note/delete', function(req, res, next){
  var noteId = req.body.id;
   Note.destroy({where:{id:noteId}}).then(function(deleteLen){
    res.send({state: 0})
  }).catch(function(e){
    res.send({ status: 1,errorMsg: '数据库异常或者你没有权限'});
  })
})

module.exports = router;
