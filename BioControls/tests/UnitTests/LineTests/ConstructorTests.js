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

/// <reference path="../../../libraries/qUnit/qunit-1.12.0.js" />
/// <reference path="../QUnitExtensions.js" />
/// <reference path="LineTestsMocks.js" />
/// <reference path="../../../sources/common/Line.js" />

(function() {

    // -------------------------------------------------------------------------
    // constructor tests
    // -------------------------------------------------------------------------

    QUnit.module("Line Tests - constructor", {
        setup: function() {
        },
        teardown: function() {
        }
    });

    QUnit.test("constructor throws if startPoint is not lu.Point.", function() {
        function toBeTested() {
            new lu.Line({}, new lu.Point());
        }

        QUnit.throws(toBeTested, "Tests that the constructor throws.");
    });

    QUnit.test("constructor throws if endPoint is not lu.Point.", function() {
        function toBeTested() {
            new lu.Line(new lu.Point());
        }

        QUnit.throws(toBeTested, "Tests that the constructor throws.");
    });
}());