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
lu.bioControls.core.biorhythms.SinusoidalBiorhythm = function(period) {

    var values = [];

    /**
     * @deprecated Use the period property instead.
     */
    this.getPeriodLength = getPeriod;

    function getPeriod() {
        return period;
    }

    /**
     * @deprecated Use the constructor to pass the periodLength.
     */
    this.setPeriodLength = function(value) {
        period = value;
        generateValues();
    };

    Object.defineProperty(this, "period", {
        enumerable: true,
        configurable: false,
        get: getPeriod
    });

    this.getValue = function(dayIndex) {
        if (period == 0) {
            return 0;
        }

        var index = dayIndex % period;

        if (index < 0) {
            index += period;
        }

        return values[index];
    };

    function generateValues() {
        values = [];

        for ( var i = 0; i < period; i++) {
            values[i] = Math.sin(i * 2 * Math.PI / period);
        }
    }

    (function initialize() {
        if (period !== undefined) {
            if (typeof period !== "number") {
                throw "period should be a number.";
            }

            generateValues();
        } else {
            period = 0;
        }
    }());
};