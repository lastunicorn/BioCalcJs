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

(function (MainToolbarView, BirthdaySectionView, XDaySectionView, ChartsSectionView, HelpDialogView, AboutDialogView, OptionsDialogView) {

    lu.bioCalc.mainPage.ViewFactory = (function () {

        function create(key) {
            switch (key) {
                case "MainToolbarView":
                    return new MainToolbarView();

                case "ChartsSectionView":
                    return new ChartsSectionView();

                case "BirthdaySectionView":
                    return new BirthdaySectionView();

                case "XDaySectionView":
                    return new XDaySectionView();

                case "HelpDialogView":
                    return new HelpDialogView();

                case "AboutDialogView":
                    return new AboutDialogView();

                case "OptionsDialogView":
                    return new OptionsDialogView();

                default:
                    return null;
            }
        }

        return {
            create: create
        };
    }());

}(
        lu.bioCalc.mainPage.pageSections.MainToolbarView,
        lu.bioCalc.mainPage.pageSections.BirthdaySectionView,
        lu.bioCalc.mainPage.pageSections.XDaySectionView,
        lu.bioCalc.mainPage.pageSections.ChartsSectionView,
        lu.bioCalc.mainPage.pageSections.HelpDialogView,
        lu.bioCalc.mainPage.pageSections.AboutDialogView,
        lu.bioCalc.mainPage.pageSections.OptionsDialogView
    ));