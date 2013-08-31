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
 * Represents the passion biorhythm. It is a biorhythm obtained by calculating
 * the average between physical and emotional biorhythms.
 * 
 * @returns {lu.bioControls.biorhythms.PassionBiorhythm}
 */
lu.bioControls.biorhythms.PassionBiorhythm = function() {
    var biorhythm = null;
    var obj = this;

    Object.defineProperty(this, "name", {
        value: "Passion",
        writable: false,
        enumerable: true,
        configurable: false
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
        var physicalBiorhythm = new lu.bioControls.biorhythms.PhysicalBiorhythm();
        var emotionalBiorhythm = new lu.bioControls.biorhythms.EmotionalBiorhythm();

        biorhythm = new lu.bioControls.biorhythms.AverageBiorhythm(physicalBiorhythm, emotionalBiorhythm);
    }());
};