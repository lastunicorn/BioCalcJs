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

window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythms = lu.bioControls.biorhythms || {};

/**
 *
 * @constructor
 */
lu.Event = function(){

};

(function(Event) {
    /**
     * Represents a biorhythm calculated as an average of two other biorhythms.
     * 
     * @param biorhythmA
     *            The first biorhythm used to calculate the average.
     * 
     * @param biorhythmB
     *            The second biorhythm used to calculate the average.
     * 
     * @constructor
     */
    lu.bioControls.biorhythms.AverageBiorhythm = function(biorhythmA, biorhythmB) {

        var birthdayChangedEvent = new Event();
        this.birthdayChanged = birthdayChangedEvent.client;

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
            if (typeof value !== "object" || !(value instanceof Date)) {
                throw "birthday should be a Date.";
            }

            if (value === biorhythmA.birthday && value === biorhythmB.birthday) {
                return;
            }

            biorhythmA.birthday = value;
            biorhythmB.birthday = value;

            birthdayChangedEvent.raise(this, value);
        }

        this.getValue = function(day) {
            return (biorhythmA.getValue(day) + biorhythmB.getValue(day)) / 2;
        };

        (function initialize() {
            if (!biorhythmA) {
                throw "biorhythmA should be an object.";
            }

            if (!biorhythmB) {
                throw "biorhythmB should be an object.";
            }
        }).call(this);
    };
}(lu.Event));