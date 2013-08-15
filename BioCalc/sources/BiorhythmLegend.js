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

lu.bioCalc.BiorhythmLegend = function(biorhythmView, legendContainerSelector) {
    var $legendContainer = null;
    var biorhythmLegendItems = {};

    function onBiorhythmNameChanged() {
        // todo: implement this
    }

    function onBiorhythmColorChanged() {
        // todo: implement this
    }

    function onBiorhythmVisibilityChanged(arg) {
        var $element = biorhythmLegendItems[this.getName()];

        if ($element) {
            if (arg) {
                $element.show();
            } else {
                $element.hide();
            }
        }
    }

    // function onBiorhythmAdded(arg) {
    // arg.subscribeToNameChanged(onBiorhythmNameChanged);
    // arg.subscribeToColorChanged(onBiorhythmColorChanged);
    // arg.subscribeToIsVisibleChanged(onBiorhythmVisibilityChanged);
    // }
    //
    // function onBiorhythmRemoved(arg) {
    // arg.unsubscribeFromNameChanged(onBiorhythmNameChanged);
    // arg.unsubscribeFromColorChanged(onBiorhythmColorChanged);
    // arg.unsubscribeFromIsVisibleChanged(onBiorhythmVisibilityChanged);
    // }

    this.populate = function() {
        var biorhythmShapes = biorhythmView.getBiorhythms();

        $legendContainer.empty();

        for ( var i = 0; i < biorhythmShapes.length; i++) {
            var biorhythmLegendItem = new lu.bioCalc.BiorhythmLegendItem(biorhythmShapes[i]);
            var $legendItemTag = biorhythmLegendItem.generate();

            biorhythmLegendItems[biorhythmShapes[i].getName()] = $legendItemTag;

            $legendContainer.prepend($legendItemTag);
        }
    };

    // --------------------------------------------------------------------------
    // Initializer
    // --------------------------------------------------------------------------

    (function initialize() {
        $legendContainer = $(legendContainerSelector);

        if (!(biorhythmView instanceof lu.bioControls.BiorhythmView)) {
            return;
        }

        // biorhythmView.subscribeToBiorhythmAdded(onBiorhythmAdded);
        // biorhythmView.subscribeToBiorhythmRemoved(onBiorhythmRemoved);

        var biorhythmShapes = biorhythmView.getBiorhythms();

        for ( var i = 0; i < biorhythmShapes.length; i++) {
            biorhythmShapes[i].subscribeToNameChanged(onBiorhythmNameChanged);
            biorhythmShapes[i].subscribeToColorChanged(onBiorhythmColorChanged);
            biorhythmShapes[i].subscribeToIsVisibleChanged(onBiorhythmVisibilityChanged);
        }
    }());
};