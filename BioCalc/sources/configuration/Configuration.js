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

(function (Event) {

    /**
     * Keeps the configuration object.
     */
    lu.bioCalc.configuration.Configuration = function () {

        var cookieName = "config";

        // --------------------------------------------------------------------------
        // config property
        // --------------------------------------------------------------------------

        var config = null;

        Object.defineProperty(this, "config", {
            enumerable: true,
            configurable: false,
            get: getConfig
        });

        function getConfig() {
            return config;
        }

        // --------------------------------------------------------------------------
        // Events
        // --------------------------------------------------------------------------

        var savingEvent = new Event();
        this.saving = savingEvent.client;

        var savedEvent = new Event();
        this.saved = savedEvent.client;

        var loadedEvent = new Event();
        this.loaded = loadedEvent.client;

        // --------------------------------------------------------------------------
        // Functions
        // --------------------------------------------------------------------------

        this.save = function () {
            savingEvent.raise();

            $.cookie.json = true;

            if (config == null) {
                return;
            }

            $.cookie(cookieName, config);

            savedEvent.raise();
        };

        this.loadFromCookies = function () {
            $.cookie.json = true;
            var newConfig = $.cookie(cookieName);

            if (newConfig == null) {
                newConfig = {};
            }

            ensureDefaultValues(newConfig);

            config = newConfig;

            loadedEvent.raise();
        };

        function ensureDefaultValues(c) {
            if ($.type(c.birthday) === "string") {
                c.birthday = new Date(c.birthday);
            }

            if ($.type(c.birthday) !== "date") {
                c.birthday = getDefaultBirthday();
            }
        }

        function getDefaultBirthday() {
            return new Date(1980, 05, 13);
        }
    };

}(lu.Event));