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
lu.bioCalc = lu.bioCalc || {};

/**
 * Contains the logic to load and save the configuration from/into cookies. 
 */
lu.bioCalc.ConfigManager = function() {

    var cookieName = "config";

    function loadFromCookies() {
        $.cookie.json = true;
        var config = $.cookie(cookieName);

        if (config == null) {
            config = createDefaultConfig();
        } else {
            ensureDefaultValues(config);
        }

        return config;
    }

    function saveInCookies(config) {
        $.cookie.json = true;

        if (config == null) {
            config = createDefaultConfig();
        }

        $.cookie(cookieName, config);
    }

    function removeFromCookie() {
        $.removeCookie(cookieName);
    }

    function getDefaultBirthday() {
        return new Date(1980, 05, 13);
    }

    function createDefaultConfig() {
        var config = {};
        ensureDefaultValues(config);
        return config;
    }

    function ensureDefaultValues(config) {
        if ($.type(config.birthday) === "string") {
            config.birthday = new Date(config.birthday);
        }

        if ($.type(config.birthday) !== "date") {
            config.birthday = getDefaultBirthday();
        }
    }

    return {
        loadFromCookies: loadFromCookies,
        saveInCookies: saveInCookies,
        removeFromCookie: removeFromCookie,
        getDefaultBirthday: getDefaultBirthday
    };
};