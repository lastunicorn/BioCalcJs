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

/// <reference path="../../libraries/qUnit/qunit-1.12.0.js" />
/// <reference path="../../sources/helpers/Event.js" />

(function() {
    var ev = null;

    // --------------------------------------------------------------------------
    // subscribe method
    // --------------------------------------------------------------------------

    QUnit.module("Event Tests - subscribe method", {
        setup: function() {
            ev = new lu.Event();
        },
        teardown: function() {
            delete ev;
        }
    });

    QUnit.test("subscribe() method throws if subscribe a null.", function() {
        function toBeTested() {
            ev.client.subscribe(null);
        }

        QUnit.throws(toBeTested, "Tests that throws if subscribe a null.");
    });

    QUnit.test("subscribe() method throws if subscribe an undefined.", function() {
        function toBeTested() {
            ev.client.subscribe(undefined);
        }

        QUnit.throws(toBeTested, "Tests that throws if subscribe an undefined.");
    });

    QUnit.test("subscribe() method throws if subscribe a number.", function() {
        function toBeTested() {
            ev.client.subscribe(1);
        }

        QUnit.throws(toBeTested, "Tests that throws if subscribe a number.");
    });

    QUnit.test("subscribe() method throws if subscribe an object.", function() {
        function toBeTested() {
            ev.client.subscribe({});
        }

        QUnit.throws(toBeTested, "Tests that throws if subscribe an object.");
    });

    QUnit.test("Event handler subscribed is called when event is raised.", function() {
        var handlerWasCalled = false;
        function evHandler() {
            handlerWasCalled = true;
        }
        ev.client.subscribe(evHandler);

        ev.raise();

        QUnit.ok(handlerWasCalled, "Tests if one event handler subscribed is called when event is raised.");
    });

    QUnit.test("Both event handlers subscribed are called when event is raised if two event handlerere subscribed.", function() {
        var handler1WasCalled = 0;
        var handler2WasCalled = 0;
        function evHandler1() {
            handler1WasCalled++;
        }
        function evHandler2() {
            handler2WasCalled++;
        }
        ev.client.subscribe(evHandler1);
        ev.client.subscribe(evHandler2);

        ev.raise();

        QUnit.strictEqual(handler1WasCalled, 1, "Tests that first event handlers subscribed is called when event is raised.");
        QUnit.strictEqual(handler2WasCalled, 1, "Tests that second event handlers subscribed is called when event is raised.");
    });
}());

// --------------------------------------------------------------------------
// unsubscribe method
// --------------------------------------------------------------------------

(function() {
    var ev = null;

    QUnit.module("Event Tests - unsubscribe method", {
        setup: function() {
            ev = new lu.Event();
        },
        teardown: function() {
            delete ev;
        }
    });

    QUnit.test("unsubscribe() method throws if unsubscribe a null.", function() {
        function toBeTested() {
            ev.client.unsubscribe(null);
        }

        QUnit.throws(toBeTested, "Tests that throws if unsubscribe a null.");
    });

    QUnit.test("unsubscribe() method throws if unsubscribe an undefined.", function() {
        function toBeTested() {
            ev.client.unsubscribe(undefined);
        }

        QUnit.throws(toBeTested, "Tests that throws if unsubscribe an undefined.");
    });

    QUnit.test("unsubscribe() method throws if unsubscribe a number.", function() {
        function toBeTested() {
            ev.client.unsubscribe(1);
        }

        QUnit.throws(toBeTested, "Tests that throws if unsubscribe a number.");
    });

    QUnit.test("unsubscribe() method throws if subscribe an object.", function() {
        function toBeTested() {
            ev.client.unsubscribe({});
        }

        QUnit.throws(toBeTested, "Tests that throws if unsubscribe an object.");
    });

    QUnit.test("If subscribed and unsubscribed, event handler is not called when event is raised.", function() {
        var handlerCallCount = 0;
        function evHandler() {
            handlerCallCount++;
        }
        ev.client.subscribe(evHandler);
        ev.client.unsubscribe(evHandler);

        ev.raise();

        QUnit.strictEqual(handlerCallCount, 0, "Tests that the event handler is not called if it is unsubscribed.");
    });

    QUnit.test("The event handlers are called on the specified sender object.", function() {
        var actualSender = null;
        var expectedSender = {};
        function evHandler() {
            actualSender = this;
        }
        ev.client.subscribe(evHandler);

        ev.raise(expectedSender);

        QUnit.strictEqual(actualSender, expectedSender, "Tests that the sender is the one specified on the raise method.");
    });

    QUnit.test("The event handlers are called with the specified event argument.", function() {
        var actualArgument = null;
        var expectedArgument = null;
        function evHandler(evArg) {
            actualArgument = evArg;
        }
        ev.client.subscribe(evHandler);

        ev.raise(null, expectedArgument);

        QUnit.strictEqual(actualArgument, expectedArgument, "Tests that the event handlers are called with the specified event argument.");
    });

    QUnit.test("If subscribed and unsubscribed one of two handlers, only the other event handler is called when event is raised.", function() {
        var handler1CallCount = 0;
        var handler2CallCount = 0;
        function evHandler1() {
            handler1CallCount++;
        }
        function evHandler2() {
            handler2CallCount++;
        }
        ev.client.subscribe(evHandler1);
        ev.client.subscribe(evHandler2);
        ev.client.unsubscribe(evHandler1);

        ev.raise();

        QUnit.strictEqual(handler1CallCount, 0, "Tests that the first event handler is not called if it is unsubscribed.");
        QUnit.strictEqual(handler2CallCount, 1, "Tests that the second event handler is called.");
    });
}());

// --------------------------------------------------------------------------
// client property
// --------------------------------------------------------------------------

(function() {
    var ev = null;

    QUnit.module("Event Tests - event property", {
        setup: function() {
            ev = new lu.Event();
        },
        teardown: function() {
            delete ev;
        }
    });

    QUnit.test("event property returns an object that contains the subscribe method.", function() {
        var actual = ev.client.subscribe;
        
        QUnit.strictEqual(actual, ev.client.subscribe, "Tests that event property returns an object containing the subscribe method.");
    });

    QUnit.test("event property returns an object that contains the unsubscribe method.", function() {
        var actual = ev.client.unsubscribe;
        
        QUnit.strictEqual(actual, ev.client.unsubscribe, "Tests that event property returns an object containing the unsubscribe method.");
    });
}());