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

(function () {

    window.lu = window.lu || {};
    lu.bioCalc = lu.bioCalc || {};
    lu.bioCalc.mainPage = lu.bioCalc.mainPage || {};
    lu.bioCalc.mainPage.pageSections = lu.bioCalc.mainPage.pageSections || {};
    lu.bioCalc.configuration = lu.bioCalc.configuration || {};

    lu.bioCalc.mainPage.ViewFactory = {
        view: {
            setBirthdayText: function () {
            }
        },
        create: function () {
            return this.view;
        }
    };

    lu.bioCalc.views.XDaySectionView = function () {
        this.title = null;
        this.setTitle = function (value) {
            this.title = value;
        };

        var biorhythms = null;
        this.setBiorhythms = function (value) {
            biorhythms = value;
        };
        this.getBiorhythms = function () {
            return biorhythms;
        };
    };

    lu.bioCalc.configuration.CookieConfiguration = {
    };

    lu.bioCalc.BioCalcPageData = {
        xDayChanged: {
            subscribe: function () {
            }
        },
        biorhythmsChanged: {
            subscribe: function () {
            }
        },
        birthdayChanged: {
            subscribe: function () {
            }
        }
    };

    lu.bioCalc.DateFormatter = {
        formatDate: function () {
        }
    };
}());