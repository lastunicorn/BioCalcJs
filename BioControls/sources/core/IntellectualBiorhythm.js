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
 * Represents the intelectual biorhythm. It is a sinusoidal biorhythm with the
 * period of 33 days.
 * 
 * @returns {lu.bioControls.core.biorhythms.IntellectualBiorhythm}
 */
lu.bioControls.core.biorhythms.IntellectualBiorhythm = function() {
    var biorhythm = null;
    var obj = this;

    /**
     * @deprecated
     */
    this.getName = function() {
        return "Intellectual";
    };
    
    Object.defineProperty(this, "name",{
        value: "Intellectual",
        writable: false,
        enumerable: true,
        configurable: false
    });

    /**
     * @deprecated Use period property instead
     */
    this.getPeriodLength = function() {
        return biorhythm.period;
    };

    Object.defineProperty(this, "period", {
        enumerable: true,
        configurable: false,
        get: function() {
            return biorhythm.period;
        }
    });

    var birthdayChangedEvent = new lu.Event();
    this.birthdayChanged = birthdayChangedEvent.client;

    Object.defineProperty(this, "birthday", {
        enumerable: true,
        configurable: false,
        get: getBirthday,
        set: setBirthday
    });

    function getBirthday() {
        return biorhythm.birthday;
    }
    
    function setBirthday(value) {
        if (value === biorhythm.birthday) {
            return;
        }

        biorhythm.birthday = value;
        birthdayChangedEvent.raise(obj, value);
    }

    this.getValue = function(day) {
        return biorhythm.getValue(day);
    };

    (function initialize() {
        biorhythm = new lu.bioControls.core.biorhythms.SinusoidalBiorhythm(33);
    }());
};