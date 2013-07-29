var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.core = lu.bioControls.core || {};
lu.bioControls.core.biorhythms = lu.bioControls.core.biorhythms || {};

lu.bioControls.core.biorhythms.MasteryBiorhythm = function() {
	var biorhythm = null;
	
	this.getName = function() {
		return "Mastery";
	};

	this.getValue = function(dayIndex) {
		return biorhythm.getValue(dayIndex);
	};
	
	(function initialize() {
		var physicalBiorhythm = new lu.bioControls.core.biorhythms.PhysicalBiorhythm();
		var intellectualBiorhythm = new lu.bioControls.core.biorhythms.IntellectualBiorhythm();
		
		biorhythm = new lu.bioControls.core.biorhythms.AverageBiorhythm(physicalBiorhythm, intellectualBiorhythm);
	}());
};