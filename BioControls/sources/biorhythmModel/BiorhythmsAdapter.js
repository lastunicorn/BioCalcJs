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

window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythmModel = lu.bioControls.biorhythmModel || {};

/**
 * An adapter that takes an object and provides an array of BiorhythShapes.
 * 
 * @param configuration
 *            {Object} Configuration object containing different options needed
 *            by the instance.
 * 
 * @param configuration.biorhythms
 *            {Array | Object} If the object received is an Array, the same
 *            array is provided further. If the object provided is any other
 *            type of object and it has the toArray method, this method is used
 *            to obtain an array that is provided further.
 * 
 * @param configuration.onBiorhithmAdded
 *            {Function} If the object received has itemAdded property and it
 *            represents an event (have the subscribe method), this function is
 *            used to hook up to the event.
 * 
 * @param configuration.onBiorhithmRemoved
 *            {Function} If the object received has itemRemoved property and it
 *            represents an event (have the unsubscribe method), this function
 *            is used to hook up to the event.
 * 
 * @returns {lu.bioControls.biorhythmModel.BiorhythmsAdapter}
 */
lu.bioControls.biorhythmModel.BiorhythmsAdapter = function(configuration) {

    /**
     * Returns an array of biorhythms.
     * 
     * @returns {Array} an array of biorhythms.
     */
    this.toArray = function() {
        return biorhythmsToArray();
    };

    /**
     * Unsubscribes from the events if needed. The biorhythms in the array are
     * not changed in any way.
     */
    this.destroy = function() {
        unsubscribeFromBiorhythmsEvents();

        var biorhythmsArray = biorhythmsToArray();
        for ( var i = 0; i < biorhythmsArray.length; i++) {
            onBiorhythmRemoved(biorhythmsArray[i]);
        }
    };

    function subscribeToBiorhythmsEvents() {
        if (!configuration || !configuration.biorhythms) {
            return;
        }

        if (configuration.biorhythms.itemAdded && $.isFunction(configuration.biorhythms.itemAdded.subscribe)) {
            configuration.biorhythms.itemAdded.subscribe(onBiorhythmAdded);
        }

        if (configuration.biorhythms.itemRemoved && $.isFunction(configuration.biorhythms.itemRemoved.subscribe)) {
            configuration.biorhythms.itemRemoved.subscribe(onBiorhythmRemoved);
        }
    }

    function unsubscribeFromBiorhythmsEvents() {
        if (!configuration || !configuration.biorhythms) {
            return;
        }

        if (configuration.biorhythms.itemAdded && $.isFunction(configuration.biorhythms.itemAdded.unsubscribe)) {
            configuration.biorhythms.itemAdded.unsubscribe(onBiorhythmAdded);
        }

        if (configuration.biorhythms.itemRemoved && $.isFunction(configuration.biorhythms.itemRemoved.unsubscribe)) {
            configuration.biorhythms.itemRemoved.unsubscribe(onBiorhythmRemoved);
        }
    }

    function onBiorhythmAdded(biorhythmShape) {
        if ($.isFunction(configuration.onBiorhithmAdded)) {
            configuration.onBiorhithmAdded.call(this, biorhythmShape);
        }
    }

    function onBiorhythmRemoved(biorhythmShape) {
        if ($.isFunction(configuration.onBiorhithmRemoved)) {
            configuration.onBiorhithmRemoved.call(this, biorhythmShape);
        }
    }

    function biorhythmsToArray() {
        if (!configuration || !configuration.biorhythms) {
            return [];
        }

        if (configuration.biorhythms instanceof Array) {
            return configuration.biorhythms;
        }

        if ($.isFunction(configuration.biorhythms.toArray)) {
            return configuration.biorhythms.toArray();
        }

        return [];
    }

    // --------------------------------------------------------------------------
    // Initialization
    // --------------------------------------------------------------------------

    (function initialize() {
        subscribeToBiorhythmsEvents();

        var biorhythmsArray = biorhythmsToArray();
        for ( var i = 0; i < biorhythmsArray.length; i++) {
            onBiorhythmAdded(biorhythmsArray[i]);
        }
    }());
};