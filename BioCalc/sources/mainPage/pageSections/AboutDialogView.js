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

window.lu = window.lu || {};
lu.bioCalc = lu.bioCalc || {};
lu.bioCalc.mainPage = lu.bioCalc.mainPage || {};
lu.bioCalc.mainPage.pageSections = lu.bioCalc.mainPage.pageSections || {};

(function ($) {

    lu.bioCalc.mainPage.pageSections.AboutDialogView = function () {

        var $aboutDialog = null;
        var $aboutDialogTabSet = null;
        var $jQueryVersionLabel = null;
        var $jQueryUIVersionLabel = null;
        var $bioControlsVersionLabel = null;
        var $bioCalcVersionLabel = null;

        // --------------------------------------------------------------------------
        // presenter property
        // --------------------------------------------------------------------------

        var presenter = null;

        Object.defineProperty(this, "presenter", {
            enumerable: true,
            configurable: false,
            get: getPresenter,
            set: setPresenter
        });

        function getPresenter() {
            return presenter;
        }

        function setPresenter(value) {
            presenter = value;
        }

        // --------------------------------------------------------------------------
        // Functions - "public"
        // --------------------------------------------------------------------------

        this.show = function () {
            $aboutDialog.dialog("open");
        };

        this.close = function () {
            $aboutDialog.dialog("close");
        };

        this.setJQueryVersionText = function (value) {
            $jQueryVersionLabel.html(value);
        };

        this.setJQueryUIVersionText = function (value) {
            $jQueryUIVersionLabel.html(value);
        };

        this.setBioControlsVersionText = function (value) {
            $bioControlsVersionLabel.html(value);
        };

        this.setBioCalcVersionText = function (value) {
            $bioCalcVersionLabel.html(value);
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
            $aboutDialog = $("#aboutDialog");
            $aboutDialogTabSet = $("#aboutDialog .tabs");
            $jQueryVersionLabel = $("#jQueryVersionLabel");
            $jQueryUIVersionLabel = $("#jQueryUIVersionLabel");
            $bioControlsVersionLabel = $("#bioControlsVersionLabel");
            $bioCalcVersionLabel = $(".bio-calc-version");
        }

        function initialize$() {
            $aboutDialog.dialog({
                modal: true,
                height: 480,
                width: 480,
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

            $aboutDialogTabSet.tabs();
        }
    };

}(jQuery));