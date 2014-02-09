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

(function (Event, ConfigurationEqualityComparer, JsonSerializer, UrlSerializer) {

    /**
     * The data model of the BioCalc page.
     * It also provides communication between different modules of the page.
     */
    lu.bioCalc.BioCalcPageData = function (configuration) {

        // --------------------------------------------------------------------------
        // birthday property
        // --------------------------------------------------------------------------

        var birthday = null;
        var birthdayChangedEvent = new Event();
        this.birthdayChanged = birthdayChangedEvent.client;

        Object.defineProperty(this, "birthday", {
            enumerable: true,
            configurable: false,
            get: getBirthday,
            set: setBirthday
        });

        function getBirthday() {
            return birthday;
        }

        function setBirthday(value) {
            birthday = value;

//            if (biorhythms)
//                biorhythms.setBirthdayOnAll(birthday);

            birthdayChangedEvent.raise(this, value);
        }

        // --------------------------------------------------------------------------
        // secondBirthday property
        // --------------------------------------------------------------------------

        var secondBirthday = null;
        var secondBirthdayChangedEvent = new Event();
        this.secondBirthdayChanged = secondBirthdayChangedEvent.client;

        Object.defineProperty(this, "secondBirthday", {
            enumerable: true,
            configurable: false,
            get: getSecondBirthday,
            set: setSecondBirthday
        });

        function getSecondBirthday() {
            return secondBirthday;
        }

        function setSecondBirthday(value) {
            secondBirthday = value;
            secondBirthdayChangedEvent.raise(this, value);
        }

        // --------------------------------------------------------------------------
        // xDay property
        // --------------------------------------------------------------------------

        var xDay = null;
        var xDayChangedEvent = new Event();
        this.xDayChanged = xDayChangedEvent.client;

        Object.defineProperty(this, "xDay", {
            enumerable: true,
            configurable: false,
            get: getXDay,
            set: setXDay
        });

        function getXDay() {
            return xDay;
        }

        function setXDay(value) {
            xDay = value;
            xDayChangedEvent.raise(this, value);
        }

        // --------------------------------------------------------------------------
        // biorhythms property
        // --------------------------------------------------------------------------

        var biorhythms = null;
        var biorhythmsChangedEvent = new Event();
        this.biorhythmsChanged = biorhythmsChangedEvent.client;

        Object.defineProperty(this, "biorhythms", {
            enumerable: true,
            configurable: false,
            get: getBiorhythms,
            set: setBiorhythms
        });

        function getBiorhythms() {
            return biorhythms;
        }

        function setBiorhythms(value) {
            biorhythms = value;

            if (biorhythms) {
                biorhythms.setBirthdayOnAll(birthday);

                // todo: needs rethinking this
                loadBiorhythmsConfigurationFromConfig(configuration.config.biorhythms);
            }

            biorhythmsChangedEvent.raise(this, value);
        }

        // --------------------------------------------------------------------------
        // Events
        // --------------------------------------------------------------------------

        var savedEvent = new Event();
        this.saved = savedEvent.client;

        var loadedEvent = new Event();
        this.loaded = loadedEvent.client;

        // --------------------------------------------------------------------------
        // Functions
        // --------------------------------------------------------------------------

        this.saveIntoCookies = function () {
            var newConfig = toConfigObject();
            configuration.save(newConfig);

            savedEvent.raise();
        };

        this.loadFromCookies = function () {
            var config = configuration.config;
            loadFromConfig(config);

            loadedEvent.raise();
        };

        this.clear = function () {
            var config = configuration.getDefaultConfig();
            loadFromConfig(config);

            loadedEvent.raise();
        };

        this.toJson = function () {
            var config = toConfigObject();

            var serializer = new JsonSerializer();
            return serializer.serialize(config);
        };

        this.fromJson = function (json) {
            var serializer = new JsonSerializer();
            var config = serializer.deserialize(json);
            loadFromConfig(config);

            loadedEvent.raise();
        };

        this.toUrl = function () {
            var config = toConfigObject();

            var serializer = new UrlSerializer();
            return serializer.serialize(config);
        };

        this.fromUrl = function (url) {
            var serializer = new UrlSerializer();
            var config = serializer.deserialize(url);
            loadFromConfig(config);

            loadedEvent.raise();
        }

        function loadFromConfig(config) {
            setBirthday(config.birthday);
            setSecondBirthday(config.secondBirthday);

            loadBiorhythmsConfigurationFromConfig(config.biorhythms);
        }

        function loadBiorhythmsConfigurationFromConfig(biorhythmsConfig) {
            if (!biorhythms)
                return;

            var biorhythmShapes = biorhythms.toArray();

            for (var i = 0; i < biorhythmShapes.length; i++) {
                var biorhythmShape = biorhythmShapes[i];
                var biorhythmConfig = getBiorhythmConfigByName(biorhythmsConfig, biorhythmShape.name);

                configureBiorhythmShape(biorhythmShape, biorhythmConfig);
            }
        }

        function configureBiorhythmShape(biorhythmShape, biorhythmConfig) {
            if (!biorhythmConfig) {
                biorhythmShape.isVisible = false;
                return;
            }

            biorhythmShape.isVisible = true;
            biorhythmShape.color = biorhythmConfig.color;
        }

        function getBiorhythmConfigByName(biorhythmsConfig, name) {
            if (!biorhythmsConfig)
                return null;

            for (var i = 0; i < biorhythmsConfig.length; i++) {
                if (biorhythmsConfig[i].name == name)
                    return biorhythmsConfig[i];
            }

            return null;
        }

        this.isDataDefault = function () {
            var currentConfig = toConfigObject();
            var defaultConfig = configuration.getDefaultConfig();

            var comparer = new ConfigurationEqualityComparer();
            return comparer.areEqual(currentConfig, defaultConfig);
        };

        this.isDataChanged = function () {
            var currentConfig = toConfigObject();

            var comparer = new ConfigurationEqualityComparer();
            return !comparer.areEqual(currentConfig, configuration.config);
        };

        function toConfigObject() {
            var config = {};

            config.birthday = birthday;
            config.secondBirthday = secondBirthday;
            config.biorhythms = [];

            if (biorhythms && typeof(biorhythms.toArray) === "function") {
                var biorhythmShapes = biorhythms.toArray();

                for (var i = 0; i < biorhythmShapes.length; i++) {
                    if (!biorhythmShapes[i].isVisible)
                        continue;

                    config.biorhythms.push({
                        name: biorhythmShapes[i].name,
                        color: biorhythmShapes[i].color
                    });
                }
            }

            return config;
        }

        // --------------------------------------------------------------------------
        // Initializer
        // --------------------------------------------------------------------------

        (function initialize() {
            var config = configuration.config;
            loadFromConfig(config);
        }());
    };

}(
        lu.Event,
        lu.bioCalc.configuration.ConfigurationEqualityComparer,
        lu.bioCalc.configuration.JsonSerializer,
        lu.bioCalc.configuration.UrlSerializer
    ));