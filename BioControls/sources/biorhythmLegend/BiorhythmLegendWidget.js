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

(function($, BiorhythmsAdapter, BiorhythmLegendItem) {

    $.widget("lastunicorn.biorhythmLegend", {
        options: {
            biorhythms: []
        },

        _create: function() {
            this.element.empty();
            this._items = [];

            this._biorhythms = this._createBiorhythmsAdapter(this.options.biorhythms);

            this._repopulate();
        },

        _setOption: function(key, value) {
            if (key === "biorhythms") {
                this._biorhythms.destroy();

                this._super(key, value);

                this._biorhythms = this._createBiorhythmsAdapter(this.options.biorhythms);

                this._repopulate();
            }
        },

        _destroy: function() {
            this.element.empty();
            this._biorhythms.destroy();
        },

        _createBiorhythmsAdapter: function(biorhythms) {
            return new BiorhythmsAdapter({
                biorhythms: biorhythms,
                onBiorhythmAdded: $.proxy(this._onBiorhythmAdded, this),
                onBiorhythmRemoved: $.proxy(this._onBiorhythmRemoved, this)
            });
        },

        _repopulate: function() {
            this.element.empty();
            this._items.length = 0;

            var biorhythmsArray = this._biorhythms.toArray();

            for ( var i = 0; i < biorhythmsArray.length; i++) {
                this._createNewItem(biorhythmsArray[i]);
            }
        },

        _onBiorhythmAdded: function(biorhythmShape) {
            this._createNewItem(biorhythmShape);
        },

        _onBiorhythmRemoved: function(biorhythmShape) {
            this._removeItem(biorhythmShape);
        },

        _createNewItem: function(biorhythm) {
            var biorhythmLegendItem = new BiorhythmLegendItem(biorhythm);
            this._items.push(biorhythmLegendItem);

            var $legendItemTag = biorhythmLegendItem.element;
            this.element.prepend($legendItemTag);
        },

        _removeItem: function(biorhythm) {
            for ( var i = 0; i < this._items.length; i++) {
                if (this._items[i].biorhythmShape === biorhythm) {
                    this._items.splice(i, 1);
                    this._items[i].element.remove();
                }
            }
        }
    });

}(
        jQuery, lu.bioControls.biorhythmModel.BiorhythmsAdapter,
        lu.bioControls.biorhythmLegend.BiorhythmLegendItem
    ));