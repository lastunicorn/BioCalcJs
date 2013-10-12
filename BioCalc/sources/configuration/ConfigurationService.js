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

/**
 * Keeps the configuration object.
 * 
 * @param ConfigurationLoader
 *            Object constructor. Loads/Saves the configuration object from the
 *            cookies.
 * 
 * @returns {lu.bioCalc.configuration.ConfigurationService}
 */
lu.bioCalc.configuration.ConfigurationService = (function(ConfigurationLoader) {

    var obj = {};

    var loader = null;

    // --------------------------------------------------------------------------
    // Property - config
    // --------------------------------------------------------------------------

    var config = null;

    Object.defineProperty(obj, "config", {
        enumerable: true,
        configurable: false,
        get: getConfig
    });

    function getConfig() {
        return config;
    }

    // --------------------------------------------------------------------------
    // Functions
    // --------------------------------------------------------------------------

    this.save = function() {
        loader.saveInCookies(config);
    };

    // --------------------------------------------------------------------------
    // Initializer
    // --------------------------------------------------------------------------

    (function initialize() {
        loader = new ConfigurationLoader();
        config = loader.loadFromCookies();
    }());

    // --------------------------------------------------------------------------
    // Return object
    // --------------------------------------------------------------------------

    return obj;
}(lu.bioCalc.configuration.ConfigurationLoader));