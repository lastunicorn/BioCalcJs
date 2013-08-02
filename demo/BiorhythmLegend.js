var lu = lu || {};
lu.bioCalc = lu.bioCalc || {};

lu.bioCalc.BiorhythmLegend = function(biorhythmView, legendContainerSelector) {
	var $legendContainer = null;

	function onBiorhythmNameChanged() {
		// todo: implement this
	}

	function onBiorhythmColorChanged() {
		// todo: implement this
	}

	function onBiorhythmAdded() {
		// todo: implement this
	}

	function onBiorhythmRemoved() {
		// todo: implement this
	}

	this.populate = function populate() {
		var biorhythmShapes = biorhythmView.getBiorhythms();

		biorhythmView.subscribeToBiorhythmAdded(onBiorhythmAdded);
		biorhythmView.subscribeToBiorhythmRemoved(onBiorhythmRemoved);

		$legendContainer.empty();

		for ( var i = 0; i < biorhythmShapes.length; i++) {
			biorhythmShapes[i].subscribeToNameChanged(onBiorhythmNameChanged);
			biorhythmShapes[i].subscribeToColorChanged(onBiorhythmColorChanged);

			var biorhythmLegendItem = new lu.bioCalc.BiorhythmLegendItem(
					biorhythmShapes[i]);
			var $legendItemTag = biorhythmLegendItem.generate();

			$legendContainer.prepend($legendItemTag);
		}
	}

	// --------------------------------------------------------------------------
	// Initializer
	// --------------------------------------------------------------------------

	(function initialize() {
		$legendContainer = $(legendContainerSelector);
	}());
};