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

// -------------------------------------------------------------------------
// constructor tests
// -------------------------------------------------------------------------

(function() {

    QUnit.module("Rectangle Tests");

    QUnit.test("constructor throws if left is not of type number.", function() {
        function toBeTested() {
            new lu.Rectangle("5", 3, 7, 1);
        }

        QUnit.throws(toBeTested, "Tests that the constructor throws.");
    });

    QUnit.test("constructor throws if top is not of type number.", function() {
        function toBeTested() {
            new lu.Rectangle(2, "7", 9, 3);
        }

        QUnit.throws(toBeTested, "Tests that the constructor throws.");
    });

    QUnit.test("constructor throws if width is not of type number", function() {
        function toBeTested() {
            new lu.Rectangle(7, 1, "d", 8);
        }

        QUnit.throws(toBeTested, "Tests that the constructor throws.");
    });

    QUnit.test("constructor throws if height is not of type number", function() {
        function toBeTested() {
            new lu.Rectangle(7, 1, 8, "e");
        }

        QUnit.throws(toBeTested, "Tests that the constructor throws.");
    });
}());

// -------------------------------------------------------------------------
// left tests
// -------------------------------------------------------------------------

(function() {

    var rectangle = null;

    QUnit.module("Rectangle Tests - left property", {
        setup: function() {
            rectangle = new lu.Rectangle(5, 3, 7, 2);
        }
    });

    QUnit.test("left property returns the value received on constructor.", function() {
        QUnit.strictEqual(rectangle.left, 5, "Tests that returns the value received on constructor.");
    });

    QUnit.test("left property appears in the enumeration of properties.", function() {
        QUnit.propertyIsEnumerable(rectangle, "left", "Tests that left appears in the enumeration of properties.");
    });

    QUnit.test("left property cannot be redefined.", function() {
        QUnit.propertyCannotBeRedefined(rectangle, "left", "Tests that left cannot be redefined.");
    });
}());

// -------------------------------------------------------------------------
// top tests
// -------------------------------------------------------------------------

(function() {

    var rectangle = null;

    QUnit.module("Rectangle Tests - top property", {
        setup: function() {
            rectangle = new lu.Rectangle(5, 3, 7, 2);
        }
    });

    QUnit.test("top property returns the value received on constructor.", function() {
        QUnit.strictEqual(rectangle.top, 3, "Tests that returns the value received on constructor.");
    });

    QUnit.test("top property appears in the enumeration of properties.", function() {
        QUnit.propertyIsEnumerable(rectangle, "top", "Tests that top appears in the enumeration of properties.");
    });

    QUnit.test("top property cannot be redefined.", function() {
        QUnit.propertyCannotBeRedefined(rectangle, "top", "Tests top left cannot be redefined.");
    });
}());

// -------------------------------------------------------------------------
// width tests
// -------------------------------------------------------------------------

(function() {

    var rectangle = null;

    QUnit.module("Rectangle Tests - width property", {
        setup: function() {
            rectangle = new lu.Rectangle(5, 3, 7, 2);
        }
    });

    QUnit.test("width property returns the value received on constructor.", function() {
        QUnit.strictEqual(rectangle.width, 7, "Tests that returns the value received on constructor.");
    });

    QUnit.test("width property appears in the enumeration of properties.", function() {
        QUnit.propertyIsEnumerable(rectangle, "width", "Tests that width appears in the enumeration of properties.");
    });

    QUnit.test("width property cannot be redefined.", function() {
        QUnit.propertyCannotBeRedefined(rectangle, "width", "Tests width left cannot be redefined.");
    });
}());

// -------------------------------------------------------------------------
// height tests
// -------------------------------------------------------------------------

(function() {

    var rectangle = null;

    QUnit.module("Rectangle Tests - height property", {
        setup: function() {
            rectangle = new lu.Rectangle(5, 3, 7, 2);
        }
    });

    QUnit.test("height property returns the value received on constructor.", function() {
        QUnit.strictEqual(rectangle.height, 2, "Tests that returns the value received on constructor.");
    });

    QUnit.test("height property appears in the enumeration of properties.", function() {
        QUnit.propertyIsEnumerable(rectangle, "height", "Tests that height appears in the enumeration of properties.");
    });

    QUnit.test("height property cannot be redefined.", function() {
        QUnit.propertyCannotBeRedefined(rectangle, "height", "Tests height left cannot be redefined.");
    });
}());