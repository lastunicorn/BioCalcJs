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
 * The main module of the BioCalc home page. It initializes all the other parts of the page.
 */
(function BioCalc($, BioCalcPageData, Configuration, OnePersonBiorhythms, ModalDialogsAutoCloseModule) {

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
        configuration.reset();
    }

    function initializeBioCalcPageData() {
        bioCalcPageData = new BioCalcPageData(configuration);
        var biorhythms = new OnePersonBiorhythms();
        bioCalcPageData.biorhythms = biorhythms;
    }

    function initializeDialogsAutoCloseModule() {
        var modalDialogsAutoCloseModule = new ModalDialogsAutoCloseModule();
        modalDialogsAutoCloseModule.start();
    }

    function createPageSections() {
        var helpDialog = new lu.bioCalc.presenters.HelpDialog();
        helpDialog.view = new lu.bioCalc.views.HelpDialogView();

        var aboutDialog = new lu.bioCalc.presenters.AboutDialog();
        aboutDialog.view = new lu.bioCalc.views.AboutDialogView();

        var optionsDialog = new lu.bioCalc.presenters.OptionsDialog(bioCalcPageData);
        optionsDialog.view = new lu.bioCalc.views.OptionsDialogView();

        var mainToolbarCommands = {
            saveCommand: new lu.bioCalc.commands.SaveCommand(bioCalcPageData),
            loadCommand: new lu.bioCalc.commands.LoadCommand(bioCalcPageData),
            clearCommand: new lu.bioCalc.commands.ClearCommand(bioCalcPageData),
            helpDialogCommand: new lu.bioCalc.commands.DialogCommand(helpDialog),
            aboutDialogCommand: new lu.bioCalc.commands.DialogCommand(aboutDialog),
            optionsDialogCommand: new lu.bioCalc.commands.DialogCommand(optionsDialog)
        };

        var mainToolbar = new lu.bioCalc.presenters.MainToolbar(bioCalcPageData, mainToolbarCommands);
        mainToolbar.view = new lu.bioCalc.views.MainToolbarView();

        var chartsSection = new lu.bioCalc.presenters.ChartsSection(bioCalcPageData);
        chartsSection.view = new lu.bioCalc.views.ChartsSectionView();

        var birthdaySection = new lu.bioCalc.presenters.BirthdaySection(bioCalcPageData);
        birthdaySection.view = new lu.bioCalc.views.BirthdaySectionView();

        var xDaySection = new lu.bioCalc.presenters.XDaySection(bioCalcPageData);
        xDaySection.view = new lu.bioCalc.views.XDaySectionView();
    }
}(
        jQuery,
        lu.bioCalc.BioCalcPageData,
        lu.bioCalc.configuration.CookieConfiguration,
        lu.bioControls.biorhythmModel.OnePersonBiorhythms,
        lu.bioCalc.helpers.ModalDialogsAutoCloseModule
    ));