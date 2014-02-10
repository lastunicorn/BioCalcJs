// BioControls
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
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythmView = lu.bioControls.biorhythmView || {};

(function (Event, dateUtil, DayLabelPosition) {

    lu.bioControls.biorhythmView.biorhythmsModel = function () {

        var propertyChangedEvent = new Event();
        this.propertyChanged = propertyChangedEvent.client;

        // --------------------------------------------------------------------------
        // width property
        // --------------------------------------------------------------------------

        var width = 800;

        Object.defineProperty(this, "width", {
            enumerable: true,
            configurable: false,
            get: function () {
                return width;
            },
            set: function (value) {
                width = value;
                propertyChangedEvent.raise(this, "width");
            }
        });

        // --------------------------------------------------------------------------
        // height property
        // --------------------------------------------------------------------------

        var height = 200;

        Object.defineProperty(this, "height", {
            enumerable: true,
            configurable: false,
            get: function () {
                return height;
            },
            set: function (value) {
                height = value;
                propertyChangedEvent.raise(this, "height");
            }
        });

        // --------------------------------------------------------------------------
        // biorhythms property
        // --------------------------------------------------------------------------

        var biorhythms = [];

        Object.defineProperty(this, "biorhythms", {
            enumerable: true,
            configurable: false,
            get: function () {
                return biorhythms;
            },
            set: function (value) {
                biorhythms = value;
                propertyChangedEvent.raise(this, "biorhythms");
            }
        });

        // --------------------------------------------------------------------------
        // firstDay property
        // --------------------------------------------------------------------------

        var firstDay = dateUtil.addDays(Date.now(), -7);

        Object.defineProperty(this, "firstDay", {
            enumerable: true,
            configurable: false,
            get: function () {
                return firstDay;
            },
            set: function (value) {
                firstDay = value;
                propertyChangedEvent.raise(this, "firstDay");
            }
        });

        // --------------------------------------------------------------------------
        // isGridVisible property
        // --------------------------------------------------------------------------

        var isGridVisible = true;

        Object.defineProperty(this, "isGridVisible", {
            enumerable: true,
            configurable: false,
            get: function () {
                return isGridVisible;
            },
            set: function (value) {
                isGridVisible = value;
                propertyChangedEvent.raise(this, "isGridVisible");
            }
        });

        // --------------------------------------------------------------------------
        // totalDays property
        // --------------------------------------------------------------------------

        var totalDays = 30;

        Object.defineProperty(this, "totalDays", {
            enumerable: true,
            configurable: false,
            get: function () {
                return totalDays;
            },
            set: function (value) {
                totalDays = value;
                propertyChangedEvent.raise(this, "totalDays");
            }
        });

        // --------------------------------------------------------------------------
        // xDayIndex property
        // --------------------------------------------------------------------------

        var xDayIndex = 7;

        Object.defineProperty(this, "xDayIndex", {
            enumerable: true,
            configurable: false,
            get: function () {
                return xDayIndex;
            },
            set: function (value) {
                xDayIndex = value;
                propertyChangedEvent.raise(this, "xDayIndex");
            }
        });

        // --------------------------------------------------------------------------
        // gridColor property
        // --------------------------------------------------------------------------

        var gridColor = "#d3d3d3"; // LightGray

        Object.defineProperty(this, "gridColor", {
            enumerable: true,
            configurable: false,
            get: function () {
                return gridColor;
            },
            set: function (value) {
                gridColor = value;
                propertyChangedEvent.raise(this, "gridColor");
            }
        });

        // --------------------------------------------------------------------------
        // areDayNumbersVisible property
        // --------------------------------------------------------------------------

        var areDayNumbersVisible = true;

        Object.defineProperty(this, "areDayNumbersVisible", {
            enumerable: true,
            configurable: false,
            get: function () {
                return areDayNumbersVisible;
            },
            set: function (value) {
                areDayNumbersVisible = value;
                propertyChangedEvent.raise(this, "areDayNumbersVisible");
            }
        });

        // --------------------------------------------------------------------------
        // areWeekDaysVisible property
        // --------------------------------------------------------------------------

        var areWeekDaysVisible = true;

        Object.defineProperty(this, "areWeekDaysVisible", {
            enumerable: true,
            configurable: false,
            get: function () {
                return areWeekDaysVisible;
            },
            set: function (value) {
                areWeekDaysVisible = value;
                propertyChangedEvent.raise(this, "areWeekDaysVisible");
            }
        });

        // --------------------------------------------------------------------------
        // dayNumbersPosition property
        // --------------------------------------------------------------------------

        var dayNumbersPosition = DayLabelPosition.top;

        Object.defineProperty(this, "dayNumbersPosition", {
            enumerable: true,
            configurable: false,
            get: function () {
                return dayNumbersPosition;
            },
            set: function (value) {
                dayNumbersPosition = value;
                propertyChangedEvent.raise(this, "dayNumbersPosition");
            }
        });

        // --------------------------------------------------------------------------
        // weekDaysPosition property
        // --------------------------------------------------------------------------

        var weekDaysPosition = DayLabelPosition.bottom;

        Object.defineProperty(this, "weekDaysPosition", {
            enumerable: true,
            configurable: false,
            get: function () {
                return weekDaysPosition;
            },
            set: function (value) {
                weekDaysPosition = value;
                propertyChangedEvent.raise(this, "weekDaysPosition");
            }
        });

        // --------------------------------------------------------------------------
        // areSundaysEmphasized property
        // --------------------------------------------------------------------------

        var areSundaysEmphasized = true;

        Object.defineProperty(this, "areSundaysEmphasized", {
            enumerable: true,
            configurable: false,
            get: function () {
                return areSundaysEmphasized;
            },
            set: function (value) {
                areSundaysEmphasized = value;
                propertyChangedEvent.raise(this, "areSundaysEmphasized");
            }
        });

        // --------------------------------------------------------------------------
        // foreColor property
        // --------------------------------------------------------------------------

        var foreColor = "#b0b0b0";

        Object.defineProperty(this, "foreColor", {
            enumerable: true,
            configurable: false,
            get: function () {
                return foreColor;
            },
            set: function (value) {
                foreColor = value;
                propertyChangedEvent.raise(this, "foreColor");
            }
        });

        // --------------------------------------------------------------------------
        // sundaysColor property
        // --------------------------------------------------------------------------

        var sundaysColor = "#ff0000"; // Red

        Object.defineProperty(this, "sundaysColor", {
            enumerable: true,
            configurable: false,
            get: function () {
                return sundaysColor;
            },
            set: function (value) {
                sundaysColor = value;
                propertyChangedEvent.raise(this, "sundaysColor");
            }
        });

        // --------------------------------------------------------------------------
        // font property
        // --------------------------------------------------------------------------

        var font = "12px Arial";

        Object.defineProperty(this, "font", {
            enumerable: true,
            configurable: false,
            get: function () {
                return font;
            },
            set: function (value) {
                font = value;
                propertyChangedEvent.raise(this, "font");
            }
        });

        // --------------------------------------------------------------------------
        // sundaysFont property
        // --------------------------------------------------------------------------

        var sundaysFont = "italic 12px Arial";

        Object.defineProperty(this, "sundaysFont", {
            enumerable: true,
            configurable: false,
            get: function () {
                return sundaysFont;
            },
            set: function (value) {
                sundaysFont = value;
                propertyChangedEvent.raise(this, "sundaysFont");
            }
        });

        // --------------------------------------------------------------------------
        // todayBackColor property
        // --------------------------------------------------------------------------

        var todayBackColor = "#ffe4b5"; // Moccasin

        Object.defineProperty(this, "todayBackColor", {
            enumerable: true,
            configurable: false,
            get: function () {
                return todayBackColor;
            },
            set: function (value) {
                todayBackColor = value;
                propertyChangedEvent.raise(this, "todayBackColor");
            }
        });

        // --------------------------------------------------------------------------
        // isXDayVisible property
        // --------------------------------------------------------------------------

        var isXDayVisible = true;

        Object.defineProperty(this, "isXDayVisible", {
            enumerable: true,
            configurable: false,
            get: function () {
                return isXDayVisible;
            },
            set: function (value) {
                isXDayVisible = value;
                propertyChangedEvent.raise(this, "isXDayVisible");
            }
        });

        // --------------------------------------------------------------------------
        // xDayBorderColor property
        // --------------------------------------------------------------------------

        var xDayBorderColor = "#000000"; // Black

        Object.defineProperty(this, "xDayBorderColor", {
            enumerable: true,
            configurable: false,
            get: function () {
                return xDayBorderColor;
            },
            set: function (value) {
                xDayBorderColor = value;
                propertyChangedEvent.raise(this, "xDayBorderColor");
            }
        });

        // --------------------------------------------------------------------------
        // xDayBorderWidth property
        // --------------------------------------------------------------------------

        var xDayBorderWidth = 2;

        Object.defineProperty(this, "xDayBorderWidth", {
            enumerable: true,
            configurable: false,
            get: function () {
                return xDayBorderWidth;
            },
            set: function (value) {
                xDayBorderWidth = value;
                propertyChangedEvent.raise(this, "xDayBorderWidth");
            }
        });

    };

}(
        lu.Event,
        lu.DateUtil,
        lu.bioControls.biorhythmView.DayLabelPosition
    ));