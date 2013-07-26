var lu = lu || {};
lu.biorhythmControls = lu.biorhythmControls || {};
lu.biorhythmControls.common = lu.biorhythmControls.common || {};
lu.biorhythmControls.common.painting = lu.biorhythmControls.common.painting || {};

lu.biorhythmControls.common.painting.TodayPainter = function() {

    var paintContext = null;
    var dataToPaint = null;

    this.paint = function(context, data) {
        paintContext = context;
        dataToPaint = data;

        if (!dataToPaint) {
            return;
        }

        paintTodayRectangle();
    };

    function paintTodayRectangle() {
        var rect = dataToPaint.rectangle;

        paintContext.beginPath();
        paintContext.rect(rect.getLeft(), rect.getTop(), rect.getWidth(), rect.getHeight());
        paintContext.fillStyle = dataToPaint.color;
        paintContext.fill();
    }
};