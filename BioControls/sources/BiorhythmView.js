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
 * @param canvas
 *            The html canvas element on which to draw the charts.
 * 
 * @returns {lu.bioControls.BiorhythmView}
 */
lu.bioControls.BiorhythmView = function(canvas) {

    var obj = this;
    var scroller = null;

    // --------------------------------------------------------------------------
    // Biorhythms
    // --------------------------------------------------------------------------

    var biorhythms = new lu.List();

    var biorhythmAddedEvent = new lu.Event();
    this.biorhythmAdded = biorhythmAddedEvent.client;

    var biorhythmRemovedEvent = new lu.Event();
    this.biorhythmRemoved = biorhythmRemovedEvent.client;

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
                list[i].biorhythm.birthday = birthday;
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

    Object.defineProperty(this, "firstDay", {
        enumerable: true,
        configurable: false,
        get: getFirstDay,
        set: setFirstDay
    });

    function getFirstDay() {
        return firstDay;
    }

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

    // --------------------------------------------------------------------------
    // LastDay
    // --------------------------------------------------------------------------

    Object.defineProperty(this, "lastDay", {
        enumerable: true,
        configurable: false,
        get: getLastDay
    });

    function getLastDay() {
        return lu.DateUtil.addDays(firstDay, totalDays - 1);
    }

    // --------------------------------------------------------------------------
    // XDay
    // --------------------------------------------------------------------------

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

    Object.defineProperty(this, "isGridVisible", {
        enumerable: true,
        configurable: false,
        get: getGridVisibility,
        set: setGridVisibility
    });

    function getGridVisibility() {
        return isGridVisible;
    }

    function setGridVisibility(value) {
        isGridVisible = Boolean(value);

        isGridVisibleChangedEvent.raise(obj, value);
        paint();
    }

    // --------------------------------------------------------------------------
    // TotalDays
    // --------------------------------------------------------------------------

    var totalDays = 30;
    var totalDaysChangedEvent = new lu.Event();
    this.totalDaysChanged = totalDaysChangedEvent.client;

    Object.defineProperty(this, "totalDays", {
        enumerable: true,
        configurable: false,
        get: getTotalDays,
        set: setTotalDays
    });

    function getTotalDays() {
        return totalDays;
    }

    function setTotalDays(value) {
        totalDays = value;

        totalDaysChangedEvent.raise(obj, value);
        paint();
    }

    // --------------------------------------------------------------------------
    // XDayIndex
    // --------------------------------------------------------------------------

    var xDayIndex = 7;
    var xDayIndexChangedEvent = new lu.Event();
    this.xDayIndexChanged = xDayIndexChangedEvent.client;

    Object.defineProperty(this, "xDayIndex", {
        enumerable: true,
        configurable: false,
        get: getXDayIndex,
        set: setXDayIndex
    });

    function getXDayIndex() {
        return xDayIndex;
    }

    function setXDayIndex(value) {
        if (xDayIndex === value || value < 0 || value >= totalDays)
            return;

        xDayIndex = value;

        xDayIndexChangedEvent.raise(obj, value);
        paint();
    }

    // --------------------------------------------------------------------------
    // GridColor
    // --------------------------------------------------------------------------

    var gridColor = "#d3d3d3"; // LightGray
    var gridColorChangedEvent = new lu.Event();
    this.gridColorChanged = gridColorChangedEvent.client;

    Object.defineProperty(this, "gridColor", {
        enumerable: true,
        configurable: false,
        get: getGridColor,
        set: setGridColor
    });

    function getGridColor() {
        return xDayIndex;
    }

    function setGridColor(value) {
        gridColor = value;

        gridColorChangedEvent.raise(obj, value);
        paint();
    }

    // --------------------------------------------------------------------------
    // AreDayNumbersVisible
    // --------------------------------------------------------------------------

    var areDayNumbersVisible = true;
    var areDayNumbersVisibleChangedEvent = new lu.Event();
    this.areDayNumbersVisibleChanged = areDayNumbersVisibleChangedEvent.client;

    Object.defineProperty(this, "areDayNumbersVisible", {
        enumerable: true,
        configurable: false,
        get: getDayNumbersVisibility,
        set: setDayNumbersVisibility
    });

    function getDayNumbersVisibility() {
        return areDayNumbersVisible;
    }

    function setDayNumbersVisibility(value) {
        areDayNumbersVisible = value;

        areDayNumbersVisibleChangedEvent.raise(obj, value);
        paint();
    }

    // --------------------------------------------------------------------------
    // AreWeekDaysVisible
    // --------------------------------------------------------------------------

    var areWeekDaysVisible = true;
    var areWeekDaysVisibleChangedEvent = new lu.Event();
    this.areWeekDaysVisibleChanged = areWeekDaysVisibleChangedEvent.client;

    Object.defineProperty(this, "areWeekDaysVisible", {
        enumerable: true,
        configurable: false,
        get: getWeekDaysVisibility,
        set: setWeekDaysVisibility
    });

    function getWeekDaysVisibility() {
        return areWeekDaysVisible;
    }

    function setWeekDaysVisibility(value) {
        areWeekDaysVisible = value;

        areWeekDaysVisibleChangedEvent.raise(obj, value);
        paint();
    }

    // --------------------------------------------------------------------------
    // DayNumbersPosition
    // --------------------------------------------------------------------------

    var dayNumbersPosition = lu.DayLabelPosition.top;
    var dayNumbersPositionChangedEvent = new lu.Event();
    this.dayNumbersPositionChanged = dayNumbersPositionChangedEvent.client;

    Object.defineProperty(this, "dayNumbersPosition", {
        enumerable: true,
        configurable: false,
        get: getDayNumbersPosition,
        set: setDayNumbersPosition
    });

    function getDayNumbersPosition() {
        return dayNumbersPosition;
    }

    function setDayNumbersPosition(value) {
        dayNumbersPosition = value;

        dayNumbersPositionChangedEvent.raise(obj, value);
        paint();
    }

    // --------------------------------------------------------------------------
    // WeekDaysPosition
    // --------------------------------------------------------------------------

    var weekDaysPosition = lu.DayLabelPosition.bottom;
    var weekDaysPositionChangedEvent = new lu.Event();
    this.weekDaysPositionChanged = weekDaysPositionChangedEvent.client;

    Object.defineProperty(this, "weekDaysPosition", {
        enumerable: true,
        configurable: false,
        get: getWeekDaysPosition,
        set: setWeekDaysPosition
    });

    function getWeekDaysPosition() {
        return weekDaysPosition;
    }

    function setWeekDaysPosition(value) {
        weekDaysPosition = value;

        weekDaysPositionChangedEvent.raise(obj, value);
        paint();
    }

    // --------------------------------------------------------------------------
    // AreSundaysEmphasized
    // --------------------------------------------------------------------------

    var areSundaysEmphasized = true;
    var areSundaysEmphasizedChangedEvent = new lu.Event();
    this.areSundaysEmphasizedChanged = areSundaysEmphasizedChangedEvent.client;

    Object.defineProperty(this, "areSundaysEmphasized", {
        enumerable: true,
        configurable: false,
        get: getAreSundaysEmphasized,
        set: setAreSundaysEmphasized
    });

    function getAreSundaysEmphasized() {
        return areSundaysEmphasized;
    }

    function setAreSundaysEmphasized(value) {
        areSundaysEmphasized = value;

        areSundaysEmphasizedChangedEvent.raise(obj, value);
        paint();
    }

    // --------------------------------------------------------------------------
    // ForeColor
    // --------------------------------------------------------------------------

    var foreColor = "#b0b0b0";
    var foreColorChangedEvent = new lu.Event();
    this.foreColorChanged = foreColorChangedEvent.client;

    Object.defineProperty(this, "foreColor", {
        enumerable: true,
        configurable: false,
        get: getForeColor,
        set: setForeColor
    });

    function getForeColor() {
        return foreColor;
    }

    function setForeColor(value) {
        foreColor = value;

        foreColorChangedEvent.raise(obj, value);
        paint();
    }

    // --------------------------------------------------------------------------
    // SundaysColor
    // --------------------------------------------------------------------------

    var sundaysColor = "#ff0000";
    var sundaysColorChangedEvent = new lu.Event();
    this.sundaysColorChanged = sundaysColorChangedEvent.client;

    Object.defineProperty(this, "sundaysColor", {
        enumerable: true,
        configurable: false,
        get: getSundaysColor,
        set: setSundaysColor
    });

    function getSundaysColor() {
        return sundaysColor;
    }

    function setSundaysColor(value) {
        sundaysColor = value;

        sundaysColorChangedEvent.raise(obj, value);
        paint();
    }

    // --------------------------------------------------------------------------
    // Font
    // --------------------------------------------------------------------------

    var font = "12px Arial";
    var fontChangedEvent = new lu.Event();
    this.fontChanged = fontChangedEvent.client;

    Object.defineProperty(this, "font", {
        enumerable: true,
        configurable: false,
        get: getFont,
        set: setFont
    });

    function getFont() {
        return font;
    }

    function setFont(value) {
        font = value;

        fontChangedEvent.raise(obj, value);
        paint();
    }

    // --------------------------------------------------------------------------
    // SundaysFont
    // --------------------------------------------------------------------------

    var sundaysFont = "italic 12px Arial";
    var sundaysFontChangedEvent = new lu.Event();
    this.sundaysFontChanged = sundaysFontChangedEvent.client;

    Object.defineProperty(this, "sundaysFont", {
        enumerable: true,
        configurable: false,
        get: getSundaysFont,
        set: setSundaysFont
    });

    function getSundaysFont() {
        return sundaysFont;
    }

    function setSundaysFont(value) {
        sundaysFont = value;

        sundaysFontChangedEvent.raise(obj, value);
        paint();
    }

    // --------------------------------------------------------------------------
    // TodayBackColor
    // --------------------------------------------------------------------------

    var todayBackColor = "#ffe4b5"; // Moccasin
    var todayBackColorChangedEvent = new lu.Event();
    this.todayBackColorChanged = todayBackColorChangedEvent.client;

    Object.defineProperty(this, "todayBackColor", {
        enumerable: true,
        configurable: false,
        get: getTodayBackColor,
        set: setTodayBackColor
    });

    function getTodayBackColor() {
        return todayBackColor;
    }

    function setTodayBackColor(value) {
        todayBackColor = value;

        todayBackColorChangedEvent.raise(obj, value);
        paint();
    }

    // --------------------------------------------------------------------------
    // IsXDayVisible
    // --------------------------------------------------------------------------

    var isXDayVisible = true;
    var isXDayVisibleChangedEvent = new lu.Event();
    this.isXDayVisibleChanged = isXDayVisibleChangedEvent.client;

    Object.defineProperty(this, "isXDayVisible", {
        enumerable: true,
        configurable: false,
        get: getXDayVisibility,
        set: setXDayVisibility
    });

    function getXDayVisibility() {
        return isXDayVisible;
    }

    function setXDayVisibility(value) {
        isXDayVisible = value;

        isXDayVisibleChangedEvent.raise(obj, value);
        paint();
    }

    // --------------------------------------------------------------------------
    // XDayBorderColor
    // --------------------------------------------------------------------------

    var xDayBorderColor = "#000000"; // Black
    var xDayBorderColorChangedEvent = new lu.Event();
    this.xDayBorderColorChanged = xDayBorderColorChangedEvent.client;

    Object.defineProperty(this, "xDayBorderColor", {
        enumerable: true,
        configurable: false,
        get: getXDayBorderColor,
        set: setXDayBorderColor
    });

    function getXDayBorderColor() {
        return xDayBorderColor;
    }

    function setXDayBorderColor(value) {
        xDayBorderColor = value;

        xDayBorderColorChangedEvent.raise(obj, value);
        paint();
    }

    // --------------------------------------------------------------------------
    // XDayBorderWidth
    // --------------------------------------------------------------------------

    var xDayBorderWidth = 2;
    var xDayBorderWidthChangedEvent = new lu.Event();
    this.xDayBorderWidthChanged = xDayBorderWidthChangedEvent.client;

    Object.defineProperty(this, "xDayBorderWidth", {
        enumerable: true,
        configurable: false,
        get: getXDayBorderWidth,
        set: setXDayBorderWidth
    });

    function getXDayBorderWidth() {
        return xDayBorderWidth;
    }

    function setXDayBorderWidth(value) {
        xDayBorderWidth = value;

        xDayBorderWidthChangedEvent.raise(obj, value);
        paint();
    }

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

        if (!canvas.getContext) {
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

        var context = canvas.getContext('2d');
        var rectangle = new lu.Rectangle(0, 0, canvas.width, canvas.height);

        painter.paint(rawPaintData, context, rectangle);
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
        scroller = new lu.bioControls.Scroller({
            element: canvas,
            onDragStart: onDragStart,
            onDrag: onDrag
        });

        biorhythms.itemAdded.subscribe(onBiorhithmAdded);
        biorhythms.itemRemoved.subscribe(onBiorhithmRemoved);

        painter = new lu.bioControls.biorhythmView.painting.BiorhythmViewPainter();
    }());
};