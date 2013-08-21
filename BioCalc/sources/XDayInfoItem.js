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

var lu = lu || {};
lu.bioCalc = lu.bioCalc || {};

lu.bioCalc.XDayInfoItem = function(biorhythmShape) {

    this.generate = function(xDay) {
        var biorhythm = biorhythmShape.getBiorhythm();

        if (!xDay) {
            xDay = biorhythmShape.getBirthday();
        }

        var milisecondsLived = xDay - biorhythmShape.getBirthday();
        var daysLived = Math.floor(milisecondsLived / 1000 / 60 / 60 / 24);
        var value = biorhythm.getValue(daysLived);
        var percentage = value * 100;

        var text = biorhythm.getName() + " = " + Math.round(percentage) + "%";

        var $item = $("<div/>");
        $item.attr("data-biorhythm", biorhythmShape.getName());
        $item.html(text);
        $item.css("color", biorhythmShape.getColor());

        if (!biorhythmShape.getIsVisible()) {
            $item.hide();
        }

        return $item;
    };
};