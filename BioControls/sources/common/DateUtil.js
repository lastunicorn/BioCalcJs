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

var lu = lu || {};

lu.DateUtil = {
    daysToMiliseconds: function(days) {
        return days * 24 * 60 * 60 * 1000;
    },

    addDays: function(date, daysToAdd) {
        var miliseconds = daysToAdd * 24 * 60 * 60 * 1000;

        if (date instanceof Date) {
            date = date.getTime();
        }

        if (typeof date !== "number") {
            throw "date argument is not a real date.";
        }

        if (typeof daysToAdd !== "number") {
            throw "daysToAdd should be a number.";
        }

        return new Date(date + miliseconds);
    }
};