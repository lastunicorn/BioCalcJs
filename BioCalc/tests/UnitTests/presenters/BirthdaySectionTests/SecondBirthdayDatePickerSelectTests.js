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

describe("BirthdaySection onSecondBirthdayDatePickerSelect() event handler", function () {
    var view;
    var bioCalcPageData;
    var birthdaySection;

    beforeEach(function () {
        view = jasmine.createSpyObj("BirthdaySectionView", [
            "setBirthdayText",
            "setSecondBirthdayText",
            "getSecondBirthday"
        ]);

        bioCalcPageData = {};
        bioCalcPageData.birthdayChanged = jasmine.createSpyObj("Event", [
            "subscribe"
        ]);
        bioCalcPageData.secondBirthdayChanged = jasmine.createSpyObj("Event", [
            "subscribe"
        ]);

        birthdaySection = new lu.bioCalc.presenters.BirthdaySection(bioCalcPageData);

        birthdaySection.view = view;
    });

    it("publishes the birthday from view to the page-data object.", function () {
        var birthday = new Date();
        view.getSecondBirthday.andReturn(birthday);

        view.presenter.onSecondBirthdayDatePickerSelect();

        expect(bioCalcPageData.secondBirthday).toBe(birthday);
    });
});