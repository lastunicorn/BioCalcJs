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

/**
 * It is a repository containing a list of BiorhythmShape objects; one for each
 * known biorhythm.
 * 
 * @returns {lu.bioControls.biorhythmModel.CommonBiorhythmsContainer}
 */
lu.bioControls.biorhythmModel.CommonBiorhythmsContainer = function() {

    var primaryBiorhythmsSet = null;

    Object.defineProperty(this, "primaryBiorhythmShapes", {
        enumerable: true,
        configurable: false,
        get: function() {
            return primaryBiorhythmsSet;
        }
    });

    var secondaryBiorhythmsSet = null;

    Object.defineProperty(this, "secondaryBiorhythmShapes", {
        enumerable: true,
        configurable: false,
        get: function() {
            return secondaryBiorhythmsSet;
        }
    });

    var extraBiorhythmsSet = null;

    Object.defineProperty(this, "extraBiorhythmShapes", {
        enumerable: true,
        configurable: false,
        get: function() {
            return extraBiorhythmsSet;
        }
    });

    var iChingBiorhythmsSet = null;

    Object.defineProperty(this, "iChingBiorhythmShapes", {
        enumerable: true,
        configurable: false,
        get: function() {
            return iChingBiorhythmsSet;
        }
    });

    this.setBirthdayOnAll = function(birthday) {
        primaryBiorhythmsSet.setBirthdayOnAll(birthday);
        secondaryBiorhythmsSet.setBirthdayOnAll(birthday);
        extraBiorhythmsSet.setBirthdayOnAll(birthday);
        iChingBiorhythmsSet.setBirthdayOnAll(birthday);
    };

    this.toArray = function() {
        var list = [];

        addRange(primaryBiorhythmsSet.items, list);
        addRange(secondaryBiorhythmsSet.items, list);
        addRange(extraBiorhythmsSet.items, list);
        addRange(iChingBiorhythmsSet.items, list);

        return list;
    };

    function addRange(source, destination) {
        for ( var i = 0; i < source.length; i++) {
            destination.push(source[i]);
        }
    }

    (function initialize() {
        createBiorhythmShapes();
    }());

    function createBiorhythmShapes() {
        primaryBiorhythmsSet = new lu.bioControls.biorhythmModel.PrimaryBiorhythmsSet();

        secondaryBiorhythmsSet = new lu.bioControls.biorhythmModel.SecondaryBiorhythmsSet();
        secondaryBiorhythmsSet.hideAll();

        extraBiorhythmsSet = new lu.bioControls.biorhythmModel.ExtraBiorhythmsSet();
        extraBiorhythmsSet.hideAll();

        iChingBiorhythmsSet = new lu.bioControls.biorhythmModel.IChingBiorhythmsSet();
        iChingBiorhythmsSet.hideAll();
    }
};