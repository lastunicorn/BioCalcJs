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

/**
 * The service that provides data and communication between different modules of
 * the page.
 * 
 * @param Event
 *            Object constructor. Keeps a list of functions and calls them one
 *            by one when the event is raised.
 * 
 * @returns {lu.bioCalc.mainPage.BioCalcPageData}
 */
lu.bioCalc.mainPage.BioCalcPageData = (function(Event) {

    var obj = {};

    // --------------------------------------------------------------------------
    // birthday property
    // --------------------------------------------------------------------------

    var birthday = null;
    var birthdayChangedEvent = new Event();
    obj.birthdayChanged = birthdayChangedEvent.client;

    Object.defineProperty(obj, "birthday", {
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
    // xDay property
    // --------------------------------------------------------------------------

    var xDay = null;
    var xDayChangedEvent = new Event();
    obj.xDayChanged = xDayChangedEvent.client;

    Object.defineProperty(obj, "xDay", {
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
    obj.biorhythmsChanged = biorhythmsChangedEvent.client;

    Object.defineProperty(obj, "biorhythms", {
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

    // --------------------------------------------------------------------------
    // Return
    // --------------------------------------------------------------------------

    return obj;
}(lu.Event));