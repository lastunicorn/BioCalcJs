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
/// <reference path="../../../../sources/common/Event.js" />
/// <reference path="../../../../sources/common/LineStyle.js" />
/// <reference path="../../../../sources/biorhythmModel/BiorhythmShape.js" />
/// <reference path="../../../../sources/biorhythmModel/BiorhythmShapeSet.js" />

QUnit.module("BiorhythmShapeSet.getByName Tests");

QUnit.test("Returns null if items array is empty.", function () {
    var biorhythmShapeSet = new lu.bioControls.biorhythmModel.BiorhythmShapeSet([]);

    var actual = biorhythmShapeSet.getByName("some name");

    QUnit.strictEqual(actual, null, "Test");
});

QUnit.test("Returns null if one item exists but different name.", function () {
    var biorhythmShape0 = new lu.bioControls.biorhythmModel.BiorhythmShape();
    biorhythmShape0.name = "biorhythmShape 0";

    var biorhythmShapeSet = new lu.bioControls.biorhythmModel.BiorhythmShapeSet([
        biorhythmShape0
    ]);

    var actual = biorhythmShapeSet.getByName("inexistent name");

    QUnit.strictEqual(actual, null, "Test");
});

QUnit.test("Returns single item with matching name.", function () {
    var biorhythmShape0 = new lu.bioControls.biorhythmModel.BiorhythmShape();
    biorhythmShape0.name = "biorhythmShape 0";

    var biorhythmShapeSet = new lu.bioControls.biorhythmModel.BiorhythmShapeSet([
        biorhythmShape0
    ]);

    var actual = biorhythmShapeSet.getByName("biorhythmShape 0");

    QUnit.strictEqual(actual, biorhythmShape0, "Test");
});

QUnit.test("Returns item with matching name if is the first one.", function () {
    var biorhythmShape0 = new lu.bioControls.biorhythmModel.BiorhythmShape();
    biorhythmShape0.name = "biorhythmShape 0";

    var biorhythmShape1 = new lu.bioControls.biorhythmModel.BiorhythmShape();
    biorhythmShape1.name = "biorhythmShape 1";

    var biorhythmShape2 = new lu.bioControls.biorhythmModel.BiorhythmShape();
    biorhythmShape2.name = "biorhythmShape 2";

    var biorhythmShapeSet = new lu.bioControls.biorhythmModel.BiorhythmShapeSet([
        biorhythmShape0,
        biorhythmShape1,
        biorhythmShape2
    ]);

    var actual = biorhythmShapeSet.getByName("biorhythmShape 0");

    QUnit.strictEqual(actual, biorhythmShape0, "Test");
});

QUnit.test("Returns item with matching name if is middle one.", function () {
    var biorhythmShape0 = new lu.bioControls.biorhythmModel.BiorhythmShape();
    biorhythmShape0.name = "biorhythmShape 0";

    var biorhythmShape1 = new lu.bioControls.biorhythmModel.BiorhythmShape();
    biorhythmShape1.name = "biorhythmShape 1";

    var biorhythmShape2 = new lu.bioControls.biorhythmModel.BiorhythmShape();
    biorhythmShape2.name = "biorhythmShape 2";

    var biorhythmShapeSet = new lu.bioControls.biorhythmModel.BiorhythmShapeSet([
        biorhythmShape0,
        biorhythmShape1,
        biorhythmShape2
    ]);

    var actual = biorhythmShapeSet.getByName("biorhythmShape 1");

    QUnit.strictEqual(actual, biorhythmShape1, "Test");
});

QUnit.test("Returns item with matching name if is the last one.", function () {
    var biorhythmShape0 = new lu.bioControls.biorhythmModel.BiorhythmShape();
    biorhythmShape0.name = "biorhythmShape 0";

    var biorhythmShape1 = new lu.bioControls.biorhythmModel.BiorhythmShape();
    biorhythmShape1.name = "biorhythmShape 1";

    var biorhythmShape2 = new lu.bioControls.biorhythmModel.BiorhythmShape();
    biorhythmShape2.name = "biorhythmShape 2";

    var biorhythmShapeSet = new lu.bioControls.biorhythmModel.BiorhythmShapeSet([
        biorhythmShape0,
        biorhythmShape1,
        biorhythmShape2
    ]);

    var actual = biorhythmShapeSet.getByName("biorhythmShape 2");

    QUnit.strictEqual(actual, biorhythmShape2, "Test");
});