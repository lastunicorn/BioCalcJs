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
 * Draws the biorhythm charts on an html canvas element.
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

    var biorhythms = new lu.List();

    var biorhythmAddedEvent = new lu.Event();
    this.biorhythmAdded = biorhythmAddedEvent.client;

    /**
     * deprecated
     */
    this.subscribeToBiorhythmAdded = biorhythmAddedEvent.subscribe;

    var biorhythmRemovedEvent = new lu.Event();
    this.biorhythmRemoved = biorhythmRemovedEvent.client;

    /**
     * deprecated
     */
    this.subscribeToBiorhythmRemoved = biorhythmRemovedEvent.subscribe;

    this.addBiorhythm = function addBiorhythm(biorhythmShape) {
        biorhythms.add(biorhythmShape);
    };

    this.removeBiorhythm = function(biorhythmShape) {
        biorhythms.remove(biorhythmShape);
    };

    this.setBiorhythms = function(biorhythmShapes) {
        suspendPaint();
        try {
            biorhythms.clear();
            biorhythms.addRange(biorhythmShapes);
        }
        finally {
            resumePaint();
        }
    };

    this.getBiorhythms = function() {
        return biorhythms.toArray();
    };

    function onBiorhithmAdded(biorhythmShape) {
        biorhythmShape.nameChanged.subscribe(onBiorhithmShapeChanged);
        biorhythmShape.birthdayChanged.subscribe(onBiorhithmShapeChanged);
        biorhythmShape.biorhythmChanged.subscribe(onBiorhithmShapeChanged);
        biorhythmShape.colorChanged.subscribe(onBiorhithmShapeChanged);
        biorhythmShape.isVisibleChanged.subscribe(onBiorhithmShapeChanged);
        biorhythmShape.lineWidthChanged.subscribe(onBiorhithmShapeChanged);
        biorhythmShape.lineStyleChanged.subscribe(onBiorhithmShapeChanged);

        biorhythmAddedEvent.raise(obj, biorhythmShape);

        paint();
    }

    function onBiorhithmRemoved(biorhythmShape) {
        biorhythmShape.nameChanged.unsubscribe(onBiorhithmShapeChanged);
        biorhythmShape.birthdayChanged.unsubscribe(onBiorhithmShapeChanged);
        biorhythmShape.biorhythmChanged.unsubscribe(onBiorhithmShapeChanged);
        biorhythmShape.colorChanged.unsubscribe(onBiorhithmShapeChanged);
        biorhythmShape.isVisibleChanged.unsubscribe(onBiorhithmShapeChanged);
        biorhythmShape.lineWidthChanged.unsubscribe(onBiorhithmShapeChanged);
        biorhythmShape.lineStyleChanged.unsubscribe(onBiorhithmShapeChanged);

        biorhythmRemovedEvent.raise(obj, biorhythmShape);

        paint();
    }

    function onBiorhithmShapeChanged() {
        paint();
    }

    // --------------------------------------------------------------------------
    // 
    // --------------------------------------------------------------------------

    this.setBirthdayOnAllBiorhythms = function(birthday) {
        suspendPaint();
        try {
            var list = biorhythms.toArray();
            for ( var i = 0; i < list.length; i++) {
                list[i].birthday = birthday;
            }
        }
        finally {
            resumePaint();
        }
    };

    // --------------------------------------------------------------------------
    // FirstDay
    // --------------------------------------------------------------------------

    var firstDay = lu.DateUtil.addDays(Date.now(), -7);
    var firstDayChangedEvent = new lu.Event();
    this.firstDayChanged = firstDayChangedEvent.client;

    this.setFirstDay = setFirstDay;

    /**
     * @deprecated Use the firstDay property instead.
     */
    function setFirstDay(value) {
        firstDay = value;
        firstDayChangedEvent.raise(obj, value);
        paint();
    }

    this.getFirstDay = getFirstDay;

    /**
     * @deprecated Use the firstDay property instead.
     */
    function getFirstDay() {
        return firstDay;
    }

    Object.defineProperty(this, "firstDay", {
        enumerable: true,
        configurable: false,
        get: getFirstDay,
        set: setFirstDay
    });

    function incrementFirstDay(value) {
        var date = new Date(firstDay.getTime());
        date.setDate(date.getDate() + value);
        setFirstDay(date);
    }

    /**
     * deprecated
     */
    this.subscribeToFirstDayChanged = firstDayChangedEvent.subscribe;

    Object.defineProperty(this, "lastDay", {
        enumerable: true,
        configurable: false,
        get: getLastDay
    });

    function getLastDay() {
        return lu.DateUtil.addDays(firstDay, totalDays - 1);
    }

    Object.defineProperty(this, "xDay", {
        enumerable: true,
        configurable: false,
        get: getXDay
    });

    function getXDay() {
        return lu.DateUtil.addDays(firstDay, xDayIndex);
    }

    // --------------------------------------------------------------------------
    // IsGridVisible
    // --------------------------------------------------------------------------

    var isGridVisible = true;
    var isGridVisibleChangedEvent = new lu.Event();
    this.isGridVisibleChanged = isGridVisibleChangedEvent.client;

    this.setGridVisibility = setGridVisibility;

    /**
     * @deprecated Use the isGridVisible property instead.
     */
    function setGridVisibility(value) {
        isGridVisible = Boolean(value);

        isGridVisibleChangedEvent.raise(obj, value);
        paint();
    }

    this.getGridVisibility = getGridVisibility;

    /**
     * @deprecated Use the isGridVisible property instead.
     */
    function getGridVisibility() {
        return isGridVisible;
    }

    Object.defineProperty(this, "isGridVisible", {
        enumerable: true,
        configurable: false,
        get: getGridVisibility,
        set: setGridVisibility
    });

    /**
     * deprecated
     */
    this.subscribeToGridVisibilityChanged = isGridVisibleChangedEvent.subscribe;

    // --------------------------------------------------------------------------
    // TotalDays
    // --------------------------------------------------------------------------

    var totalDays = 30;
    var totalDaysChangedEvent = new lu.Event();
    this.totalDaysChanged = totalDaysChangedEvent.client;

    this.setTotalDays = setTotalDays;

    /**
     * @deprecated Use the totalDays property instead.
     */
    function setTotalDays(value) {
        totalDays = value;

        totalDaysChangedEvent.raise(obj, value);
        paint();
    }

    this.getTotalDays = getTotalDays;

    /**
     * @deprecated Use the totalDays property instead.
     */
    function getTotalDays() {
        return totalDays;
    }

    Object.defineProperty(this, "totalDays", {
        enumerable: true,
        configurable: false,
        get: getTotalDays,
        set: setTotalDays
    });

    /**
     * deprecated
     */
    this.subscribeToTotalDaysChanged = totalDaysChangedEvent.subscribe;

    // --------------------------------------------------------------------------
    // XDayIndex
    // --------------------------------------------------------------------------

    var xDayIndex = 7;
    var xDayIndexChangedEvent = new lu.Event();
    this.xDayIndexChanged = xDayIndexChangedEvent.client;

    this.setXDayIndex = setXDayIndex;

    /**
     * @deprecated Use the xDayIndex property instead.
     */
    function setXDayIndex(value) {
        if (xDayIndex === value || value < 0 || value >= totalDays)
            return;

        xDayIndex = value;

        xDayIndexChangedEvent.raise(obj, value);
        paint();
    }

    this.getXDayIndex = getXDayIndex;

    /**
     * @deprecated Use the xDayIndex property instead.
     */
    function getXDayIndex() {
        return xDayIndex;
    }

    Object.defineProperty(this, "xDayIndex", {
        enumerable: true,
        configurable: false,
        get: getXDayIndex,
        set: setXDayIndex
    });

    /**
     * deprecated
     */
    this.subscribeToXDayIndexChanged = xDayIndexChangedEvent.subscribe;

    // --------------------------------------------------------------------------
    // GridColor
    // --------------------------------------------------------------------------

    var gridColor = "#d3d3d3"; // LightGray
    var gridColorChangedEvent = new lu.Event();
    this.gridColorChanged = gridColorChangedEvent.client;

    this.setGridColor = setGridColor;

    /**
     * @deprecated Use the gridColor property instead.
     */
    function setGridColor(value) {
        gridColor = value;

        gridColorChangedEvent.raise(obj, value);
        paint();
    }

    this.getGridColor = getGridColor;

    /**
     * @deprecated Use the gridColor property instead.
     */
    function getGridColor() {
        return xDayIndex;
    }

    Object.defineProperty(this, "gridColor", {
        enumerable: true,
        configurable: false,
        get: getGridColor,
        set: setGridColor
    });

    /**
     * deprecated
     */
    this.subscribeToGridColorChanged = gridColorChangedEvent.subscribe;

    // --------------------------------------------------------------------------
    // AreDayNumbersVisible
    // --------------------------------------------------------------------------

    var areDayNumbersVisible = true;
    var areDayNumbersVisibleChangedEvent = new lu.Event();
    this.areDayNumbersVisibleChanged = areDayNumbersVisibleChangedEvent.client;

    this.setDayNumbersVisibility = setDayNumbersVisibility;

    /**
     * @deprecated Use the areDayNumbersVisible property instead.
     */
    function setDayNumbersVisibility(value) {
        areDayNumbersVisible = value;

        areDayNumbersVisibleChangedEvent.raise(obj, value);
        paint();
    }

    this.getDayNumbersVisibility = getDayNumbersVisibility;

    /**
     * @deprecated Use the areDayNumbersVisible property instead.
     */
    function getDayNumbersVisibility() {
        return areDayNumbersVisible;
    }

    Object.defineProperty(this, "areDayNumbersVisible", {
        enumerable: true,
        configurable: false,
        get: getDayNumbersVisibility,
        set: setDayNumbersVisibility
    });

    /**
     * deprecated
     */
    this.subscribeToDayNumbersVisibilityChanged = areDayNumbersVisibleChangedEvent.subscribe;

    // --------------------------------------------------------------------------
    // AreWeekDaysVisible
    // --------------------------------------------------------------------------

    var areWeekDaysVisible = true;
    var areWeekDaysVisibleChangedEvent = new lu.Event();
    this.areWeekDaysVisibleChanged = areWeekDaysVisibleChangedEvent.client;

    this.setWeekDaysVisibility = setWeekDaysVisibility;

    /**
     * @deprecated Use the areWeekDaysVisible property instead.
     */
    function setWeekDaysVisibility(value) {
        areWeekDaysVisible = value;

        areWeekDaysVisibleChangedEvent.raise(obj, value);
        paint();
    }

    this.getWeekDaysVisibility = getWeekDaysVisibility;

    /**
     * @deprecated Use the areWeekDaysVisible property instead.
     */
    function getWeekDaysVisibility() {
        return areWeekDaysVisible;
    }

    Object.defineProperty(this, "areWeekDaysVisible", {
        enumerable: true,
        configurable: false,
        get: getWeekDaysVisibility,
        set: setWeekDaysVisibility
    });

    /**
     * deprecated
     */
    this.subscribeToWeekDaysVisibilityChanged = areWeekDaysVisibleChangedEvent.subscribe;

    // --------------------------------------------------------------------------
    // DayNumbersPosition
    // --------------------------------------------------------------------------

    var dayNumbersPosition = lu.DayLabelPosition.top;
    var dayNumbersPositionChangedEvent = new lu.Event();
    this.dayNumbersPositionChanged = dayNumbersPositionChangedEvent.client;

    this.setDayNumbersPosition = setDayNumbersPosition;

    /**
     * @deprecated Use the dayNumbersPosition property instead.
     */
    function setDayNumbersPosition(value) {
        dayNumbersPosition = value;

        dayNumbersPositionChangedEvent.raise(obj, value);
        paint();
    }

    this.getDayNumbersPosition = getDayNumbersPosition;

    /**
     * @deprecated Use the dayNumbersPosition property instead.
     */
    function getDayNumbersPosition() {
        return dayNumbersPosition;
    }

    Object.defineProperty(this, "dayNumbersPosition", {
        enumerable: true,
        configurable: false,
        get: getDayNumbersPosition,
        set: setDayNumbersPosition
    });

    /**
     * deprecated
     */
    this.subscribeToTodayNumbersPositionChanged = dayNumbersPositionChangedEvent.subscribe;

    // --------------------------------------------------------------------------
    // WeekDaysPosition
    // --------------------------------------------------------------------------

    var weekDaysPosition = lu.DayLabelPosition.bottom;
    var weekDaysPositionChangedEvent = new lu.Event();
    this.weekDaysPositionChanged = weekDaysPositionChangedEvent.client;

    this.setWeekDaysPosition = setWeekDaysPosition;

    /**
     * @deprecated Use the weekDaysPosition property instead.
     */
    function setWeekDaysPosition(value) {
        weekDaysPosition = value;

        weekDaysPositionChangedEvent.raise(obj, value);
        paint();
    }

    this.getWeekDaysPosition = getWeekDaysPosition;

    /**
     * @deprecated Use the weekDaysPosition property instead.
     */
    function getWeekDaysPosition() {
        return weekDaysPosition;
    }

    Object.defineProperty(this, "weekDaysPosition", {
        enumerable: true,
        configurable: false,
        get: getWeekDaysPosition,
        set: setWeekDaysPosition
    });

    /**
     * deprecated
     */
    this.subscribeToWeekDaysPositionChanged = weekDaysPositionChangedEvent.subscribe;

    // #endregion

    // #region AreSundaysEmphasized

    // --------------------------------------------------------------------------
    // AreSundaysEmphasized
    // --------------------------------------------------------------------------

    var areSundaysEmphasized = true;
    var areSundaysEmphasizedChangedEvent = new lu.Event();
    this.areSundaysEmphasizedChanged = areSundaysEmphasizedChangedEvent.client;

    this.setAreSundaysEmphasized = setAreSundaysEmphasized;

    /**
     * @deprecated Use the areSundaysEmphasized property instead.
     */
    function setAreSundaysEmphasized(value) {
        areSundaysEmphasized = value;

        areSundaysEmphasizedChangedEvent.raise(obj, value);
        paint();
    }

    this.getAreSundaysEmphasized = getAreSundaysEmphasized;

    /**
     * @deprecated Use the areSundaysEmphasized property instead.
     */
    function getAreSundaysEmphasized() {
        return areSundaysEmphasized;
    }

    Object.defineProperty(this, "areSundaysEmphasized", {
        enumerable: true,
        configurable: false,
        get: getAreSundaysEmphasized,
        set: setAreSundaysEmphasized
    });

    /**
     * deprecated
     */
    this.subscribeToAreSundaysEmphasizedChanged = areSundaysEmphasizedChangedEvent.subscribe;

    // --------------------------------------------------------------------------
    // ForeColor
    // --------------------------------------------------------------------------

    var foreColor = "#b0b0b0";
    var foreColorChangedEvent = new lu.Event();
    this.foreColorChanged = foreColorChangedEvent.client;

    this.setForeColor = setForeColor;

    /**
     * @deprecated Use the foreColor property instead.
     */
    function setForeColor(value) {
        foreColor = value;

        foreColorChangedEvent.raise(obj, value);
        paint();
    }

    this.getForeColor = getForeColor;

    /**
     * @deprecated Use the foreColor property instead.
     */
    function getForeColor() {
        return foreColor;
    }

    Object.defineProperty(this, "foreColor", {
        enumerable: true,
        configurable: false,
        get: getForeColor,
        set: setForeColor
    });

    /**
     * deprecated
     */
    this.subscribeToForeColorChanged = foreColorChangedEvent.subscribe;

    // --------------------------------------------------------------------------
    // SundaysColor
    // --------------------------------------------------------------------------

    var sundaysColor = "#ff0000";
    var sundaysColorChangedEvent = new lu.Event();
    this.sundaysColorChanged = sundaysColorChangedEvent.client;

    this.setSundaysColor = setSundaysColor;

    /**
     * @deprecated Use the sundaysColor property instead.
     */
    function setSundaysColor(value) {
        sundaysColor = value;

        sundaysColorChangedEvent.raise(obj, value);
        paint();
    }

    this.getSundaysColor = getSundaysColor;

    /**
     * @deprecated Use the sundaysColor property instead.
     */
    function getSundaysColor() {
        return sundaysColor;
    }

    Object.defineProperty(this, "sundaysColor", {
        enumerable: true,
        configurable: false,
        get: getSundaysColor,
        set: setSundaysColor
    });

    /**
     * deprecated
     */
    this.subscribeToSundaysColorChanged = sundaysColorChangedEvent.subscribe;

    // --------------------------------------------------------------------------
    // Font
    // --------------------------------------------------------------------------

    var font = "12px Arial";
    var fontChangedEvent = new lu.Event();
    this.fontChanged = fontChangedEvent.client;

    this.setFont = setFont;

    /**
     * @deprecated Use the font property instead.
     */
    function setFont(value) {
        font = value;

        fontChangedEvent.raise(obj, value);
        paint();
    }

    this.getFont = getFont;

    /**
     * @deprecated Use the font property instead.
     */
    function getFont() {
        return font;
    }

    Object.defineProperty(this, "font", {
        enumerable: true,
        configurable: false,
        get: getFont,
        set: setFont
    });

    /**
     * deprecated
     */
    this.subscribeToFontChanged = fontChangedEvent.subscribe;

    // --------------------------------------------------------------------------
    // SundaysFont
    // --------------------------------------------------------------------------

    var sundaysFont = "italic 12px Arial";
    var sundaysFontChangedEvent = new lu.Event();
    this.sundaysFontChanged = sundaysFontChangedEvent.client;

    this.setSundaysFont = setSundaysFont;

    /**
     * @deprecated Use the sundaysFont property instead.
     */
    function setSundaysFont(value) {
        sundaysFont = value;

        sundaysFontChangedEvent.raise(obj, value);
        paint();
    }

    this.getSundaysFont = getSundaysFont;

    /**
     * @deprecated Use the sundaysFont property instead.
     */
    function getSundaysFont() {
        return sundaysFont;
    }

    Object.defineProperty(this, "sundaysFont", {
        enumerable: true,
        configurable: false,
        get: getSundaysFont,
        set: setSundaysFont
    });

    /**
     * deprecated
     */
    this.subscribeToSundaysFontChanged = sundaysFontChangedEvent.subscribe;

    // --------------------------------------------------------------------------
    // TodayBackColor
    // --------------------------------------------------------------------------

    var todayBackColor = "#ffe4b5"; // Moccasin
    var todayBackColorChangedEvent = new lu.Event();
    this.todayBackColorChanged = todayBackColorChangedEvent.client;

    this.setTodayBackColor = setTodayBackColor;

    /**
     * @deprecated Use the todayBackColor property instead.
     */
    function setTodayBackColor(value) {
        todayBackColor = value;

        todayBackColorChangedEvent.raise(obj, value);
        paint();
    }

    this.getTodayBackColor = getTodayBackColor;

    /**
     * @deprecated Use the todayBackColor property instead.
     */
    function getTodayBackColor() {
        return todayBackColor;
    }

    Object.defineProperty(this, "todayBackColor", {
        enumerable: true,
        configurable: false,
        get: getTodayBackColor,
        set: setTodayBackColor
    });

    /**
     * deprecated
     */
    this.subscribeToTodayBackColorChanged = todayBackColorChangedEvent.subscribe;

    // --------------------------------------------------------------------------
    // IsXDayVisible
    // --------------------------------------------------------------------------

    var isXDayVisible = true;
    var isXDayVisibleChangedEvent = new lu.Event();
    this.isXDayVisibleChanged = isXDayVisibleChangedEvent.client;

    this.setXDayVisibility = setXDayVisibility;

    /**
     * @deprecated Use the isXDayVisible property instead.
     */
    function setXDayVisibility(value) {
        isXDayVisible = value;

        isXDayVisibleChangedEvent.raise(obj, value);
        paint();
    }

    this.getXDayVisibility = getXDayVisibility;

    /**
     * @deprecated Use the isXDayVisible property instead.
     */
    function getXDayVisibility() {
        return isXDayVisible;
    }

    Object.defineProperty(this, "isXDayVisible", {
        enumerable: true,
        configurable: false,
        get: getXDayVisibility,
        set: setXDayVisibility
    });

    /**
     * deprecated
     */
    this.subscribeToXDayVisibilityChanged = isXDayVisibleChangedEvent.subscribe;

    // --------------------------------------------------------------------------
    // XDayBorderColor
    // --------------------------------------------------------------------------

    var xDayBorderColor = "#000000"; // Black
    var xDayBorderColorChangedEvent = new lu.Event();
    this.xDayBorderColorChanged = xDayBorderColorChangedEvent.client;

    this.setXDayBorderColor = setXDayBorderColor;

    /**
     * @deprecated Use the xDayBorderColor property instead.
     */
    function setXDayBorderColor(value) {
        xDayBorderColor = value;

        xDayBorderColorChangedEvent.raise(obj, value);
        paint();
    }

    this.getXDayBorderColor = getXDayBorderColor;

    /**
     * @deprecated Use the xDayBorderColor property instead.
     */
    function getXDayBorderColor() {
        return xDayBorderColor;
    }

    Object.defineProperty(this, "xDayBorderColor", {
        enumerable: true,
        configurable: false,
        get: getXDayBorderColor,
        set: setXDayBorderColor
    });

    /**
     * deprecated
     */
    this.subscribeToXDayBorderColorChanged = xDayBorderColorChangedEvent.subscribe;

    // --------------------------------------------------------------------------
    // XDayBorderWidth
    // --------------------------------------------------------------------------

    var xDayBorderWidth = 2;
    var xDayBorderWidthChangedEvent = new lu.Event();
    this.xDayBorderWidthChanged = xDayBorderWidthChangedEvent.client;

    this.setXDayBorderWidth = setXDayBorderWidth;

    /**
     * @deprecated Use the xDayBorderWidth property instead.
     */
    function setXDayBorderWidth(value) {
        xDayBorderWidth = value;

        xDayBorderWidthChangedEvent.raise(obj, value);
        paint();
    }

    this.getXDayBorderWidth = getXDayBorderWidth;

    /**
     * @deprecated Use the xDayBorderWidth property instead.
     */
    function getXDayBorderWidth() {
        return xDayBorderWidth;
    }

    Object.defineProperty(this, "xDayBorderWidth", {
        enumerable: true,
        configurable: false,
        get: getXDayBorderWidth,
        set: setXDayBorderWidth
    });

    /**
     * deprecated
     */
    this.subscribeToXDayBorderWidthChanged = xDayBorderWidthChangedEvent.subscribe;

    // --------------------------------------------------------------------------
    // Paint
    // --------------------------------------------------------------------------

    var painter = null;
    var paintSuspendCount = 0;

    this.suspendPaint = suspendPaint;

    function suspendPaint() {
        paintSuspendCount++;
    }

    this.resumePaint = resumePaint;

    function resumePaint() {
        if (paintSuspendCount > 0) {
            paintSuspendCount--;
        }

        if (paintSuspendCount == 0) {
            paint();
        }
    }

    function paint() {
        if (paintSuspendCount > 0) {
            return;
        }

        var rawPaintData = {
            biorhythmShapes: biorhythms.toArray(),
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

        biorhythms.itemAdded.subscribe(onBiorhithmAdded);
        biorhythms.itemRemoved.subscribe(onBiorhithmRemoved);

        painter = new lu.bioControls.common.painting.BiorhythmViewPainter();
    }());
};