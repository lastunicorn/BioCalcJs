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
    $.widget("lastunicorn.xDayInfoView", {
        _create: function() {
            this._$container = $(this.element);
            this._items = [];

            this._biorhythms = this._createBiorhythmsAdapter(this.options.biorhythms);

            this._repopulate();
        },

        _setOption: function(key, value) {
            if (key === "biorhythms") {
                this._biorhythms.clear();

                this._super(key, value);

                this._biorhythms = this._createBiorhythmsAdapter(this.options.biorhythms);

                this._repopulate();
            }
        },

        update: function(xDay) {
            for ( var i = 0; i < this._items.length; i++) {
                this._items[i].update(xDay);
            }
        },

        _createBiorhythmsAdapter: function(biorhythms) {
            return new lu.bioControls.BiorhythmsAdapter({
                biorhythms: biorhythms,
                onBiorhithmAdded: $.proxy(this._onBiorhithmAdded, this),
                onBiorhithmRemoved: $.proxy(this._onBiorhithmRemoved, this)
            });
        },

        _repopulate: function() {
            this._$container.empty();
            this._items.length = 0;

            var biorhythmsArray = this._biorhythms.toArray();

            for ( var i = 0; i < biorhythmsArray.length; i++) {
                this._createNewItem(biorhythmsArray[i]);
            }
        },

        _onBiorhithmAdded: function(biorhythmShape) {
            this._createNewItem(biorhythmShape);
        },

        _onBiorhithmRemoved: function(biorhythmShape) {
            this._removeItem(biorhythmShape);
        },

        _createNewItem: function(biorhythm) {
            var xDayInfoItem = new lu.bioControls.xDayInfoView.XDayInfoItem(biorhythm);
            this._items.push(xDayInfoItem);

            var $itemElement = xDayInfoItem.element;
            this._$container.append($itemElement);
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
}(jQuery));