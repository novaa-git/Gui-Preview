function menuItemClick(item) {
	var event = item.target.id;

	if (event.indexOf("wW") == 0) { 
		setWindowValue(g_volumeDataInfo,event);
	} // TODO g_volumeDataInfo NEDİR 

	if (event.indexOf("3d") == 0) { 
		set3dWindowValue(event); 
	}

	if (event == "EVENT_SHOW_HIDE_MPR_LINE") { 
		showHideMprLines(); 
	}

	if (event == "EVENT_SAGITTAL") { 
		setViewportLocation(event); 
	}

	if (event == "EVENT_AXIAL")  { 
	setViewportLocation(event); 
	}

	if (event == "EVENT_CORONAL") { 
		setViewportLocation(event); 
	}

	if (event == "EVENT_PRESETS")  {
		getRenderSamplesDialog("Render"); 
	}

	if (event == "MA_LENGTH")  {
		setViewportToolsAdaptor(event);
	}

	if (event == "EXP_PRINT")  {
		setViewportImageToPrint();
	}

	if (event == "EXP_DOWNLOADS")  {
		viewPortSnapshotDown(false);
	}
	
}
