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

//var config = {
//    "birthday": "1980-06-12T21:00:00.000Z",
//    "secondBirthday": "1980-06-12T21:00:00.000Z",
//    "biorhythms": [
//        { "name": "Physical Shape", "color": "#ff0000" },
//        { "name": "Emotional Shape", "color": "#32cd32" },
//        { "name": "Intellectual Shape", "color": "#1e90ff" },
//        { "name": "Intuitive Shape", "color": "#ffa500" }
//    ]
//};

(function () {

    /**
     * Keeps the configuration object.
     */
    lu.bioCalc.configuration.CookieConfiguration = function () {

        var cookieName = "config";

        // --------------------------------------------------------------------------
        // config property
        // --------------------------------------------------------------------------

        var config = null;

        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: false,
            get: function () {
                return config;
            }
        });

        // --------------------------------------------------------------------------
        // Functions
        // --------------------------------------------------------------------------

        this.save = function (newConfig) {
            config = newConfig;

            $.cookie.json = true;

            if (config == null)
                return;

            $.cookie(cookieName, config);
        };

        this.reset = function () {
            $.cookie.json = true;

            config = $.cookie(cookieName);

            ensureDefaultValues();

            return config;
        };

        this.getDefaultConfig = function () {
            return createDefaultConfig();
        };

        function ensureDefaultValues() {
            if (!config)
                config = {};

            if ($.type(config.birthday) === "string")
                config.birthday = new Date(config.birthday);

            if ($.type(config.birthday) !== "date")
                config.birthday = getDefaultBirthday();

            if ($.type(config.secondBirthday) === "string")
                config.secondBirthday = new Date(config.secondBirthday);

            if ($.type(config.secondBirthday) !== "date")
                config.secondBirthday = getDefaultBirthday();

            if ($.type(config.biorhythms) !== "array")
                config.biorhythms = getDefaultBiorhythms();
        }

        function createDefaultConfig() {
            return {
                birthday: getDefaultBirthday(),
                secondBirthday: getDefaultBirthday(),
                biorhythms: getDefaultBiorhythms()
            };
        }

        function getDefaultBirthday() {
            return new Date(1980, 5, 13);
        }

        function getDefaultBiorhythms() {
            return [
                { "name": "Physical Shape", "color": "#ff0000" },
                { "name": "Emotional Shape", "color": "#32cd32" },
                { "name": "Intellectual Shape", "color": "#1e90ff" },
                { "name": "Intuitive Shape", "color": "#ffa500" }
            ];
        }
    };

}());