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

var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythms = lu.bioControls.biorhythms || {};

/**
 * Represents a biorhythm that has a sinusoidal form.
 * 
 * @param period
 *            An integer (number of days) that represents the period of the
 *            sinusoid function.
 * 
 * @returns {lu.bioControls.biorhythms.SinusoidalBiorhythm}
 */
lu.bioControls.biorhythms.SinusoidalBiorhythm = function(period) {

    var birthday = Date(80, 05, 13);
    var values = [];

    Object.defineProperty(this, "period", {
        enumerable: true,
        configurable: false,
        get: getPeriod
    });

    function getPeriod() {
        return period;
    }

    function setPeriod(value) {
        period = value;
        generateValues();
    }

    var birthdayChangedEvent = new lu.Event();
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
        if (typeof value !== "object" || !(value instanceof Date)) {
            throw "birthday should be a Date.";
        }

        if (value === birthday) {
            return;
        }

        birthday = value;
        birthdayChangedEvent.raise(this, value);
    }

    this.getValue = function(day) {
        if (typeof day === "number") {
            return getValueByIndex(day);
        }

        if (typeof day === "object" && day instanceof Date) {
            return getValueByDate(day);
        }

        return 0;
    };

    function getValueByIndex(dayIndex) {
        if (period == 0) {
            return 0;
        }

        var index = dayIndex % period;

        if (index < 0) {
            index += period;
        }

        return values[index];
    }

    function getValueByDate(date) {
        var milisecondsLived = date - birthday;
        var daysLived = lu.DateUtil.milisecondsToWholeDays(milisecondsLived);

        return getValueByIndex(daysLived);
    }

    function generateValues() {
        values.length = 0;

        for ( var i = 0; i < period; i++) {
            values[i] = Math.sin(i * 2 * Math.PI / period);
        }
    }

    (function initialize() {
        if (typeof period === "undefined") {
            period = 0;
        }

        if (typeof period !== "number") {
            throw "period should be a number.";
        }

        generateValues();
    }());
};