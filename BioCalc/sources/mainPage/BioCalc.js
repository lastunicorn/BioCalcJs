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
(function BioCalc($, bioCalcPageData, ConfigurationService, CommonBiorhythmsContainer, ModalDialogsAutoCloseModule) {

    var configuration;

    // --------------------------------------------------------------------------
    // Initializer
    // --------------------------------------------------------------------------

    (function initialize() {
        configuration = new ConfigurationService();

        initializeBioCalcPageData();

        $(function () {
            var modalDialogsAutoCloseModule = new ModalDialogsAutoCloseModule();
            modalDialogsAutoCloseModule.start();

            createPageSections();
        });
    }());

    function createPageSections() {
        var helpDialog = new lu.bioCalc.mainPage.dialogs.HelpDialog();
        var aboutDialog = new lu.bioCalc.mainPage.dialogs.AboutDialog();
        var optionsDialog = new lu.bioCalc.mainPage.dialogs.OptionsDialog();
        var mainToolbar = new lu.bioCalc.mainPage.pageSections.MainToolbar(helpDialog, aboutDialog, optionsDialog);

        var chartsSection = new lu.bioCalc.mainPage.pageSections.ChartsSection();
        var birthdaySection = new lu.bioCalc.mainPage.pageSections.BirthdaySection(configuration);
        var xDaySection = new lu.bioCalc.mainPage.pageSections.XDaySection();
    }

    function initializeBioCalcPageData() {
        var biorhythmShapes = createBiorhythmShapes();

        bioCalcPageData.biorhythms = biorhythmShapes;
        bioCalcPageData.birthday = configuration.config.birthday;
        bioCalcPageData.secondBirthday = new Date(1980, 05, 13);
    }

    function createBiorhythmShapes() {
        var biorhythmShapes = new CommonBiorhythmsContainer();
        biorhythmShapes.setBirthdayOnAll(configuration.config.birthday);

        return biorhythmShapes;
    }
}(
        jQuery,
        lu.bioCalc.mainPage.BioCalcPageData,
        lu.bioCalc.configuration.Configuration,
        lu.bioControls.biorhythmModel.CommonBiorhythmsContainer,
        lu.bioCalc.helpers.ModalDialogsAutoCloseModule
    ));