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
 * This module contains the logic of the page section where the user can see
 * details about the X day.
 * 
 * @param $
 *            The jQuery object.
 * 
 * @param XDaySectionView
 *            The constructor function of the view.
 * 
 * @param bioCalcPageData
 *            The service that provides data and communication between different
 *            modules of the page.
 * 
 * @param dateFormatter
 *            Provides methods to format a data into a string.
 */
(function XDaySection($, XDaySectionView, bioCalcPageData, dateFormatter) {

    var view = null;

    // --------------------------------------------------------------------------
    // Event Handlers
    // --------------------------------------------------------------------------

    function onExternalXDayChanged(arg) {
        var title = dateFormatter.formatDate(arg);
        view.setTitle(title);

        view.setXDay(arg);
    }

    function onExternalBiorhythmsChanged(arg) {
        view.setBiorhythms(arg);
    }

    // --------------------------------------------------------------------------
    // Initializer
    // --------------------------------------------------------------------------

    (function initialize() {
        $(function() {
            view = new XDaySectionView();

            view.setBiorhythms(bioCalcPageData.biorhythms);

            bioCalcPageData.xDayChanged.subscribe(onExternalXDayChanged);
            bioCalcPageData.biorhythmsChanged.subscribe(onExternalBiorhythmsChanged);
        });
    }());
}(jQuery, lu.bioCalc.mainPage.pageSections.XDaySectionView, lu.bioCalc.BioCalcPageData, lu.bioCalc.DateFormatter));