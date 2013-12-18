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
/// <reference path="../../sources/helpers/DateUtil.js" />

(function() {

    QUnit.module("DateUtil tests - addDays method");

    QUnit.test("returns a Date object.", function() {
        var date = new Date(1980, 05, 13);

        var actual = lu.DateUtil.addDays(date, 1);

        QUnit.ok(actual instanceof Date, "Tests that the value returned is a Date object.");
    });

    QUnit.test("add 5 days to a Date.", function() {
        var date = new Date(1980, 05, 13);
        var expectedMiliseconds = new Date(1980, 05, 18).getTime();

        var actual = lu.DateUtil.addDays(date, 5);
        var actualMiliseconds = actual.getTime();

        QUnit.strictEqual(actualMiliseconds, expectedMiliseconds, "Tests that the value returned has 5 days more.");
    });

    QUnit.test("add 5 days to a number.", function() {
        var dateInMiliseconds = new Date(1980, 05, 10).getTime();
        var expectedMiliseconds = new Date(1980, 05, 20).getTime();

        var actual = lu.DateUtil.addDays(dateInMiliseconds, 10);
        var actualMiliseconds = actual.getTime();

        QUnit.strictEqual(actualMiliseconds, expectedMiliseconds, "Tests that the value returned has 10 days more.");
    });

    QUnit.test("throws if date is not a Date.", function() {

        QUnit.testMultiple([ {}, true, null, undefined ], function(date) {
            function toBeTested() {
                lu.DateUtil.addDays(date, 10);
            }

            QUnit.throws(toBeTested, "Tests that addDays throws if date is " + date + ".");
        });
    });

    QUnit.test("throws if daysToAdd is not a number.", function() {

        QUnit.testMultiple([ {}, true, null, undefined ], function(daysToAdd) {
            function toBeTested() {
                lu.DateUtil.addDays(Date.now(), daysToAdd);
            }

            QUnit.throws(toBeTested, "Tests that addDays throws if daysToAdd is " + daysToAdd + ".");
        });
    });
}());

(function() {

    QUnit.module("DateUtil tests - daysToMiliseconds method");

    QUnit.test("returns 0 for 0 days.", function() {
        var actual = lu.DateUtil.daysToMiliseconds(0);

        QUnit.strictEqual(actual, 0, "Tests the returned value is 0.");
    });

    QUnit.test("returns 86.400.000 for 1 day.", function() {
        var actual = lu.DateUtil.daysToMiliseconds(1);

        QUnit.strictEqual(actual, 86400000, "Tests the returned value is 86.400.000.");
    });

    QUnit.test("returns -86.400.000 for -1 day.", function() {
        var actual = lu.DateUtil.daysToMiliseconds(-1);

        QUnit.strictEqual(actual, -86400000, "Tests the returned value is -86.400.000.");
    });

    QUnit.test("returns 172.800.000 for 2 day.", function() {
        var actual = lu.DateUtil.daysToMiliseconds(2);

        QUnit.strictEqual(actual, 172800000, "Tests the returned value is 172.800.000.");
    });

    QUnit.test("returns 864.000.000 for 10 day.", function() {
        var actual = lu.DateUtil.daysToMiliseconds(10);

        QUnit.strictEqual(actual, 864000000, "Tests the returned value is 864.000.000.");
    });
}());