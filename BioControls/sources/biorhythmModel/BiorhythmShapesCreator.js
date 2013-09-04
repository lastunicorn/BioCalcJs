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

var lu = lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.biorhythmModel = lu.bioControls.biorhythmModel || {};

lu.bioControls.biorhythmModel.BiorhythShapesCreator = {

    defaultBirthday: new Date(1980, 05, 13),

    // -----------------------------------------------------------------------------
    // Primary Biorhythms
    // -----------------------------------------------------------------------------

    createPhysicalBiorhythmShape: function() {
        var biorhythm = new lu.bioControls.biorhythms.PhysicalBiorhythm();
        biorhythm.birthday = this.defaultBirthday;

        var shape = new lu.bioControls.biorhythmModel.BiorhythmShape();
        shape.name = biorhythm.name + " Shape";
        shape.biorhythm = biorhythm;
        shape.color = "#ff0000"; // Red

        return shape;
    },

    createEmotionalBiorhythmShape: function() {
        var biorhythm = new lu.bioControls.biorhythms.EmotionalBiorhythm();
        biorhythm.birthday = this.defaultBirthday;

        var shape = new lu.bioControls.biorhythmModel.BiorhythmShape();
        shape.name = biorhythm.name + " Shape";
        shape.biorhythm = biorhythm;
        shape.color = "#32cd32"; // LimeGreen

        return shape;
    },

    createIntellectualBiorhythmShape: function() {
        var biorhythm = new lu.bioControls.biorhythms.IntellectualBiorhythm();
        biorhythm.birthday = this.defaultBirthday;

        var shape = new lu.bioControls.biorhythmModel.BiorhythmShape();
        shape.name = biorhythm.name + " Shape";
        shape.biorhythm = biorhythm;
        shape.color = "#1e90ff"; // DodgerBlue

        return shape;
    },

    createIntuitiveBiorhythmShape: function() {
        var biorhythm = new lu.bioControls.biorhythms.IntuitiveBiorhythm();
        biorhythm.birthday = this.defaultBirthday;

        var shape = new lu.bioControls.biorhythmModel.BiorhythmShape();
        shape.name = biorhythm.name + " Shape";
        shape.biorhythm = biorhythm;
        shape.color = "#ffa500"; // Orange

        return shape;
    },

    // -----------------------------------------------------------------------------
    // Secondary Biorhythms
    // -----------------------------------------------------------------------------

    createPassionBiorhythmShape: function() {
        var biorhythm = new lu.bioControls.biorhythms.PassionBiorhythm();
        biorhythm.birthday = this.defaultBirthday;

        var shape = new lu.bioControls.biorhythmModel.BiorhythmShape();
        shape.name = biorhythm.name + " Shape";
        shape.biorhythm = biorhythm;
        shape.color = "#ff0000"; // Red
        shape.lineStyle = lu.LineStyle.dash;

        return shape;
    },

    createMasteryBiorhythmShape: function() {
        var biorhythm = new lu.bioControls.biorhythms.MasteryBiorhythm();
        biorhythm.birthday = this.defaultBirthday;

        var shape = new lu.bioControls.biorhythmModel.BiorhythmShape();
        shape.name = biorhythm.name + " Shape";
        shape.biorhythm = biorhythm;
        shape.color = "#1e90ff"; // DodgerBlue
        shape.lineStyle = lu.LineStyle.dashDot;

        return shape;
    },

    createWisdomBiorhythmShape: function() {
        var biorhythm = new lu.bioControls.biorhythms.WisdomBiorhythm();
        biorhythm.birthday = this.defaultBirthday;

        var shape = new lu.bioControls.biorhythmModel.BiorhythmShape();
        shape.name = biorhythm.name + " Shape";
        shape.biorhythm = biorhythm;
        shape.color = "#32cd32"; // LimeGreen
        shape.lineStyle = lu.LineStyle.dashDotDot;

        return shape;
    },

    // -----------------------------------------------------------------------------
    // Extra Biorhythms
    // -----------------------------------------------------------------------------

    createPerceptionBiorhythmShape: function() {
        var biorhythm = new lu.bioControls.biorhythms.PerceptionBiorhythm();
        biorhythm.birthday = this.defaultBirthday;

        var shape = new lu.bioControls.biorhythmModel.BiorhythmShape();
        shape.name = biorhythm.name + " Shape";
        shape.biorhythm = biorhythm;
        shape.color = "#ff0000"; // Red
        shape.lineStyle = lu.LineStyle.dash;

        return shape;
    },

    createPsychicBiorhythmShape: function() {
        var biorhythm = new lu.bioControls.biorhythms.PsychicBiorhythm();
        biorhythm.birthday = this.defaultBirthday;

        var shape = new lu.bioControls.biorhythmModel.BiorhythmShape();
        shape.name = biorhythm.name + " Shape";
        shape.biorhythm = biorhythm;
        shape.color = "#32cd32"; // LimeGreen
        shape.lineStyle = lu.LineStyle.dashDot;

        return shape;
    },

    createSuccessBiorhythmShape: function() {
        var biorhythm = new lu.bioControls.biorhythms.SuccessBiorhythm();
        biorhythm.birthday = this.defaultBirthday;

        var shape = new lu.bioControls.biorhythmModel.BiorhythmShape();
        shape.name = biorhythm.name + " Shape";
        shape.biorhythm = biorhythm;
        shape.color = "#1e90ff"; // DodgerBlue
        shape.lineStyle = lu.LineStyle.dashDotDot;

        return shape;
    },

    // -----------------------------------------------------------------------------
    // I-Ching Biorhythms
    // -----------------------------------------------------------------------------

    createEstheticBiorhythmShape: function() {
        var biorhythm = new lu.bioControls.biorhythms.EstheticBiorhythm();
        biorhythm.birthday = this.defaultBirthday;

        var shape = new lu.bioControls.biorhythmModel.BiorhythmShape();
        shape.name = biorhythm.name + " Shape";
        shape.biorhythm = biorhythm;
        shape.color = "#ff0000"; // Red

        return shape;
    },

    createSelfAwarenessBiorhythmShape: function() {
        var biorhythm = new lu.bioControls.biorhythms.SelfAwarenessBiorhythm();
        biorhythm.birthday = this.defaultBirthday;

        var shape = new lu.bioControls.biorhythmModel.BiorhythmShape();
        shape.name = biorhythm.name + " Shape";
        shape.biorhythm = biorhythm;
        shape.color = "#1e90ff"; // DodgerBlue

        return shape;
    },

    createSpiritualBiorhythmShape: function() {
        var biorhythm = new lu.bioControls.biorhythms.SpiritualBiorhythm();
        biorhythm.birthday = this.defaultBirthday;

        var shape = new lu.bioControls.biorhythmModel.BiorhythmShape();
        shape.name = biorhythm.name + " Shape";
        shape.biorhythm = biorhythm;
        shape.color = "#ffa500"; // Orange

        return shape;
    }
};