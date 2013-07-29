var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.common = lu.bioControls.common || {};
lu.bioControls.common.painting = lu.bioControls.common.painting || {};

lu.bioControls.common.painting.XDayMarkerPainter = function() {

    var paintContext = null;
    var dataToPaint = null;

    this.paint = function(context, data) {
        paintContext = context;
        dataToPaint = data;

        if (!dataToPaint) {
            return;
        }

        paintXDayMarker();
    };

    function paintXDayMarker() {
        if (!dataToPaint) {
            return;
        }

        var rect = dataToPaint.rectangle;

        paintContext.beginPath();
        paintContext.rect(rect.getLeft(), rect.getTop(), rect.getWidth(), rect.getHeight());
        paintContext.strokeStyle = dataToPaint.lineColor;
        paintContext.lineWidth = dataToPaint.lineWidth;
        paintContext.stroke();
    }
};