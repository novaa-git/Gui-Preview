/**Vertical, Dikey mpr islemleri icin mouse kontrolleri. */
var mprMouseAdaptor = (function () {
            
			function mprMouseAdaptor(viewport, threeDCursorData, index) {
                this.isMprLineActive = true;
                this.isLocation = "center";
                this.isViewportId = index;
				this.index = index;
				this.mprLastx = 0;
                this.mprLasty = 0;
                this.mprTempx = 0;
                this.mprTempy = 0;
				
                this.isMouseDown = false;
                this.processingMouseOp = 0;
                this.alignViewportCount = 0;
 
				this.viewport = viewport;
                this.threeDCursorData = threeDCursorData;
                this.renderEngine = viewport.getRenderEngine();
                this.isMouseDown = false;
                this.viewport.addDrawListener(this.render.bind(this));
                this.is2D = this.viewport instanceof Fovia.UI.HTMLViewport2D;
                this.htmlViewportGroup = this.viewport.getHTMLViewportGroup();
                this.htmlViewportGroup.imageReceivedListener(this.imageReceived.bind(this));
                this.alignViewportCount = this.htmlViewportGroup.getNumViewports() - 1;
				
				// for oblique 
				this.rightVector = null;
				this.upVector = null;
				this.viewVector = null;
				this.displayAxis1 = 0;
				this.lastAngle = 0;
				this.origin = new Fovia.Util.Point(0, 0);
				this.lineOrigin = new Fovia.Util.Point(0, 0);
				this.bOneTime = false;
				this.locationXY = getLocationArray();
				
				this.is3dActive = false;

				this.isObliqueActive = (isMprType == final_oblique_mpr); // 0:Vertical 1:Oblique
				if (index == 3) {
					this.isObliqueActive = false;	
				}

				this.isRotate = false;
				this.isInitVector = false;
				this.initVectorData();
            }

            mprMouseAdaptor.prototype.initVectorData = function () {
				var _this = this;
				if (_this.index === 0) {
					_this.rightVector = new Fovia.Util.Vector(1, 0, 0);
					_this.upVector = new Fovia.Util.Vector(0, 1, 0);
					_this.viewVector = new Fovia.Util.Vector(0, 0, 1);
				}
				if (_this.index === 1) {
					_this.rightVector = new Fovia.Util.Vector(0, 1, 0);
					_this.upVector = new Fovia.Util.Vector(0, 0, -1);
					_this.viewVector = new Fovia.Util.Vector(-1, 0, 0);
				}
				if (_this.index === 2) {
					_this.rightVector = new Fovia.Util.Vector(1, 0, 0);
					_this.upVector = new Fovia.Util.Vector(0, 0, -1);
					_this.viewVector = new Fovia.Util.Vector(0, 1, 0);
				}
				_this.displayAxis1 = 0;
				_this.lineOrigin.x = (_this.viewport.width / 2) * 16 / 16;
				_this.lineOrigin.y = (_this.viewport.height / 2) * 16 / 16;				
				_this.isInitVector = true;
		 
			}
			
			mprMouseAdaptor.prototype.initCursorData = function () {
			  var _this = this;
				if (_this.index == 0) {
				  this.shotRayForPoint(_this.mprLastx,  _this.mprLasty);
				}
            }

            mprMouseAdaptor.prototype.setInitalXYLocation = function (x,y) {
                this.mprLastx = x;
                this.mprLasty = y;
                this.mprTempx = x;
                this.mprTempy = y;                
            };
			
            mprMouseAdaptor.prototype.imageReceived = function (foviaHTMLViewport2D, canvas, width, height, imageTags) {
                if (this.isMouseDown) {
                    this.processingMouseOp--;
                }
            };
            
            mprMouseAdaptor.prototype.down = function (event, cachedRenderParams) {
                event.preventDefault();
				if (this.isObliqueActive) {
					return this.down3D_Oblique(event, cachedRenderParams);
				}  else 
					return this.down3D(event, cachedRenderParams);
            };
            
            mprMouseAdaptor.prototype.move = function (event, cachedRenderParams) {
                event.preventDefault();
                if (this.processingMouseOp > 0) {
                    return true;
                }

                if (this.isMouseDown) {
				   if (this.isObliqueActive) {
						this.move3D_Oblique(event, cachedRenderParams);
				   } else {
						this.processingMouseOp = this.alignViewportCount;
						return this.move3D(event, cachedRenderParams);
					}
                }
                return true;
            };

            mprMouseAdaptor.prototype.up = function (event, cachedRenderParams) {
                event.preventDefault();
                
				this.isMouseDown = false;
				g_mpr_eventfinished = true;
                
                this.mprTempy = this.mprLasty;
                this.mprTempx = this.mprLastx;
				
				renderRepaintViewport(-1);

				this.isRotate = false;
        		return true;
            };

           mprMouseAdaptor.prototype.down3D = function (event, cachedRenderParams) {
                this.isMouseDown = true;
                this.processingMouseOp = 0;
                return true;
            };
			
            mprMouseAdaptor.prototype.move3D = function (event, cachedRenderParams) {
                var _this = this;
                var locationX = event.clientX;
                var locationY = event.clientY;

                if (_this.isLocation == "leftright") {
                    locationY = _this.mprTempy;
                    _this.mprTempx = locationX;
                } else
                if (_this.isLocation == "topbottom") {
                    locationX = _this.mprTempx;
                    _this.mprTempy = locationY;
                } else {
                    _this.mprTempx = locationX;
                    _this.mprTempy = locationY;    
                }
                this.shotRayForPoint(locationX, locationY);
                return true;
            };			
			
		   mprMouseAdaptor.prototype.shotRayForPoint = function (locationX, locationY) {
                var _this = this;
                this.renderEngine.shootRay(new Fovia.Util.Point(locationX, locationY)).then(function (rayStopInfoList) {
                    var rayStopInfo = new Fovia.RayStopInfo(rayStopInfoList[0]);
                    if (rayStopInfo.voxelValue != -1) {
                        var vdc = _this.renderEngine.getVolumeDataContext();
                        var currentMPRPoint_VolumeUnits = new Fovia.Util.Vector(rayStopInfo.volCoodinate);
                        _this.threeDCursorData.setData(vdc.mapFovia3DToFrameOfReference(currentMPRPoint_VolumeUnits));
						
						if (_this.isObliqueActive) {
							g_cameraPosition.assign(rayStopInfo.volCoodinate);
						}

                        _this.viewport.repaint();
                        _this.htmlViewportGroup.reAlignViewport(_this.threeDCursorData.getData());
                    }
                    else {
                        _this.processingMouseOp = 0;
                    }
                  });   
		   }

           mprMouseAdaptor.prototype.down3D_Oblique = function (event, cachedRenderParams) {
				this.processingMouseOp = 0;
				this.isMouseDown = true;
				this.isRotate = true; 

				g_mpr_eventfinished = false;
				var target = this.viewport.htmlElement; 
				
				var width = this.viewport.width;
				var height = this.viewport.height;
				
				var localX = event.clientX;
				var localY = event.clientY;

                if (this.isLocation == "center") {
                	isRotate = false;
                	this.lineOrigin.x = localX;
                	this.lineOrigin.y = localY;

                } else {
	                this.lastAngle = Math.atan2((localY - this.origin.y), (localX - this.origin.x));	
                }

				return false;
            };
			
			mprMouseAdaptor.prototype.move3D_Oblique = function (event, cachedRenderParams) {
				var target = this.viewport.htmlElement; 
				var width = target.width;
				var height = target.height;
				var localX = event.clientX;
				var localY = event.clientY;


                if (this.isLocation == "center") {
                	this.lineOrigin.x = localX;
                	this.lineOrigin.y = localY;
					if (this.isObliqueActive && (this.isLocation == "center")) {
						this.shotRayForPoint(this.lineOrigin.x, this.lineOrigin.y);
					
						/*
						this.viewport.getRenderEngine().shootRay([new Fovia.Util.Point(localX, localY)], function (err, rayStopInfoList) {
							g_cameraPosition.assign(rayStopInfoList[0].volCoodinate);
							RedrawAll();
						});
						*/

					}

                	//redrawingMprLines(this.index);
                } else 
	                
				if (this.isRotate) {
					var currentAngle = Math.atan2((localY - this.origin.y), (localX - this.origin.x));
					var rotateAngle =  (currentAngle - this.lastAngle);
					this.displayAxis1 = this.displayAxis1 + rotateAngle;
					
					if (this.displayAxis1 >= Math.PI) this.displayAxis1 -= Math.PI * 2;
					if (this.displayAxis1 <= -Math.PI) this.displayAxis1 += Math.PI * 2;

					
					if (this.index == 0) {
						g_MprMouseAdaptor[1].Rotate(this.viewVector, rotateAngle);
						g_MprMouseAdaptor[2].Rotate(this.viewVector, rotateAngle);
					} else 
					if (this.index == 1) {
						g_MprMouseAdaptor[0].Rotate(this.viewVector, rotateAngle);
						g_MprMouseAdaptor[2].Rotate(this.viewVector, rotateAngle);
					} else 
					if (this.index == 2) {
						g_MprMouseAdaptor[0].Rotate(this.viewVector, rotateAngle);
						g_MprMouseAdaptor[1].Rotate(this.viewVector, rotateAngle);
					}
				 
					redrawingMprLines(this.index);
					this.lastAngle = currentAngle;
				} 
				return false;
			};
            
            mprMouseAdaptor.prototype.render = function (foviaHTMLViewport2D, canvas, width, height, imageTags) {
				if ((this.isObliqueActive == false) && this.isMprLineActive) {
					return this.render3D(foviaHTMLViewport2D, canvas, width, height, imageTags);
				}  
            };
			
			mprMouseAdaptor.prototype.setDrawMprLinesObliqueA = function(foviaHTMLViewport2D, canvas, width, height, onDrawCallbackComplete) {
				if (this.isObliqueActive == false) 
					return false;
				var _this = this;
				return setDrawMprLinesOblique(_this, foviaHTMLViewport2D, canvas, width, height, onDrawCallbackComplete);
			}
							
 			mprMouseAdaptor.prototype.render3D = function (foviaHTMLViewport2D, canvas, width, height, imageTags) {
 				if (this.isMprLineActive)
					setDrawMprLinesVertical(this, foviaHTMLViewport2D, canvas, width, height, imageTags);
			};
	
			
			mprMouseAdaptor.prototype.Rotate = function (vec, angle) {
				this.rightVector = rotatePointAroundVector(this.rightVector, vec, angle);
				this.upVector = rotatePointAroundVector(this.upVector, vec, angle);
				this.viewVector = rotatePointAroundVector(this.viewVector, vec, angle);

				this.rightVector = this.upVector.cross(this.viewVector);
				this.upVector = this.viewVector.cross(this.rightVector);
				this.viewVector = this.rightVector.cross(this.upVector);

				this.rightVector.normalize();
				this.upVector.normalize();
				this.viewVector.normalize();
			}
			
			mprMouseAdaptor.prototype.isObliqueLocationOk = function (x, y) {
				var result = false;
				var self = this;
				for (var i=0; i < 4; i++) {
					if ((self.locationXY[i].x-10 < x) && (x < self.locationXY[i].x+10 ) &&  
						(self.locationXY[i].y-10 < y) && (y < self.locationXY[i].y+10 )) {
						result = true;
						break;
					}
				}					
				return result;
			}

			mprMouseAdaptor.prototype.reRender = function (event, cachedRenderParams) {            
				var self = this;
				if (self.bOneTime==false) {
					
					self.bOneTime = true;
					var currentMatrix = new Fovia.Util.Matrix();
					currentMatrix.setOffsetVector(g_cameraPosition);
					currentMatrix.setXVector(self.rightVector);
					currentMatrix.setYVector(self.upVector);
					currentMatrix.setZVector(self.viewVector);
					var rp = new Fovia.RenderParams3D();
					rp.setTransform(currentMatrix);
					
					self.viewport.getRenderEngine().setRenderParams(rp).then(function () {
						self.viewport.getRenderEngine().render();
						//self.viewport.getRenderEngine().renderFinal();
						self.bOneTime = false;
					});
				}
 			};

			function redrawingMprLines(index) {
				if (index != 0) 
					g_MprMouseAdaptor[0].reRender();
				if (index != 1) 
					g_MprMouseAdaptor[1].reRender();
				if (index != 2) 
					g_MprMouseAdaptor[2].reRender();
					if (index > -1)
						g_viewports[index].repaint();
			}
			
			function pointAroundVector(pt, axis) {
				var u = new Fovia.Util.Vector(axis.x * pt.x, axis.x * pt.y, axis.x * pt.z);
				var v = new Fovia.Util.Vector(axis.y * pt.x, axis.y * pt.y, axis.y * pt.z);
				var w = new Fovia.Util.Vector(axis.z * pt.x, axis.z * pt.y, axis.z * pt.z);

				var retPt = new Fovia.Util.Vector(0, 0, 0);
				retPt.x = axis.x * (u.x + v.y + w.z) + (pt.x * (axis.y * axis.y + axis.z * axis.z) - axis.x * (v.y + w.z)) * cRot + (-w.y + v.z);
				retPt.y = axis.y * (u.x + v.y + w.z) + (pt.y * (axis.x * axis.x + axis.z * axis.z) - axis.y * (u.x + w.z)) * cRot + (w.x - u.z);
				retPt.z = axis.z * (u.x + v.y + w.z) + (pt.z * (axis.x * axis.x + axis.y * axis.y) - axis.z * (u.x + v.y)) * cRot + (-v.x + u.y);

				return retPt;
			}

			function rotatePointAroundVector(pt, axis, rot) {
				var u = new Fovia.Util.Vector(axis.x * pt.x, axis.x * pt.y, axis.x * pt.z);
				var v = new Fovia.Util.Vector(axis.y * pt.x, axis.y * pt.y, axis.y * pt.z);
				var w = new Fovia.Util.Vector(axis.z * pt.x, axis.z * pt.y, axis.z * pt.z);

				var sRot = Math.sin(rot);
				var cRot = Math.cos(rot);

				var retPt = new Fovia.Util.Vector(0, 0, 0);
				retPt.x = axis.x * (u.x + v.y + w.z) + (pt.x * (axis.y * axis.y + axis.z * axis.z) - axis.x * (v.y + w.z)) * cRot + (-w.y + v.z) * sRot;
				retPt.y = axis.y * (u.x + v.y + w.z) + (pt.y * (axis.x * axis.x + axis.z * axis.z) - axis.y * (u.x + w.z)) * cRot + (w.x - u.z) * sRot;
				retPt.z = axis.z * (u.x + v.y + w.z) + (pt.z * (axis.x * axis.x + axis.y * axis.y) - axis.z * (u.x + v.y)) * cRot + (-v.x + u.y) * sRot;

				return retPt;
			}			
			
		
	return mprMouseAdaptor;
}());

