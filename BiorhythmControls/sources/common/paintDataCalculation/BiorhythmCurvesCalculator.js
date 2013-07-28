var lu = lu || {};
lu.biorhythmControls = lu.biorhythmControls || {};
lu.biorhythmControls.common = lu.biorhythmControls.common || {};
lu.biorhythmControls.common.paintDataCalculation = lu.biorhythmControls.common.paintDataCalculation || {};

lu.biorhythmControls.common.paintDataCalculation.BiorhythmCurvesCalculator = function() {
    
    var rawPaintData = null;
    var canvas = null;
    var margin = 10;
    
	// --------------------------------------------------------------------------
	// Functions - "public"
	// --------------------------------------------------------------------------
	
    this.calculate = function(data, canvasElement) {
        rawPaintData = data;
        canvas = canvasElement;
        
        return calculateBiorhythms();
    };
    
	// --------------------------------------------------------------------------
	// Functions - "private"
	// --------------------------------------------------------------------------
	
    function calculateBiorhythms() {
		var values = [];
		var points;
		
		for (var i = 0; i < rawPaintData.biorhythmShapes.length; i++) {
			if(!rawPaintData.biorhythmShapes[i].getIsVisible()){
				continue;
			}

            var biorhythm = rawPaintData.biorhythmShapes[i].getBiorhythm();
            var birthday = rawPaintData.biorhythmShapes[i].getBirthday(); 
			points = calculateBiorhythmPoints(biorhythm, birthday);
			
			values.push({
				points: points,
				color: rawPaintData.biorhythmShapes[i].getColor(),
				lineWidth: rawPaintData.biorhythmShapes[i].getLineWidth(),
				lineStyle: rawPaintData.biorhythmShapes[i].getLineStyle()
			});
		}

		return values;
	}

	function calculateBiorhythmPoints(biorhythm, birthday)
	{
		var xStep = (canvas.width) / rawPaintData.totalDays;
		var xOffset = xStep / 2;
		var yOffset = margin + (canvas.height - 2 * margin) / 2;
		var amplitude = canvas.height / 2 - 2 * margin;

        var milisecondsLived = rawPaintData.firstDay - birthday;
        var daysLived = Math.floor(milisecondsLived/ 1000 / 60 / 60 / 24);
        
		var points = [];

		for (var index = 0; index < rawPaintData.totalDays; index++) { 
			var x = xOffset + index * xStep;
			var y = yOffset - biorhythm.getValue(daysLived + index) * amplitude;

			points[index] = new lu.Point(x, y);
		}

		return points;
	}
};