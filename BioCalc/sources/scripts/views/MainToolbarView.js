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

    lu.bioCalc.mainPage.pageSections.MainToolbarView = function () {

        var $mainToolbar = null;
        var $helpButton = null;
        var $aboutButton = null;
        var $optionsButton = null;
        var $saveButton = null;
        var $loadButton = null;
        var $clearButton = null;
        var $saveMenuButton = null;
        var $saveMenu = null;

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
        // GUI helpers
        // --------------------------------------------------------------------------

        this.enableSaveButton = function () {
            $saveButton.button("option", "disabled", false);
        };

        this.disableSaveButton = function () {
            $saveButton.button("option", "disabled", true);
        };

        this.enableLoadButton = function () {
            $loadButton.button("option", "disabled", false);
        };

        this.disableLoadButton = function () {
            $loadButton.button("option", "disabled", true);
        };

        this.enableClearButton = function () {
            $clearButton.button("option", "disabled", false);
        };

        this.disableClearButton = function () {
            $clearButton.button("option", "disabled", true);
        };

        // --------------------------------------------------------------------------
        // Event handlers
        // --------------------------------------------------------------------------

        function onHelpButtonClick(e) {
            if ($.isFunction(presenter.onHelpButtonClick))
                presenter.onHelpButtonClick(e);
        }

        function onAboutButtonClick(e) {
            if ($.isFunction(presenter.onAboutButtonClick))
                presenter.onAboutButtonClick(e);
        }

        function onOptionsButtonClick(e) {
            if ($.isFunction(presenter.onOptionsButtonClick))
                presenter.onOptionsButtonClick(e);
        }

        function onSaveButtonClick(e) {
            if ($.isFunction(presenter.onSaveButtonClick))
                presenter.onSaveButtonClick(e);
        }

        function onLoadButtonClick(e) {
            if ($.isFunction(presenter.onLoadButtonClick))
                presenter.onLoadButtonClick(e);
        }

        function onClearButtonClick(e) {
            if ($.isFunction(presenter.onClearButtonClick))
                presenter.onClearButtonClick(e);
        }

        function onSaveMenuButtonClick(e) {
            $saveMenu.show().position({
                my: "right top",
                at: "right bottom",
                of: $saveMenuButton
            });

            $(document).one("click", function () {
                $saveMenu.hide();
            });
        }

        // --------------------------------------------------------------------------
        // Initialization
        // --------------------------------------------------------------------------

        (function initialize() {
            createControls();
            initializeControls();
        }());

        function createControls() {
            $mainToolbar = $("#mainToolbar");
            $helpButton = $("#helpButton");
            $aboutButton = $("#aboutButton");
            $optionsButton = $("#optionsButton");
            $saveButton = $("#saveButton");
            $loadButton = $("#loadButton");
            $clearButton = $("#clearButton");
            $saveMenuButton = $("#saveMenuButton");
            $saveMenu = $("#saveMenu");
        }

        function initializeControls() {
            $mainToolbar.buttonset();

            $helpButton.button({
                icons: {
                    primary: "ui-icon-help"
                },
                text: true
            });
            $helpButton.click(onHelpButtonClick);

            $aboutButton.button({
                icons: {
                    primary: "ui-icon-star"
                },
                text: true
            });
            $aboutButton.click(onAboutButtonClick);

            $optionsButton.button({
                icons: {
                    primary: "ui-icon-gear"
                }
            });
            $optionsButton.click(onOptionsButtonClick);

            $saveButton.button({
                icons: {
                    primary: "ui-icon-disk"
                }
            });
            $saveButton.click(onSaveButtonClick);

            $loadButton.button({
                icons: {
                    primary: "ui-icon-disk"
                }
            });
            $loadButton.click(onLoadButtonClick);

            $clearButton.button({
                icons: {
                    primary: "ui-icon-document"
                }
            });
            $clearButton.click(onClearButtonClick);

            $saveMenuButton.button({
                text: false,
                icons: {
                    primary: "ui-icon-triangle-1-s"
                }
            })
            $saveMenuButton.hide();
            $saveMenuButton.click(onSaveMenuButtonClick);

            $saveMenu.menu()
                .hide();
        }
    };

}(jQuery));