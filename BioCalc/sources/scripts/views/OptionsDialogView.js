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

(function($) {

    lu.bioCalc.mainPage.pageSections.OptionsDialogView = function() {

        var $optionsDialog = null;
        var $primaryBiorhythmsCheckbox = null;
        var $secondaryBiorhythmsCheckbox = null;
        var $extraBiorhythmsCheckbox = null;
        var $iChingBiorhythmsCheckbox = null;

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

        this.show = function() {
            $optionsDialog.dialog("open");
        };

        this.close = function() {
            $optionsDialog.dialog("close");
        };

        this.checkPrimaryBiorhythmsCheckbox = function(value) {
            $primaryBiorhythmsCheckbox.prop("checked", value);
        };

        this.checkSecondaryBiorhythmsCheckbox = function(value) {
            $secondaryBiorhythmsCheckbox.prop("checked", value);
        };

        this.checkExtraBiorhythmsCheckbox = function(value) {
            $extraBiorhythmsCheckbox.prop("checked", value);
        };

        this.checkIChingBiorhythmsCheckbox = function(value) {
            $iChingBiorhythmsCheckbox.prop("checked", value);
        };

        this.isCheckedPrimaryBiorhythmsCheckbox = function() {
            return $primaryBiorhythmsCheckbox.prop("checked");
        };

        this.isCheckedSecondaryBiorhythmsCheckbox = function() {
            return $secondaryBiorhythmsCheckbox.prop("checked");
        };

        this.isCheckedExtraBiorhythmsCheckbox = function() {
            return $extraBiorhythmsCheckbox.prop("checked");
        };

        this.isCheckedIChingBiorhythmsCheckbox = function() {
            return $iChingBiorhythmsCheckbox.prop("checked");
        };

        // --------------------------------------------------------------------------
        // Event Handlers
        // --------------------------------------------------------------------------

        function onCloseButtonClicked(e) {
            if ($.isFunction(presenter.onCloseButtonClicked)) {
                presenter.onCloseButtonClicked(e);
            }
        }

        function onOptionsDialogOpen() {
            if ($.isFunction(presenter.onOptionsDialogOpen)) {
                presenter.onOptionsDialogOpen();
            }
        }

        function onOptionsDialogClose() {
            if ($.isFunction(presenter.onOptionsDialogClose)) {
                presenter.onOptionsDialogClose();
            }
        }

        function onPrimaryCheckboxChange(e) {
            if ($.isFunction(presenter.onPrimaryCheckboxChange)) {
                presenter.onPrimaryCheckboxChange(e);
            }
        }

        function onSecondaryCheckboxChange(e) {
            if ($.isFunction(presenter.onSecondaryCheckboxChange)) {
                presenter.onSecondaryCheckboxChange(e);
            }
        }

        function onExtraCheckboxChange(e) {
            if ($.isFunction(presenter.onExtraCheckboxChange)) {
                presenter.onExtraCheckboxChange(e);
            }
        }

        function onIChingCheckboxChange(e) {
            if ($.isFunction(presenter.onIChingCheckboxChange)) {
                presenter.onIChingCheckboxChange(e);
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
            $optionsDialog = $("#optionsDialog");
            $primaryBiorhythmsCheckbox = $("#primaryBiorhythmsCheckbox");
            $secondaryBiorhythmsCheckbox = $("#secondaryBiorhythmsCheckbox");
            $extraBiorhythmsCheckbox = $("#extraBiorhythmsCheckbox");
            $iChingBiorhythmsCheckbox = $("#iChingBiorhythmsCheckbox");
        }

        function initialize$() {
            $optionsDialog.dialog({
                height: 360,
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
                },
                open: onOptionsDialogOpen,
                close: onOptionsDialogClose
            });

            $primaryBiorhythmsCheckbox.change(onPrimaryCheckboxChange);
            $secondaryBiorhythmsCheckbox.change(onSecondaryCheckboxChange);
            $extraBiorhythmsCheckbox.change(onExtraCheckboxChange);
            $iChingBiorhythmsCheckbox.change(onIChingCheckboxChange);
        }
    };

}(jQuery));