function viewportMprLineMove(self, event, index) {
	if (g_MprMouseAdaptor[index].isMouseDown == true)	
		return;

	if ((event.offsetX >= g_MprMouseAdaptor[index].mprLastx-10) && (event.offsetX <= g_MprMouseAdaptor[index].mprLastx+10) && 
		 (event.offsetY >= g_MprMouseAdaptor[index].mprLasty-10) && (event.offsetY <= g_MprMouseAdaptor[index].mprLasty+10) ) {
			g_MprMouseAdaptor[index].isLocation = "center";
			self.viewport.setCustomMouseAdaptor(g_MprMouseAdaptor[index], Fovia.UI.MouseButton.left);
			document.body.style.cursor = 'pointer';
	} else
	if  (g_MprMouseAdaptor[index].is3dActive == false) {

		if ((event.offsetX >= g_MprMouseAdaptor[index].mprLastx-5) && (event.offsetX <= g_MprMouseAdaptor[index].mprLastx+5)) {
				g_MprMouseAdaptor[index].isLocation = "leftright";
				self.viewport.setCustomMouseAdaptor(g_MprMouseAdaptor[index], Fovia.UI.MouseButton.left);
				document.body.style.cursor = 'w-resize';
		}  else
		if ( (event.offsetY >= g_MprMouseAdaptor[index].mprLasty-5) && (event.offsetY <= g_MprMouseAdaptor[index].mprLasty+5)  
			  ) {
				g_MprMouseAdaptor[index].isLocation = "topbottom";
				self.viewport.setCustomMouseAdaptor(g_MprMouseAdaptor[index], Fovia.UI.MouseButton.left);
				document.body.style.cursor = 'n-resize';
		} else
			defaultMouseAdaptorSelect(self);

	} else {
		 defaultMouseAdaptorSelect(self);
	}
}

