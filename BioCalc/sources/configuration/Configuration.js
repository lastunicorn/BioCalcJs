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

(function (Event, CookieSaver, JsonSerializer, UrlSerializer) {

    /**
     * Keeps the configuration object.
     */
    lu.bioCalc.configuration.Configuration = function () {

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

        this.saveIntoCookies = function () {
            savingEvent.raise();

            var saver = new CookieSaver();
            saver.save(config);

            savedEvent.raise();
        };

        this.loadFromCookies = function () {
            $.cookie.json = true;

            var saver = new CookieSaver();
            config = saver.load();

            loadedEvent.raise();
        };

        this.toJson = function () {
            var serializer = new JsonSerializer();
            return serializer.serialize(config);
        };

        this.fromJson = function (json) {
            var serializer = new JsonSerializer();
            config = serializer.deserialize(json);

            loadedEvent.raise();
        };

        this.toUrl = function () {
            var serializer = new UrlSerializer();
            return serializer.serialize(config);
        };

        this.fromUrl = function (url) {
            var serializer = new UrlSerializer();
            config = serializer.deserialize(url);

            loadedEvent.raise();
        }
    };

}(
        lu.Event,
        lu.bioControls.configuration.CookieSaver,
        lu.bioControls.configuration.JsonSerializer,
        lu.bioControls.configuration.UrlSerializer
    ));