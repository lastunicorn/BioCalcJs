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

/// <reference path="../../../libraries/qUnit/qunit-1.12.0.js" />
/// <reference path="../QUnitExtensions.js" />
/// <reference path="LineTestsMocks.js" />
/// <reference path="../../../sources/helpers/Line.js" />

(function() {

    // -------------------------------------------------------------------------
    // endPoint tests
    // -------------------------------------------------------------------------

    var line = null;
    var startPoint = null;
    var endPoint = null;

    QUnit.module("Line Tests - endPoint property", {
        setup: function() {
            startPoint = new lu.Point();
            endPoint = new lu.Point();
            line = new lu.Line(startPoint, endPoint);
        },
        teardown: function() {
            delete line;
            delete startPoint;
            delete endPoint;
        }
    });

    QUnit.test("endPoint property returns the value received on constructor.", function() {
        QUnit.strictEqual(line.endPoint, endPoint, "Tests that returns the value received on constructor.");
    });

    QUnit.test("endPoint property appears in the enumeration of properties.", function() {
        QUnit.propertyIsEnumerable(line, "endPoint", "Tests that endPoint appears in the enumeration of properties.");
    });

    QUnit.test("endPoint property cannot be redefined.", function() {
        QUnit.propertyCannotBeRedefined(line, "endPoint", "Tests that endPoint cannot be redefined.");
    });
}());