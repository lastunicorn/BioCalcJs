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
    var biorhythmLegendItems = [];
    var biorhythms = null;

    $.widget("lastunicorn.biorhythmLegend", {
        options: {
            biorhythms: []
        },
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
        }
    });

    function repopulate() {
        $container.empty();
        biorhythmLegendItems.length = 0;

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
        var biorhythmLegendItem = new lu.bioControls.biorhythmLegend.BiorhythmLegendItem(biorhythm);
        biorhythmLegendItems.push(biorhythmLegendItem);

        var $legendItemTag = biorhythmLegendItem.element;
        $container.prepend($legendItemTag);
    }

    function removeItem(biorhythm) {
        for ( var i = 0; i < biorhythmLegendItems.length; i++) {
            if (biorhythmLegendItems[i].biorhythmShape === biorhythm) {
                biorhythmLegendItems.splice(i, 1);
                biorhythmLegendItems[i].element.remove();
            }
        }
    }
}(jQuery));