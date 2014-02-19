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

/// <reference path="../../../libraries/jasmine/jasmine.js" />
/// <reference path="../../../sources/scripts/helpers/DateFormatter.js" />

describe("formatDate() method", function(){

    it("returns the string representation of the 2010-11-12 date.", function(){
        var date = new Date(2010, 10, 12);

        var actual = lu.bioCalc.helpers.DateFormatter.formatDate(date)

        expect(actual).toBe("2010-11-12");
    });

    it("returns the string representation of the 2010-01-02 date.", function(){
        var date = new Date(2010, 0, 2);

        var actual = lu.bioCalc.helpers.DateFormatter.formatDate(date)

        expect(actual).toBe("2010-01-02");
    });
});