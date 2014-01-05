// BioControls
// Copyright (C) 2013 Last Unicorn
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

window.lu = window.lu || {};

/**
 * Keeps a list of functions and calls them one by one when the event is raised.
 *
 * @constructor
 */
lu.Event = function() {

    var eventHandlers = [];

    /**
     * Registers a function to be called when the event is raised.
     * 
     * @param eventHandler
     *            The function to be registered.
     */
    function subscribe(eventHandler) {
        if (typeof (eventHandler) !== "function") {
            throw "eventHandler is not a function.";
        }

        eventHandlers.push(eventHandler);
    }

    /**
     * Unregisters a previously registered function.
     * 
     * @param eventHandler
     *            The function to be unregistered.
     */
    function unsubscribe(eventHandler) {
        if (typeof (eventHandler) !== "function") {
            throw "eventHandler is not a function.";
        }

        for ( var i = 0; i < eventHandlers.length; i++) {
            if (eventHandlers[i] === eventHandler) {
                eventHandlers.splice(i, 1);
            }
        }
    }

    /**
     * Gets an object containing the subscribe and unsubscribe methods. This is
     * useful to expose to subscribers instead of exposing the whole {lu.Event}
     * object.
     */
    Object.defineProperty(this, "client", {
        value: {
            subscribe: subscribe,
            unsubscribe: unsubscribe
        },
        enumerable: true,
        configurable: false,
        writable: false
    });

    /**
     * It calls all the eventHandlers previously subscribed to this event.
     * 
     * @param sender
     *            The object on which the subscribers will be run. This object
     *            will be the "this" object.
     * 
     * @param arg
     *            The argument containing some data to be sent to all the
     *            handlers.
     */
    this.raise = function(sender, arg) {
        for ( var i = 0; i < eventHandlers.length; i++) {
            eventHandlers[i].call(sender, arg);
        }
    };
};