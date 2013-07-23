var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.core = lu.bioControls.core || {};
lu.bioControls.core.biorhythms = lu.bioControls.core.biorhythms || {};

lu.bioControls.core.biorhythms.EmotionalBiorhythm = function(){
	var biorhythm;
	
	function getName() {
		return "Emotional";
	}
	
	function getPeriodLength() {
		return biorhythm.getPeriodLength();
	}

	function getValue(dayIndex) {
		return biorhythm.getValue(dayIndex);
	}
	
	(function initialize() {
		biorhythm = new lu.bioControls.core.biorhythms.SinusoidalBiorhythm();
		biorhythm.setPeriodLength(28);
	}());

	this.getName = getName;
	this.getPeriodLength = getPeriodLength;
	this.getValue = getValue;
};