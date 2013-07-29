var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.common = lu.bioControls.common || {};
lu.bioControls.common.painting = lu.bioControls.common.painting || {};

lu.bioControls.common.painting.BiorhythmViewPainter = function() {

    var rawPaintData = null;
    var canvas = null;
    var paintCount = 0;

    this.getPaintCount = function() {
        return paintCount;
    };

    this.paint = function(data, canvasElement) {
        paintCount++;
        rawPaintData = data;
        canvas = canvasElement;

        var paintDataCalculator = new lu.bioControls.common.paintDataCalculation.PaintDataCalculator();
        var dataToPaint = paintDataCalculator.calculate(rawPaintData, canvas);

        paintAll(dataToPaint);
    };

    function paintAll(dataToPaint) {
        if (canvas.getContext) {
            var context = canvas.getContext('2d');

            clearCanvas(context);

            var todayMarkerPainter = new lu.bioControls.common.painting.TodayMarkerPainter();
            todayMarkerPainter.paint(context, dataToPaint.todayMarker);

            var gridLinesPainter = new lu.bioControls.common.painting.GridLinesPainter();
            gridLinesPainter.paint(context, dataToPaint.gridLines);

            var biorhythmCurvesPainter = new lu.bioControls.common.painting.BiorhythmCurvesPainter();
            biorhythmCurvesPainter.paint(context, dataToPaint.biorhythms);

            var dayLabelsPainter = new lu.bioControls.common.painting.DayLabelsPainter();
            dayLabelsPainter.paint(context, dataToPaint.dayLabels);
            
            var xDayMarkerPainter = new lu.bioControls.common.painting.XDayMarkerPainter();
            xDayMarkerPainter.paint(context, dataToPaint.xDayMarker);
        }
    }

    function clearCanvas(context) {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
};