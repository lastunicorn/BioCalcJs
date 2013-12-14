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
 * The main module of the BioCalc home page. It initializes all the parts of the page.
 */
(function BioCalc($, BioCalcPageData, Configuration, CommonBiorhythmsContainer, ModalDialogsAutoCloseModule) {

    var configuration;
    var bioCalcPageData;

    // --------------------------------------------------------------------------
    // Initializer
    // --------------------------------------------------------------------------

    (function initialize() {
        loadConfiguration();
        initializeBioCalcPageData();

        $(function () {
            initializeDialogsAutoCloseModule();
            createPageSections();
        });
    }());

    function loadConfiguration() {
        configuration = new Configuration();
        configuration.loadFromCookies();
    }

    function initializeBioCalcPageData() {
        bioCalcPageData = new BioCalcPageData(configuration);
        bioCalcPageData.biorhythms = new CommonBiorhythmsContainer();
    }

    function initializeDialogsAutoCloseModule() {
        var modalDialogsAutoCloseModule = new ModalDialogsAutoCloseModule();
        modalDialogsAutoCloseModule.start();
    }

    function createPageSections() {
        var helpDialog = new lu.bioCalc.mainPage.pageSections.HelpDialog();
        helpDialog.view = new lu.bioCalc.mainPage.pageSections.HelpDialogView();

        var aboutDialog = new lu.bioCalc.mainPage.pageSections.AboutDialog();
        aboutDialog.view = new lu.bioCalc.mainPage.pageSections.AboutDialogView();

        var optionsDialog = new lu.bioCalc.mainPage.pageSections.OptionsDialog(bioCalcPageData);
        optionsDialog.view = new lu.bioCalc.mainPage.pageSections.OptionsDialogView();

        var mainToolbarCommands = {
            saveCommand: new lu.bioCalc.mainPage.commands.SaveCommand(configuration),
            loadCommand: new lu.bioCalc.mainPage.commands.LoadCommand(configuration),
            helpDialogCommand: new lu.bioCalc.mainPage.commands.DialogCommand(helpDialog),
            aboutDialogCommand: new lu.bioCalc.mainPage.commands.DialogCommand(aboutDialog),
            optionsDialogCommand: new lu.bioCalc.mainPage.commands.DialogCommand(optionsDialog)
        };

        var mainToolbar = new lu.bioCalc.mainPage.pageSections.MainToolbar(configuration, bioCalcPageData, mainToolbarCommands);
        mainToolbar.view = new lu.bioCalc.mainPage.pageSections.MainToolbarView();

        var chartsSection = new lu.bioCalc.mainPage.pageSections.ChartsSection(bioCalcPageData);
        chartsSection.view = new lu.bioCalc.mainPage.pageSections.ChartsSectionView();

        var birthdaySection = new lu.bioCalc.mainPage.pageSections.BirthdaySection(bioCalcPageData);
        birthdaySection.view = new lu.bioCalc.mainPage.pageSections.BirthdaySectionView();

        var xDaySection = new lu.bioCalc.mainPage.pageSections.XDaySection(bioCalcPageData);
        xDaySection.view = new lu.bioCalc.mainPage.pageSections.XDaySectionView();
    }
}(
        jQuery,
        lu.bioCalc.mainPage.BioCalcPageData,
        lu.bioCalc.configuration.Configuration,
        lu.bioControls.biorhythmModel.CommonBiorhythmsContainer,
        lu.bioCalc.helpers.ModalDialogsAutoCloseModule
    ));