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
lu.bioControls.biorhythmLegend = lu.bioControls.biorhythmLegend || {};

(function (BiorhythmsAdapter, BiorhythmLegendItem) {

    /**
     *
     * @param configuration.view
     *
     * @param configuration.biorhythms
     */
    lu.bioControls.biorhythmLegend.BiorhythmLegend = function (configuration) {

        var items = [];
        var biorhythms = null;

        // --------------------------------------------------------------------------
        // Functions
        // --------------------------------------------------------------------------

        this.setBiorhythms = function (value) {
            biorhythms.destroy();
            biorhythms = createBiorhythmsAdapter(value);

            repopulate();
        };

        function createBiorhythmsAdapter(biorhythms) {
            return new BiorhythmsAdapter({
                biorhythms: biorhythms,
                onBiorhythmAdded: $.proxy(onBiorhythmAdded, this),
                onBiorhythmRemoved: $.proxy(onBiorhythmRemoved, this)
            });
        }

        function repopulate() {
            configuration.view.empty();
            items.length = 0;

            var biorhythmsArray = biorhythms.toArray();

            for (var i = 0; i < biorhythmsArray.length; i++) {
                createNewItem(biorhythmsArray[i]);
            }
        }

        function createNewItem(biorhythm) {
            var biorhythmLegendItem = new BiorhythmLegendItem(biorhythm);
            items.push(biorhythmLegendItem);

            var $legendItemTag = biorhythmLegendItem.element;
            configuration.view.addItem($legendItemTag);
        }

        function removeItem(biorhythm) {
            for (var i = 0; i < items.length; i++) {
                if (items[i].biorhythmShape === biorhythm) {
                    items.splice(i, 1);
                    items[i].element.remove();
                }
            }
        }

        this.destroy = function() {
            // biorhythms.destroy();
            // configuration.view.destroy();
        };

        function onBiorhythmAdded(biorhythmShape) {
            createNewItem(biorhythmShape);
        }

        function onBiorhythmRemoved(biorhythmShape) {
            removeItem(biorhythmShape);
        }

        // --------------------------------------------------------------------------
        // Initializer
        // --------------------------------------------------------------------------

        (function initialize() {
            biorhythms = createBiorhythmsAdapter(configuration.biorhythms);
            repopulate();
        }());
    };

}(
        lu.bioControls.biorhythmModel.BiorhythmsAdapter,
        lu.bioControls.biorhythmLegend.BiorhythmLegendItem
    ));
