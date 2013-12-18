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
/// <reference path="../../../sources/helpers/Event.js" />
/// <reference path="../../../sources/helpers/DateUtil.js" />
/// <reference path="../../../sources/BioControlsError.js" />
/// <reference path="../../../sources/biorhythms/SinusoidalBiorhythm.js" />
/// <reference path="../../../sources/biorhythms/EmotionalBiorhythm.js" />
/// <reference path="../../../sources/compatibility/ArgumentIsNotDateError.js" />
/// <reference path="../../../sources/compatibility/PeriodsIsNotNumberError.js" />
/// <reference path="../../../sources/compatibility/DisplacementCalculatorNotSetError.js" />
/// <reference path="../../../sources/compatibility/DisplacementCosPercentCalculator.js" />
/// <reference path="../../../sources/compatibility/CompatibilityCalculator.js" />

QUnit.module("CompatibilityCalculatorTests", {
    setup: function () {
        this.compatibilityCalculator = new lu.bioControls.compatibility.CompatibilityCalculator();
    },
    teardown: function () {
        delete this.compatibilityCalculator;
    }
});

QUnit.test("Interval sent to displacementCalculator is 0 for same birthday.", function () {
    var birthday = new Date(Date.now());
    var actualInterval = null;
    this.compatibilityCalculator.displacementCalculator = {
        calculate: function (interval, period) {
            actualInterval = interval;
        }
    };

    this.compatibilityCalculator.calculate(birthday, birthday, 5);

    QUnit.strictEqual(actualInterval, 0, "Test");
});

QUnit.test("Interval sent to displacementCalculator is 1 for birthdays that differ by 1 day.", function () {
    var birthday1 = new Date(1980, 05, 13);
    var birthday2 = new Date(1980, 05, 14);
    var actualInterval = null;
    this.compatibilityCalculator.displacementCalculator = {
        calculate: function (interval, period) {
            actualInterval = interval;
        }
    };

    this.compatibilityCalculator.calculate(birthday1, birthday2, 5);

    QUnit.strictEqual(actualInterval, 1, "Test");
});

QUnit.test("Period sent to displacementCalculator is the one received as parameter.", function () {
    var birthday1 = new Date(Date.now());
    var birthday2 = new Date(Date.now());
    var actualPeriod = null;
    this.compatibilityCalculator.displacementCalculator = {
        calculate: function (interval, period) {
            actualPeriod = period;
        }
    };

    this.compatibilityCalculator.calculate(birthday1, birthday2, 5);

    QUnit.strictEqual(actualPeriod, 5, "Test");
});

QUnit.test("Throws if first parameter is not a Date.", function () {
    var compatibilityCalculator = this.compatibilityCalculator;
    var birthday2 = new Date(Date.now());

    function toBeTested() {
        compatibilityCalculator.calculate(null, birthday2);
    }

    QUnit.throws(toBeTested, lu.bioControls.compatibility.ArgumentIsNotDateError, "Test");
});

QUnit.test("Throws if second parameter is not Date.", function () {
    var compatibilityCalculator = this.compatibilityCalculator;
    var birthday1 = new Date(Date.now());

    function toBeTested() {
        compatibilityCalculator.calculate(birthday1, null);
    }

    QUnit.throws(toBeTested, lu.bioControls.compatibility.ArgumentIsNotDateError, "Test");
});

QUnit.test("Throws if period is not a Number.", function () {
    var compatibilityCalculator = this.compatibilityCalculator;
    var birthday1 = new Date(1980, 05, 13);
    var birthday2 = new Date(1980, 05, 23);

    function toBeTested() {
        compatibilityCalculator.calculate(birthday1, birthday2);
    }

    QUnit.throws(toBeTested, lu.bioControls.compatibility.PeriodsIsNotNumberError, "Test")
});

QUnit.test("Throws if displacementCalculator is not set.", function () {
    var compatibilityCalculator = this.compatibilityCalculator;
    var birthday1 = new Date(1980, 05, 13);
    var birthday2 = new Date(1980, 05, 23);

    function toBeTested() {
        compatibilityCalculator.calculate(birthday1, birthday2, 5);
    }

    QUnit.throws(toBeTested, lu.bioControls.compatibility.DisplacementCalculatorNotSetError, "Tests that it throws if displacementCalculator is not set.");
});