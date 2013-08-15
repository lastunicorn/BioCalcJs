// BioCalc
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
	};

	// --------------------------------------------------------------------------
	// Initializer
	// --------------------------------------------------------------------------

	(function initialize() {
		$legendContainer = $(legendContainerSelector);
	}());
};