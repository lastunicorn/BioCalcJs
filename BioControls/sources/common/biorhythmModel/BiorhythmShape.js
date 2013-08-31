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
    this.nameChanged = nameChangedEvent.client;

    /**
     * deprecated
     */
    this.subscribeToNameChanged = nameChangedEvent.subscribe;

    /**
     * deprecated
     */
    this.unsubscribeFromNameChanged = nameChangedEvent.unsubscribe;

    this.getName = getName;

    /**
     * @deprecated Use the name property instead.
     */
    function getName() {
        return name;
    }

    this.setName = setName;

    /**
     * @deprecated Use the name property instead.
     */
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

    var birthdayChangedEvent = new lu.Event();
    this.birthdayChanged = birthdayChangedEvent.client;

    /**
     * deprecated
     */
    this.subscribeToBirthdayChanged = birthdayChangedEvent.subscribe;

    /**
     * deprecated
     */
    this.unsubscribeFromBirthdayChanged = birthdayChangedEvent.unsubscribe;

    this.getBirthday = getBirthday;

    /**
     * @deprecated Use the biorhythm property instead.
     */
    function getBirthday() {
        return biorhythm.birthday;
    }

    this.setBirthday = setBirthday;

    /**
     * @deprecated Use the biorhythm property instead.
     */
    function setBirthday(value) {
        biorhythm.birthday = value;
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
    this.biorhythmChanged = biorhythmChangedEvent.client;

    /**
     * deprecated
     */
    this.subscribeToBiorhythmChanged = biorhythmChangedEvent.subscribe;

    /**
     * deprecated
     */
    this.unsubscribeFromBiorhythmChanged = biorhythmChangedEvent.unsubscribe;

    this.getBiorhythm = getBiorhythm;

    /**
     * @deprecated Use the biorhythm property instead.
     */
    function getBiorhythm() {
        return biorhythm;
    }

    this.setBiorhythm = setBiorhythm;

    /**
     * @deprecated Use the biorhythm property instead.
     */
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
    this.colorChanged = colorChangedEvent.client;

    /**
     * deprecated
     */
    this.subscribeToColorChanged = colorChangedEvent.subscribe;

    /**
     * deprecated
     */
    this.unsubscribeFromColorChanged = colorChangedEvent.unsubscribe;

    this.getColor = getColor;

    /**
     * @deprecated Use the color property instead.
     */
    function getColor() {
        return color;
    }

    this.setColor = setColor;

    /**
     * @deprecated Use the color property instead.
     */
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
    this.isVisibleChanged = isVisibleChangedEvent.client;

    /**
     * deprecated
     */
    this.subscribeToIsVisibleChanged = isVisibleChangedEvent.subscribe;

    /**
     * deprecated
     */
    this.unsubscribeFromIsVisibleChanged = isVisibleChangedEvent.unsubscribe;

    this.getIsVisible = getIsVisible;

    /**
     * @deprecated Use the isVisible property instead.
     */
    function getIsVisible() {
        return isVisible;
    }

    this.setIsVisible = setIsVisible;

    /**
     * @deprecated Use the isVisible property instead.
     */
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
    this.lineWidthChanged = lineWidthChangedEvent.client;

    /**
     * deprecated
     */
    this.subscribeToLineWidthChanged = lineWidthChangedEvent.subscribe;

    /**
     * deprecated
     */
    this.unsubscribeFromLineWidthChanged = lineWidthChangedEvent.unsubscribe;

    this.getLineWidth = getLineWidth;

    /**
     * @deprecated Use the lineWidth property instead.
     */
    function getLineWidth() {
        return lineWidth;
    }

    this.setLineWidth = setLineWidth;

    /**
     * @deprecated Use the lineWidth property instead.
     */
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
    this.lineStyleChanged = lineStyleChangedEvent.client;

    /**
     * deprecated
     */
    this.subscribeToLineStyleChanged = lineStyleChangedEvent.subscribe;

    /**
     * deprecated
     */
    this.unsubscribeFromLineStyleChanged = lineStyleChangedEvent.unsubscribe;

    this.getLineStyle = getLineStyle;

    /**
     * @deprecated Use the lineStyle property instead.
     */
    function getLineStyle() {
        return lineStyle;
    }

    this.setLineStyle = setLineStyle;

    /**
     * @deprecated Use the lineStyle property instead.
     */
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