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
     * The logic of the user control that displays the legend for the biorhythm charts.
     *
     * @param view
     *
     * @constructor
     */
    lu.bioControls.biorhythmLegend.BiorhythmLegend = function (view) {

        var items = [];
        var biorhythms = null;

        // --------------------------------------------------------------------------
        // Functions
        // --------------------------------------------------------------------------

        this.setBiorhythms = function (value) {
            removeAllItems();

            if (biorhythms !== null)
                biorhythms.destroy();

            biorhythms = createBiorhythmsAdapter(value);

            createAllItems();
        };

        function createBiorhythmsAdapter(biorhythms) {
            return new BiorhythmsAdapter({
                biorhythms: biorhythms,
                onBiorhythmAdded: $.proxy(onBiorhythmAdded, this),
                onBiorhythmRemoved: $.proxy(onBiorhythmRemoved, this)
            });
        }

        function createAllItems() {
            var biorhythmsArray = biorhythms.toArray();

            for (var i = 0; i < biorhythmsArray.length; i++) {
                createNewItem(biorhythmsArray[i]);
            }
        }

        function createNewItem(biorhythm) {
            var biorhythmLegendItem = new BiorhythmLegendItem(biorhythm);
            items.push(biorhythmLegendItem);

            view.addItem(biorhythmLegendItem.element);
        }

        function removeAllItems() {
            for (var i = 0; i < items.length; i++) {
                items[i].destroy();
            }

            items.length = 0;
        }

        function removeItem(biorhythm) {
            for (var i = 0; i < items.length; i++) {
                if (items[i].biorhythmShape === biorhythm) {
                    items[i].destroy();
                    items.splice(i, 1);
                }
            }
        }

        this.destroy = function () {
            removeAllItems();

            if (biorhythms !== null)
                biorhythms.destroy();

            view.destroy();
        };

        function onBiorhythmAdded(biorhythmShape) {
            createNewItem(biorhythmShape);
        }

        function onBiorhythmRemoved(biorhythmShape) {
            removeItem(biorhythmShape);
        }
    };

}(
        lu.bioControls.biorhythmModel.BiorhythmsAdapter,
        lu.bioControls.biorhythmLegend.BiorhythmLegendItem
    ));
