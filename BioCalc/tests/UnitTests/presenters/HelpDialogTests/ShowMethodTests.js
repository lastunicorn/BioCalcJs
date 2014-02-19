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

describe("HelpDialog.show() method", function () {

    var helpDialog;

    beforeEach(function () {
        helpDialog = new lu.bioCalc.presenters.HelpDialog();
    });

    it("calls the show() method of the view.", function () {
        var view = jasmine.createSpyObj("HelpDialogView", [
            "show"
        ]);
        helpDialog.view = view;

        helpDialog.show();

        expect(view.show).toHaveBeenCalled();
    });

});