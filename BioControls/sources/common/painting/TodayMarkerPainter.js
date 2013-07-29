var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.common = lu.bioControls.common || {};
lu.bioControls.common.painting = lu.bioControls.common.painting || {};

lu.bioControls.common.painting.TodayMarkerPainter = function() {

    var paintContext = null;
    var dataToPaint = null;

    this.paint = function(context, data) {
        paintContext = context;
        dataToPaint = data;

        if (!dataToPaint) {
            return;
        }

        paintTodayMarker();
    };

    function paintTodayMarker() {
        var rect = dataToPaint.rectangle;

        paintContext.beginPath();
        paintContext.rect(rect.getLeft(), rect.getTop(), rect.getWidth(), rect.getHeight());
        paintContext.fillStyle = dataToPaint.color;
        paintContext.fill();
    }
};