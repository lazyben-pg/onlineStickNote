var $ = require('../lib/jquery.min.js')

var waterfall = (function(){
  var $ct
  var $items

  function render($container){
    $ct = $container
    $items = $ct.children();

    var nodeWidth = $items.outerWidth(true),
        colNum = parseInt(window.innerWidth/nodeWidth),
        colSumHeight = []
    
    for(var i=0; i<colNum; i++){
      colSumHeight.push(0)
    }

    
    
    $items.each(function(){
      var $curItem = $(this)
      var idx = 0
      var minSumHeight = colSumHeight[0]

      for(var i=0; i<colSumHeight.length; i++){
        if(minSumHeight > colSumHeight[i]){
          idx = i
          minSumHeight = colSumHeight[i]
        }
      }

      $curItem.css({
        left: nodeWidth*idx,
        top: minSumHeight 
      })

      colSumHeight[idx] = colSumHeight[idx] + $curItem.outerHeight(true)
    })
  }

  $(window).on('resize', function(){
    render($ct);
  })

  return{
    init: render
  }
})()

module.exports = waterfall