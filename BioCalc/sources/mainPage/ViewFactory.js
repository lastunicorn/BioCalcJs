(function (MainToolbarView, BirthdaySectionView, XDaySectionView, ChartsSectionView, HelpDialogView, AboutDialogView, OptionsDialogView) {

    lu.bioCalc.mainPage.ViewFactory = (function () {

        function create(key) {
            switch (key) {
                case "MainToolbarView":
                    return new MainToolbarView();

                case "ChartsSectionView":
                    return new ChartsSectionView();

                case "BirthdaySectionView":
                    return new BirthdaySectionView();

                case "XDaySectionView":
                    return new XDaySectionView();

                case "HelpDialogView":
                    return new HelpDialogView();

                case "AboutDialogView":
                    return new AboutDialogView();

                case "OptionsDialogView":
                    return new OptionsDialogView();

                default:
                    return null;
            }
        }

        return {
            create: create
        };
    }());

}(
        lu.bioCalc.mainPage.pageSections.MainToolbarView,
        lu.bioCalc.mainPage.pageSections.BirthdaySectionView,
        lu.bioCalc.mainPage.pageSections.XDaySectionView,
        lu.bioCalc.mainPage.pageSections.ChartsSectionView,
        lu.bioCalc.mainPage.dialogs.HelpDialogView,
        lu.bioCalc.mainPage.dialogs.AboutDialogView,
        lu.bioCalc.mainPage.dialogs.OptionsDialogView
    ));