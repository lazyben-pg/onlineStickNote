var eventhub = (function(){

  var event = {event}

  function on(evt, handle){
    event[evt] = event[evt] || []
    event[evt].push({
      handle: handle
    })
  }

  function fire(evt, args){
    if(!event[evt]){
      return
    }
    for(var i=0; i<event[evt].length; i++){
      event[evt][i].handle(args);
    }
  }

  return {
    fire: fire,
    on: on
  }
})()

module.exports = eventhub