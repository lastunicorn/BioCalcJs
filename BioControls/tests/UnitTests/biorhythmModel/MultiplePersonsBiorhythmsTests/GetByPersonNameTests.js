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
/// <reference path="GetByPersonNameMocks.js" />
/// <reference path="../../../../sources/biorhythmModel/MultiplePersonsBiorhythms.js" />

QUnit.module("MultiplePersonsBiorhythms.getByPersonName Tests", {
    setup: function () {
        this.multiplePersonsBiorhythm = new lu.bioControls.biorhythmModel.MultiplePersonsBiorhythms();
    }
});

QUnit.test("Throws if there is no person", function () {
    function toBeTested() {
        this.multiplePersonsBiorhythm.getByPerson("person1");
    }

    QUnit.throws(toBeTested, "Test");
});

QUnit.test("The person's object is returned if there is only that person.", function () {
    this.multiplePersonsBiorhythm.addPerson("person1");

    var actual = this.multiplePersonsBiorhythm.getByPerson("person1");

    QUnit.ok(actual instanceof lu.bioControls.biorhythmModel.OnePersonBiorhythms, "Test");
    QUnit.strictEqual(actual.name, "person1", "Test");
});

QUnit.test("The person's object is returned if there are multiple persons.", function () {
    this.multiplePersonsBiorhythm.addPerson("person1");
    this.multiplePersonsBiorhythm.addPerson("person2");
    this.multiplePersonsBiorhythm.addPerson("person3");

    var actual = this.multiplePersonsBiorhythm.getByPerson("person2");

    QUnit.strictEqual(actual.name, "person2", "Test");
});

QUnit.test("Throws if no person has the required name.", function () {
    this.multiplePersonsBiorhythm.addPerson("person1");
    this.multiplePersonsBiorhythm.addPerson("person2");
    this.multiplePersonsBiorhythm.addPerson("person3");

    function toBeTested() {
        this.multiplePersonsBiorhythm.getByPerson("person10");
    }

    QUnit.throws(toBeTested, "Test");
});