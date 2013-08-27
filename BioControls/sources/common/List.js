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

/**
 * A list of objects. It raises events when items are added or removed.
 * 
 * @returns {lu.List}
 */
lu.List = function() {

    var array = [];

    var itemAddedEvent = new lu.Event();
    this.itemAdded = itemAddedEvent.client;

    var itemAddingEvent = new lu.Event();
    this.itemAdding = itemAddingEvent.client;

    var itemRemovedEvent = new lu.Event();
    this.itemRemoved = itemRemovedEvent.client;

    this.add = function(item) {
        if (item === undefined || item === null) {
            throw "item should be an object.";
        }

        itemAddingEvent.raise(this, item);

        array.push(item);

        itemAddedEvent.raise(this, item);
    };

    this.addRange = function(items) {
        if (!(items instanceof Array)) {
            return;
        }

        var i;

        for (i = 0; i < items.length; i++) {
            itemAddingEvent.raise(this, items[i]);
        }

        for (i = 0; i < items.length; i++) {
            array.push(items[i]);
            itemAddedEvent.raise(this, items[i]);
        }
    };

    this.contains = function(item) {
        if (item === undefined || item === null) {
            return false;
        }

        for ( var i = 0; i < array.length; i++) {
            if (array[i] === item) {
                return true;
            }
        }

        return false;
    };

    this.count = function() {
        return array.length;
    };

    this.remove = function(item) {
        for ( var i = 0; i < array.length; i++) {
            if (array[i] === item) {
                array.splice(i, 1);
                itemRemovedEvent.raise(this, item);
                break;
            }
        }
    };

    this.clear = function() {
        var removedarray = this.toArray();

        array.length = 0;

        for ( var i = 0; i < removedarray.length; i++) {
            try {
                itemRemovedEvent.raise(this, array[i]);
            }
            catch (err) {
            }
        }
    };

    this.toArray = function() {
        var list = [];

        for ( var i = 0; i < array.length; i++) {
            list.push(array[i]);
        }

        return list;
    };
};