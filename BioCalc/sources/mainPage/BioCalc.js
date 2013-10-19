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

/**
 * The main module of the BioCalc home page. It creates the biorhythms to be
 * displayed in the page.
 * 
 * @param $
 *            The jQuery object.
 * 
 * @param bioCalcPageData
 *            The service that provides data and communication between different
 *            modules of the page.
 * 
 * @param configurationService
 *            Keeps the configuration object.
 * 
 * @param CommonBiorhythmsContainer
 *            Object constructor. Creates and keeps a collection of biorhythms.
 */
(function BioCalc($, bioCalcPageData, configurationService, CommonBiorhythmsContainer) {
    
    // --------------------------------------------------------------------------
    // Initializer
    // --------------------------------------------------------------------------

    (function initialize() {
        var biorhythmShapes = new CommonBiorhythmsContainer();
        biorhythmShapes.setBirthdayOnAll(configurationService.config.birthday);

        bioCalcPageData.biorhythms = biorhythmShapes;
        bioCalcPageData.birthday = configurationService.config.birthday;

        $(function() {
            configureModalDialogs();
        });
    }());

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
}(jQuery, lu.bioCalc.BioCalcPageData, lu.bioCalc.configuration.ConfigurationService, lu.bioControls.biorhythmModel.CommonBiorhythmsContainer));