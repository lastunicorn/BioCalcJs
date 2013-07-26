var lu = lu || {};

lu.Event = function() {

    var eventHandlers = [];

    this.subscribe = function(eventHandler) {
        if (typeof (eventHandler) !== "function") {
            return;
        }

        eventHandlers.push(eventHandler);
    };

    this.raise = function() {
        for ( var i = 0; i < eventHandlers.length; i++) {
            eventHandlers[i]();
        }
    };
};