var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.core = lu.bioControls.core || {};
lu.bioControls.core.biorhythms = lu.bioControls.core.biorhythms || {};

lu.bioControls.core.biorhythms.PhysicalBiorhythm = function() {
	var biorhythm;
	
	function getName() {
		return "Physical";
	}
	
	function getPeriodLength() {
		return biorhythm.getPeriodLength();
	}

	function getValue(dayIndex) {
		return biorhythm.getValue(dayIndex);
	}
	
	(function initialize() {
		biorhythm = new lu.bioControls.core.biorhythms.SinusoidalBiorhythm();
		biorhythm.setPeriodLength(23);
	}());

	this.getName = getName;
	this.getPeriodLength = getPeriodLength;
	this.getValue = getValue;
};