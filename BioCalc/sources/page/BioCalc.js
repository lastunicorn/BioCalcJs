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

(function BioCalc(ConfigurationManager, CommonBiorhythmsContainer, bioCalcPageData) {
    var commonBiorhythmShapes = null;
    var configManager = null;

    // --------------------------------------------------------------------------
    // Initializer
    // --------------------------------------------------------------------------

    (function initialize() {
        $(function() {

            configManager = new ConfigurationManager();
            configManager.loadFromCookies();

            commonBiorhythmShapes = new CommonBiorhythmsContainer();
            commonBiorhythmShapes.setBirthdayOnAll(configManager.config.birthday);

            initializePageData();

            configureModalDialogs();
        });
    }());

    function initializePageData() {
        bioCalcPageData.configManager = configManager;
        bioCalcPageData.setBiorhythms(commonBiorhythmShapes);
        bioCalcPageData.setBirthday(configManager.config.birthday);
    }

    function configureModalDialogs() {
        // Close the modal dialogs when clicking outside of them.

        $(document.body).on("click", ".ui-widget-overlay", function() {
            $.each($(".ui-dialog"), function() {
                var $dialog = $(this).children(".ui-dialog-content");
                if ($dialog.dialog("option", "modal")) {
                    $dialog.dialog("close");
                }
            });
        });
    }
}(lu.bioCalc.ConfigurationManager, lu.bioControls.biorhythmModel.CommonBiorhythmsContainer, lu.bioCalc.BioCalcPageData));