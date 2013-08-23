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

var lu = lu || {};
lu.bioControls = lu.bioControls || {};

/**
 * Draws the biorhythm charts on a html canvas element. 
 * 
 * @param id
 *            The id of the html canvas element on which to draw the charts.
 * 
 * @returns {lu.bioControls.BiorhythmView}
 */
lu.bioControls.BiorhythmView = function(id) {

    var canvas = null;
    var obj = this;
    var scroller = null;

    // --------------------------------------------------------------------------
    // Biorhythms
    // --------------------------------------------------------------------------

    var biorhythms = [];

    var biorhythmAddedEvent = new lu.Event();
    this.subscribeToBiorhythmAdded = biorhythmAddedEvent.subscribe;

    var biorhythmRemovedEvent = new lu.Event();
    this.subscribeToBiorhythmRemoved = biorhythmRemovedEvent.subscribe;

    this.addBiorhythm = function(biorhythmShape) {
        addBiorhythm(biorhythmShape);
    };

    this.setBiorhythms = function(value) {

        removeAllBiorhythms();

        for ( var i = 0; i < value.length; i++) {
            if ($.type(value[i]) === "object") {
                addBiorhythm(value[i]);
            }
        }

        paint();
    };

    this.getBiorhythms = function() {
        var list = [];

        for ( var i = 0; i < biorhythms.length; i++) {
            list.push(biorhythms[i]);
        }

        return list;
    };

    function addBiorhythm(biorhythmShape) {
        biorhythms.push(biorhythmShape);

        biorhythmShape.subscribeToNameChanged(onBiorhithmShapeChanged);
        biorhythmShape.subscribeToBirthdayChanged(onBiorhithmShapeChanged);
        biorhythmShape.subscribeToBiorhythmChanged(onBiorhithmShapeChanged);
        biorhythmShape.subscribeToColorChanged(onBiorhithmShapeChanged);
        biorhythmShape.subscribeToIsVisibleChanged(onBiorhithmShapeChanged);
        biorhythmShape.subscribeToLineWidthChanged(onBiorhithmShapeChanged);
        biorhythmShape.subscribeToLineStyleChanged(onBiorhithmShapeChanged);

        biorhythmAddedEvent.raise(obj, biorhythmShape);
    }

    function onBiorhithmShapeChanged() {
        paint();
    }

    function removeAllBiorhythms() {
        for ( var i = 0; i < biorhythms.length; i++) {
            removeBiorhythmAt(i);
        }
    }

    this.removeBiorhythm = function(biorhythmShape) {
        var index = biorhythms.indexOf(biorhythmShape);
        if (index !== -1) {
            removeBiorhythmAt(index);
        }
    };

    function removeBiorhythmAt(index) {
        var biorhythmShape = biorhythms[index];

        biorhythmShape.unsubscribeFromNameChanged(onBiorhithmShapeChanged);
        biorhythmShape.unsubscribeFromBirthdayChanged(onBiorhithmShapeChanged);
        biorhythmShape.unsubscribeFromBiorhythmChanged(onBiorhithmShapeChanged);
        biorhythmShape.unsubscribeFromColorChanged(onBiorhithmShapeChanged);
        biorhythmShape.unsubscribeFromIsVisibleChanged(onBiorhithmShapeChanged);
        biorhythmShape.unsubscribeFromLineWidthChanged(onBiorhithmShapeChanged);
        biorhythmShape.unsubscribeFromLineStyleChanged(onBiorhithmShapeChanged);

        biorhythms.splice(index, 1);

        biorhythmRemovedEvent.raise(obj, biorhythmShape);
    }

    // --------------------------------------------------------------------------
    // FirstDay
    // --------------------------------------------------------------------------

    var firstDay = new Date(Date.now() - (7 * 24 * 60 * 60 * 1000));
    var firstDayChangedEvent = new lu.Event();

    /**
     * Sets the first day displayed in the grid.
     * 
     * @param value
     *            The new first day.
     */
    this.setFirstDay = setFirstDay;
    function setFirstDay(value) {
        firstDay = value;
        firstDayChangedEvent.raise(obj, value);
        paint();
    }

    function incrementFirstDay(value) {
        var date = new Date(firstDay.getTime());
        date.setDate(date.getDate() + value);
        setFirstDay(date);
    }

    /**
     * Returns the date representing the first day displayed in the grid.
     * 
     * @returns {Date} The date representing the first day displayed in the
     *          grid.
     */
    this.getFirstDay = getFirstDay;
    function getFirstDay() {
        return firstDay;
    }

    Object.defineProperty(this, "firstDay", {
        enumerable: true,
        configurable: false,
        get: getFirstDay,
        set: setFirstDay
    });

    this.subscribeToFirstDayChanged = firstDayChangedEvent.subscribe;

    this.getLastDay = function() {
        return new Date(firstDay.getTime() + (totalDays - 1) * 24 * 60 * 60 * 1000);
    };

    this.getXDay = function() {
        return new Date(firstDay.getTime() + (xDayIndex * 24 * 60 * 60 * 1000));
    };

    // --------------------------------------------------------------------------
    // IsGridVisible
    // --------------------------------------------------------------------------

    var isGridVisible = true;
    var isGridVisibleChangedEvent = new lu.Event();

    this.setGridVisibility = function(value) {
        isGridVisible = Boolean(value);

        isGridVisibleChangedEvent.raise(obj, value);
        paint();
    };

    this.getGridVisibility = function() {
        return isGridVisible;
    };

    this.subscribeToGridVisibilityChanged = isGridVisibleChangedEvent.subscribe;

    // --------------------------------------------------------------------------
    // TotalDays
    // --------------------------------------------------------------------------

    var totalDays = 30;
    var totalDaysChangedEvent = new lu.Event();

    this.setTotalDays = function(value) {
        totalDays = value;

        totalDaysChangedEvent.raise(obj, value);
        paint();
    };

    this.getTotalDays = function() {
        return totalDays;
    };

    this.subscribeToTotalDaysChanged = totalDaysChangedEvent.subscribe;

    // --------------------------------------------------------------------------
    // XDayIndex
    // --------------------------------------------------------------------------

    var xDayIndex = 7;
    var xDayIndexChangedEvent = new lu.Event();

    this.setXDayIndex = setXDayIndex;
    function setXDayIndex(value) {
        if (xDayIndex === value || value < 0 || value >= totalDays)
            return;

        xDayIndex = value;

        xDayIndexChangedEvent.raise(obj, value);
        paint();
    }

    this.getXDayIndex = getXDayIndex;
    function getXDayIndex() {
        return xDayIndex;
    }

    this.subscribeToXDayIndexChanged = xDayIndexChangedEvent.subscribe;

    // --------------------------------------------------------------------------
    // GridColor
    // --------------------------------------------------------------------------

    var gridColor = "#d3d3d3"; // LightGray
    var gridColorChangedEvent = new lu.Event();

    this.setGridColor = function(value) {
        gridColor = value;

        gridColorChangedEvent.raise(obj, value);
        paint();
    };

    this.getGridColor = function() {
        return xDayIndex;
    };

    this.subscribeToGridColorChanged = gridColorChangedEvent.subscribe;

    // --------------------------------------------------------------------------
    // AreDayNumbersVisible
    // --------------------------------------------------------------------------

    var areDayNumbersVisible = true;
    var areDayNumbersVisibleChangedEvent = new lu.Event();

    this.setDayNumbersVisibility = function(value) {
        areDayNumbersVisible = value;

        areDayNumbersVisibleChangedEvent.raise(obj, value);
        paint();
    };

    this.getDayNumbersVisibility = function() {
        return areDayNumbersVisible;
    };

    this.subscribeToDayNumbersVisibilityChanged = areDayNumbersVisibleChangedEvent.subscribe;

    // --------------------------------------------------------------------------
    // AreWeekDaysVisible
    // --------------------------------------------------------------------------

    var areWeekDaysVisible = true;
    var areWeekDaysVisibleChangedEvent = new lu.Event();

    this.setWeekDaysVisibility = function(value) {
        areWeekDaysVisible = value;

        areWeekDaysVisibleChangedEvent.raise(obj, value);
        paint();
    };

    this.getWeekDaysVisibility = function() {
        return areWeekDaysVisible;
    };

    this.subscribeToWeekDaysVisibilityChanged = areWeekDaysVisibleChangedEvent.subscribe;

    // --------------------------------------------------------------------------
    // DayNumbersPosition
    // --------------------------------------------------------------------------

    var dayNumbersPosition = lu.DayLabelPosition.top;
    var dayNumbersPositionChangedEvent = new lu.Event();

    this.setDayNumbersPosition = function(value) {
        dayNumbersPosition = value;

        dayNumbersPositionChangedEvent.raise(obj, value);
        paint();
    };

    this.getDayNumbersPosition = function() {
        return dayNumbersPosition;
    };

    this.subscribeToTodayNumbersPositionChanged = dayNumbersPositionChangedEvent.subscribe;

    // --------------------------------------------------------------------------
    // WeekDaysPosition
    // --------------------------------------------------------------------------

    var weekDaysPosition = lu.DayLabelPosition.bottom;
    var weekDaysPositionChangedEvent = new lu.Event();

    this.setWeekDaysPosition = function(value) {
        weekDaysPosition = value;

        weekDaysPositionChangedEvent.raise(obj, value);
        paint();
    };

    this.getWeekDaysPosition = function() {
        return weekDaysPosition;
    };

    this.subscribeToWeekDaysPositionChanged = weekDaysPositionChangedEvent.subscribe;

    // #endregion

    // #region AreSundaysEmphasized

    // --------------------------------------------------------------------------
    // AreSundaysEmphasized
    // --------------------------------------------------------------------------

    var areSundaysEmphasized = true;
    var areSundaysEmphasizedChangedEvent = new lu.Event();

    this.setAreSundaysEmphasized = function(value) {
        areSundaysEmphasized = value;

        areSundaysEmphasizedChangedEvent.raise(obj, value);
        paint();
    };

    this.getAreSundaysEmphasized = function() {
        return areSundaysEmphasized;
    };

    this.subscribeToAreSundaysEmphasizedChanged = areSundaysEmphasizedChangedEvent.subscribe;

    // --------------------------------------------------------------------------
    // ForeColor
    // --------------------------------------------------------------------------

    var foreColor = "#b0b0b0";
    var foreColorChangedEvent = new lu.Event();

    this.setForeColor = function(value) {
        foreColor = value;

        foreColorChangedEvent.raise(obj, value);
        paint();
    };

    this.getForeColor = function() {
        return foreColor;
    };

    this.subscribeToForeColorChanged = foreColorChangedEvent.subscribe;

    // --------------------------------------------------------------------------
    // SundaysColor
    // --------------------------------------------------------------------------

    var sundaysColor = "#ff0000";
    var sundaysColorChangedEvent = new lu.Event();

    this.setSundaysColor = function(value) {
        sundaysColor = value;

        sundaysColorChangedEvent.raise(obj, value);
        paint();
    };

    this.getSundaysColor = function() {
        return sundaysColor;
    };

    this.subscribeToSundaysColorChanged = sundaysColorChangedEvent.subscribe;

    // --------------------------------------------------------------------------
    // Font
    // --------------------------------------------------------------------------

    var font = "12px Arial";
    var fontChangedEvent = new lu.Event();

    this.setFont = function(value) {
        font = value;

        fontChangedEvent.raise(obj, value);
        paint();
    };

    this.getFont = function() {
        return font;
    };

    this.subscribeToFontChanged = fontChangedEvent.subscribe;

    // --------------------------------------------------------------------------
    // SundaysFont
    // --------------------------------------------------------------------------

    var sundaysFont = "italic 12px Arial";
    var sundaysFontChangedEvent = new lu.Event();

    this.setSundaysFont = function(value) {
        sundaysFont = value;

        sundaysFontChangedEvent.raise(obj, value);
        paint();
    };

    this.getSundaysFont = function() {
        return sundaysFont;
    };

    this.subscribeToSundaysFontChanged = sundaysFontChangedEvent.subscribe;

    // --------------------------------------------------------------------------
    // TodayBackColor
    // --------------------------------------------------------------------------

    var todayBackColor = "#ffe4b5"; // Moccasin
    var todayBackColorChangedEvent = new lu.Event();

    this.setTodayBackColor = function(value) {
        todayBackColor = value;

        todayBackColorChangedEvent.raise(obj, value);
        paint();
    };

    this.getTodayBackColor = function() {
        return todayBackColor;
    };

    this.subscribeToTodayBackColorChanged = todayBackColorChangedEvent.subscribe;

    // --------------------------------------------------------------------------
    // IsXDayVisible
    // --------------------------------------------------------------------------

    var isXDayVisible = true;
    var isXDayVisibleChangedEvent = new lu.Event();

    this.setXDayVisibility = function(value) {
        isXDayVisible = value;

        isXDayVisibleChangedEvent.raise(obj, value);
        paint();
    };

    this.getXDayVisibility = function() {
        return isXDayVisible;
    };

    this.subscribeToXDayVisibilityChanged = isXDayVisibleChangedEvent.subscribe;

    // --------------------------------------------------------------------------
    // XDayBorderColor
    // --------------------------------------------------------------------------

    var xDayBorderColor = "#000000"; // Black
    var xDayBorderColorChangedEvent = new lu.Event();

    this.setXDayBorderColor = function(value) {
        xDayBorderColor = value;

        xDayBorderColorChangedEvent.raise(obj, value);
        paint();
    };

    this.getXDayBorderColor = function() {
        return xDayBorderColor;
    };

    this.subscribeToXDayBorderColorChanged = xDayBorderColorChangedEvent.subscribe;

    // --------------------------------------------------------------------------
    // XDayBorderWidth
    // --------------------------------------------------------------------------

    var xDayBorderWidth = 2;
    var xDayBorderWidthChangedEvent = new lu.Event();

    this.setXDayBorderWidth = function(value) {
        xDayBorderWidth = value;

        xDayBorderWidthChangedEvent.raise(obj, value);
        paint();
    };

    this.getXDayBorderWidth = function() {
        return xDayBorderWidth;
    };

    this.subscribeToXDayBorderWidthChanged = xDayBorderWidthChangedEvent.subscribe;

    // --------------------------------------------------------------------------
    // 
    // --------------------------------------------------------------------------

    this.setBirthdayOnAllBiorhythms = function(birthday) {
        suspendPaint();

        for ( var i = 0; i < biorhythms.length; i++) {
            biorhythms[i].setBirthday(birthday);
        }

        resumePaint();
    };

    // --------------------------------------------------------------------------
    // Paint
    // --------------------------------------------------------------------------

    var painter = null;
    var allowRepaint = true;

    this.suspendPaint = suspendPaint;
    function suspendPaint() {
        allowRepaint = false;
    }

    this.resumePaint = resumePaint;
    function resumePaint() {
        allowRepaint = true;
        paint();
    }

    function paint() {
        if (!allowRepaint) {
            return;
        }

        var rawPaintData = {
            biorhythmShapes: biorhythms,
            firstDay: firstDay,
            totalDays: totalDays,
            xDayIndex: xDayIndex,
            isXDayVisible: isXDayVisible,
            xDayBorderColor: xDayBorderColor,
            xDayBorderWidth: xDayBorderWidth,
            gridColor: gridColor,
            isGridVisible: isGridVisible,
            todayBackColor: todayBackColor,

            areDayNumbersVisible: areDayNumbersVisible,
            areWeekDaysVisible: areWeekDaysVisible,
            dayNumbersPosition: dayNumbersPosition,
            weekDaysPosition: weekDaysPosition,
            areSundaysEmphasized: areSundaysEmphasized,

            foreColor: foreColor,
            sundaysColor: sundaysColor,
            font: font,
            sundaysFont: sundaysFont
        };

        painter.paint(rawPaintData, canvas);
    }

    this.getPaintCount = function() {
        return painter.getPaintCount();
    };

    // --------------------------------------------------------------------------
    // Event Handlers
    // --------------------------------------------------------------------------

    function onDrag(evt) {
        if (evt.isAlternative) {
            setXDayIndex(getXDayIndex() + evt.steps);
        } else {
            incrementFirstDay(-evt.steps);
        }
    }

    function onDragStart(evt) {
        evt.stepLength = canvas.width / totalDays;
    }

    // --------------------------------------------------------------------------
    // Initializer
    // --------------------------------------------------------------------------

    (function initialize() {
        canvas = document.getElementById(id);

        scroller = new lu.bioControls.Scroller({
            element: canvas,
            onDragStart: onDragStart,
            onDrag: onDrag
        });

        painter = new lu.bioControls.common.painting.BiorhythmViewPainter();
    }());
};