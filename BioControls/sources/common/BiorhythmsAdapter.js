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

var lu = lu || {};
lu.bioControls = lu.bioControls || {};

lu.bioControls.BiorhythmsAdapter = function(configuration) {

    function subscribeToBiorhythmsEvents() {
        if (!configuration || !configuration.biorhythms) {
            return;
        }

        if (configuration.biorhythms.itemAdded && configuration.biorhythms.itemAdded.subscribe) {
            configuration.biorhythms.itemAdded.subscribe(onBiorhithmAdded);
        }

        if (configuration.biorhythms.itemRemoved && configuration.biorhythms.itemRemoved.subscribe) {
            configuration.biorhythms.itemRemoved.subscribe(onBiorhithmRemoved);
        }
    }

    function unsubscribeFromBiorhythmsEvents() {
        if (!configuration || !configuration.biorhythms) {
            return;
        }

        if (configuration.biorhythms.itemAdded && configuration.biorhythms.itemAdded.unsubscribe) {
            configuration.biorhythms.itemAdded.unsubscribe(onBiorhithmAdded);
        }

        if (configuration.biorhythms.itemRemoved && configuration.biorhythms.itemRemoved.unsubscribe) {
            configuration.biorhythms.itemRemoved.unsubscribe(onBiorhithmRemoved);
        }
    }

    function onBiorhithmAdded(biorhythmShape) {
        if ($.isFunction(configuration.onBiorhithmAdded)) {
            configuration.onBiorhithmAdded(biorhythmShape);
        }
    }

    function onBiorhithmRemoved(biorhythmShape) {
        if ($.isFunction(configuration.onBiorhithmRemoved)) {
            configuration.onBiorhithmRemoved(biorhythmShape);
        }
    }

    function biorhythmsToArray() {
        if (!configuration || !configuration.biorhythms) {
            return;
        }

        if (configuration.biorhythms instanceof Array) {
            return configuration.biorhythms;
        }

        if ($.isFunction(configuration.biorhythms.toArray)) {
            return configuration.biorhythms.toArray();
        }

        return [];
    }

    this.toArray = function() {
        return biorhythmsToArray();
    };

    this.clear = function() {
        unsubscribeFromBiorhythmsEvents();

        var biorhythmsArray = biorhythmsToArray();
        for ( var i = 0; i < biorhythmsArray.length; i++) {
            unsubscribeFromBiorhythmEvents(biorhythmsArray[i]);
        }
    };

    (function initialize() {
        subscribeToBiorhythmsEvents();

        var biorhythmsArray = biorhythmsToArray();
        for ( var i = 0; i < biorhythmsArray.length; i++) {
            onBiorhithmAdded(biorhythmsArray[i]);
        }
    }());
};