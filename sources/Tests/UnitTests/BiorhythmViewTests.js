/// <reference src="../ExternalTools/qUnit/qunit-1.12.0.js"/>

(function() {

    var biorhythmView;

    QUnit.module("BiorhythmView Tests", {
        setup: function () {
            document.getElementById = function () {
                return {
                    addEventListener = function () {};
                };
            };
            
            lu.biorhythmControls = lu.biorhythmControls || {};
            lu.biorhythmControls.common = lu.biorhythmControls.common || {};
            lu.biorhythmControls.common.painting = lu.biorhythmControls.common.painting || {};
            lu.biorhythmControls.common.painting.BiorhythmViewPainter = function() {};
            
            biorhythmView = new lu.biorhythmControls.BiorhythmView("id");
        }
    });

	QUnit.test("setGridVisibility raises the GridVisibilityChanged event.", function() {
        var eventWasRaised = false;
        biorhythmView.subscribeToGridVisibilityChanged(function() {
            eventWasRaised = true;
        });
        
        biorhythmView.setGridVisibility(true);
        
        QUnit.strictEqual(eventWasRaised, true, "Tests that the GridVisibilityChanged event was raised.");
    });
}());