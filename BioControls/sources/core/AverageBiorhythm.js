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
 * Represents a biorhythm that is an average of two other biorhythms.
 * 
 * @param biorhythmA
 *            The first biorhythm used to calculate the average.
 * 
 * @param biorhythmB
 *            The second biorhythm used to calculate the average.
 * 
 * @returns {lu.bioControls.core.biorhythms.AverageBiorhythm}
 */
lu.bioControls.core.biorhythms.AverageBiorhythm = function(biorhythmA, biorhythmB) {

    Object.defineProperty(this, "birthday", {
        enumerable: true,
        configurable: false,
        get: getBirthday,
        set: setBirthday
    });

    function getBirthday() {
        return biorhythmA.birthday;
    }

    function setBirthday(value) {
        if (value === biorhythmA.birthday) {
            return;
        }

        biorhythmA.birthday = value;
        biorhythmB.birthday = value;
    }

    this.getValue = function(day) {
        return (biorhythmA.getValue(day) + biorhythmB.getValue(day)) / 2;
    };
};