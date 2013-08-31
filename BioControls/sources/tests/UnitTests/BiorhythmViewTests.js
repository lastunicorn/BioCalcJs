// BioControls
// Copyright (C) 2013 Last Unicorn
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with this program. If not, see <http://www.gnu.org/licenses/>.

/// <reference src="../../libraries/qUnit/qunit-1.12.0.js"/>
/// <reference src="../../sources/common/painting/BiorhythmViewPainter.js/"/>

(function() {

    var biorhythmView = null;
    var eventWasRaised = false;

    QUnit.module("BiorhythmView Tests - Biorhythms", {
        setup: function() {

            lu.bioControls = lu.bioControls || {};
            lu.bioControls.common = lu.bioControls.common || {};
            lu.bioControls.common.painting = lu.bioControls.common.painting || {};
            lu.bioControls.biorhythmView.painting.BiorhythmViewPainter = function() {
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
        watchForEvent(biorhythmView.biorhythmAdded);
        var biorhythmShape = new lu.bioControls.biorhythmModel.BiorhythmShape();

        biorhythmView.addBiorhythm(biorhythmShape);

        QUnit.strictEqual(eventWasRaised, true, "Tests that the BiorhythmAdded event was raised.");
    });

    QUnit.test("getBiorhythms returns biorhythm set with addBiorhythm.", function() {
        var biorhythmShape = new lu.bioControls.biorhythmModel.BiorhythmShape();
        biorhythmView.addBiorhythm(biorhythmShape);

        var biorhythms = biorhythmView.getBiorhythms();

        QUnit.strictEqual(biorhythms.length, 1, "Tests that the returned array contains one element.");
        QUnit.strictEqual(biorhythms[0], biorhythmShape, "Tests that the element in the array is the original biorhythmShape object.");
    });

    QUnit.test("getBiorhythms returns two biorhythms if two were set with addBiorhythm.", function() {
        var biorhythmShape1 = new lu.bioControls.biorhythmModel.BiorhythmShape();
        biorhythmView.addBiorhythm(biorhythmShape1);
        var biorhythmShape2 = new lu.bioControls.biorhythmModel.BiorhythmShape();
        biorhythmView.addBiorhythm(biorhythmShape2);

        var biorhythms = biorhythmView.getBiorhythms();

        var expected = [ biorhythmShape1, biorhythmShape2 ];
        QUnit.arraysAreEquivalent(biorhythms, expected);
    });

    QUnit.test("getBiorhythms returns one biorhythm if two were set with addBiorhythm, but one was removed.", function() {
        var biorhythmShape1 = new lu.bioControls.biorhythmModel.BiorhythmShape();
        biorhythmView.addBiorhythm(biorhythmShape1);
        var biorhythmShape2 = new lu.bioControls.biorhythmModel.BiorhythmShape();
        biorhythmView.addBiorhythm(biorhythmShape2);
        biorhythmView.removeBiorhythm(biorhythmShape1);

        var biorhythms = biorhythmView.getBiorhythms();

        var expected = [ biorhythmShape2 ];
        QUnit.arraysAreEquivalent(biorhythms, expected);
    });

    QUnit.test("removeBiorhythm raises the BiorhythmRemoved event.", function() {
        watchForEvent(biorhythmView.biorhythmRemoved);
        var biorhythmShape = new lu.bioControls.biorhythmModel.BiorhythmShape();
        biorhythmView.addBiorhythm(biorhythmShape);

        biorhythmView.removeBiorhythm(biorhythmShape);

        QUnit.strictEqual(eventWasRaised, true, "Tests that the BiorhythmRemoved event was raised.");
    });

    // -------------------------------------------------------------------------
    // FirstDay Tests
    // -------------------------------------------------------------------------

    QUnit.test("setFirstDay raises the FirstDayChanged event.", function() {
        watchForEvent(biorhythmView.firstDayChanged);

        biorhythmView.firstDay = new Date();

        QUnit.strictEqual(eventWasRaised, true, "Tests that the FirstDayChanged event was raised.");
    });

    // -------------------------------------------------------------------------
    // IsGridVisible Tests
    // -------------------------------------------------------------------------

    QUnit.test("setGridVisibility raises the isGridVisibleChanged event.", function() {
        watchForEvent(biorhythmView.isGridVisibleChanged);

        biorhythmView.isGridVisible = true;

        QUnit.strictEqual(eventWasRaised, true, "Tests that the GridVisibilityChanged event was raised.");
    });

    // -------------------------------------------------------------------------
    // 
    // -------------------------------------------------------------------------

    function watchForEvent(event) {
        eventWasRaised = false;

        event.subscribe(function() {
            eventWasRaised = true;
        });
    }
}());