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
/// <reference path="../../sources/helpers/List.js" />

(function() {

    // --------------------------------------------------------------------------
    // add method
    // --------------------------------------------------------------------------

    var biorhythmList = null;

    QUnit.module("List Tests - add method", {
        setup: function() {
            biorhythmList = new lu.List();
        }
    });

    QUnit.test("Throws if add undefined.", function() {
        function toBeTested() {
            biorhythmList.add(undefined);
        }

        QUnit.throws(toBeTested, "Tests that throws.");
    });

    QUnit.test("Throws if add null.", function() {
        function toBeTested() {
            biorhythmList.add(null);
        }

        QUnit.throws(toBeTested, "Tests that throws.");
    });

    QUnit.test("Raise itemAdding event when a new item is added to the array.", function() {
        var eventWasRaised = false;
        biorhythmList.itemAdding.subscribe(function() {
            eventWasRaised = true;
        });

        biorhythmList.add({});

        QUnit.strictEqual(eventWasRaised, true, "Tests that the event was raised.");
    });

    QUnit.test("itemAdding event provides the item that was added.", function() {
        var expectedItem = {};
        var actualItem = null;
        biorhythmList.itemAdding.subscribe(function(item) {
            actualItem = item;
        });

        biorhythmList.add(expectedItem);

        QUnit.strictEqual(actualItem, expectedItem, "Tests that the provided item is the same with the one that was added.");
    });

    QUnit.test("Raise itemAdded event when a new item is added to the array.", function() {
        var eventWasRaised = false;
        biorhythmList.itemAdded.subscribe(function() {
            eventWasRaised = true;
        });

        biorhythmList.add({});

        QUnit.strictEqual(eventWasRaised, true, "Tests that the event was raised.");
    });

    QUnit.test("itemAdded event provides the item that was added.", function() {
        var expectedItem = {};
        var actualItem = null;
        biorhythmList.itemAdded.subscribe(function(item) {
            actualItem = item;
        });

        biorhythmList.add(expectedItem);

        QUnit.strictEqual(actualItem, expectedItem, "Tests that the provided item is the same with the one that was added.");
    });

    QUnit.test("itemAdded event is not raised anymore if itemAdding event throws.", function() {
        var eventWasRaised = false;
        biorhythmList.itemAdding.subscribe(function(item) {
            throw "do not add item";
        });
        biorhythmList.itemAdded.subscribe(function(item) {
            eventWasRaised = true;
        });

        function toBeTested() {
            biorhythmList.add(item);
        }

        QUnit.throws(toBeTested, "Tests that the add method throws.");
        QUnit.strictEqual(eventWasRaised, false, "Tests that the event was not raised.");
    });
}());

(function() {

    // --------------------------------------------------------------------------
    // contains method
    // --------------------------------------------------------------------------

    var biorhythmList = null;

    QUnit.module("List Tests - contains method", {
        setup: function() {
            biorhythmList = new lu.List();
        }
    });

    QUnit.test("Returns false if list is empty and item is undefined.", function() {
        var actual = biorhythmList.contains(undefined);

        QUnit.strictEqual(actual, false, "Tests that undefined is not contained.");
    });

    QUnit.test("Returns false if list is NOT empty and item is undefined.", function() {
        biorhythmList.add({});

        var actual = biorhythmList.contains(undefined);

        QUnit.strictEqual(actual, false, "Tests that undefined is not contained.");
    });

    QUnit.test("Returns false if list is empty and item is null.", function() {
        var actual = biorhythmList.contains(null);

        QUnit.strictEqual(actual, false, "Tests that null is not contained.");
    });

    QUnit.test("Returns false if list is NOT empty and item is null.", function() {
        biorhythmList.add({});

        var actual = biorhythmList.contains(null);

        QUnit.strictEqual(actual, false, "Tests that null is not contained.");
    });

    QUnit.test("Returns false if list does not contain the item.", function() {
        biorhythmList.add({});

        var actual = biorhythmList.contains({});

        QUnit.strictEqual(actual, false, "Tests that item is not contained.");
    });

    QUnit.test("Returns true if list contains the only the searched item.", function() {
        var item = {};
        biorhythmList.add(item);

        var actual = biorhythmList.contains(item);

        QUnit.strictEqual(actual, true, "Tests that item is contained.");
    });

    QUnit.test("Returns true if list contains the the searched item along other items.", function() {
        var item = {};
        biorhythmList.add({});
        biorhythmList.add(item);
        biorhythmList.add({});

        var actual = biorhythmList.contains(item);

        QUnit.strictEqual(actual, true, "Tests that item is contained.");
    });
}());

