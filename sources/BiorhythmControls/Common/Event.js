var lu = lu || {}

lu.Event = function() {

	var eventHandlers = [];
	
	function subscribe(eventHandler) {
		if (typeof(eventHandler) !== "function"){
			return;
		}
		
		eventHandlers.push(eventHandler);
	}

	function raise() {
		for (var i = 0; i < eventHandlers.length; i++) {
			eventHandlers[i]();
		}
	}

	this.subscribe = subscribe;
	this.raise = raise;
};