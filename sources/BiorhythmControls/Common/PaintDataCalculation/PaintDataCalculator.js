var lu = lu || {};
lu.biorhythmControls = lu.biorhythmControls || {};
lu.biorhythmControls.common = lu.biorhythmControls.common || {};
lu.biorhythmControls.common.paintDataCalculation = lu.biorhythmControls.common.paintDataCalculation || {};

lu.biorhythmControls.common.paintDataCalculation.PaintDataCalculator = function() {

    var biorhythmCurvesCalculator = null;
    var gridLinesCalculator = null;
    var dayLabelsCalculator = null;
    var todayMarkerCalculator = null;
    var xDayMarkerCalculator = null;

    // --------------------------------------------------------------------------
    // Functions - "public"
    // --------------------------------------------------------------------------

    this.calculate = function(data, canvasElement) {
        return {
            biorhythms: biorhythmCurvesCalculator.calculate(data, canvasElement),
            gridLines: gridLinesCalculator.calculate(data, canvasElement),
            dayLabels: dayLabelsCalculator.calculate(data, canvasElement),
            todayMarker: todayMarkerCalculator.calculate(data, canvasElement),
            xDayMarker: xDayMarkerCalculator.calculate(data, canvasElement)
        };
    };

    // --------------------------------------------------------------------------
    // Initializer
    // --------------------------------------------------------------------------

    (function initialize() {
        biorhythmCurvesCalculator = new lu.biorhythmControls.common.paintDataCalculation.BiorhythmCurvesCalculator();
        gridLinesCalculator = new lu.biorhythmControls.common.paintDataCalculation.GridLinesCalculator();
        dayLabelsCalculator = new lu.biorhythmControls.common.paintDataCalculation.DayLablesCalculator();
        todayMarkerCalculator = new lu.biorhythmControls.common.paintDataCalculation.TodayMarkerCalculator();
        xDayMarkerCalculator = new lu.biorhythmControls.common.paintDataCalculation.XDayMarkerCalculator();
    }());
};