function TfAdaptor(viewport, volumeDataContext) {
	this.viewport = viewport;
	this.m_bDragging = false;
	this.m_sensitivity = 0.01;
	this.isContinue = false;
	//this.volumeDataContext = volumeDataContext;
	this.m_renderParms;
	 this.m_startPoint = new Fovia.Util.Point(0, 0);
}

TfAdaptor.prototype.down = function (event) {
	this.m_startPoint.x = event.clientX;
	this.m_startPoint.y = event.clientY;
	
	this.m_renderParms = this.viewport.getCachedRenderParams();
	this.m_renderParms.enableGradientRendering = true;

	//viewportSetRenderParams(this.viewport, this.m_renderParms);

	this.m_bDragging = true;
}

TfAdaptor.prototype.up = function (event) {
	this.m_bDragging = false;
	this.isContinue = false;
}

TfAdaptor.prototype.move = function (event) {
	
	if ((this.m_bDragging)) {
		 var diffX = (this.m_startPoint.x - event.clientX);
		 diffX = diffX * (this.m_sensitivity * 1);
			
		 var diffY = (this.m_startPoint.y - event.clientY);
		 diffY = diffY * (this.m_sensitivity * 1);
		
		var rp = this.m_renderParms;
		rp.combinewithRP(this.m_renderParms);
		
		var isTransferFunc =  true;
 
		if(isTransferFunc) {
			
			
		    rp.FlagsMask = 0;
		    rp.Mask = 4096;
			var min = 100000;
			var max = 0;
			 
  
			var isChange = false;
			var bFoundOne = false;
			
        	for (var i = 0; i < rp.renderRanges.length; i++) {
        		if(rp.renderRanges[i].enableRenderRange && rp.renderRanges[i].coloredPointList.length > 0) {
        			bFoundOne = true;
        			if(rp.renderRanges[i].coloredPointList[0].x < min) {
        				min = rp.renderRanges[i].coloredPointList[0].x;
        			}
        			
        			if(rp.renderRanges[i].coloredPointList[i].x > max) {
        				max = rp.renderRanges[i].coloredPointList[i].x;
        			}
        		} 
					
        	}			
			
			var mid = (min + max) * 0.5;
        	
			var scale = 1.0 - (diffX * 0.001);
        	if(scale < 0.05) scale = 0.05;
        	if(scale > 50.0) scale = 50.0;
        	
        	var translate = diffY;
			
			if (bFoundOne) {
				for(var i = 0; i < rp.renderRanges.length; i++) {
					if (rp.renderRanges[i].enableRenderRange) {
						for(var j = 0; j < rp.renderRanges[i].coloredPointList.length; j++) {
							rp.renderRanges[i].coloredPointList[j].x = ((((this.m_renderParms.renderRanges[i].coloredPointList[j].x) - mid)*scale) + mid + translate);
							isChange = true;	
						}
					}
				}
				
				if (isChange) {
					viewportSetRenderParams(this.viewport, rp);
				}
			}
		}
	}
}

function viewportSetRenderParams(viewport, rp) {
	viewport.getRenderEngine().setRenderParams(rp).then(function () {
		viewport.getRenderEngine().renderFinal();
		this.isContinue = false;
		//viewport.repaint(); 
 	});
}

TfAdaptor.prototype.wheel = function (event) {
}

TfAdaptor.prototype.postRender = function (event) {
}
