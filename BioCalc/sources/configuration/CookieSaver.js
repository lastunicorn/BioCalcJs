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

window.lu = window.lu || {};
lu.bioCalc = lu.bioCalc || {};
lu.bioCalc.configuration = lu.bioCalc.configuration || {};

(function () {

    lu.bioCalc.configuration.CookieSaver = function () {
        var cookieName = "config";

        this.save = function (config) {
            $.cookie.json = true;

            if (config == null)
                return;

            $.cookie(cookieName, config);
        };

        this.load = function () {
            $.cookie.json = true;
            var config = $.cookie(cookieName);

            if (config == null)
                config = {};

            ensureDefaultValues(config);

            return config;
        };

        function ensureDefaultValues(c) {
            if ($.type(c.birthday) === "string")
                c.birthday = new Date(c.birthday);

            if ($.type(c.birthday) !== "date")
                c.birthday = getDefaultBirthday();

            if ($.type(c.secondBirthday) === "string")
                c.secondBirthday = new Date(c.secondBirthday);

            if ($.type(c.secondBirthday) !== "date")
                c.secondBirthday = getDefaultBirthday();

            if ($.type(c.biorhythms) !== "array")
                c.biorhythms = [
                    { "name": "Physical Shape", "color": "#ff0000" },
                    { "name": "Emotional Shape", "color": "#32cd32" },
                    { "name": "Intellectual Shape", "color": "#1e90ff" },
                    { "name": "Intuitive Shape", "color": "#ffa500" }
                ];
        }

        function getDefaultBirthday() {
            return new Date(1980, 05, 13);
        }
    };
}());