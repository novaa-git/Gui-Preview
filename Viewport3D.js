function buildViewport3d(volumeDataContext, index, totalViewports, renderType, orientation) {
    
    return new Promise(function (resolve, reject) {
        var viewportWidth  = Math.floor((window.innerWidth  - (numCols*2)) / numCols);
        var viewportHeight = Math.floor((window.innerHeight - (numRows*2)) / numRows);

        var canvasName = "ViewCanvas" + index;
        document.getElementById(canvasName).style.visibility  = "visible";
        PlaceViewport(canvasName, index, false);
        
        viewportWidth = document.getElementById(canvasName).width;
        viewportHeight = document.getElementById(canvasName).height;
     

    Viewport3D_1 = new Viewport3D(index, viewportWidth, viewportHeight, 1.0, orientation, volumeDataContext);
        Viewport3D_1.buildCVRViewport().then(function () {
                if (resolve) {
                    resolve();
                }

          }
        );
        g_viewports[index] = Viewport3D_1.viewport;
        
    });      
}

function Viewport3D(index, width, height, zoomFactor, orientation, volumeDataInfo) {
    var self = this; 
    this.canvasName = "ViewCanvas" + index;
    
    this.imgWidth =Math.floor(width/16) * 16;
    this.imgHeight =Math.floor(height/16) * 16;

    this.viewport = new Fovia.UI.HTMLViewport3D(this.canvasName, this.imgWidth, this.imgHeight, true);
    this.cacheData = null;
    this.show3DCube = true;
    this.viewport.classParent = self;


    this.orientation = orientation;
    this.zoomFactor = zoomFactor;
    this.volumeDataInfo = volumeDataInfo;
    this.widgetElementName = this.canvasName;

    this.fhcAdaptor = null;
    this.rotateAdaptor = null;
    this.rotateTouchAdaptor = null;
    this.vesselAdaptor = null;
    this.leftNoneAdaptorName = null;
    this.touchOneAdaptorName = null;
    
    this.volMaxDim = Math.max(this.volumeDataInfo.dim.x, Math.max(this.volumeDataInfo.dim.y, this.volumeDataInfo.dim.z));    
};

Viewport3D.prototype.buildCVRViewport = function() {
    var self = this;    
	return new Promise(function (resolve, reject) {
		
		self.viewport.init(self.volumeDataInfo,Fovia.RenderType.parallel, onDrawCallback, self.onImageMetaDataReceived).then(function () {

            self.rotateAdaptor = new Fovia.UI.RotateMouseAdaptor(self.viewport.getRenderEngine());
		    self.viewport.setCustomMouseAdaptor(self.rotateAdaptor, Fovia.UI.MouseButton.left, Fovia.UI.KeyboardModifier.none);
            self.leftNoneAdaptorName = "Rotate";

            self.rotateTouchAdaptor = new Fovia.UI.RotateTouchAdaptor(self.viewport.getRenderEngine());
        	self.viewport.setCustomTouchAdaptor(self.rotateTouchAdaptor, Fovia.UI.TouchEvents.oneFinger); 
            self.touchOneAdaptorName = "Rotate";

            var rp = self.InitRenderParameters();
			self.viewport.getRenderEngine().setRenderParams(rp).then(function () {
                if (resolve) {
                    resolve();
                }
                self.viewport.renderFinal();

              
			});
		});


	});
}
 
// Initial renderParams for a 3D Parallel projection (note in this example
// all params are intiialized programatically not from a preset .xml file)
Viewport3D.prototype.InitRenderParameters = function () 
{
    var rp = new Fovia.RenderParams3D();

    rp.setRenderImageSize(this.imgWidth, this.imgHeight);
    rp.setZoom(Math.min(this.imgWidth/this.volMaxDim,this.imgHeight/this.volMaxDim)*this.zoomFactor);
    rp.setBackgroundColor(0,0,0);
    rp.setEnableFrontClippingPlane(false);
    rp.setRenderType(Fovia.RenderType.parallel);
    rp.setAmbience(0);
    rp.setBrightness(175);
    rp.setReflection(128);
    rp.setShininess(128);

    var renderRange = makeCTBoneTF();
	rp.setTransferFunction([renderRange]);
	rp.setOrientation(this.orientation === -1 ? Fovia.ViewType.coronal : this.orientation);                

    return rp;
};


// Enable segmentation in this viewport and point it to the segmentation context to use (multiple viewports
// will be using the same context)
Viewport3D.prototype.EnableSeg = function (segmentationContext, radiusScale, minMaxScale, segViewerListInteractive, segViewerListFinal, undoButtonList) 
{
    this.segmentationContext = segmentationContext;
    this.segAdaptor = new SegThresholdAdaptor(this.viewport.getRenderEngine(), this.segmentationContext, radiusScale, minMaxScale, null, segViewerListInteractive, segViewerListFinal, undoButtonList);
    this.viewport.setCustomMouseAdaptor(this.segAdaptor, Fovia.UI.MouseButton.left, Fovia.UI.KeyboardModifier.alt);
};

// Enable freehand cut in this viewport to clean up segmentation)
Viewport3D.prototype.EnableFHC = function (segViewerList, undoButtonList) 
{
    this.fhcAdaptor = new FHCAdaptor(this, this.segmentationContext, segViewerList, undoButtonList);
    this.viewport.setCustomMouseAdaptor(this.fhcAdaptor, Fovia.UI.MouseButton.right, Fovia.UI.KeyboardModifier.alt);
};

