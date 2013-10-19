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
    lu.bioCalc.mainPage.pageSections.XDaySectionView = function() {

        var $xDayValueLabel = null;
        var $xDayInfoContainer = null;

        // --------------------------------------------------------------------------
        // Functions
        // --------------------------------------------------------------------------

        this.setBiorhythms = function(value) {
            $xDayInfoContainer.xDayInfoView("option", "biorhythms", value);
        };

        this.setXDay = function(value) {
            $xDayInfoContainer.xDayInfoView("update", value);
        };

        this.setTitle = function(value) {
            $xDayValueLabel.html(value);
        };

        // --------------------------------------------------------------------------
        // Initializer
        // --------------------------------------------------------------------------

        (function initialize() {
            create$();
            initialize$();
        }());

        function create$() {
            $xDayValueLabel = $("#xDayValueLabel");
            $xDayInfoContainer = $("#xDayInfoContainer");
        }

        function initialize$() {
            $xDayInfoContainer.xDayInfoView();
        }
    };
}(jQuery));