//// BioControls
//// Copyright (C) 2013 Last Unicorn
////
//// This program is free software: you can redistribute it and/or modify
//// it under the terms of the GNU General Public License as published by
//// the Free Software Foundation, either version 3 of the License, or
//// (at your option) any later version.
////
//// This program is distributed in the hope that it will be useful,
//// but WITHOUT ANY WARRANTY; without even the implied warranty of
//// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
//// GNU General Public License for more details.
////
//// You should have received a copy of the GNU General Public License
//// along with this program. If not, see <http://www.gnu.org/licenses/>.
//
///// <reference path="../../../../libraries/qUnit/qunit-1.12.0.js" />
///// <reference path="../../../../sources/biorhythmModel/BiorhythmShapeSet.js" />
///// <reference path="../../../../sources/biorhythmModel/PrimaryBiorhythmsSet.js" />
///// <reference path="../../../../sources/biorhythmModel/SecondaryBiorhythmsSet.js" />
///// <reference path="../../../../sources/biorhythmModel/ExtraBiorhythmsSet.js" />
///// <reference path="../../../../sources/biorhythmModel/IChingBiorhythmsSet.js" />
///// <reference path="../../../../sources/biorhythmModel/CommonBiorhythmsCollection.js" />
///// <reference path="../../../../sources/biorhythmModel/OnePersonBiorhythms.js" />
//
//QUnit.module("OnePersonBiorhythms.initializer Tests");
//
//QUnit.test("Creates primary biorhythms.", function () {
//    var onePersonBiorhythm = new lu.bioControls.biorhythmModel.OnePersonBiorhythms();
//
//    var actualType = typeof onePersonBiorhythm.primaryBiorhythmShapes;
//
//    QUnit.notEqual(onePersonBiorhythm.primaryBiorhythmShapes, undefined, "Tests it is not undefined.")
//    //QUnit.notStrictEqual(onePersonBiorhythm.primaryBiorhythmShapes, null, "Tests it is not null.")
//    //QUnit.strictEqual(typeof onePersonBiorhythm.primaryBiorhythmShapes, "object", "Tests it is of type object.")
//});