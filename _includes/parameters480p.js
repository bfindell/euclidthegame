    // * ShowResetIcon set to false because pressing it caused "Level Completed" bug
    var parameters = {"id":"ggbApplet","width":680,"height":480,"showToolBar":true,"showMenuBar":false,"showAlgebraInput":false,"showResetIcon":false,"enableLabelDrags":false,"enableShiftDragZoom":false,"enableRightClick":false, "showToolBarHelp":true,"errorDialogsActive":true,"useBrowserForJS":true, "language":"en","isPreloader":false,"screenshotGenerator":false,"preventFocus":false};
    /** is3D=is 3D applet using 3D view, AV=Algebra View, SV=Spreadsheet View, CV=CAS View, EV2=Graphics View 2, CP=Construction Protocol, PC=Probability Calculator, DA=Data Analysis, FI=Function Inspector, PV=Python, macro=Macro View */
    var views = {"is3D":false,"AV":false,"SV":false,"CV":false,"EV2":false,"CP":false,"PC":false,"DA":false,"FI":false,"PV":false,"macro":true};
	var applet = new GGBApplet('5.0', parameters, views);
    // applet.setPreviewImage('', '/img/GeoGebra_loading.png'); // comment out because image was squashed
    window.onload = function() {
        applet.inject('applet_container', 'html5');
    }
	parameters.language = "{{ page.lang }}"
	parameters.customToolBar = "0 | 1 501 | 5 19 | 15 2 18 | 10 53 | 100001 | 8 9 4 3 | 40 41 42";  // Standard toolbar for game.
