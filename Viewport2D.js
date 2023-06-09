function buildViewportMpr(volumeDataContext, index, totalViewports, renderType, orientation) {
	//volumeDataContext.window = 300;
	//volumeDataContext.level = 120;

	showHideCanvasWidget(index, "visible", renderType );

	var canvasName = "ViewCanvas" + index;
	PlaceViewport(canvasName, index, false);

	var sdc = volumeDataContext.getSeriesDataContext();
	document.getElementById(canvasName).style.visibility  = "visible";

	var width = document.getElementById(canvasName).width;
	var height = document.getElementById(canvasName).height;

 
  Viewport2D_1 = new Viewport2D(canvasName, index, volumeDataContext, renderType, orientation, width, height); // pencere içerisine sığsın
}
 
function Viewport2D(canvasName, index, volumeDataContext, renderType, orientation, width, height) {
	  var self = this; 
	  self.cacheData = null;
	  self.viewportId = index;
	  self.show3DCube = false;

 	  self.viewport = new Fovia.UI.HTMLDoubleBufferViewportMPR(canvasName, width, height, true);
 	  self.viewport.classParent = self;
		return new Promise(function (resolve, reject) {
			self.viewport.init(volumeDataContext, renderType, orientation, 0, onDrawCallback, self.onImageMetaDataReceived).then(function () {
				    if (resolve) {
	                resolve();
	           }

	      g_viewports[index] = self.viewport;
				self.viewport.renderFinal();
				self.setMouseFunction(index);
			});
		});
}
 
Viewport2D.prototype.setMouseFunction = function(index) {
		var self = this;
		self.viewport.getHTMLElement().addEventListener("dblclick", viewportDblClick);
		function viewportDblClick(event) {
			activeViewportId = index;
            if (isFullScreenIndex == index) {
                isFullScreenIndex = -1;
			} else {
                isFullScreenIndex = index;
			}
            ViewportRedesign(); 
		}
	 	self.viewport.getHTMLElement().onmousedown = function () { 
				activeViewportId = index;
		};
	 	self.viewport.getHTMLElement().onmousedown = function () { 
				activeViewportId = index;
		};
		
	 	self.viewport.getHTMLElement().onmousemove = function (event) { 
			if (isShowMprLines == 1) {
				if (g_MprMouseAdaptor[index].isMprLineActive == false)	
					return;

				if (isMprType == final_vertical_mpr)
					viewportMprLineMove(self, event, index);
					else 
						viewportObliqueMprLineMove(self,event,index);
			}
		};
}

Viewport2D.prototype.onImageMetaDataReceived = function(data) {
    data.viewport.classParent.cacheData = data;
	
    if (isGuncellemeGerekli) { // TODO GEREKLİ
 		isGuncellemeGerekli = false;
        g_viewports[3].getRenderEngine().renderFinal();
			  g_viewports[3].repaint();
	}


	//if (isShowMprLines==1) // scroll için
		//onMprDataReceived(data);
}


