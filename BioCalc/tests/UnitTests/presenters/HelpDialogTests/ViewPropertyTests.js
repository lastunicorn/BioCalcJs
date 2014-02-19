// BioCalc
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

/// <reference path="../../../../libraries/jasmine/jasmine.js" />
/// <reference path="../../../../sources/scripts/presenters/HelpDialog.js" />

describe("HelpDialog.view property", function () {

    var helpDialog;

    beforeEach(function () {
        helpDialog = new lu.bioCalc.presenters.HelpDialog();
    });

    it("sets the presenter in view.", function () {
        var view = {};
        helpDialog.view = view;

        expect(view.presenter).not.toBeUndefined();
        expect(view.presenter).not.toBeNull();
        expect(typeof view.presenter).toBe("object");
    });

    it("throws if view already associated.", function () {
        helpDialog.view = {};

        function toBeTested() {
            helpDialog.view = {};
        }

        expect(toBeTested).toThrow();
    });

    it("throws if view is undefined.", function(){
        function toBeTested(){
            helpDialog.view = undefined;
        }

        expect(toBeTested).toThrow();
    });

    it("throws if view is null.", function(){
        function toBeTested(){
            helpDialog.view = null;
        }

        expect(toBeTested).toThrow();
    });

});