// Enable DilateErode used in Vessle segmentation Workflow
Viewport3D.prototype.EnableDilateErode= function (segViewerList, undoButtonList) 
{
    this.vesselAdaptor = new VesselAdaptor(this, this.segmentationContext, segViewerList, undoButtonList);
};


// a function to draw overlay info when rendering an image
// (int his case the freehand cut outline)
Viewport3D.prototype.DrawOutline = function () 
{
    if(this.fhcAdaptor === null) return;
    if(this.fhcAdaptor.points.length < 1) return;
	var localContext = this.viewport.getHTMLElement().getContext("2d");
	localContext.strokeStyle = "white";
	localContext.lineWidth = 1;
	localContext.beginPath();
    localContext.moveTo(this.fhcAdaptor.points[0].x, this.fhcAdaptor.points[0].y);
    for (i = 1; i < this.fhcAdaptor.points.length; i++) {
        localContext.lineTo(this.fhcAdaptor.points[i].x, this.fhcAdaptor.points[i].y);
    }
    localContext.lineTo(this.fhcAdaptor.points[0].x, this.fhcAdaptor.points[0].y);
	localContext.stroke();
    
};

// a function to draw overlay text when displaying the images
Viewport3D.prototype.DrawText = function (size) 
{
    var context2D = this.viewport.getHTMLElement().getContext("2d");
    context2D.font = "12px Monaco";
    context2D.fillStyle = "white";
    context2D.textAlign = "start";

    if (size > 0) {
        context2D.fillText(" " + size.toFixed(0).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") + " mm^3", 5, this.imgHeight-12);
    }
};


// called on initialization and whenever the browser window is resized, the boolean indiates whether 
// to reset the zoom value
Viewport3D.prototype.Resize = function(width, height, b_reZoom)
{

    var self = this;
    self.imgWidth = Math.floor((width) / 16) * 16;
    self.imgHeight = Math.floor(height / 16) * 16;
    
    var rp = new Fovia.RenderParams3D();
    if (b_reZoom) rp.setZoom(Math.min(self.imgWidth/self.volMaxDim,self.imgHeight/self.volMaxDim)*self.zoomFactor);
    self.viewport.getRenderEngine().setRenderParams(rp).then(function () {
        document.getElementById(self.widgetElementName).hidden = false;
        self.viewport.resizeWindow(self.imgWidth, self.imgHeight, false);
    });
}

// Create the 6 cutplanes needed to crop a volume
Viewport3D.prototype.MakeCropBox = function(rp, center, size)
{
    var cutPlane1 = new Fovia.CutPlane(new Fovia.Util.Plane( 0, 0, 1, (size - center.z)), Fovia.CutPlane.enable );
    var cutPlane2 = new Fovia.CutPlane(new Fovia.Util.Plane( 0, 0,-1, (size + center.z)), Fovia.CutPlane.enable );        
    var cutPlane3 = new Fovia.CutPlane(new Fovia.Util.Plane( 0, 1, 0, (size - center.y)), Fovia.CutPlane.enable);
    var cutPlane4 = new Fovia.CutPlane(new Fovia.Util.Plane( 0,-1, 0, (size + center.y)), Fovia.CutPlane.enable);
    var cutPlane5 = new Fovia.CutPlane(new Fovia.Util.Plane( 1, 0, 0, (size - center.x)), Fovia.CutPlane.enable );
    var cutPlane6 = new Fovia.CutPlane(new Fovia.Util.Plane(-1, 0, 0, (size + center.x)), Fovia.CutPlane.enable );
    rp.setCutPlanes([cutPlane1, cutPlane2, cutPlane3, cutPlane4, cutPlane5, cutPlane6]);
}

// Make this view be a subcube centered at a given 3D location
// - first pan the volume to be looking at the center
// - set the zoom to only view the subcube size
// - and then call the MakecropBox
Viewport3D.prototype.SubCubeAt = function(center)
{
    var self = this;
    
    self.rotateAdaptor.setCPforRotateAdaptor(center);
    self.viewport.getRenderEngine().getRenderParams().then(function(rp) {
        var currentMatrix = new Fovia.Util.Matrix(rp.transform);

        var rp = new Fovia.RenderParams3D();
        rp.setZoom(Math.min(self.imgWidth/self.volMaxDim,self.imgHeight/self.volMaxDim)*self.zoomFactor);
        self.MakeCropBox(rp,center,25);
        currentMatrix.setOffsetVector(center);
        rp.setTransform(currentMatrix);
    
        self.viewport.getRenderEngine().setRenderParams(rp).then(function () {
            self.viewport.render();
            self.viewport.renderFinal();
        });
    });
}


Viewport3D.prototype.onImageMetaDataReceived = function(data) {
    data.viewport.classParent.cacheData = data;
    //console.log(    Fovia.Util.getVolumeBoxPoints(data.volumeDataContext) );
    /*
    self.g_lastFrameRenderParameters = data.renderParams;// local copy of render parameters
    self.g_currentoffset = data.renderParams.transform.getOffsetVector();
    self.g_currentSlice = data.scrollObject.currentSlice; // computed slice location based on the current stack and thickness
    self.g_totalSlices = data.scrollObject.totalSlices; // total slices based on the current stack and thickness
    */
}
