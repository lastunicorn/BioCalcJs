// BioCalc
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

/// <reference path="../../../../libraries/jasmine/jasmine.js" />
/// <reference path="../../../../sources/scripts/helpers/DateFormatter.js" />
/// <reference path="../../../../sources/scripts/presenters/BirthdaySection.js" />

describe("BirthdaySection.view property", function () {
    var view;
    var bioCalcPageData;
    var birthdaySection;

    beforeEach(function () {
        view = jasmine.createSpyObj("BirthdaySectionView", [
            "setBirthdayText",
            "setSecondBirthdayText"
        ]);

        bioCalcPageData = {};
        bioCalcPageData.birthdayChanged = jasmine.createSpyObj("Event", [
            "subscribe"
        ]);
        bioCalcPageData.secondBirthdayChanged = jasmine.createSpyObj("Event", [
            "subscribe"
        ]);

        birthdaySection = new lu.bioCalc.presenters.BirthdaySection(bioCalcPageData);
    });

    it("sets the presenter in view.", function () {
        birthdaySection.view = view;

        expect(view.presenter).not.toBeUndefined();
        expect(view.presenter).not.toBeNull();
        expect(typeof view.presenter).toBe("object");
    });

    it("throws if view already associated.", function () {
        birthdaySection.view = view;

        function toBeTested() {
            birthdaySection.view = {};
        }

        expect(toBeTested).toThrow();
    });

    it("throws if view is undefined.", function(){
        function toBeTested(){
            birthdaySection.view = undefined;
        }

        expect(toBeTested).toThrow();
    });

    it("throws if view is null.", function(){
        function toBeTested(){
            birthdaySection.view = null;
        }

        expect(toBeTested).toThrow();
    });

    it("sets initial birthday value in view.", function () {
        var birthday = new Date()
        bioCalcPageData.birthday = birthday;

        birthdaySection.view = view;

        expect(view.setBirthdayText).toHaveBeenCalled();
    });

    it("sets initial second birthday value in view.", function () {
        var birthday = new Date()
        bioCalcPageData.secondBirthday = birthday;

        birthdaySection.view = view;

        expect(view.setSecondBirthdayText).toHaveBeenCalled();
    });

    it("subscribes to birthdayChanged event.", function () {
        birthdaySection.view = view;

        expect(bioCalcPageData.birthdayChanged.subscribe).toHaveBeenCalledWith(jasmine.any(Function));
    });

    it("subscribes to secondBirthdayChanged event.", function () {
        birthdaySection.view = view;

        expect(bioCalcPageData.secondBirthdayChanged.subscribe).toHaveBeenCalledWith(jasmine.any(Function));
    });
});