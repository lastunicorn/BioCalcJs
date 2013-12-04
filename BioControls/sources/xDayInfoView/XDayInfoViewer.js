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
lu.bioControls.xDayInfoView = lu.bioControls.xDayInfoView || {};

(function(XDayInfoItem, XDayInfoItemView, BiorhythmsAdapter) {

    /**
     * 
     * @param configuration.view
     * 
     * @param configuration.biorhythms
     */
    lu.bioControls.xDayInfoView.XDayInfoViewer = function(configuration) {

        var items = [];
        var biorhythms = null;
        var compatibilityCalculator = null;

        this.updateXDay = function(xDay) {
            for (var i = 0; i < items.length; i++) {
                items[i].updateXDay(xDay);
            }
        };

        this.updateSecondBirthday = function(secondBirthday) {
            for (var i = 0; i < items.length; i++) {
                items[i].updateSecondBirthday(secondBirthday);
            }
        };

        this.destroy = function() {
            // biorhythms.destroy();
            // configuration.view.destroy();
        };

        this.setBiorhythms = function(value) {
            biorhythms.destroy();
            biorhythms = createBiorhythmsAdapter(value);

            repopulate();
        };

        function repopulate() {
            configuration.view.empty();
            items.length = 0;

            var biorhythmsArray = biorhythms.toArray();

            for (var i = 0, length = biorhythmsArray.length; i < length; i++) {
                createNewItem(biorhythmsArray[i]);
            }

            return items;
        }

        function createNewItem(biorhythm) {
            var xDayInfoItemView = new XDayInfoItemView();
            var xDayInfoItem = new XDayInfoItem(xDayInfoItemView, biorhythm, compatibilityCalculator);

            configuration.view.addItem(xDayInfoItemView.$element);
            items.push(xDayInfoItem);
        }

        function removeItem(biorhythm) {
            for (var i = 0; i < items.length; i++) {
                if (items[i].biorhythmShape === biorhythm) {
                    items.splice(i, 1);
                    items[i].$element.remove();
                }
            }
        }

        function createBiorhythmsAdapter(biorhythms) {
            return new BiorhythmsAdapter({
                biorhythms: biorhythms,
                onBiorhithmAdded: $.proxy(onBiorhithmAdded, this),
                onBiorhithmRemoved: $.proxy(onBiorhithmRemoved, this)
            });
        }

        function onBiorhithmAdded(biorhythmShape) {
            createNewItem(biorhythmShape);
        }

        function onBiorhithmRemoved(biorhythmShape) {
            removeItem(biorhythmShape);
        }

        // --------------------------------------------------------------------------
        // Initializer
        // --------------------------------------------------------------------------

        (function initialize() {
            biorhythms = createBiorhythmsAdapter(configuration.biorhythms);

            compatibilityCalculator = new lu.bioControls.compatibility.CompatibilityCalculator();
            compatibilityCalculator.displacementCalculator = new lu.bioControls.compatibility.DisplacementCosPercentCalculator();

            repopulate();
        }());
    };

}(
        lu.bioControls.xDayInfoView.XDayInfoItem,
        lu.bioControls.xDayInfoView.XDayInfoItemView,
        lu.bioControls.biorhythmModel.BiorhythmsAdapter
    ));
