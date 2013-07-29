/// <reference src="../../libraries/qUnit/qunit-1.12.0.js"/>
/// <reference src="../../sources/common/painting/BiorhythmViewPainter.js/"/>

(function() {

    var biorhythmView = null;

    QUnit.module("BiorhythmView Tests", {
        setup: function() {
            document.getElementById = function() {
                return {
                    addEventListener: function() {
                    }
                };
            };

            lu.bioControls = lu.bioControls || {};
            lu.bioControls.common = lu.bioControls.common || {};
            lu.bioControls.common.painting = lu.bioControls.common.painting || {};
            lu.bioControls.common.painting.BiorhythmViewPainter = function() {
            };

            biorhythmView = new lu.bioControls.BiorhythmView("id");
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