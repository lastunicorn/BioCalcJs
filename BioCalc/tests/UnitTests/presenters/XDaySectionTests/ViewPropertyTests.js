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

describe("view property", function () {

    var xDaySection;
    var bioCalcPageData;
    var view;

    beforeEach(function () {
        bioCalcPageData = {
            biorhythmsChanged: jasmine.createSpyObj("Event", [
                "subscribe"
            ]),
            xDayChanged: jasmine.createSpyObj("Event", [
                "subscribe"
            ]),
            secondBirthdayChanged: jasmine.createSpyObj("Event", [
                "subscribe"
            ])
        };
        xDaySection = new lu.bioCalc.presenters.XDaySection(bioCalcPageData);

        view = jasmine.createSpyObj("XDaySectionView", [
            "setBiorhythms",
            "setXDay",
            "setTitle",
            "setSecondBirthday"
        ]);
    });

    it("throws if view is already set.", function () {
        xDaySection.view = view;

        function toBeTested() {
            xDaySection.view = {};
        }

        expect(toBeTested).toThrow();
    });

    it("throws if view is undefined.", function () {
        function toBeTested() {
            xDaySection.view = undefined;
        }

        expect(toBeTested).toThrow();
    });

    it("throws if view is null.", function () {
        function toBeTested() {
            xDaySection.view = null;
        }

        expect(toBeTested).toThrow();
    });

    it("initializes the list of displayed biorhythms.", function () {
        var biorhythms = {};
        bioCalcPageData.biorhythms = biorhythms;

        xDaySection.view = view;

        expect(view.setBiorhythms).toHaveBeenCalled();
        expect(view.setBiorhythms.mostRecentCall.args[0]).toBe(biorhythms);
    });

    it("initializes the displayed X day value.", function () {
        var xDay = new Date();
        bioCalcPageData.xDay = xDay;

        xDaySection.view = view;

        expect(view.setXDay).toHaveBeenCalled();
        expect(view.setXDay.mostRecentCall.args[0]).toBe(xDay);
    });

    it("initializes the displayed title.", function () {
        bioCalcPageData.xDay = new Date();

        xDaySection.view = view;

        expect(view.setTitle).toHaveBeenCalledWith(jasmine.any(String));
    });

    it("initializes the displayed second birthday.", function () {
        var secondBirthday = new Date();
        bioCalcPageData.secondBirthday = secondBirthday;

        xDaySection.view = view;

        expect(view.setSecondBirthday).toHaveBeenCalledWith(jasmine.any(Date));
        expect(view.setSecondBirthday.mostRecentCall.args[0]).toBe(secondBirthday);
    });

    it("subscribes to BioCalcPageData.biorhythmsChanged event.", function () {
        xDaySection.view = view;

        expect(bioCalcPageData.biorhythmsChanged.subscribe).toHaveBeenCalled();
    });

    it("subscribes to BioCalcPageData.xDayChanged event.", function () {
        xDaySection.view = view;

        expect(bioCalcPageData.xDayChanged.subscribe).toHaveBeenCalled();
    });

    it("subscribes to BioCalcPageData.secondBirthdayChanged event.", function () {
        xDaySection.view = view;

        expect(bioCalcPageData.secondBirthdayChanged.subscribe).toHaveBeenCalled();
    });
});