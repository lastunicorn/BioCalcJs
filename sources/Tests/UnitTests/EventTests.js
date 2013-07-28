(function() {
    var ev = null;

    QUnit.module("Event Tests", {
        setup: function() {
            ev = new lu.Event();
        }
    });

    QUnit.test("subscribe() methos throws if subscribe a null.", function() {
        function toBeTested() {
            ev.subscribe(null);
        }

        QUnit.throws(toBeTested, "Tests that throws if subscribe a null.");
    });

    QUnit.test("subscribe() methos throws if subscribe an undefined.", function() {
        function toBeTested() {
            ev.subscribe(undefined);
        }

        QUnit.throws(toBeTested, "Tests that throws if subscribe an undefined.");
    });

    QUnit.test("subscribe() methos throws if subscribe a number.", function() {
        function toBeTested() {
            ev.subscribe(1);
        }

        QUnit.throws(toBeTested, "Tests that throws if subscribe a number.");
    });

    QUnit.test("subscribe() methos throws if subscribe an object.", function() {
        function toBeTested() {
            ev.subscribe({});
        }

        QUnit.throws(toBeTested, "Tests that throws if subscribe an object.");
    });

    QUnit.test("Event handler subscribed is called when event is raised.", function() {
        var handlerWasCalled = false;
        function evHandler() {
            handlerWasCalled = true;
        }
        ev.subscribe(evHandler);

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
        ev.subscribe(evHandler1);
        ev.subscribe(evHandler2);

        ev.raise();

        QUnit.strictEqual(handler1WasCalled, 1, "Tests that first event handlers subscribed is called when event is raised.");
        QUnit.strictEqual(handler2WasCalled, 1, "Tests that second event handlers subscribed is called when event is raised.");
    });

    QUnit.test("unsubscribe() methos throws if unsubscribe a null.", function() {
        function toBeTested() {
            ev.unsubscribe(null);
        }

        QUnit.throws(toBeTested, "Tests that throws if unsubscribe a null.");
    });

    QUnit.test("unsubscribe() methos throws if unsubscribe an undefined.", function() {
        function toBeTested() {
            ev.unsubscribe(undefined);
        }

        QUnit.throws(toBeTested, "Tests that throws if unsubscribe an undefined.");
    });

    QUnit.test("unsubscribe() methos throws if unsubscribe a number.", function() {
        function toBeTested() {
            ev.unsubscribe(1);
        }

        QUnit.throws(toBeTested, "Tests that throws if unsubscribe a number.");
    });

    QUnit.test("unsubscribe() methos throws if subscribe an object.", function() {
        function toBeTested() {
            ev.unsubscribe({});
        }

        QUnit.throws(toBeTested, "Tests that throws if unsubscribe an object.");
    });

    QUnit.test("If subscribed and unsubscribed, event handler is not called when event is raised.", function() {
        var handlerCallCount = 0;
        function evHandler() {
            handlerCallCount++;
        }
        ev.subscribe(evHandler);
        ev.unsubscribe(evHandler);
        
        ev.raise();
        
        QUnit.strictEqual(handlerCallCount, 0, "Tests that the event handler is not called if it is unsubscribed.");
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
        ev.subscribe(evHandler1);
        ev.subscribe(evHandler2);
        ev.unsubscribe(evHandler1);
        
        ev.raise();
        
        QUnit.strictEqual(handler1CallCount, 0, "Tests that the first event handler is not called if it is unsubscribed.");
        QUnit.strictEqual(handler2CallCount, 1, "Tests that the second event handler is called.");
    });
}());