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

(function (BiorhythmLegendItemView, BiorhythmShape) {

    /**
     * Creates and interacts with an item displayed by the biorhythmLegend
     * widget.
     *
     * @param biorhythmShape
     *            The biorhythmShape object represented by the current item.
     *
     * @constructor
     */
    lu.bioControls.biorhythmLegend.BiorhythmLegendItem = function (biorhythmShape) {

        var view = null;

        // --------------------------------------------------------------------------
        // element property
        // --------------------------------------------------------------------------

        Object.defineProperty(this, "element", {
            enumerable: true,
            configurable: false,
            get: getElement
        });

        function getElement() {
            return view.$element;
        }

        // --------------------------------------------------------------------------
        // biorhythmShape property
        // --------------------------------------------------------------------------

        Object.defineProperty(this, "biorhythmShape", {
            enumerable: true,
            configurable: false,
            get: getBiorhythmShape
        });

        function getBiorhythmShape() {
            return biorhythmShape;
        }

        // --------------------------------------------------------------------------
        // Functions
        // --------------------------------------------------------------------------

        this.destroy = function () {
            view.destroy();
        };

        // --------------------------------------------------------------------------
        // Event Handlers
        // --------------------------------------------------------------------------

        function onColorPickerClosed(event, color) {
            biorhythmShape.color = color.formatted;
        }

        function onColorPickerOpened(event, color) {
            view.setColorpickerColor(biorhythmShape.color);
        }

        function onBiorhythmNameChanged(arg) {
            view.setLabelText(arg);
        }

        function onBiorhythmColorChanged(arg) {
            view.setColor(arg);
        }

        function onBiorhythmVisibilityChanged(arg) {
            if (arg) {
                view.show();
            } else {
                view.hide();
            }
        }

        // --------------------------------------------------------------------------
        // Initializer
        // --------------------------------------------------------------------------

        (function initialize() {
            view = new BiorhythmLegendItemView();
            view.presenter = {
                onColorPickerClosed: onColorPickerClosed,
                onColorPickerOpened: onColorPickerOpened
            };

            if (!(biorhythmShape instanceof BiorhythmShape))
                return;

            view.setColor(biorhythmShape.color);
            view.setLabelText(biorhythmShape.biorhythm.name);

            var biorhythmName = biorhythmShape.biorhythm.name;
            var title = biorhythmName ? biorhythmName + " Biorhythm" : null;
            var parts = title ? "draggable" : "popup";

            view.setColorpickerTitle(title);
            view.setColorpickerParts(parts);
            view.setColorpickerColor(biorhythmShape.color);

            if (!biorhythmShape.isVisible)
                view.hide();

            biorhythmShape.nameChanged.subscribe(onBiorhythmNameChanged);
            biorhythmShape.colorChanged.subscribe(onBiorhythmColorChanged);
            biorhythmShape.isVisibleChanged.subscribe(onBiorhythmVisibilityChanged);
        }());
    };
}(
        lu.bioControls.biorhythmLegend.BiorhythmLegendItemView,
        lu.bioControls.biorhythmModel.BiorhythmShape
    ));