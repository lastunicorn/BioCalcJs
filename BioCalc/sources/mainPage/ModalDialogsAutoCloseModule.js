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

lu.Namespacing.ensureNamespace("lu.bioCalc");

(function ($) {

    /**
     * Closes the modal dialogs when clicking outside of them.
     */
    lu.bioCalc.ModalDialogsAutoCloseModule = (function () {

        function start() {
            $(document.body).on("click", ".ui-widget-overlay", onWidgetOverlayClick);
        }

        function onWidgetOverlayClick() {
            var $dialog = $(".ui-dialog");

            $.each($dialog, function () {
                var $dialogContent = $(this).children(".ui-dialog-content");

                var isModal = $dialogContent.dialog("option", "modal");
                if (isModal) {
                    $dialogContent.dialog("close");
                }
            });
        }

        return {
            start: start
        };
    }());
}(jQuery));