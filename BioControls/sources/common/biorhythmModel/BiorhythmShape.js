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

lu.bioControls.common.biorhythmModel.BiorhythmShape = function() {

    var obj = this;
    
    // #region Name

    var name = "New Biorhythm Shape";
    var nameChangedEvent = new lu.Event();

    this.subscribeToNameChanged = nameChangedEvent.subscribe;
    this.unsubscribeFromNameChanged = nameChangedEvent.unsubscribe;

    this.getName = function() {
        return name;
    };

    this.setName = function(value) {
        if (value === name) {
            return;
        }

        name = value;
        nameChangedEvent.raise(obj, value);
    };

    // #endregion

    // #region Birthday

    var birthday = Date(80, 05, 13);
    var birthdayChangedEvent = new lu.Event();

    this.subscribeToBirthdayChanged = birthdayChangedEvent.subscribe;
    this.unsubscribeFromBirthdayChanged = birthdayChangedEvent.unsubscribe;

    this.getBirthday = function() {
        return birthday;
    };

    this.setBirthday = function(value) {
        if (value === birthday) {
            return;
        }

        birthday = value;
        birthdayChangedEvent.raise(obj, value);
    };

    // #endregion

    // #region Biorhythm

    var biorhythm = null;
    var biorhythmChangedEvent = new lu.Event();

    this.subscribeToBiorhythmChanged = biorhythmChangedEvent.subscribe;
    this.unsubscribeFromBiorhythmChanged = biorhythmChangedEvent.unsubscribe;

    this.getBiorhythm = function() {
        return biorhythm;
    };

    this.setBiorhythm = function(value) {
        if (value === biorhythm) {
            return;
        }

        biorhythm = value;
        biorhythmChangedEvent.raise(obj, value);
    };

    // #endregion

    // #region Color

    var color = null;
    var colorChangedEvent = new lu.Event();

    this.subscribeToColorChanged = colorChangedEvent.subscribe;
    this.unsubscribeFromColorChanged = colorChangedEvent.unsubscribe;

    this.getColor = function() {
        return color;
    };

    this.setColor = function(value) {
        if (value === color) {
            return;
        }

        color = value;
        colorChangedEvent.raise(obj, value);
    };

    // #endregion

    // #region IsVisible

    var isVisible = true;
    var isVisibleChangedEvent = new lu.Event();

    this.subscribeToIsVisibleChanged = isVisibleChangedEvent.subscribe;
    this.unsubscribeFromIsVisibleChanged = isVisibleChangedEvent.unsubscribe;

    this.getIsVisible = function() {
        return isVisible;
    };

    this.setIsVisible = function(value) {
        if (value === isVisible) {
            return;
        }

        isVisible = value;
        isVisibleChangedEvent.raise(obj, value);
    };

    // #endregion

    // #region LineWidth

    var lineWidth = 1;
    var lineWidthChangedEvent = new lu.Event();

    this.subscribeToLineWidthChanged = lineWidthChangedEvent.subscribe;
    this.unsubscribeFromLineWidthChanged = lineWidthChangedEvent.unsubscribe;

    this.getLineWidth = function() {
        return lineWidth;
    };

    this.setLineWidth = function(value) {
        if (value === lineWidth) {
            return;
        }

        lineWidth = value;
        lineWidthChangedEvent.raise(obj, value);
    };

    // #endregion

    // #region LineStyle

    var lineStyle = lu.LineStyle.solid;
    var lineStyleChangedEvent = new lu.Event();

    this.subscribeToLineStyleChanged = lineStyleChangedEvent.subscribe;
    this.unsubscribeFromLineStyleChanged = lineStyleChangedEvent.unsubscribe;

    this.getLineStyle = function() {
        return lineStyle;
    };

    this.setLineStyle = function(value) {
        if (value === lineStyle) {
            return;
        }

        lineStyle = value;
        lineStyleChangedEvent.raise(obj, value);
    };

    // #endregion

};