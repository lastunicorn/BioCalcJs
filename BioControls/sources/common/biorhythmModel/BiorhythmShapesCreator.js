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
lu.bioControls.common = lu.bioControls.common || {};
lu.bioControls.common.biorhythmModel = lu.bioControls.common.biorhythmModel || {};

lu.bioControls.common.biorhythmModel.BiorhythShapesCreator = {

    defaultBirthday: new Date(1980, 05, 13),

    // -----------------------------------------------------------------------------
    // Primary Biorhythms
    // -----------------------------------------------------------------------------

    createPhysicalBiorhythmShape: function() {
        var biorhythm = new lu.bioControls.core.biorhythms.PhysicalBiorhythm();

        var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape();
        shape.name = biorhythm.name + " Shape";
        shape.biorhythm = biorhythm;
        shape.color = "#ff0000"; // Red
        shape.birthday = this.defaultBirthday;

        return shape;
    },

    createEmotionalBiorhythmShape: function() {
        var biorhythm = new lu.bioControls.core.biorhythms.EmotionalBiorhythm();

        var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape();
        shape.name = biorhythm.name + " Shape";
        shape.biorhythm = biorhythm;
        shape.color = "#32cd32"; // LimeGreen
        shape.birthday = this.defaultBirthday;

        return shape;
    },

    createIntellectualBiorhythmShape: function() {
        var biorhythm = new lu.bioControls.core.biorhythms.IntellectualBiorhythm();

        var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape();
        shape.name = biorhythm.name + " Shape";
        shape.biorhythm = biorhythm;
        shape.color = "#1e90ff"; // DodgerBlue
        shape.birthday = this.defaultBirthday;

        return shape;
    },

    createIntuitiveBiorhythmShape: function() {
        var biorhythm = new lu.bioControls.core.biorhythms.IntuitiveBiorhythm();

        var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape();
        shape.name = biorhythm.name + " Shape";
        shape.biorhythm = biorhythm;
        shape.color = "#ffa500"; // Orange
        shape.birthday = this.defaultBirthday;

        return shape;
    },

    // -----------------------------------------------------------------------------
    // Secondary Biorhythms
    // -----------------------------------------------------------------------------

    createPassionBiorhythmShape: function() {
        var biorhythm = new lu.bioControls.core.biorhythms.PassionBiorhythm();

        var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape();
        shape.name = biorhythm.name + " Shape";
        shape.biorhythm = biorhythm;
        shape.color = "#ff0000"; // Red
        shape.lineStyle = lu.LineStyle.dash;
        shape.birthday = this.defaultBirthday;

        return shape;
    },

    createMasteryBiorhythmShape: function() {
        var biorhythm = new lu.bioControls.core.biorhythms.MasteryBiorhythm();

        var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape();
        shape.name = biorhythm.name + " Shape";
        shape.biorhythm = biorhythm;
        shape.color = "#1e90ff"; // DodgerBlue
        shape.lineStyle = lu.LineStyle.dashDot;
        shape.birthday = this.defaultBirthday;

        return shape;
    },

    createWisdomBiorhythmShape: function() {
        var biorhythm = new lu.bioControls.core.biorhythms.WisdomBiorhythm();

        var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape();
        shape.name = biorhythm.name + " Shape";
        shape.biorhythm = biorhythm;
        shape.color = "#32cd32"; // LimeGreen
        shape.lineStyle = lu.LineStyle.dashDotDot;
        shape.birthday = this.defaultBirthday;

        return shape;
    },

    // -----------------------------------------------------------------------------
    // Extra Biorhythms
    // -----------------------------------------------------------------------------

    createPerceptionBiorhythmShape: function() {
        var biorhythm = new lu.bioControls.core.biorhythms.PerceptionBiorhythm();

        var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape();
        shape.name = biorhythm.name + " Shape";
        shape.biorhythm = biorhythm;
        shape.color = "#ff0000"; // Red
        shape.lineStyle = lu.LineStyle.dash;
        shape.birthday = this.defaultBirthday;

        return shape;
    },

    createPsychicBiorhythmShape: function() {
        var biorhythm = new lu.bioControls.core.biorhythms.PsychicBiorhythm();

        var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape();
        shape.name = biorhythm.name + " Shape";
        shape.biorhythm = biorhythm;
        shape.color = "#32cd32"; // LimeGreen
        shape.lineStyle = lu.LineStyle.dashDot;
        shape.birthday = this.defaultBirthday;

        return shape;
    },

    createSuccessBiorhythmShape: function() {
        var biorhythm = new lu.bioControls.core.biorhythms.SuccessBiorhythm();

        var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape();
        shape.name = biorhythm.name + " Shape";
        shape.biorhythm = biorhythm;
        shape.color = "#1e90ff"; // DodgerBlue
        shape.lineStyle = lu.LineStyle.dashDotDot;
        shape.birthday = this.defaultBirthday;

        return shape;
    },

    // -----------------------------------------------------------------------------
    // I-Ching Biorhythms
    // -----------------------------------------------------------------------------

    createEstheticBiorhythmShape: function() {
        var biorhythm = new lu.bioControls.core.biorhythms.EstheticBiorhythm();

        var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape();
        shape.name = biorhythm.name + " Shape";
        shape.biorhythm = biorhythm;
        shape.color = "#ff0000"; // Red
        shape.birthday = this.defaultBirthday;

        return shape;
    },

    createSelfAwarenessBiorhythmShape: function() {
        var biorhythm = new lu.bioControls.core.biorhythms.SelfAwarenessBiorhythm();

        var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape();
        shape.name = biorhythm.name + " Shape";
        shape.biorhythm = biorhythm;
        shape.color = "#1e90ff"; // DodgerBlue
        shape.birthday = this.defaultBirthday;

        return shape;
    },

    createSpiritualBiorhythmShape: function() {
        var biorhythm = new lu.bioControls.core.biorhythms.SpiritualBiorhythm();

        var shape = new lu.bioControls.common.biorhythmModel.BiorhythmShape();
        shape.name = biorhythm.name + " Shape";
        shape.biorhythm = biorhythm;
        shape.color = "#ffa500"; // Orange
        shape.birthday = this.defaultBirthday;

        return shape;
    }
};