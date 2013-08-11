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

(function() {

    QUnit.module("Line Tests", {
        setup: function() {
            lu.Point = function() {
            };
        }
    });

    // -------------------------------------------------------------------------
    // constructor tests
    // -------------------------------------------------------------------------

    QUnit.test("constructor throws if startPoint is not lu.Point.", function() {
        function toBeTested() {
            new lu.Line({}, new lu.Point());
        }

        QUnit.throws(toBeTested, "Tests that the constructor throws.");
    });

    QUnit.test("constructor throws if endPoint is not lu.Point.", function() {
        function toBeTested() {
            new lu.Line(new lu.Point());
        }

        QUnit.throws(toBeTested, "Tests that the constructor throws.");
    });

    // -------------------------------------------------------------------------
    // startPoint tests
    // -------------------------------------------------------------------------

    QUnit.test("startPoint property returns the value received on constructor.", function() {
        var expected = new lu.Point();
        var line = new lu.Line(expected, new lu.Point());

        var actual = line.startPoint;

        QUnit.strictEqual(actual, expected, "Tests that returns the value received on constructor.");
    });

    QUnit.test("startPoint property appears in the enumeration of properties.", function() {
        var line = new lu.Line(new lu.Point(), new lu.Point());

        QUnit.enumeratesProperty(line, "startPoint", "Tests that startPoint appears in the enumeration of properties.");
    });

    QUnit.test("startPoint property cannot be redefined.", function() {
        var line = new lu.Line(new lu.Point(), new lu.Point());

        QUnit.canRedefineProperty(line, "startPoint", "Tests that startPoint cannot be redefined.");
    });

    // -------------------------------------------------------------------------
    // endPoint tests
    // -------------------------------------------------------------------------

    QUnit.test("endPoint property returns the value received on constructor.", function() {
        var expected = new lu.Point();
        var line = new lu.Line(new lu.Point(), expected);

        var actual = line.endPoint;

        QUnit.strictEqual(actual, expected, "Tests that returns the value received on constructor.");
    });

    QUnit.test("endPoint property appears in the enumeration of properties.", function() {
        var line = new lu.Line(new lu.Point(), new lu.Point());

        QUnit.enumeratesProperty(line, "endPoint", "Tests that endPoint appears in the enumeration of properties.");
    });

    QUnit.test("endPoint property cannot be redefined.", function() {
        var line = new lu.Line(new lu.Point(), new lu.Point());

        QUnit.canRedefineProperty(line, "endPoint", "Tests that endPoint cannot be redefined.");
    });

    // -------------------------------------------------------------------------
    // 
    // -------------------------------------------------------------------------

    QUnit.extend(QUnit, {
        enumeratesProperty: function(object, propName, message) {
            var isOk = false;
            for ( var prop in object) {
                if (prop === propName) {
                    isOk = true;
                    break;
                }
            }

            if (isOk) {
                ok(true, message);
            } else {
                ok(false, message);
            }
        },
        canRedefineProperty: function(object, propName, message) {
            function toBeTested() {
                Object.defineProperty(object, propName, {
                    value: 1
                });
            }

            QUnit.throws(toBeTested, message);
        }
    });
}());