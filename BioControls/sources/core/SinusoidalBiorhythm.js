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
lu.bioControls.core = lu.bioControls.core || {};
lu.bioControls.core.biorhythms = lu.bioControls.core.biorhythms || {};

/**
 * Represents a sinusoidal biorhythm.
 * 
 * @returns {lu.bioControls.core.biorhythms.SinusoidalBiorhythm}
 */
lu.bioControls.core.biorhythms.SinusoidalBiorhythm = function(periodLength) {

    var values = [];

    /**
     * @deprecated Use the periodLength property instead.
     */
    this.getPeriodLength = getPeriodLength;

    function getPeriodLength() {
        return periodLength;
    }

    /**
     * @deprecated Use the constructor to pass the periodLength.
     */
    this.setPeriodLength = function(value) {
        periodLength = value;
        generateValues();
    };

    Object.defineProperty(this, "periodLength", {
        enumerable: true,
        configurable: false,
        get: getPeriodLength
    });

    this.getValue = function(dayIndex) {
        var index = dayIndex % periodLength;

        if (index < 0) {
            index += periodLength;
        }

        return values[index];
    };

    function generateValues() {
        values = [];

        for ( var i = 0; i < periodLength; i++) {
            values[i] = Math.sin(i * 2 * Math.PI / periodLength);
        }
    }

    (function initialize() {
        if (typeof periodLength !== undefined) {
            if (typeof periodLength !== "number") {
                throw "periodLength should be a number.";
            }

            generateValues();
        } else {
            periodLength = 0;
        }
    }());
};