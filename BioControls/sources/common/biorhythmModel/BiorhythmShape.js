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
lu.bioControls.common = lu.bioControls.common || {};
lu.bioControls.common.biorhythmModel = lu.bioControls.common.biorhythmModel || {};

/**
 * Represents a biorhythm curve with all its display related properties.
 * 
 * @returns {lu.bioControls.common.biorhythmModel.BiorhythmShape}
 */
lu.bioControls.common.biorhythmModel.BiorhythmShape = function() {

    var obj = this;

    // --------------------------------------------------------------------------
    // Name
    // --------------------------------------------------------------------------

    var name = "New Biorhythm Shape";
    var nameChangedEvent = new lu.Event();
    this.nameChanged = nameChangedEvent.event;

    /**
     * deprecated
     */
    this.subscribeToNameChanged = nameChangedEvent.subscribe;

    /**
     * deprecated
     */
    this.unsubscribeFromNameChanged = nameChangedEvent.unsubscribe;

    /**
     * deprecated
     */
    this.getName = getName;

    function getName() {
        return name;
    }

    /**
     * deprecated
     */
    this.setName = setName;

    function setName(value) {
        if (value === name) {
            return;
        }

        name = value;
        nameChangedEvent.raise(obj, value);
    }

    Object.defineProperty(this, "name", {
        enumerable: true,
        configurable: false,
        get: getName,
        set: setName
    });

    // --------------------------------------------------------------------------
    // Birthday
    // --------------------------------------------------------------------------

    var birthday = Date(80, 05, 13);
    var birthdayChangedEvent = new lu.Event();
    this.birthdayChanged = birthdayChangedEvent.event;

    /**
     * deprecated
     */
    this.subscribeToBirthdayChanged = birthdayChangedEvent.subscribe;

    /**
     * deprecated
     */
    this.unsubscribeFromBirthdayChanged = birthdayChangedEvent.unsubscribe;

    /**
     * deprecated
     */
    this.getBirthday = getBirthday;

    function getBirthday() {
        return birthday;
    }

    /**
     * deprecated
     */
    this.setBirthday = setBirthday;

    function setBirthday(value) {
        if (value === birthday) {
            return;
        }

        birthday = value;
        birthdayChangedEvent.raise(obj, value);
    }

    Object.defineProperty(this, "birthday", {
        enumerable: true,
        configurable: false,
        get: getBirthday,
        set: setBirthday
    });

    // --------------------------------------------------------------------------
    // Biorythm
    // --------------------------------------------------------------------------

    var biorhythm = null;
    var biorhythmChangedEvent = new lu.Event();
    this.biorhythmChanged = biorhythmChangedEvent.event;

    /**
     * deprecated
     */
    this.subscribeToBiorhythmChanged = biorhythmChangedEvent.subscribe;

    /**
     * deprecated
     */
    this.unsubscribeFromBiorhythmChanged = biorhythmChangedEvent.unsubscribe;

    /**
     * deprecated
     */
    this.getBiorhythm = getBiorhythm;

    function getBiorhythm() {
        return biorhythm;
    }

    /**
     * deprecated
     */
    this.setBiorhythm = setBiorhythm;

    function setBiorhythm(value) {
        if (value === biorhythm) {
            return;
        }

        biorhythm = value;
        biorhythmChangedEvent.raise(obj, value);
    }

    Object.defineProperty(this, "biorhythm", {
        enumerable: true,
        configurable: false,
        get: getBiorhythm,
        set: setBiorhythm
    });

    // --------------------------------------------------------------------------
    // Color
    // --------------------------------------------------------------------------

    var color = null;
    var colorChangedEvent = new lu.Event();
    this.colorChanged = colorChangedEvent.event;

    /**
     * deprecated
     */
    this.subscribeToColorChanged = colorChangedEvent.subscribe;

    /**
     * deprecated
     */
    this.unsubscribeFromColorChanged = colorChangedEvent.unsubscribe;

    /**
     * deprecated
     */
    this.getColor = getColor;

    function getColor() {
        return color;
    }

    /**
     * deprecated
     */
    this.setColor = setColor;

    function setColor(value) {
        if (value === color) {
            return;
        }

        color = value;
        colorChangedEvent.raise(obj, value);
    }

    Object.defineProperty(this, "color", {
        enumerable: true,
        configurable: false,
        get: getColor,
        set: setColor
    });

    // --------------------------------------------------------------------------
    // IsVisible
    // --------------------------------------------------------------------------

    var isVisible = true;
    var isVisibleChangedEvent = new lu.Event();
    this.isVisibleChanged = isVisibleChangedEvent.event;

    /**
     * deprecated
     */
    this.subscribeToIsVisibleChanged = isVisibleChangedEvent.subscribe;

    /**
     * deprecated
     */
    this.unsubscribeFromIsVisibleChanged = isVisibleChangedEvent.unsubscribe;

    /**
     * deprecated
     */
    this.getIsVisible = getIsVisible;

    function getIsVisible() {
        return isVisible;
    }

    /**
     * deprecated
     */
    this.setIsVisible = setIsVisible;

    function setIsVisible(value) {
        if (value === isVisible) {
            return;
        }

        isVisible = value;
        isVisibleChangedEvent.raise(obj, value);
    }

    Object.defineProperty(this, "isVisible", {
        enumerable: true,
        configurable: false,
        get: getIsVisible,
        set: setIsVisible
    });

    // --------------------------------------------------------------------------
    // LineWidth
    // --------------------------------------------------------------------------

    var lineWidth = 1;
    var lineWidthChangedEvent = new lu.Event();
    this.lineWidthChanged = lineWidthChangedEvent.event;

    /**
     * deprecated
     */
    this.subscribeToLineWidthChanged = lineWidthChangedEvent.subscribe;

    /**
     * deprecated
     */
    this.unsubscribeFromLineWidthChanged = lineWidthChangedEvent.unsubscribe;

    /**
     * deprecated
     */
    this.getLineWidth = getLineWidth;

    function getLineWidth() {
        return lineWidth;
    }

    /**
     * deprecated
     */
    this.setLineWidth = setLineWidth;

    function setLineWidth(value) {
        if (value === lineWidth) {
            return;
        }

        lineWidth = value;
        lineWidthChangedEvent.raise(obj, value);
    }

    Object.defineProperty(this, "lineWidth", {
        enumerable: true,
        configurable: false,
        get: getLineWidth,
        set: setLineWidth
    });

    // --------------------------------------------------------------------------
    // LineStyle
    // --------------------------------------------------------------------------

    var lineStyle = lu.LineStyle.solid;
    var lineStyleChangedEvent = new lu.Event();
    this.lineStyleChanged = lineStyleChangedEvent.event;

    /**
     * deprecated
     */
    this.subscribeToLineStyleChanged = lineStyleChangedEvent.subscribe;

    /**
     * deprecated
     */
    this.unsubscribeFromLineStyleChanged = lineStyleChangedEvent.unsubscribe;

    /**
     * deprecated
     */
    this.getLineStyle = getLineStyle;

    function getLineStyle() {
        return lineStyle;
    }

    /**
     * deprecated
     */
    this.setLineStyle = setLineStyle;

    function setLineStyle(value) {
        if (value === lineStyle) {
            return;
        }

        lineStyle = value;
        lineStyleChangedEvent.raise(obj, value);
    }

    Object.defineProperty(this, "lineStyle", {
        enumerable: true,
        configurable: false,
        get: getLineStyle,
        set: setLineStyle
    });
};