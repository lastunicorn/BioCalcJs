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

window.lu = window.lu || {};
lu.bioControls = lu.bioControls || {};
lu.bioControls.xDayInfoView = lu.bioControls.xDayInfoView || {};

(function ($, BiorhythmsAdapter, XDayInfoItem, XDayInfoItemView) {

    $.widget("lastunicorn.xDayInfoView", {
        options: {
            biorhythms: []
        },

        _create: function () {
            this.element.empty();

            var xDayInfoViewerView = new lu.bioControls.xDayInfoView.XDayInfoViewerView();
            xDayInfoViewerView.$element.appendTo(this.element);

            this._xDayInfoViewer = new lu.bioControls.xDayInfoView.XDayInfoViewer({
                view: xDayInfoViewerView,
                biorhythms: this.options.biorhythms
            });
        },

        _setOption: function (key, value) {
            if (key === "biorhythms") {
                this._super(key, value);

                this._xDayInfoViewer.setBiorhythms(this.options.biorhythms);
            }
        },

        destroy: function () {
            this.element.empty();

            this._xDayInfoViewer.destroy();

            $.Widget.prototype.destroy.call(this);
        },

        updateXDay: function (xDay) {
            this._xDayInfoViewer.updateXDay(xDay);
        },

        updateSecondBirthday: function (secondBirthday) {
            this._xDayInfoViewer.updateSecondBirthday(secondBirthday);
        }
    });

}(
        jQuery,
        lu.bioControls.biorhythmModel.BiorhythmsAdapter,
        lu.bioControls.xDayInfoView.XDayInfoItem,
        lu.bioControls.xDayInfoView.XDayInfoItemView
    ));
