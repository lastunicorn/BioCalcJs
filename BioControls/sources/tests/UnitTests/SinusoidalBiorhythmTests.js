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

    QUnit.module("SinusoidalBiorhythm Tests");

    QUnit.test("constructor throws if period is not of type number.", function() {
        function toBeTested() {
            new lu.bioControls.biorhythms.SinusoidalBiorhythm("5");
        }

        QUnit.throws(toBeTested, "Tests that the constructor throws.");
    });

    QUnit.test("period is initialized with 0 if not provided.", function() {
        var biorhythm = new lu.bioControls.biorhythms.SinusoidalBiorhythm();

        QUnit.strictEqual(biorhythm.period, 0, "Tests that the period is 0.");
    });

    QUnit.test("getValue returns 0 for any dayIndex if period is not provided", function() {
        var biorhythm = new lu.bioControls.biorhythms.SinusoidalBiorhythm();

        QUnit.testMultiple([ 0, 1, 2, 3, 7, 10, 18 ], function(dayIndex) {
            QUnit.strictEqual(biorhythm.getValue(dayIndex), 0, "Tests that getValue returns 0 for " + dayIndex + ".");
        });
    });

    QUnit.test("getValue returns 0 for dayIndexes that are multiple of the period.", function() {
        var biorhythm = new lu.bioControls.biorhythms.SinusoidalBiorhythm(8);

        QUnit.testMultiple([ 0, 8, 16, 24, 32, 40, 48, 56, 64 ], function(dayIndex) {
            QUnit.strictEqual(biorhythm.getValue(dayIndex), 0, "Tests that getValue returns 0 for " + dayIndex + ".");
        });
    });

    QUnit.test("getValue returns values diffeent then 0 for dayIndexes that are not multiple of the period.", function() {
        var biorhythm = new lu.bioControls.biorhythms.SinusoidalBiorhythm(8);

        QUnit.testMultiple([ 2, 4, 9, 10, 25, 41 ], function(dayIndex) {
            QUnit.notStrictEqual(biorhythm.getValue(dayIndex), 0, "Tests that getValue returns value different then 0 for " + dayIndex + ".");
        });
    });
}());
