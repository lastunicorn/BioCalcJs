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
/// <reference path="AddPersonMocks.js" />
/// <reference path="../../../../sources/biorhythmModel/MultiplePersonsBiorhythms.js" />

QUnit.module("MultiplePersonsBiorhythms.addPerson Tests");

QUnit.test("OnePersonBiorhythms instance is created for a new person.", function () {
    var multiplePersonsBiorhythm = new lu.bioControls.biorhythmModel.MultiplePersonsBiorhythms();
    lu.bioControls.biorhythmModel.OnePersonBiorhythms.instanceCount = 0;

    multiplePersonsBiorhythm.addPerson("person1");

    QUnit.strictEqual(lu.bioControls.biorhythmModel.OnePersonBiorhythms.instanceCount, 1, "Test");
});

QUnit.test("OnePersonBiorhythms is not instanciated if another person with the same name already exists.", function () {
    var multiplePersonsBiorhythm = new lu.bioControls.biorhythmModel.MultiplePersonsBiorhythms();
    multiplePersonsBiorhythm.addPerson("person1");
    lu.bioControls.biorhythmModel.OnePersonBiorhythms.instanceCount = 0;

    multiplePersonsBiorhythm.addPerson("person1");

    QUnit.strictEqual(lu.bioControls.biorhythmModel.OnePersonBiorhythms.instanceCount, 0, "Test");
});

QUnit.test("The name is set in the new OnePersonBiorhythms instance.", function () {
    var multiplePersonsBiorhythm = new lu.bioControls.biorhythmModel.MultiplePersonsBiorhythms();

    multiplePersonsBiorhythm.addPerson("person1");

    QUnit.strictEqual(lu.bioControls.biorhythmModel.OnePersonBiorhythms.instances[0].name, "person1", "Test");
});