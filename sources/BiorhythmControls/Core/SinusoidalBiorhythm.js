var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.core = lu.bioControls.core || {};
lu.bioControls.core.biorhythms = lu.bioControls.core.biorhythms || {};

lu.bioControls.core.biorhythms.SinusoidalBiorhythm = function() {
	
	var values = [];
	var periodLength = 0;
	
	function getPeriodLength() {
		return periodLength;
	}
	
	function setPeriodLength(value) {
		periodLength = value;
		generateValues();
	}

	function getValue(dayIndex) {
		
		var index = dayIndex % periodLength;
		
		if (index < 0) {
			index += periodLength;
		}
		
		return values[index];
	}
	
	function generateValues() {
		values = [];
		
		for (var i = 0; i < periodLength; i++) {
			values[i] = Math.sin(i * 2 * Math.PI / periodLength);
		}
	}

	this.getPeriodLength = getPeriodLength;
	this.setPeriodLength = setPeriodLength;
	this.getValue = getValue;
};