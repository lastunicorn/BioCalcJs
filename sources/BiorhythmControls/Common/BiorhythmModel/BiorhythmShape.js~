var lu = lu || {};
lu.biorhythmControls = lu.biorhythmControls || {};
lu.biorhythmControls.common = lu.biorhythmControls.common || {};
lu.biorhythmControls.common.biorhythmModel = lu.biorhythmControls.common.biorhythmModel || {};

lu.biorhythmControls.common.biorhythmModel.BiorhythmShape = function() {

	// #region Name

	var name = "New Biorhythm Shape";
	var nameChangedEvent = new lu.Event();
	
	function subscribeToNameChanged(eventHandler) {
		nameChangedEvent.subscribe(eventHandler);
	}
	
	function getName() {
		return name;
	}

	function setName(value) {
		if(value === name){
			return;
		}
	
		name = value;
		nameChangedEvent.raiseEvent();
	}
	
	this.getName = getName;
	this.setName = setName;
	this.subscribeToNameChanged = subscribeToNameChanged;

	// #endregion

	// #region Birthday

	var birthday = Date(80, 05, 13);
	var birthdayChangedEvent = new lu.Event();
	
	function subscribeToBirthdayChanged(eventHandler) {
		birthdayChangedEvent.subscribe(eventHandler);
	}
	
	function getBirthday() {
		return birthday;
	}

	function setBirthday(value) {
		if(value === birthday){
			return;
		}
	
		birthday = value;
		birthdayChangedEvent.raiseEvent();
	}
	
	this.getBirthday = getBirthday;
	this.setBirthday = setBirthday;
	this.subscribeToBirthdayChanged = subscribeToBirthdayChanged;

	// #endregion

	// #region Biorhythm

	var biorhythm = null;
	var biorhythmChangedEvent = new lu.Event();
	
	function subscribeToBiorhythmChanged(eventHandler) {
		biorhythmChangedEvent.subscribe(eventHandler);
	}
	
	function getBiorhythm() {
		return biorhythm;
	}

	function setBiorhythm(value) {
		if(value === biorhythm){
			return;
		}
	
		biorhythm = value;
		biorhythmChangedEvent.raiseEvent();
	}
	
	this.getBiorhythm = getBiorhythm;
	this.setBiorhythm = setBiorhythm;
	this.subscribeToBiorhythmChanged = subscribeToBiorhythmChanged;

	// #endregion

	// #region Color

	var color = null;
	var colorChangedEvent = new lu.Event();
	
	function subscribeToColorChanged(eventHandler) {
		colorChangedEvent.subscribe(eventHandler);
	}
	
	function getColor() {
		return color;
	}

	function setColor(value) {
		if(value === color){
			return;
		}
	
		color = value;
		colorChangedEvent.raiseEvent();
	}
	
	this.getColor = getColor;
	this.setColor = setColor;
	this.subscribeToColorChanged = subscribeToColorChanged;

	// #endregion

	// #region IsVisible

	var isVisible = true;
	var isVisibleChangedEvent = new lu.Event();
	
	function subscribeToIsVisibleChanged(eventHandler) {
		isVisibleChangedEvent.subscribe(eventHandler);
	}
	
	function getIsVisible() {
		return isVisible;
	}

	function setIsVisible(value) {
		if(value === isVisible){
			return;
		}
	
		isVisible = value;
		isVisibleChangedEvent.raiseEvent();
	}
	
	this.getIsVisible = getIsVisible;
	this.setIsVisible = setIsVisible;
	this.subscribeToIsVisibleChanged = subscribeToIsVisibleChanged;

	// #endregion

	// #region LineWidth

	var lineWidth = 1;
	var lineWidthChangedEvent = new lu.Event();
	
	function subscribeToLineWidthChanged(eventHandler) {
		lineWidthChangedEvent.subscribe(eventHandler);
	}
	
	function getLineWidth() {
		return lineWidth;
	}

	function setLineWidth(value) {
		if(value === lineWidth){
			return;
		}
	
		lineWidth = value;
		lineWidthChangedEvent.raiseEvent();
	}
	
	this.getLineWidth = getLineWidth;
	this.setLineWidth = setLineWidth;
	this.subscribeToLineWidthChanged = subscribeToLineWidthChanged;

	// #endregion

	// #region LineStyle

	var lineStyle = lu.LineStyle.solid;
	var lineStyleChangedEvent = new lu.Event();
	
	function subscribeToLineStyleChanged(eventHandler) {
		lineStyleChangedEvent.subscribe(eventHandler);
	}
	
	function getLineStyle() {
		return lineStyle;
	}

	function setLineStyle(value) {
		if(value === lineStyle){
			return;
		}
	
		lineStyle = value;
		lineStyleChangedEvent.raiseEvent();
	}
	
	this.getLineStyle = getLineStyle;
	this.setLineStyle = setLineStyle;
	this.subscribeToLineStyleChanged = subscribeToLineStyleChanged;

	// #endregion
	
};