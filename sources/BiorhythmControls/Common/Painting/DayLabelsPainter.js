var lu = lu || {};
lu.biorhythmControls = lu.biorhythmControls || {};
lu.biorhythmControls.common = lu.biorhythmControls.common || {};
lu.biorhythmControls.common.painting = lu.biorhythmControls.common.painting || {};

lu.biorhythmControls.common.painting.DayLabelsPainter = function() {

    var dataToPaint = null;
    var paintContext = null;

    this.paint = function(context, data) {
        paintContext = context;
        dataToPaint = data;

        paintLabels();
    };

    function paintLabels() {
        paintContext.textAlign = "center";
        paintContext.textBaseline = "middle";

        var labelCount = dataToPaint.labels.length;

        for ( var i = 0; i < labelCount; i++) {
            paintLabel(dataToPaint.labels[i]);
        }
    }

    function paintLabel(label) {
        if (label.isEmphasized) {
            paintContext.fillStyle = dataToPaint.emphasizedColor;
            paintContext.font = dataToPaint.emphasizedFont;
        } else {
            paintContext.fillStyle = dataToPaint.color;
            paintContext.font = dataToPaint.font;
        }

        paintContext.fillText(label.text, label.location.getX(), label.location.getY());
    }
};