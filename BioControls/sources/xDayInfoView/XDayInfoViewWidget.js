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

(function($) {
    var widget = null;
    var $container = null;
    var items = [];
    var biorhythms = null;

    $.widget("lastunicorn.xDayInfoView", {
        _create: function() {
            widget = this;
            $container = $(this.element);

            biorhythms = new lu.bioControls.BiorhythmsAdapter({
                biorhythms: this.options.biorhythms,
                onBiorhithmAdded: onBiorhithmAdded,
                onBiorhithmRemoved: onBiorhithmRemoved
            });

            repopulate();
        },

        _setOption: function(key, value) {
            if (key === "biorhythms") {
                biorhythms.clear();

                this._super(key, value);

                biorhythms = new lu.bioControls.BiorhythmsAdapter({
                    biorhythms: this.options.biorhythms,
                    onBiorhithmAdded: onBiorhithmAdded,
                    onBiorhithmRemoved: onBiorhithmRemoved
                });

                repopulate();
            }
        },

        update: function(xDay) {
            for ( var i = 0; i < items.length; i++) {
                items[i].update(xDay);
            }
        }
    });

    function repopulate() {
        $container.empty();
        items.length = 0;

        var biorhythmsArray = biorhythms.toArray();

        for ( var i = 0; i < biorhythmsArray.length; i++) {
            createNewItem(biorhythmsArray[i]);
        }
    }

    function onBiorhithmAdded(biorhythmShape) {
        createNewItem(biorhythmShape);
    }

    function onBiorhithmRemoved(biorhythmShape) {
        removeItem(biorhythmShape);
    }

    function createNewItem(biorhythm) {
        var xDayInfoItem = new lu.bioControls.xDayInfoView.XDayInfoItem(biorhythm);
        items.push(xDayInfoItem);

        var $itemElement = xDayInfoItem.element;
        $container.append($itemElement);
    }

    function removeItem(biorhythm) {
        for ( var i = 0; i < items.length; i++) {
            if (items[i].biorhythmShape === biorhythm) {
                items.splice(i, 1);
                items[i].element.remove();
            }
        }
    }
}(jQuery));