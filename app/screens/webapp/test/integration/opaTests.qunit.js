sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'ns/screens/test/integration/FirstJourney',
		'ns/screens/test/integration/pages/FilterScreenList',
		'ns/screens/test/integration/pages/FilterScreenObjectPage'
    ],
    function(JourneyRunner, opaJourney, FilterScreenList, FilterScreenObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('ns/screens') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheFilterScreenList: FilterScreenList,
					onTheFilterScreenObjectPage: FilterScreenObjectPage
                }
            },
            opaJourney.run
        );
    }
);