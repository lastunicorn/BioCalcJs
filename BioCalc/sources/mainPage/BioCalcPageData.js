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

lu.Namespacing.ensureNamespace("lu.bioCalc.mainPage");

(function (Event) {

    /**
     * The service that provides data and communication between different modules of
     * the page.
     */
    lu.bioCalc.mainPage.BioCalcPageData = function () {

        // --------------------------------------------------------------------------
        // birthday property
        // --------------------------------------------------------------------------

        var birthday = null;
        var birthdayChangedEvent = new Event();
        this.birthdayChanged = birthdayChangedEvent.client;

        Object.defineProperty(this, "birthday", {
            enumerable: true,
            configurable: false,
            get: getBirthday,
            set: setBirthday
        });

        function getBirthday() {
            return birthday;
        }

        function setBirthday(value) {
            birthday = value;
            birthdayChangedEvent.raise(this, value);
        }

        // --------------------------------------------------------------------------
        // secondBirthday property
        // --------------------------------------------------------------------------

        var secondBirthday = null;
        var secondBirthdayChangedEvent = new Event();
        this.secondBirthdayChanged = secondBirthdayChangedEvent.client;

        Object.defineProperty(this, "secondBirthday", {
            enumerable: true,
            configurable: false,
            get: getSecondBirthday,
            set: setSecondBirthday
        });

        function getSecondBirthday() {
            return secondBirthday;
        }

        function setSecondBirthday(value) {
            secondBirthday = value;
            secondBirthdayChangedEvent.raise(this, value);
        }

        // --------------------------------------------------------------------------
        // xDay property
        // --------------------------------------------------------------------------

        var xDay = null;
        var xDayChangedEvent = new Event();
        this.xDayChanged = xDayChangedEvent.client;

        Object.defineProperty(this, "xDay", {
            enumerable: true,
            configurable: false,
            get: getXDay,
            set: setXDay
        });

        function getXDay() {
            return xDay;
        }

        function setXDay(value) {
            xDay = value;
            xDayChangedEvent.raise(this, value);
        }

        // --------------------------------------------------------------------------
        // biorhythms property
        // --------------------------------------------------------------------------

        var biorhythms = null;
        var biorhythmsChangedEvent = new Event();
        this.biorhythmsChanged = biorhythmsChangedEvent.client;

        Object.defineProperty(this, "biorhythms", {
            enumerable: true,
            configurable: false,
            get: getBiorhythms,
            set: setBiorhythms
        });

        function getBiorhythms() {
            return biorhythms;
        }

        function setBiorhythms(value) {
            biorhythms = value;
            biorhythmsChangedEvent.raise(this, value);
        }
    };

}(lu.Event));