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
/// <reference path="../../../../sources/scripts/presenters/XDaySection.js" />

describe("XDaySection", function () {

    var bioCalcPageData;
    var xDaySection;
    var view;

    beforeEach(function () {
        bioCalcPageData = {
            biorhythmsChanged: jasmine.createSpyObj("Event", [ "subscribe" ]),
            xDayChanged: jasmine.createSpyObj("Event", [ "subscribe" ]),
            secondBirthdayChanged: jasmine.createSpyObj("Event", [ "subscribe" ])
        };

        xDaySection = new lu.bioCalc.presenters.XDaySection(bioCalcPageData);

        view = jasmine.createSpyObj("XDaySectionView", [
            "setBiorhythms",
            "setXDay",
            "setTitle",
            "setSecondBirthday"
        ]);
    });

    it("updates the displayed X day when BioCalcPageData.secondBirthdayChanged is raised.", function () {
        var secondBirthday = new Date();
        bioCalcPageData.secondBirthday = secondBirthday;
        var secondBirthdayChangedSubscriber = null;
        bioCalcPageData.secondBirthdayChanged.subscribe.andCallFake(function (subscriber) {
            secondBirthdayChangedSubscriber = subscriber;
        });

        xDaySection.view = view;
        view.setSecondBirthday.reset();

        secondBirthdayChangedSubscriber();

        expect(view.setSecondBirthday).toHaveBeenCalled();
        expect(view.setSecondBirthday.mostRecentCall.args[0]).toBe(secondBirthday);
    });

});