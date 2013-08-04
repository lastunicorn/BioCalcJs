/// <reference src="../../libraries/qUnit/qunit-1.12.0.js"/>
/// <reference src="../../sources/common/painting/BiorhythmViewPainter.js/"/>

(function() {

    var biorhythmView = null;
    var eventWasRaised = false;

    QUnit.module("BiorhythmView Tests", {
        setup: function() {

            lu.bioControls = lu.bioControls || {};
            lu.bioControls.common = lu.bioControls.common || {};
            lu.bioControls.common.painting = lu.bioControls.common.painting || {};
            lu.bioControls.common.painting.BiorhythmViewPainter = function() {
                return {
                    paint: function() {
                    }
                };
            };

            var canvas = document.createElement("canvas");
            canvas.id = "id";
            canvas.width = 640;
            canvas.height = 480;
            document.body.appendChild(canvas);

            biorhythmView = new lu.bioControls.BiorhythmView("id");
        }
    });

    // -------------------------------------------------------------------------
    // Biorhythms Tests
    // -------------------------------------------------------------------------

    QUnit.test("addBiorhythm raises the BiorhythmAdded event.", function() {
        prepareEventForTesting(biorhythmView.subscribeToBiorhythmAdded);
        var biorhythmShape = new lu.bioControls.common.biorhythmModel.BiorhythmShape();

        biorhythmView.addBiorhythm(biorhythmShape);

        QUnit.strictEqual(eventWasRaised, true, "Tests that the BiorhythmAdded event was raised.");
    });

    QUnit.test("getBiorhythms returns biorhythm set with addBiorhythm.", function() {
        var biorhythmShape = new lu.bioControls.common.biorhythmModel.BiorhythmShape();
        biorhythmView.addBiorhythm(biorhythmShape);

        var biorhythms = biorhythmView.getBiorhythms();

        QUnit.strictEqual(biorhythms.length, 1, "Tests that the returned array contains one element.");
        QUnit.strictEqual(biorhythms[0], biorhythmShape, "Tests that the element in the array is the original biorhythmShape object.");
    });

    QUnit.test("getBiorhythms returns two biorhythms if two were set with addBiorhythm.", function() {
        var biorhythmShape1 = new lu.bioControls.common.biorhythmModel.BiorhythmShape();
        biorhythmView.addBiorhythm(biorhythmShape1);
        var biorhythmShape2 = new lu.bioControls.common.biorhythmModel.BiorhythmShape();
        biorhythmView.addBiorhythm(biorhythmShape2);

        var biorhythms = biorhythmView.getBiorhythms();

        var expected = [ biorhythmShape1, biorhythmShape2 ];
        QUnit.arraysAreEquivalent(biorhythms, expected);
    });

    QUnit.test("getBiorhythms returns one biorhythm if two were set with addBiorhythm, but one was removed.", function() {
        var biorhythmShape1 = new lu.bioControls.common.biorhythmModel.BiorhythmShape();
        biorhythmView.addBiorhythm(biorhythmShape1);
        var biorhythmShape2 = new lu.bioControls.common.biorhythmModel.BiorhythmShape();
        biorhythmView.addBiorhythm(biorhythmShape2);
        biorhythmView.removeBiorhythm(biorhythmShape1);

        var biorhythms = biorhythmView.getBiorhythms();

        var expected = [ biorhythmShape2 ];
        QUnit.arraysAreEquivalent(biorhythms, expected);
    });

    QUnit.test("removeBiorhythm raises the BiorhythmRemoved event.", function() {
        prepareEventForTesting(biorhythmView.subscribeToBiorhythmRemoved);
        var biorhythmShape = new lu.bioControls.common.biorhythmModel.BiorhythmShape();
        biorhythmView.addBiorhythm(biorhythmShape);

        biorhythmView.removeBiorhythm(biorhythmShape);

        QUnit.strictEqual(eventWasRaised, true, "Tests that the BiorhythmRemoved event was raised.");
    });

    // -------------------------------------------------------------------------
    // FirstDay Tests
    // -------------------------------------------------------------------------

    QUnit.test("setFirstDay raises the FirstDayChanged event.", function() {
        prepareEventForTesting(biorhythmView.subscribeToFirstDayChanged);

        biorhythmView.setFirstDay(new Date());

        QUnit.strictEqual(eventWasRaised, true, "Tests that the FirstDayChanged event was raised.");
    });

    // -------------------------------------------------------------------------
    // IsGridVisible Tests
    // -------------------------------------------------------------------------

    QUnit.test("setGridVisibility raises the GridVisibilityChanged event.", function() {
        prepareEventForTesting(biorhythmView.subscribeToGridVisibilityChanged);

        biorhythmView.setGridVisibility(true);

        QUnit.strictEqual(eventWasRaised, true, "Tests that the GridVisibilityChanged event was raised.");
    });

    // -------------------------------------------------------------------------
    // 
    // -------------------------------------------------------------------------

    function prepareEventForTesting(eventSubscriptionFunction) {
        eventWasRaised = false;

        eventSubscriptionFunction(function() {
            eventWasRaised = true;
        });
    }

    QUnit.extend(QUnit, {
        inArray: function(actual, expectedValues, message) {
            ok(expectedValues.indexOf(actual) !== -1, message);
        },
        arraysAreEquivalent: function(actual, expected, message) {
            QUnit.strictEqual(actual.length, expected.length, "Tests that the lengths of the arrays are equal.");
            for ( var i = 0; i < actual.length; i++) {
                QUnit.inArray(actual[i], expected, "Tests that the element " + i + " from the actual array exists in the expected array.");
            }
        }
    });
}());