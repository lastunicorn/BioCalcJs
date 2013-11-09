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

(function($) {

    lu.bioControls.xDayInfoView.XDayInfoViewerView = function() {

        var $table = null;
        var $tbody = null;

        // --------------------------------------------------------------------------
        // $element property
        // --------------------------------------------------------------------------

        Object.defineProperty(this, "$element", {
            enumerable: true,
            configurable: false,
            get: getElement
        });

        function getElement() {
            return $table;
        }

        // --------------------------------------------------------------------------
        // functions
        // --------------------------------------------------------------------------

        this.empty = function() {
            $tbody.empty();
            generateHeader();
        };

        this.addItem = function(item) {
            $tbody.append(item);
        };

        // --------------------------------------------------------------------------
        // generate
        // --------------------------------------------------------------------------

        function generate() {
            generateTable();
            generateHeader();
        }

        function generateTable() {
            $table = $("<table/>");
            $tbody = $("<tbody/>").appendTo($table);
        }

        function generateHeader() {
            $tr = $("<tr/>").appendTo($tbody);

            $("<th>").text("").appendTo($tr);
            $("<th>").text("Biorhithm").appendTo($tr);
            $("<th>").text("").appendTo($tr);
            $("<th>").text("Value").appendTo($tr);
        }

        // --------------------------------------------------------------------------
        // Initializer
        // --------------------------------------------------------------------------

        (function initialize() {
            generate();
        }());
    };

}(jQuery));
