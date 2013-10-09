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

lu.bioCalc.BioCalcPageData = (function() {

    var birthdayChangedEvent = new lu.Event();
    var birthday = null;

    var xDayChangedEvent = new lu.Event();
    var xDay = null;

    var biorhythmsChangedEvent = new lu.Event();
    var biorhythms = null;

    return {
        birthdayChanged: birthdayChangedEvent.client,
        getBirthday: function() {
            return birthday;
        },
        setBirthday: function(value) {
            birthday = value;
            birthdayChangedEvent.raise(this, value);
        },
        
        xDayChanged: xDayChangedEvent.client,
        getXDay: function() {
            return xDay;
        },
        setXDay: function(value) {
            xDay = value;
            xDayChangedEvent.raise(this, value);
        },
        
        biorhythmsChanged: biorhythmsChangedEvent.client,
        getBiorhythms: function() {
            return biorhythms;
        },
        setBiorhythms: function(value) {
            biorhythms = value;
            biorhythmsChangedEvent.raise(this, value);
        }
    };
}());