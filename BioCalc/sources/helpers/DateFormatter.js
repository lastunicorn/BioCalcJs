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

lu.Namespacing.ensureNamespace("lu.bioCalc.helpers");

/**
 * Provides methods to format a data into a string.
 */
lu.bioCalc.helpers.DateFormatter = (function() {
    function toStringTwoDigits(number) {
        if (typeof number !== "number") {
            return "" + number;
        }

        return number < 10 ? "0" + number : "" + number;
    }

    function formatDate(date) {
        if (!(date instanceof Date)) {
            return "";
        }

        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();

        var monthString = toStringTwoDigits(month);
        var dayString = toStringTwoDigits(day);

        return year + "-" + monthString + "-" + dayString;
    }

    return {
        formatDate: formatDate
    };
}());