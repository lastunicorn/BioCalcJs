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

lu.Namespacing.ensureNamespace("lu.bioCalc.mainPage.dialogs");

(function($) {
    lu.bioCalc.mainPage.dialogs.HelpDialogView = function(presenter) {

        var $helpDialog = null;
        var $helpDialogTabSet = null;

        // --------------------------------------------------------------------------
        // Functions - "public"
        // --------------------------------------------------------------------------

        this.show = function() {
            $helpDialog.dialog("open");
        };

        this.close = function() {
            $helpDialog.dialog("close");
        };

        // --------------------------------------------------------------------------
        // Event Handlers
        // --------------------------------------------------------------------------

        function onCloseButtonClicked(e) {
            if ($.isFunction(presenter.onCloseButtonClicked)) {
                presenter.onCloseButtonClicked(e);
            }
        }

        // --------------------------------------------------------------------------
        // Initializer
        // --------------------------------------------------------------------------

        (function initialize() {
            create$();
            initialize$();
        }());

        function create$() {
            $helpDialog = $("#helpDialog");
            $helpDialogTabSet = $("#helpDialog .tabs");
        }

        function initialize$() {
            $helpDialog.dialog({
                modal: true,
                height: 480,
                width: 640,
                autoOpen: false,
                buttons: {
                    Close: onCloseButtonClicked
                },
                show: {
                    effect: "puff",
                    duration: 300
                },
                hide: {
                    effect: "puff",
                    duration: 300
                }
            });

            $helpDialogTabSet.tabs();
        }
    };
}(jQuery));