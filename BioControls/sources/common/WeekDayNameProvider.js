var lu = lu || {};

lu.WeekDayNamesProvider = (function() {

    var weekDayShortNames = [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa" ];

    function getWeekDayName(weekDay) {
        if (typeof (weekDay) !== "number") {
            return "";
        }

        return weekDayShortNames[weekDay];
    }

    return {
        getWeekDayName: getWeekDayName
    };
}());