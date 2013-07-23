var lu = lu || {};
lu.biorhythmControls = lu.biorhythmControls || {};
lu.biorhythmControls.common = lu.biorhythmControls.common || {};
lu.biorhythmControls.common.paintDataCalculation = lu.biorhythmControls.common.paintDataCalculation || {};

lu.biorhythmControls.common.paintDataCalculation.PaintDataCalculator = function() {
    
    var biorhythmCurvesCalculator;
    var gridLinesCalculator;
    var dayLabelsCalculator;

	// --------------------------------------------------------------------------
	// Functions - "public"
	// --------------------------------------------------------------------------
	
    function calculate(data, canvasElement) {
        return {
            biorhythms: biorhythmCurvesCalculator.calculate(data, canvasElement),
            gridLines: gridLinesCalculator.calculate(data, canvasElement),
            dayLabels: dayLabelsCalculator.calculate(data, canvasElement)
        };
    }
    
	// --------------------------------------------------------------------------
	// Initializer
	// --------------------------------------------------------------------------
	
    (function initialize() {
        biorhythmCurvesCalculator = new lu.biorhythmControls.common.paintDataCalculation.BiorhythmCurvesCalculator();
        gridLinesCalculator = new lu.biorhythmControls.common.paintDataCalculation.GridLinesCalculator();
        dayLabelsCalculator = new lu.biorhythmControls.common.paintDataCalculation.DayLablesCalculator();
    }());
    
    this.calculate = calculate;
};