function defaultMouseAdaptorSelect(self) {
	self.viewport.setMouseAdaptor(isSelectAdaptor, Fovia.UI.MouseButton.left);			
	document.body.style.cursor = 'auto';
}

function viewportObliqueMprLineMove(self, event, index) {
	var result = false;

	if (g_mpr_eventfinished == false)
		return;
	
	if (g_MprMouseAdaptor[index].isMprLineActive == false) {
	}

	if ((event.offsetX >= g_MprMouseAdaptor[index].lineOrigin.x -10) && (event.offsetX <= g_MprMouseAdaptor[index].lineOrigin.x +10) && 
		 (event.offsetY >= g_MprMouseAdaptor[index].lineOrigin.y-10) && (event.offsetY <= g_MprMouseAdaptor[index].lineOrigin.y+10) ) {
			g_MprMouseAdaptor[index].isLocation = "center";
			self.viewport.setCustomMouseAdaptor(g_MprMouseAdaptor[index], Fovia.UI.MouseButton.left);
			result = true;
	} else 
		for (var i=0; i < 4; i++) {
			if ((g_MprMouseAdaptor[index].locationXY[i].x-10 < event.offsetX) && (event.offsetX < g_MprMouseAdaptor[index].locationXY[i].x+10 ) &&  
				(g_MprMouseAdaptor[index].locationXY[i].y-10 < event.offsetY) && (event.offsetY < g_MprMouseAdaptor[index].locationXY[i].y+10 )   )   {
				result = true;
				g_MprMouseAdaptor[index].isLocation = "";
				g_MprMouseAdaptor[index].isObliqueActive = true;
				break;
			}
		}					
	
	
	if (result) {
		self.viewport.setCustomMouseAdaptor(g_MprMouseAdaptor[index], Fovia.UI.MouseButton.left);
		document.body.style.cursor = 'pointer';
	} else {
		self.viewport.setMouseAdaptor(isSelectAdaptor, Fovia.UI.MouseButton.left);			
		document.body.style.cursor = 'auto';
	}
}


function getLocationArray() {
	var locationXY = new Array(4);
		locationXY[0] = new Fovia.Util.Point(0, 0);
		locationXY[1] = new Fovia.Util.Point(0, 0);
		locationXY[2] = new Fovia.Util.Point(0, 0);
		locationXY[3] = new Fovia.Util.Point(0, 0);
	return locationXY;
}
                            
		
		
		
			
 
