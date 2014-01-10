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

lu.DateUtil = {
    /**
     * Returns the number of milliseconds contained in the specified number of
     * days.
     * 
     * @returns {Number} The number of milliseconds.
     */
    daysToMilliseconds: function(days) {
        return days * 24 * 60 * 60 * 1000;
    },

    /**
     * Returns the number of days represented by the specified number of
     * milliseconds.
     * 
     * @returns {Number} A float representing the number of days.
     */
    millisecondsToDays: function(miliseconds) {
        return miliseconds / 1000 / 60 / 60 / 24;
    },

    /**
     * Returns the number of whole days represented by the specified number of
     * milliseconds. The remaining milliseconds, that cannot form another whole
     * day, are ignored.
     * 
     * @returns {Number} An int representing the number of whole days.
     */
    millisecondsToWholeDays: function(miliseconds) {
        return Math.floor(this.millisecondsToDays(miliseconds));
    },

    /**
     * Gets a {Date}, adds the specified number of days to it and returns
     * another instance of {Date}.
     * 
     * @returns {Date} A new instance of {Date}.
     */
    addDays: function(date, daysToAdd) {
        var milliseconds = daysToAdd * 24 * 60 * 60 * 1000;

        if (date instanceof Date) {
            date = date.getTime();
        }

        if (typeof date !== "number") {
            throw "date argument is not a real date.";
        }

        if (typeof daysToAdd !== "number") {
            throw "daysToAdd should be a number.";
        }

        return new Date(date + milliseconds);
    },

    /**
     * Gets a {Date} and returns another instance of {Date} containing only the
     * date component (year, month, day) of the received one.
     * 
     * @returns {Date} A new instance of {Date}.
     */
    getDateComponent: function(date) {
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    }
};