(function() {

    // --------------------------------------------------------------------------
    // count method
    // --------------------------------------------------------------------------

    var biorhythmList = null;

    QUnit.module("List Tests - count method", {
        setup: function() {
            biorhythmList = new lu.List();
        }
    });

    QUnit.test("Returns 0 if no item.", function() {
        var actual = biorhythmList.count();

        QUnit.strictEqual(actual, 0, "Tests that count is 0.");
    });

    QUnit.test("Returns 1 if one item.", function() {
        biorhythmList.add({});

        var actual = biorhythmList.count();

        QUnit.strictEqual(actual, 1, "Tests that count is 1.");
    });

    QUnit.test("Returns 2 if two item.", function() {
        biorhythmList.add({});
        biorhythmList.add({});

        var actual = biorhythmList.count();

        QUnit.strictEqual(actual, 2, "Tests that count is 2.");
    });
}());

(function() {

    // --------------------------------------------------------------------------
    // remove method
    // --------------------------------------------------------------------------

    var biorhythmList = null;

    QUnit.module("List Tests - remove method", {
        setup: function() {
            biorhythmList = new lu.List();
        }
    });

    QUnit.test("Does nothing if item does not exist and list is empty.", function() {
        biorhythmList.remove({});

        QUnit.strictEqual(biorhythmList.count(), 0, "Tests that count is still 0.");
    });

    QUnit.test("Does nothing if item does not exist and the list contains items.", function() {
        biorhythmList.add({});
        biorhythmList.add({});

        biorhythmList.remove({});

        QUnit.strictEqual(biorhythmList.count(), 2, "Tests that count is still 2.");
    });

    QUnit.test("Removes the item if exists.", function() {
        var item = {};
        biorhythmList.add({});
        biorhythmList.add(item);
        biorhythmList.add({});

        biorhythmList.remove(item);

        QUnit.strictEqual(biorhythmList.count(), 2, "Tests that count is 2.");
        QUnit.strictEqual(biorhythmList.contains(item), false, "Tests that the item is not contained anymore.");
    });

    QUnit.test("Raise itemRemoved event when an item is removed from the array.", function() {
        var eventWasRaised = false;
        biorhythmList.itemRemoved.subscribe(function() {
            eventWasRaised = true;
        });
        var item = {};
        biorhythmList.add(item);

        biorhythmList.remove(item);

        QUnit.strictEqual(eventWasRaised, true, "Tests that the event was raised.");
    });

    QUnit.test("itemRemoved event provides the item that was removed.", function() {
        var actualItem = false;
        biorhythmList.itemRemoved.subscribe(function(item) {
            actualItem = item;
        });
        var item = {};
        biorhythmList.add(item);

        biorhythmList.remove(item);

        QUnit.strictEqual(actualItem, item, "Tests that the item provided by the event is the same one that was removed.");
    });
}());

(function() {

    // --------------------------------------------------------------------------
    // clear method
    // --------------------------------------------------------------------------

    // biorhythmList.addRange(aa);
    // biorhythmList.getArray();

    var biorhythmList = null;

    QUnit.module("List Tests - clear method", {
        setup: function() {
            biorhythmList = new lu.List();
        }
    });

    QUnit.test("Does nothing if list is empty.", function() {
        biorhythmList.clear();

        QUnit.strictEqual(biorhythmList.count(), 0, "Tests that count is still 0.");
    });

    QUnit.test("Removes the item if one item exists.", function() {
        var item = {};
        biorhythmList.add(item);

        biorhythmList.clear();

        QUnit.strictEqual(biorhythmList.count(), 0, "Tests that count is still 0.");
        QUnit.strictEqual(biorhythmList.contains(item), false, "Tests that item is not contained anymore.");
    });

    QUnit.test("Removes the all the items if two items exists.", function() {
        var item1 = {};
        var item2 = {};
        biorhythmList.add(item1);
        biorhythmList.add(item2);

        biorhythmList.clear();

        QUnit.strictEqual(biorhythmList.count(), 0, "Tests that count is still 0.");
        QUnit.strictEqual(biorhythmList.contains(item1), false, "Tests that item1 is not contained anymore.");
        QUnit.strictEqual(biorhythmList.contains(item2), false, "Tests that item1 is not contained anymore.");
    });
}());
