

(function (BirthdaySectionView) {

    lu.bioCalc.mainPage.ViewFactory = (function () {
        function create(key) {
            switch (key) {
                case "BirthdaySectionView":
                    return new BirthdaySectionView();
                default:
                    return null;
            }
        }

        return {
            create: create
        };
    }());
}(
        lu.bioCalc.mainPage.pageSections.BirthdaySectionView));