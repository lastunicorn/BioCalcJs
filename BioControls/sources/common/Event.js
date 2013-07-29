var lu = lu || {};

lu.Event = function() {

    var eventHandlers = [];

    this.subscribe = function(eventHandler) {
        if (typeof (eventHandler) !== "function") {
            throw "eventHandler is not a function.";
        }

        eventHandlers.push(eventHandler);
    };

    this.unsubscribe = function(eventHandler) {
        if (typeof (eventHandler) !== "function") {
            throw "eventHandler is not a function.";
        }
        
        for ( var i = 0; i < eventHandlers.length; i++) {
            if (eventHandlers[i] === eventHandler) {
                eventHandlers.splice(i, 1);
            }
        }
    };

    this.raise = function() {
        for ( var i = 0; i < eventHandlers.length; i++) {
            eventHandlers[i]();
        }
    };
};