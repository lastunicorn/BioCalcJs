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

/// <reference path="../../../../libraries/qUnit/qunit-1.12.0.js" />
/// <reference path="../../../../sources/biorhythmModel/BiorhythmShapeSet.js" />

QUnit.module("BiorhythmShapeSet.initializer Tests");

QUnit.test("Throws if items is undefined.", function () {
    function toBeTested() {
        new lu.bioControls.biorhythmModel.BiorhythmShapeSet();
    }

    QUnit.throws(toBeTested, "Test");
});

QUnit.test("Throws if items is null.", function () {
    function toBeTested() {
        new lu.bioControls.biorhythmModel.BiorhythmShapeSet(null);
    }

    QUnit.throws(toBeTested, "Test");
});

QUnit.test("Throws if items is not Array.", function () {
    function toBeTested() {
        new lu.bioControls.biorhythmModel.BiorhythmShapeSet({});
    }

    QUnit.throws(toBeTested, "Test");
});