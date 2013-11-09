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

QUnit.extend(QUnit, {
    inArray: function(actual, expectedValues, message) {
        ok(expectedValues.indexOf(actual) !== -1, message);
    },

    arraysAreEquivalent: function(actual, expected, message) {
        QUnit.strictEqual(actual.length, expected.length, "Tests that the lengths of the arrays are equal.");
        
        for (var i = 0; i < actual.length; i++) {
            QUnit.inArray(actual[i], expected, "Tests that the element " + i + " from the actual array exists in the expected array.");
        }
    },

    propertyIsEnumerable: function(object, propName, message) {
        for ( var prop in object) {
            if (prop === propName) {
                ok(true, message);
                return;
            }
        }

        ok(false, message);
    },

    propertyCannotBeRedefined: function(object, propName, message) {
        function toBeTested() {
            Object.defineProperty(object, propName, {
                value: 1
            });
        }

        QUnit.throws(toBeTested, message);
    },

    testMultiple: function(testCases, test) {
        if (typeof test != "function") {
            return;
        }

        for (var i = 0; i < testCases.length; i++) {
            if (testCases[i] instanceof Array) {
                test.apply(this, testCases[i]);
            } else {
                test.call(this, testCases[i]);
            }
        }
    }
});