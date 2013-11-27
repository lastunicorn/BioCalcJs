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

lu.Namespacing.ensureNamespace("lu.bioCalc.mainPage.pageSections");

(function($) {

    lu.bioCalc.mainPage.pageSections.ChartsSectionView = function() {

        var $biorhythmViewContainer = null;

        Object.defineProperty(this, "$biorhythmViewContainer", {
            enumerable: true,
            configurable: false,
            get: function() {
                return $biorhythmViewContainer;
            }
        });

        var $firstDayTextBox = null;

        Object.defineProperty(this, "$firstDayTextBox", {
            enumerable: true,
            configurable: false,
            get: function() {
                return $firstDayTextBox;
            }
        });

        var $firstDayLabel = null;

        Object.defineProperty(this, "$firstDayLabel", {
            enumerable: true,
            configurable: false,
            get: function() {
                return $firstDayLabel;
            }
        });

        var $lastDayTextBox = null;

        Object.defineProperty(this, "$lastDayTextBox", {
            enumerable: true,
            configurable: false,
            get: function() {
                return $lastDayTextBox;
            }
        });

        var $lastDayLabel = null;

        Object.defineProperty(this, "$lastDayLabel", {
            enumerable: true,
            configurable: false,
            get: function() {
                return $lastDayLabel;
            }
        });

        var $bioLegend = null;

        Object.defineProperty(this, "$bioLegend", {
            enumerable: true,
            configurable: false,
            get: function() {
                return $bioLegend;
            }
        });

        // --------------------------------------------------------------------------
        // presenter property
        // --------------------------------------------------------------------------

        var presenter = null;

        Object.defineProperty(this, "presenter", {
            enumerable: true,
            configurable: false,
            get: getPresenter,
            set: setPresenter
        })

        function getPresenter() {
            return presenter;
        }

        function setPresenter(value) {
            presenter = value;
        }

        // --------------------------------------------------------------------------
        // Events
        // --------------------------------------------------------------------------

        // --------------------------------------------------------------------------
        // Initializer
        // --------------------------------------------------------------------------

        (function initialize() {
            create$();
            initialize$();
        }());

        function create$() {
            $biorhythmViewContainer = $("#biorhythmViewContainer");
            $firstDayLabel = $("#firstDayLabel");
            $firstDayTextBox = $("#firstDayTextBox");
            $lastDayLabel = $("#lastDayLabel");
            $lastDayTextBox = $("#lastDayTextBox");
            $bioLegend = $("#bioLegend");
        }

        function initialize$() {

            $firstDayTextBox.datepicker({
                changeMonth: true,
                changeYear: true,
                dateFormat: "yy-mm-dd",
                showButtonPanel: true,
                showAnim: ""
            });

            $lastDayTextBox.datepicker({
                changeMonth: true,
                changeYear: true,
                dateFormat: "yy-mm-dd",
                showButtonPanel: true,
                showAnim: ""
            });

            $biorhythmViewContainer.biorhythmView({
                width: 900,
                height: 200
            });

            $bioLegend.biorhythmLegend();
        }
    };

}(jQuery));