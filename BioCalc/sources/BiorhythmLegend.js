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
 * Creates and displays a list of items, each item providing information like
 * color and name of one BiorhythmShape from the specified list.
 * 
 * @param biorhythmShapes
 *            The list of BiorhythmShapes for which to create the legend.
 * 
 * @param legendContainerSelector
 *            The jQuery selector of the element where to display the items.
 * 
 * @returns {lu.bioCalc.BiorhythmLegend}
 */
lu.bioCalc.BiorhythmLegend = function(biorhythmShapes, legendContainerSelector) {
    var $container = null;
    var biorhythmLegendItems = [];

    this.populate = function() {
        $container.empty();
        biorhythmLegendItems.length = 0;

        for ( var i = 0; i < biorhythmShapes.length; i++) {
            var biorhythmLegendItem = new lu.bioCalc.BiorhythmLegendItem(biorhythmShapes[i]);
            biorhythmLegendItems.push(biorhythmLegendItem);

            var $legendItemTag = biorhythmLegendItem.getElement();
            $container.prepend($legendItemTag);
        }
    };

    // --------------------------------------------------------------------------
    // Initializer
    // --------------------------------------------------------------------------

    (function initialize() {
        $container = $(legendContainerSelector);

        if ($.type(biorhythmShapes) !== "array") {
            return;
        }
    }());
};

// --------------------------------------------------------------------------
// jQuery widget
// --------------------------------------------------------------------------
