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
/// <reference path="SetBirthdayOnAllMocks.js" />
/// <reference path="../../../../sources/biorhythmModel/MultiplePersonsBiorhythms.js" />

(function () {

    QUnit.module("MultiplePersonsBiorhythms.setBirthdayOnAll Tests", {
        setup: function () {
            this.multiplePersonsBiorhythm = new lu.bioControls.biorhythmModel.MultiplePersonsBiorhythms();
            lu.bioControls.biorhythmModel.OnePersonBiorhythms.clearMocks();
        }
    });

    QUnit.test("setBirthdayOnAll is called on all persons if person name is not specified.", function () {
        this.multiplePersonsBiorhythm.addPerson("person1");
        this.multiplePersonsBiorhythm.addPerson("person2");
        var birthday = new Date();
        resetAllMocks();

        this.multiplePersonsBiorhythm.setBirthdayOnAll(birthday);

        for (var mockIndex in lu.bioControls.biorhythmModel.OnePersonBiorhythms.instances) {
            var instance = lu.bioControls.biorhythmModel.OnePersonBiorhythms.instances[mockIndex];
            QUnit.strictEqual(instance.setBirthdayOnAllCalls.length, 1, "Tests that one call is performed.");
        }
    });

    QUnit.test("The birthday is passed to all persons if person name is not specified.", function () {
        this.multiplePersonsBiorhythm.addPerson("person1");
        this.multiplePersonsBiorhythm.addPerson("person2");
        var birthday = new Date();
        resetAllMocks();

        this.multiplePersonsBiorhythm.setBirthdayOnAll(birthday);

        for (var mockIndex in lu.bioControls.biorhythmModel.OnePersonBiorhythms.instances) {
            var instance = lu.bioControls.biorhythmModel.OnePersonBiorhythms.instances[mockIndex];
            var firstCall = instance.setBirthdayOnAllCalls[0];
            QUnit.strictEqual(firstCall[0], birthday, "Tests that birthday is passed as parameter. " + firstCall);
        }
    });

    QUnit.test("The birthday is set only on specified person.", function () {
        this.multiplePersonsBiorhythm.addPerson("person1");
        this.multiplePersonsBiorhythm.addPerson("person2");
        this.multiplePersonsBiorhythm.addPerson("person3");
        var birthday = new Date();
        resetAllMocks();

        this.multiplePersonsBiorhythm.setBirthdayOnAll(birthday, "person2");

        var firstMock = lu.bioControls.biorhythmModel.OnePersonBiorhythms.instances[0];
        QUnit.strictEqual(firstMock.setBirthdayOnAllCalls.length, 0, "Tests that birthday is NOT set on the first mock.");
        var secondMock = lu.bioControls.biorhythmModel.OnePersonBiorhythms.instances[1];
        QUnit.strictEqual(secondMock.setBirthdayOnAllCalls.length, 1, "Tests that birthday is set on the second mock.");
        var thirdMock = lu.bioControls.biorhythmModel.OnePersonBiorhythms.instances[2];
        QUnit.strictEqual(thirdMock.setBirthdayOnAllCalls.length, 0, "Tests that birthday is NOT set on the third mock.");
    });

    QUnit.test("Does nothing if birthday is not a Date.", function () {
        this.multiplePersonsBiorhythm.addPerson("person1");
        var birthday = {};
        resetAllMocks();

        this.multiplePersonsBiorhythm.setBirthdayOnAll(birthday);

        for (var mockIndex in lu.bioControls.biorhythmModel.OnePersonBiorhythms.instances) {
            var instance = lu.bioControls.biorhythmModel.OnePersonBiorhythms.instances[mockIndex];
            var callCount = instance.setBirthdayOnAllCalls.length;
            QUnit.strictEqual(callCount, 0, "setBirthdayOnAll was called on mock '" + mockIndex + "' " + callCount + " times. No call was expected.");
        }
    });

    function resetAllMocks() {
        for (var instanceIndex in lu.bioControls.biorhythmModel.OnePersonBiorhythms.instances) {
            var instance = lu.bioControls.biorhythmModel.OnePersonBiorhythms.instances[instanceIndex];
            instance.resetMock();
        }
    }

}());