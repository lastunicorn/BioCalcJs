var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.core = lu.bioControls.core || {};
lu.bioControls.core.biorhythms = lu.bioControls.core.biorhythms || {};

lu.bioControls.core.biorhythms.AverageBiorhythm = function(biorhythmA, biorhythmB) {
	
	this.getValue = function(dayIndex) {
		return (biorhythmA.getValue(dayIndex) + biorhythmB.getValue(dayIndex)) / 2;
	};
};