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
lu.bioControls.biorhythmModel = lu.bioControls.biorhythmModel || {};

/**
 * Represents a biorhythm curve with all its display related properties.
 * 
 * @returns {lu.bioControls.biorhythmModel.BiorhythmShape}
 */
lu.bioControls.biorhythmModel.BiorhythmShape = function() {

    var obj = this;

    // --------------------------------------------------------------------------
    // Name
    // --------------------------------------------------------------------------

    var name = "New Biorhythm Shape";
    var nameChangedEvent = new lu.Event();
    this.nameChanged = nameChangedEvent.client;

    Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: false,
        get: getName,
        set: setName
    });

    function getName() {
        return name;
    }

    function setName(value) {
        if (value === name) {
            return;
        }

        name = value;
        nameChangedEvent.raise(obj, value);
    }

    // --------------------------------------------------------------------------
    // Birthday
    // --------------------------------------------------------------------------

    var birthdayChangedEvent = new lu.Event();
    this.birthdayChanged = birthdayChangedEvent.client;

    // --------------------------------------------------------------------------
    // Biorythm
    // --------------------------------------------------------------------------

    var biorhythm = null;
    var biorhythmChangedEvent = new lu.Event();
    this.biorhythmChanged = biorhythmChangedEvent.client;

    Object.defineProperty(this, "biorhythm", {
        enumerable: true,
        configurable: false,
        get: getBiorhythm,
        set: setBiorhythm
    });

    function getBiorhythm() {
        return biorhythm;
    }

    function setBiorhythm(value) {
        if (value === biorhythm) {
            return;
        }

        if (biorhythm && biorhythm.birthdayChanged && biorhythm.birthdayChanged.unsubscribe) {
            biorhythm.birthdayChanged.unsubscribe(onBirthdayChanged);
        }

        biorhythm = value;

        if (biorhythm && biorhythm.birthdayChanged && biorhythm.birthdayChanged.unsubscribe) {
            biorhythm.birthdayChanged.subscribe(onBirthdayChanged);
        }

        biorhythmChangedEvent.raise(obj, value);
    }

    function onBirthdayChanged(arg) {
        birthdayChangedEvent.raise(obj, arg);
    }

    // --------------------------------------------------------------------------
    // Color
    // --------------------------------------------------------------------------

    var color = null;
    var colorChangedEvent = new lu.Event();
    this.colorChanged = colorChangedEvent.client;

    Object.defineProperty(this, "color", {
        enumerable: true,
        configurable: false,
        get: getColor,
        set: setColor
    });

    function getColor() {
        return color;
    }

    function setColor(value) {
        if (value === color) {
            return;
        }

        color = value;
        colorChangedEvent.raise(obj, value);
    }

    // --------------------------------------------------------------------------
    // IsVisible
    // --------------------------------------------------------------------------

    var isVisible = true;
    var isVisibleChangedEvent = new lu.Event();
    this.isVisibleChanged = isVisibleChangedEvent.client;

    Object.defineProperty(this, "isVisible", {
        enumerable: true,
        configurable: false,
        get: getIsVisible,
        set: setIsVisible
    });

    function getIsVisible() {
        return isVisible;
    }

    function setIsVisible(value) {
        if (value === isVisible) {
            return;
        }

        isVisible = value;
        isVisibleChangedEvent.raise(obj, value);
    }

    // --------------------------------------------------------------------------
    // LineWidth
    // --------------------------------------------------------------------------

    var lineWidth = 1;
    var lineWidthChangedEvent = new lu.Event();
    this.lineWidthChanged = lineWidthChangedEvent.client;

    Object.defineProperty(this, "lineWidth", {
        enumerable: true,
        configurable: false,
        get: getLineWidth,
        set: setLineWidth
    });

    function getLineWidth() {
        return lineWidth;
    }

    function setLineWidth(value) {
        if (value === lineWidth) {
            return;
        }

        lineWidth = value;
        lineWidthChangedEvent.raise(obj, value);
    }

    // --------------------------------------------------------------------------
    // LineStyle
    // --------------------------------------------------------------------------

    var lineStyle = lu.LineStyle.solid;
    var lineStyleChangedEvent = new lu.Event();
    this.lineStyleChanged = lineStyleChangedEvent.client;

    Object.defineProperty(this, "lineStyle", {
        enumerable: true,
        configurable: false,
        get: getLineStyle,
        set: setLineStyle
    });

    function getLineStyle() {
        return lineStyle;
    }

    function setLineStyle(value) {
        if (value === lineStyle) {
            return;
        }

        lineStyle = value;
        lineStyleChangedEvent.raise(obj, value);
    }
};