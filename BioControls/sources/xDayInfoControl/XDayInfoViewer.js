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

(function (XDayInfoItem, XDayInfoItemView, BiorhythmsAdapter) {

    /**
     *
     * @param view
     *
     * @constructor
     */
    lu.bioControls.xDayInfoView.XDayInfoViewer = function (view) {

        var items = [];
        var biorhythms = null;
        var compatibilityCalculator = null;

        this.updateXDay = function (xDay) {
            for (var i = 0; i < items.length; i++) {
                items[i].updateXDay(xDay);
            }
        };

        this.updateSecondBirthday = function (secondBirthday) {
            for (var i = 0; i < items.length; i++) {
                items[i].updateSecondBirthday(secondBirthday);
            }
        };

        this.destroy = function () {
            // biorhythms.destroy();
            // configuration.view.destroy();
        };

        this.setBiorhythms = function (value) {
            if (biorhythms !== null)
                biorhythms.destroy();

            biorhythms = createBiorhythmsAdapter(value);

            repopulate();
        };

        function repopulate() {
            view.empty();
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

            view.addItem(xDayInfoItemView.$element);
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
                onBiorhythmAdded: $.proxy(onBiorhythmAdded, this),
                onBiorhythmRemoved: $.proxy(onBiorhythmRemoved, this)
            });
        }

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
            compatibilityCalculator = new lu.bioControls.compatibility.CompatibilityCalculator();
            compatibilityCalculator.displacementCalculator = new lu.bioControls.compatibility.DisplacementCosPercentCalculator();
        }());
    };

}(
        lu.bioControls.xDayInfoView.XDayInfoItem,
        lu.bioControls.xDayInfoView.XDayInfoItemView,
        lu.bioControls.biorhythmModel.BiorhythmsAdapter
    ));
