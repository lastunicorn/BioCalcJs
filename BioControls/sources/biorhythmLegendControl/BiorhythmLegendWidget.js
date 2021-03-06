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

(function($, BiorhythmLegendView, BiorhythmLegend) {

    $.widget("lastunicorn.biorhythmLegend", {
        options: {
            biorhythms: []
        },

        _create: function() {
            var biorhythmLegendView = new BiorhythmLegendView(this.element);

            this._biorhythmLegend = new BiorhythmLegend(biorhythmLegendView);
            this._biorhythmLegend.setBiorhythms(this.options.biorhythms);
        },

        _setOption: function(key, value) {
            if (key === "biorhythms") {
                this._super(key, value);

                this._biorhythmLegend.setBiorhythms(this.options.biorhythms);
            }
        },

        _destroy: function() {
            this._biorhythmLegend.destroy();
        }
    });

}(
        jQuery,
        lu.bioControls.biorhythmLegend.BiorhythmLegendView,
        lu.bioControls.biorhythmLegend.BiorhythmLegend
    ));