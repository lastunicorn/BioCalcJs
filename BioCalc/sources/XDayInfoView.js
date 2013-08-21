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

lu.bioCalc.XDayInfoView = function(biorhythmShapes, containerSelector) {

    var $container = null;
    var rows = {};

    function onBiorhythmNameChanged() {
        // todo: implement this
    }

    function onBiorhythmColorChanged() {
        // todo: implement this
    }

    function onBiorhythmVisibilityChanged(arg) {
        var $element = rows[this.getName()];

        if ($element) {
            if (arg) {
                $element.show();
            } else {
                $element.hide();
            }
        }
    }

    this.populate = function(xDay) {
        generateAndAddItems(xDay);
    };

    this.update = function(xDay) {
        generateAndAddItems(xDay);
    };

    function generateAndAddItems(xDay) {
        $container.empty();
        rows = {};

        for ( var i = 0; i < biorhythmShapes.length; i++) {
            generateAndAddItem(biorhythmShapes[i], xDay);
        }
    }

    function generateAndAddItem(biorhythmShape, xDay) {
        var xDayInfoItem = new lu.bioCalc.XDayInfoItem(biorhythmShape);
        var $itemElement = xDayInfoItem.generate(xDay);

        rows[biorhythmShape.getName()] = $itemElement;

        $container.append($itemElement);
    }

    // --------------------------------------------------------------------------
    // Initializer
    // --------------------------------------------------------------------------

    (function initialize() {
        $container = $(containerSelector);

        if (typeof biorhythmShapes !== "array") {
            // return;
        }

        for ( var i = 0; i < biorhythmShapes.length; i++) {
            biorhythmShapes[i].subscribeToNameChanged(onBiorhythmNameChanged);
            biorhythmShapes[i].subscribeToColorChanged(onBiorhythmColorChanged);
            biorhythmShapes[i].subscribeToIsVisibleChanged(onBiorhythmVisibilityChanged);
        }
    }());
};