var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.common = lu.bioControls.common || {};
lu.bioControls.common.paintDataCalculation = lu.bioControls.common.paintDataCalculation || {};

lu.bioControls.common.paintDataCalculation.PaintDataCalculator = function() {

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
        biorhythmCurvesCalculator = new lu.bioControls.common.paintDataCalculation.BiorhythmCurvesCalculator();
        gridLinesCalculator = new lu.bioControls.common.paintDataCalculation.GridLinesCalculator();
        dayLabelsCalculator = new lu.bioControls.common.paintDataCalculation.DayLablesCalculator();
        todayMarkerCalculator = new lu.bioControls.common.paintDataCalculation.TodayMarkerCalculator();
        xDayMarkerCalculator = new lu.bioControls.common.paintDataCalculation.XDayMarkerCalculator();
    }());
};