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
 * An adapter that takes an object and provides an array of BiorhythmShapes.
 *
 * @param options
 *            {Object} Configuration object containing different options needed
 *            by the instance.
 *
 * @param options.biorhythms
 *            {Array | Object} If the object received is an Array, the same
 *            array is provided further. If the object provided is any other
 *            type of object and it has the toArray method, this method is used
 *            to obtain an array that is provided further.
 *
 * @param options.onBiorhythmAdded
 *            {Function} If the object received has itemAdded property and it
 *            represents an event (have the subscribe method), this function is
 *            used to hook up to the event.
 *
 * @param options.onBiorhythmRemoved
 *            {Function} If the object received has itemRemoved property and it
 *            represents an event (have the unsubscribe method), this function
 *            is used to hook up to the event.
 *
 * @constructor
 */
lu.bioControls.biorhythmModel.BiorhythmsAdapter = function (options) {

    /**
     * Returns an array of biorhythms.
     *
     * @returns {Array} an array of biorhythms.
     */
    this.toArray = function () {
        return biorhythmsToArray();
    };

    /**
     * Unsubscribes from the events if needed. The biorhythms in the array are
     * not changed in any way.
     */
    this.destroy = function () {
        unsubscribeFromBiorhythmsEvents();

        var biorhythmsArray = biorhythmsToArray();
        for (var i = 0; i < biorhythmsArray.length; i++) {
            onBiorhythmRemoved(biorhythmsArray[i]);
        }
    };

    function subscribeToBiorhythmsEvents() {
        if (!options || !options.biorhythms)
            return;

        if (options.biorhythms.itemAdded && $.isFunction(options.biorhythms.itemAdded.subscribe))
            options.biorhythms.itemAdded.subscribe(onBiorhythmAdded);

        if (options.biorhythms.itemRemoved && $.isFunction(options.biorhythms.itemRemoved.subscribe))
            options.biorhythms.itemRemoved.subscribe(onBiorhythmRemoved);
    }

    function unsubscribeFromBiorhythmsEvents() {
        if (!options || !options.biorhythms)
            return;

        if (options.biorhythms.itemAdded && $.isFunction(options.biorhythms.itemAdded.unsubscribe))
            options.biorhythms.itemAdded.unsubscribe(onBiorhythmAdded);

        if (options.biorhythms.itemRemoved && $.isFunction(options.biorhythms.itemRemoved.unsubscribe))
            options.biorhythms.itemRemoved.unsubscribe(onBiorhythmRemoved);
    }

    function onBiorhythmAdded(biorhythmShape) {
        if ($.isFunction(options.onBiorhythmAdded))
            options.onBiorhythmAdded.call(this, biorhythmShape);
    }

    function onBiorhythmRemoved(biorhythmShape) {
        if ($.isFunction(options.onBiorhythmRemoved))
            options.onBiorhythmRemoved.call(this, biorhythmShape);
    }

    function biorhythmsToArray() {
        if (!options || !options.biorhythms)
            return [];

        if (options.biorhythms instanceof Array)
            return options.biorhythms;

        if ($.isFunction(options.biorhythms.toArray))
            return options.biorhythms.toArray();

        return [];
    }

    // --------------------------------------------------------------------------
    // Initialization
    // --------------------------------------------------------------------------

    (function initialize() {
        subscribeToBiorhythmsEvents();
    }());
};