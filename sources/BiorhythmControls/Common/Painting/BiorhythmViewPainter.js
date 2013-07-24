var lu = lu || {};
lu.biorhythmControls = lu.biorhythmControls || {};
lu.biorhythmControls.common = lu.biorhythmControls.common || {};
lu.biorhythmControls.common.painting = lu.biorhythmControls.common.painting || {};

lu.biorhythmControls.common.painting.BiorhythmViewPainter = function() {

    var rawPaintData;
    var canvas;
    var paintCount = 0;
    
    this.getPaintCount = function () {
        return paintCount;
    }
    
    // --------------------------------------------------------------------------
    // Functions - "public"
    // --------------------------------------------------------------------------
    
    this.paint = function(data, canvasElement) {
        paintCount++;
        rawPaintData = data;
        canvas = canvasElement;
        
        var paintDataCalculator = new lu.biorhythmControls.common.paintDataCalculation.PaintDataCalculator();
        var dataToPaint = paintDataCalculator.calculate(rawPaintData, canvas);
        
        paintAll(dataToPaint);
    };
    
    // --------------------------------------------------------------------------
    // Functions - "private"
    // --------------------------------------------------------------------------
    
    function paintAll(dataToPaint) {
        if (canvas.getContext) {
            var context = canvas.getContext('2d');
            
            clearCanvas(context);
            
            var gridLinesPainter = new lu.biorhythmControls.common.painting.GridLinesPainter();
            gridLinesPainter.paint(context, dataToPaint.gridLines);
            
            var todayPainter = new lu.biorhythmControls.common.painting.TodayPainter();
            todayPainter.paint(context, dataToPaint.todayMarker);
            
            var biorhythmCurvesPainter = new lu.biorhythmControls.common.painting.BiorhythmCurvesPainter();
            biorhythmCurvesPainter.paint(context, dataToPaint.biorhythms);
            
            var dayLabelsPainter = new lu.biorhythmControls.common.painting.DayLabelsPainter();
            dayLabelsPainter.paint(context, dataToPaint.dayLabels);
        }
    }
    
    function clearCanvas(context) {
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
    }
};