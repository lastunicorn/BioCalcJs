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
lu.bioControls.xDayInfoView = lu.bioControls.xDayInfoView || {};

/**
 * Displays in a container the percentage for each biorhythm in a list for a
 * specific day named the "X day".
 * 
 * @param biorhythmShapes
 *            The list of biorhythms for which to display the percentage.
 * 
 * @param containerSelector
 *            The jQuery selector of the continer in which to display the data.
 * 
 * @returns {lu.bioControls.xDayInfoView.XDayInfoView}
 */
lu.bioControls.xDayInfoView.XDayInfoView = function(biorhythmShapes, containerSelector) {

    var $container = null;
    var items = [];

    this.populate = function() {
        generateAndAddItems();
    };

    this.update = function(xDay) {
        for ( var i = 0; i < items.length; i++) {
            items[i].update(xDay);
        }
    };

    function generateAndAddItems() {
        $container.empty();
        items.length = 0;

        for ( var i = 0; i < biorhythmShapes.length; i++) {
            generateAndAddItem(biorhythmShapes[i]);
        }
    }

    function generateAndAddItem(biorhythmShape) {
        var xDayInfoItem = new lu.bioControls.xDayInfoView.XDayInfoItem(biorhythmShape);
        items.push(xDayInfoItem);

        var $itemElement = xDayInfoItem.getElement();
        $container.append($itemElement);
    }

    // --------------------------------------------------------------------------
    // Initializer
    // --------------------------------------------------------------------------

    (function initialize() {
        $container = $(containerSelector);

        if ($.type(biorhythmShapes) !== "array") {
            return;
        }
    }());
};