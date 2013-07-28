var lu = lu || {};
lu.biorhythmControls = lu.biorhythmControls || {};
lu.biorhythmControls.common = lu.biorhythmControls.common || {};
lu.biorhythmControls.common.biorhythmModel = lu.biorhythmControls.common.biorhythmModel || {};

lu.biorhythmControls.common.biorhythmModel.BiorhythmShape = function() {

    // #region Name

    var name = "New Biorhythm Shape";
    var nameChangedEvent = new lu.Event();

    this.subscribeToNameChanged = function(eventHandler) {
        nameChangedEvent.subscribe(eventHandler);
    };

    this.getName = function() {
        return name;
    };

    this.setName = function(value) {
        if (value === name) {
            return;
        }

        name = value;
        nameChangedEvent.raise();
    };

    // #endregion

    // #region Birthday

    var birthday = Date(80, 05, 13);
    var birthdayChangedEvent = new lu.Event();

    this.subscribeToBirthdayChanged = function(eventHandler) {
        birthdayChangedEvent.subscribe(eventHandler);
    };

    this.getBirthday = function() {
        return birthday;
    };

    this.setBirthday = function(value) {
        if (value === birthday) {
            return;
        }

        birthday = value;
        birthdayChangedEvent.raise();
    };

    // #endregion

    // #region Biorhythm

    var biorhythm = null;
    var biorhythmChangedEvent = new lu.Event();

    this.subscribeToBiorhythmChanged = function(eventHandler) {
        biorhythmChangedEvent.subscribe(eventHandler);
    };

    this.getBiorhythm = function() {
        return biorhythm;
    };

    this.setBiorhythm = function(value) {
        if (value === biorhythm) {
            return;
        }

        biorhythm = value;
        biorhythmChangedEvent.raise();
    };

    // #endregion

    // #region Color

    var color = null;
    var colorChangedEvent = new lu.Event();

    this.subscribeToColorChanged = function(eventHandler) {
        colorChangedEvent.subscribe(eventHandler);
    };

    this.getColor = function() {
        return color;
    };

    this.setColor = function(value) {
        if (value === color) {
            return;
        }

        color = value;
        colorChangedEvent.raise();
    };

    // #endregion

    // #region IsVisible

    var isVisible = true;
    var isVisibleChangedEvent = new lu.Event();

    this.subscribeToIsVisibleChanged = function(eventHandler) {
        isVisibleChangedEvent.subscribe(eventHandler);
    };

    this.getIsVisible = function() {
        return isVisible;
    };

    this.setIsVisible = function(value) {
        if (value === isVisible) {
            return;
        }

        isVisible = value;
        isVisibleChangedEvent.raise();
    };

    // #endregion

    // #region LineWidth

    var lineWidth = 1;
    var lineWidthChangedEvent = new lu.Event();

    this.subscribeToLineWidthChanged = function(eventHandler) {
        lineWidthChangedEvent.subscribe(eventHandler);
    };

    this.getLineWidth = function() {
        return lineWidth;
    };

    this.setLineWidth = function(value) {
        if (value === lineWidth) {
            return;
        }

        lineWidth = value;
        lineWidthChangedEvent.raise();
    };

    // #endregion

    // #region LineStyle

    var lineStyle = lu.LineStyle.solid;
    var lineStyleChangedEvent = new lu.Event();

    this.subscribeToLineStyleChanged = function(eventHandler) {
        lineStyleChangedEvent.subscribe(eventHandler);
    };

    this.getLineStyle = function() {
        return lineStyle;
    };

    this.setLineStyle = function(value) {
        if (value === lineStyle) {
            return;
        }

        lineStyle = value;
        lineStyleChangedEvent.raise();
    };

    // #endregion

};