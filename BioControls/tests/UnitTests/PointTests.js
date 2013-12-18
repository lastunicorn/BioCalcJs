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
/// <reference path="QUnitExtensions.js" />
/// <reference path="../../sources/helpers/Point.js" />

// -------------------------------------------------------------------------
// constructor tests
// -------------------------------------------------------------------------

(function() {

    QUnit.module("Point Tests");

    QUnit.test("constructor throws if x is not of type number.", function() {
        function toBeTested() {
            new lu.Point("5", 3);
        }

        QUnit.throws(toBeTested, "Tests that the constructor throws.");
    });

    QUnit.test("constructor throws if y is not of type number.", function() {
        function toBeTested() {
            new lu.Point(2, "7");
        }

        QUnit.throws(toBeTested, "Tests that the constructor throws.");
    });
}());

// -------------------------------------------------------------------------
// x tests
// -------------------------------------------------------------------------

(function() {

    var point = null;

    QUnit.module("Point Tests - x property", {
        setup: function() {
            point = new lu.Point(7, 9);
        }
    });

    QUnit.test("x property returns the value received on constructor.", function() {
        QUnit.strictEqual(point.x, 7, "Tests that returns the value received on constructor.");
    });

    QUnit.test("x property appears in the enumeration of properties.", function() {
        QUnit.propertyIsEnumerable(point, "x", "Tests that x appears in the enumeration of properties.");
    });

    QUnit.test("x property cannot be redefined.", function() {
        QUnit.propertyCannotBeRedefined(point, "x", "Tests that x cannot be redefined.");
    });
}());

// -------------------------------------------------------------------------
// y tests
// -------------------------------------------------------------------------

(function() {

    var point = null;

    QUnit.module("Point Tests - y property", {
        setup: function() {
            point = new lu.Point(5, 7);
        }
    });

    QUnit.test("y property returns the value received on constructor.", function() {
        QUnit.strictEqual(point.y, 7, "Tests that returns the value received on constructor.");
    });

    QUnit.test("y property appears in the enumeration of properties.", function() {
        QUnit.propertyIsEnumerable(point, "y", "Tests that y appears in the enumeration of properties.");
    });

    QUnit.test("y property cannot be redefined.", function() {
        QUnit.propertyCannotBeRedefined(point, "y", "Tests that y cannot be redefined.");
    });
}());