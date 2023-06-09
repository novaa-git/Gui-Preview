// these should be replaced with Fovia.Util.displayToStoredUnits
var tf_rescaleIntercept = -1024.0;
var tf_rescaleSlope = 1.0;
var DU_2_SU = function(du) { return (du-tf_rescaleIntercept)/tf_rescaleSlope; }
var SU_2_DU = function(su) { return su*tf_rescaleIntercept+tf_rescaleSlope; }


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//     BASE TF's THAT CAN BE COLORED
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var makeBlankTF = function() {

    var cp1 = new Fovia.ColoredPoint(DU_2_SU(0), new Fovia.Util.Color(0, 0, 0, 0.0), Fovia.ColoredPoint.disableLighting);
    var renderRange = new Fovia.RenderRangeParams([cp1], Fovia.RenderRangeParams.disable);

    return renderRange;
};

var makeCTAirTF = function(r, g, b) {

    var cp1 = new Fovia.ColoredPoint(DU_2_SU(-999), new Fovia.Util.Color(r, g, b, 1.0), Fovia.ColoredPoint.enableLighting);
    var cp2 = new Fovia.ColoredPoint(DU_2_SU(-700), new Fovia.Util.Color(r, g, b, 1.0), Fovia.ColoredPoint.enableLighting);
    var cp3 = new Fovia.ColoredPoint(DU_2_SU(-300), new Fovia.Util.Color(r, g, b, 0.0), Fovia.ColoredPoint.enableLighting);

    var renderRange = new Fovia.RenderRangeParams([cp1, cp2, cp3], Fovia.RenderRangeParams.enable);

    return renderRange;
};

var makeCTSoftTissueTF = function(r, g, b) {

    var cp1 = new Fovia.ColoredPoint(DU_2_SU(-150), new Fovia.Util.Color(r, g, b, 0.0), Fovia.ColoredPoint.enableLighting);
    var cp2 = new Fovia.ColoredPoint(DU_2_SU(-100), new Fovia.Util.Color(r, g, b, 1.0), Fovia.ColoredPoint.enableLighting);
    var cp3 = new Fovia.ColoredPoint(DU_2_SU(100), new Fovia.Util.Color(r, g, b, 1.0), Fovia.ColoredPoint.enableLighting);
    var cp4 = new Fovia.ColoredPoint(DU_2_SU(150), new Fovia.Util.Color(r, g, b, 0.0), Fovia.ColoredPoint.enableLighting);

    var renderRange = new Fovia.RenderRangeParams([cp1, cp2, cp3, cp4], Fovia.RenderRangeParams.enable);

    return renderRange;
};

var makeCTMuscleTF = function(r, g, b) {

    var cp1 = new Fovia.ColoredPoint(DU_2_SU(4), new Fovia.Util.Color(r, g, b, 0.0095), Fovia.ColoredPoint.enableLighting);
    var cp2 = new Fovia.ColoredPoint(DU_2_SU(123), new Fovia.Util.Color(r, g, b, 0.0601), Fovia.ColoredPoint.enableLighting);
    var cp3 = new Fovia.ColoredPoint(DU_2_SU(225), new Fovia.Util.Color(r, g, b, 0.1639), Fovia.ColoredPoint.enableLighting);
    var cp4 = new Fovia.ColoredPoint(DU_2_SU(350), new Fovia.Util.Color(r, g, b, 0.0095), Fovia.ColoredPoint.enableLighting);

    var renderRange = new Fovia.RenderRangeParams([cp1, cp2, cp3, cp4], Fovia.RenderRangeParams.enable);

    return renderRange;
};

var makeCTFatTF = function(r, g, b) {

    var cp1 = new Fovia.ColoredPoint(DU_2_SU(-150), new Fovia.Util.Color(r, g, b, 0.0), Fovia.ColoredPoint.enableLighting);
    var cp2 = new Fovia.ColoredPoint(DU_2_SU(-100), new Fovia.Util.Color(r, g, b, 1.0), Fovia.ColoredPoint.enableLighting);
    var cp3 = new Fovia.ColoredPoint(DU_2_SU(0), new Fovia.Util.Color(r, g, b, 0.0), Fovia.ColoredPoint.enableLighting);

    var renderRange = new Fovia.RenderRangeParams([cp1, cp2, cp3], Fovia.RenderRangeParams.enable);

    return renderRange;
};

var makeCTContrastVesselTF = function(r, g, b) {

    var cp1 = new Fovia.ColoredPoint(DU_2_SU(4), new Fovia.Util.Color(r, g, b, 0.0095), Fovia.ColoredPoint.enableLighting);
    var cp2 = new Fovia.ColoredPoint(DU_2_SU(123), new Fovia.Util.Color(r, g, b, 0.0601), Fovia.ColoredPoint.enableLighting);
    var cp3 = new Fovia.ColoredPoint(DU_2_SU(225), new Fovia.Util.Color(r, g, b, 0.1639), Fovia.ColoredPoint.enableLighting);
    var cp4 = new Fovia.ColoredPoint(DU_2_SU(840), new Fovia.Util.Color(r, g, b, 0.5023), Fovia.ColoredPoint.enableLighting);
    var cp5 = new Fovia.ColoredPoint(DU_2_SU(1500), new Fovia.Util.Color(r, g, b, 0.9999), Fovia.ColoredPoint.enableLighting);
    var cp6 = new Fovia.ColoredPoint(DU_2_SU(3071), new Fovia.Util.Color(r, g, b, 0.9999), Fovia.ColoredPoint.enableLighting);

    var renderRange = new Fovia.RenderRangeParams([cp1, cp2, cp3, cp4, cp5, cp6], Fovia.RenderRangeParams.enable);

    return renderRange;
};

var makeCTPulmonaryVesselTF = function(r, g, b) {

    var cp1 = new Fovia.ColoredPoint(DU_2_SU(-150), new Fovia.Util.Color(r, g, b, 0.0), Fovia.ColoredPoint.enableLighting);
    var cp2 = new Fovia.ColoredPoint(DU_2_SU(-100), new Fovia.Util.Color(r, g, b, 1.0), Fovia.ColoredPoint.enableLighting);
    var cp3 = new Fovia.ColoredPoint(4095, new Fovia.Util.Color(r, g, b, 1.0), Fovia.ColoredPoint.enableLighting);

    var renderRange = new Fovia.RenderRangeParams([cp1, cp2, cp3], Fovia.RenderRangeParams.enable);

    return renderRange;
};

var makeCTColonBoundaryTF = function(r, g, b) {

    var cp1 = new Fovia.ColoredPoint(DU_2_SU(-800), new Fovia.Util.Color(r, g, b, 0.05), Fovia.ColoredPoint.enableLighting);
    var cp2 = new Fovia.ColoredPoint(DU_2_SU(-700), new Fovia.Util.Color(r, g, b, 0.1), Fovia.ColoredPoint.enableLighting);
    var cp3 = new Fovia.ColoredPoint(DU_2_SU(-550), new Fovia.Util.Color(r, g, b, 0.3), Fovia.ColoredPoint.enableLighting);
    var cp4 = new Fovia.ColoredPoint(DU_2_SU(2000), new Fovia.Util.Color(r, g, b, 0.3), Fovia.ColoredPoint.enableLighting);

    var renderRange = new Fovia.RenderRangeParams([cp1, cp2, cp3, cp4], Fovia.RenderRangeParams.enable);

    return renderRange;
};

var makeCTMinMaxTF = function(r, g, b, min, max) {

    var cp1 = new Fovia.ColoredPoint(min, new Fovia.Util.Color(r, g, b, 0.0), Fovia.ColoredPoint.enableLighting);
    var cp2 = new Fovia.ColoredPoint(min +((max-min) / 10), new Fovia.Util.Color(r, g, b, 0.01), Fovia.ColoredPoint.enableLighting);
    var cp3 = new Fovia.ColoredPoint((min + max) / 2, new Fovia.Util.Color(r, g, b, 0.02), Fovia.ColoredPoint.enableLighting);
    var cp4 = new Fovia.ColoredPoint(max, new Fovia.Util.Color(r, g, b, 0.2), Fovia.ColoredPoint.enableLighting);
    var cp5 = new Fovia.ColoredPoint(max + 500, new Fovia.Util.Color(r, g, b, 0.0), Fovia.ColoredPoint.enableLighting);

    var renderRange = new Fovia.RenderRangeParams([cp1, cp2, cp3, cp4, cp5], Fovia.RenderRangeParams.enable);

    return renderRange;
};


var makeCTMinMaxTFoldWithBug = function(r, g, b, min, max) {

    var cp1 = new Fovia.ColoredPoint(min, new Fovia.Util.Color(r, g, b, 0.0), Fovia.ColoredPoint.enableLighting);
    var cp2 = new Fovia.ColoredPoint((min + max) / 10, new Fovia.Util.Color(r, g, b, 0.01), Fovia.ColoredPoint.enableLighting);
    var cp3 = new Fovia.ColoredPoint((min + max) / 2, new Fovia.Util.Color(r, g, b, 0.02), Fovia.ColoredPoint.enableLighting);
    var cp4 = new Fovia.ColoredPoint(max, new Fovia.Util.Color(r, g, b, 0.2), Fovia.ColoredPoint.enableLighting);
    var cp5 = new Fovia.ColoredPoint(max + 500, new Fovia.Util.Color(r, g, b, 0.0), Fovia.ColoredPoint.enableLighting);

    var renderRange = new Fovia.RenderRangeParams([cp1, cp2, cp3, cp4, cp5], Fovia.RenderRangeParams.enable);

    return renderRange;
};


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//     SPECIFIC COLORED TF's'
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var makeCTTransparentLungTF = function() {

    var cp1 = new Fovia.ColoredPoint(DU_2_SU(-732), new Fovia.Util.Color(28, 29, 97, 0.0012), Fovia.ColoredPoint.disableLighting);
    var cp2 = new Fovia.ColoredPoint(DU_2_SU(-502), new Fovia.Util.Color(194, 255, 198, 0.0195), Fovia.ColoredPoint.disableLighting);
    var cp3 = new Fovia.ColoredPoint(DU_2_SU(-210), new Fovia.Util.Color(222, 80, 44, 0.0012), Fovia.ColoredPoint.disableLighting);

    var renderRange = new Fovia.RenderRangeParams([cp1, cp2, cp3], Fovia.RenderRangeParams.enable);

    return renderRange;
};

var makeCTTransparentLungTF2 = function() {

    var cp1 = new Fovia.ColoredPoint(DU_2_SU(-732), new Fovia.Util.Color(28, 29, 97, 0.0003), Fovia.ColoredPoint.disableLighting);
    var cp2 = new Fovia.ColoredPoint(DU_2_SU(-502), new Fovia.Util.Color(194, 255, 198, 0.0095), Fovia.ColoredPoint.disableLighting);
    var cp3 = new Fovia.ColoredPoint(DU_2_SU(-210), new Fovia.Util.Color(222, 80, 44, 0.0003), Fovia.ColoredPoint.disableLighting);

    var renderRange = new Fovia.RenderRangeParams([cp1, cp2, cp3], Fovia.RenderRangeParams.enable);

    return renderRange;
};

var makeCTBoneTF = function() {

    var cp1 = new Fovia.ColoredPoint(DU_2_SU(154), new Fovia.Util.Color(166, 36, 45, 0.0044), Fovia.ColoredPoint.enableLighting);
    var cp2 = new Fovia.ColoredPoint(DU_2_SU(319), new Fovia.Util.Color(207, 125, 58, 0.0208), Fovia.ColoredPoint.enableLighting);
    var cp3 = new Fovia.ColoredPoint(DU_2_SU(524), new Fovia.Util.Color(179, 164, 159, 0.0737), Fovia.ColoredPoint.enableLighting);
    var cp4 = new Fovia.ColoredPoint(DU_2_SU(892), new Fovia.Util.Color(199, 177, 173, 0.4017), Fovia.ColoredPoint.enableLighting);
    var cp5 = new Fovia.ColoredPoint(DU_2_SU(1946), new Fovia.Util.Color(55, 177, 192, 0.8452), Fovia.ColoredPoint.enableLighting);
    var cp6 = new Fovia.ColoredPoint(DU_2_SU(3071), new Fovia.Util.Color(44, 155, 192, 0.0945), Fovia.ColoredPoint.enableLighting);

    var renderRange = new Fovia.RenderRangeParams([cp1, cp2, cp3, cp4, cp5, cp6], Fovia.RenderRangeParams.enable);

    return renderRange;
};


var makeCTHeartTF = function() {

    var cp1 = new Fovia.ColoredPoint(DU_2_SU(4), new Fovia.Util.Color(196, 15, 5, 0.0095), Fovia.ColoredPoint.enableLighting); //(196,33,36,0.0095)
    var cp2 = new Fovia.ColoredPoint(DU_2_SU(123), new Fovia.Util.Color(184, 126, 61, 0.0601), Fovia.ColoredPoint.enableLighting);
    var cp3 = new Fovia.ColoredPoint(DU_2_SU(225), new Fovia.Util.Color(178, 181, 207, 0.1639), Fovia.ColoredPoint.enableLighting); //Fovia.ColoredPoint(DU_2_SU(294)    
    var cp4 = new Fovia.ColoredPoint(DU_2_SU(840), new Fovia.Util.Color(189, 189, 189, 0.5023), Fovia.ColoredPoint.enableLighting);
    var cp5 = new Fovia.ColoredPoint(DU_2_SU(1797), new Fovia.Util.Color(155, 177, 192, 0.9980), Fovia.ColoredPoint.enableLighting);
    var cp6 = new Fovia.ColoredPoint(DU_2_SU(2600), new Fovia.Util.Color(144, 155, 192, 0.1114), Fovia.ColoredPoint.enableLighting);

    var renderRange = new Fovia.RenderRangeParams([cp1, cp2, cp3, cp4, cp5, cp6], Fovia.RenderRangeParams.enable);

    return renderRange;
};

var makeCTTransparentColonTF = function() {
    var cp1 = new Fovia.ColoredPoint(DU_2_SU(-800), new Fovia.Util.Color(194, 150, 150, 0.00), Fovia.ColoredPoint.enableLighting);
    var cp2 = new Fovia.ColoredPoint(DU_2_SU(-500), new Fovia.Util.Color(194, 151, 151, 0.01), Fovia.ColoredPoint.enableLighting);
    var cp3 = new Fovia.ColoredPoint(DU_2_SU(-235), new Fovia.Util.Color(194, 152, 152, 0.00), Fovia.ColoredPoint.enableLighting);

    var renderRange = new Fovia.RenderRangeParams([cp1, cp2, cp3], Fovia.RenderRangeParams.enable);

    return renderRange;
};

var makeMRTransparentBrainTF = function() {
    var cp1 = new Fovia.ColoredPoint(150, new Fovia.Util.Color(15, 11, 0, 0.00), Fovia.ColoredPoint.enableLighting);
    var cp2 = new Fovia.ColoredPoint(178, new Fovia.Util.Color(255, 255, 255, 0.02), Fovia.ColoredPoint.enableLighting);
    var cp3 = new Fovia.ColoredPoint(210, new Fovia.Util.Color(253, 237, 203, 0.00), Fovia.ColoredPoint.enableLighting);

    var renderRange = new Fovia.RenderRangeParams([cp1, cp2, cp3], Fovia.RenderRangeParams.enable);

    return renderRange;
};

var makeCTContrastVessel2TF = function() {

    var cp1 = new Fovia.ColoredPoint(DU_2_SU(70), new Fovia.Util.Color(174, 10, 15, 0.0095), Fovia.ColoredPoint.enableLighting);
    var cp2 = new Fovia.ColoredPoint(DU_2_SU(123), new Fovia.Util.Color(201, 25, 18, 0.0601), Fovia.ColoredPoint.enableLighting);
    var cp3 = new Fovia.ColoredPoint(DU_2_SU(225), new Fovia.Util.Color(231, 31, 32, 0.1639), Fovia.ColoredPoint.enableLighting);
    var cp4 = new Fovia.ColoredPoint(DU_2_SU(840), new Fovia.Util.Color(240, 37, 55, 0.5023), Fovia.ColoredPoint.enableLighting);
    var cp5 = new Fovia.ColoredPoint(DU_2_SU(1500), new Fovia.Util.Color(255, 40, 76, 0.9999), Fovia.ColoredPoint.enableLighting);
    var cp6 = new Fovia.ColoredPoint(DU_2_SU(3071), new Fovia.Util.Color(255, 45, 76, 0.9999), Fovia.ColoredPoint.enableLighting);

    var renderRange = new Fovia.RenderRangeParams([cp1, cp2, cp3, cp4, cp5, cp6], Fovia.RenderRangeParams.enable);

    return renderRange;
};

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//     TFs showing an isosurface for mesh extraction
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var makeMeshPreviewTF = function(threshold, initEnabled, initEnabled2, r, g, b, a) {

    var alpha = initEnabled ? 1.0 : a;
    var cp1 = new Fovia.ColoredPoint(threshold, new Fovia.Util.Color(r, g, b, alpha), Fovia.ColoredPoint.enableLighting);
    var cp2 = new Fovia.ColoredPoint(4095, new Fovia.Util.Color(r, g, b, alpha), Fovia.ColoredPoint.enableLighting);

    var renderRange = new Fovia.RenderRangeParams([cp1, cp2], initEnabled2);

    return renderRange;
};

var SetMeshPreview = function(pEngine, threshold, labelActiveArray) {
    pEngine.setTransferFunction(0, [makeMeshPreviewTF(threshold[0] + 1024, labelActiveArray[0], labelActiveArray[0], 255, 255, 255, 0.00000)]);
    pEngine.setTransferFunction(1, [makeMeshPreviewTF(threshold[1] + 1024, labelActiveArray[1], true, 255, 0, 0, 0.00250)]);
    pEngine.setTransferFunction(2, [makeMeshPreviewTF(threshold[2] + 1024, labelActiveArray[2], true, 0, 255, 0, 0.00250)]);
    pEngine.setTransferFunction(3, [makeMeshPreviewTF(threshold[3] + 1024, labelActiveArray[3], true, 0, 0, 255, 0.00250)]);
    pEngine.setTransferFunction(4, [makeMeshPreviewTF(threshold[4] + 1024, labelActiveArray[4], true, 255, 255, 0, 0.00015)]);
    pEngine.setTransferFunction(5, [makeMeshPreviewTF(threshold[5] + 1024, labelActiveArray[5], true, 255, 0, 255, 0.01000)]);
    pEngine.setTransferFunction(6, [makeMeshPreviewTF(threshold[6] + 1024, labelActiveArray[6], true, 255, 128, 0, 0.00015)]);
    pEngine.setTransferFunction(7, [makeMeshPreviewTF(threshold[7] + 1024, labelActiveArray[7], true, 255, 255, 255, 0.00000)]);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//
//     For DRR imagery
//
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var makeXRAYTF = function() {

    var cp1 = new Fovia.ColoredPoint(0, new Fovia.Util.Color(255, 255, 255, 0.005), Fovia.ColoredPoint.enableLighting);
    var cp2 = new Fovia.ColoredPoint(4095, new Fovia.Util.Color(255, 255, 255, 0.005), Fovia.ColoredPoint.enableLighting);

    var renderRange = new Fovia.RenderRangeParams([cp1, cp2], Fovia.RenderRangeParams.enable);

    return renderRange;
};


//	renderParams.setTransferFunction([makeXRAYTF()]);

var makeWindowLevelTF = function(window, level, startColor, endColor) {
    var windowMin = level - (window / 2);
    var windowMax = level + (window / 2);
    var storedWindowMin = DU_2_SU(windowMin);
    var storedWindowMax = DU_2_SU(windowMax);

    var renderRange;

    if (storedWindowMin > 0) {
        var cp1 = new Fovia.ColoredPoint(0, startColor, Fovia.ColoredPoint.disableLighting);
        var cp2 = new Fovia.ColoredPoint(storedWindowMin, startColor, Fovia.ColoredPoint.disableLighting);
        var cp3 = new Fovia.ColoredPoint(storedWindowMax, endColor, Fovia.ColoredPoint.disableLighting);
        var cp4 = new Fovia.ColoredPoint(4095, endColor, Fovia.ColoredPoint.disableLighting);
        renderRange = new Fovia.RenderRangeParams([cp1, cp2, cp3, cp4], Fovia.RenderRangeParams.enable);
    } else {
        startColor.r = startColor.r + ((endColor.r - startColor.r) * (-storedWindowMin) / (storedWindowMax - storedWindowMin));
        startColor.g = startColor.g + ((endColor.g - startColor.g) * (-storedWindowMin) / (storedWindowMax - storedWindowMin));
        startColor.b = startColor.b + ((endColor.b - startColor.b) * (-storedWindowMin) / (storedWindowMax - storedWindowMin));
        var cp1 = new Fovia.ColoredPoint(0, startColor, Fovia.ColoredPoint.disableLighting);
        var cp2 = new Fovia.ColoredPoint(storedWindowMax, endColor, Fovia.ColoredPoint.disableLighting);
        var cp3 = new Fovia.ColoredPoint(4095, endColor, Fovia.ColoredPoint.disableLighting);
        renderRange = new Fovia.RenderRangeParams([cp1, cp2, cp3], Fovia.RenderRangeParams.enable);
    }

    return renderRange;
};

var makeColoredWindowLevelTF = function(window, level, color, opacity) {
    var windowMin = level - (window / 2);
    var windowMax = level + (window / 2);
    var storedWindowMin = DU_2_SU(windowMin);
    var storedWindowMax = DU_2_SU(windowMax);
    var startColor = new Fovia.Util.Color(opacity*color.r, opacity*color.g, opacity*color.b);
    var endColor   = new Fovia.Util.Color(opacity*color.r + (1.0-opacity)*255, opacity*color.g + (1.0-opacity)*255, opacity*color.b + (1.0-opacity)*255);

    var renderRange;
    if (storedWindowMin > 0) {
        var cp1 = new Fovia.ColoredPoint(0, startColor, Fovia.ColoredPoint.disableLighting);
        var cp2 = new Fovia.ColoredPoint(storedWindowMin, startColor, Fovia.ColoredPoint.disableLighting);
        var cp3 = new Fovia.ColoredPoint(storedWindowMax, endColor, Fovia.ColoredPoint.disableLighting);
        var cp4 = new Fovia.ColoredPoint(4095, endColor, Fovia.ColoredPoint.disableLighting);
        renderRange = new Fovia.RenderRangeParams([cp1, cp2, cp3, cp4], Fovia.RenderRangeParams.enable);
    } else {
        startColor.r = startColor.r + ((endColor.r - startColor.r) * (-storedWindowMin) / (storedWindowMax - storedWindowMin));
        startColor.g = startColor.g + ((endColor.g - startColor.g) * (-storedWindowMin) / (storedWindowMax - storedWindowMin));
        startColor.b = startColor.b + ((endColor.b - startColor.b) * (-storedWindowMin) / (storedWindowMax - storedWindowMin));
        var cp1 = new Fovia.ColoredPoint(0, startColor, Fovia.ColoredPoint.disableLighting);
        var cp2 = new Fovia.ColoredPoint(storedWindowMax, endColor, Fovia.ColoredPoint.disableLighting);
        var cp3 = new Fovia.ColoredPoint(4095, endColor, Fovia.ColoredPoint.disableLighting);
        renderRange = new Fovia.RenderRangeParams([cp1, cp2, cp3], Fovia.RenderRangeParams.enable);
    }

    return renderRange;
};


var makeColoredCTBoneTF = function(r, g, b, a) {
    var cp1 = new Fovia.ColoredPoint(DU_2_SU(154), new Fovia.Util.Color(r, g, b, 0.0044 * a), Fovia.ColoredPoint.enableLighting);
    var cp2 = new Fovia.ColoredPoint(DU_2_SU(319), new Fovia.Util.Color(r, g, b, 0.0208 * a), Fovia.ColoredPoint.enableLighting);
    var cp3 = new Fovia.ColoredPoint(DU_2_SU(524), new Fovia.Util.Color(r, g, b, 0.0738 * a), Fovia.ColoredPoint.enableLighting);
    var cp4 = new Fovia.ColoredPoint(DU_2_SU(892), new Fovia.Util.Color(r, g, b, 0.4017 * a), Fovia.ColoredPoint.enableLighting);
    var cp5 = new Fovia.ColoredPoint(DU_2_SU(1946), new Fovia.Util.Color(r, g, b, 0.8452 * a), Fovia.ColoredPoint.enableLighting);
    var cp6 = new Fovia.ColoredPoint(DU_2_SU(3071), new Fovia.Util.Color(r, g, b, 0.0945 * a), Fovia.ColoredPoint.enableLighting);

    var renderRange = new Fovia.RenderRangeParams([cp1, cp2, cp3, cp4, cp5, cp6], Fovia.RenderRangeParams.enable);

    return renderRange;
};

var makeColoredCTSoftTissueTF = function(r, g, b, a) {
    var cp1 = new Fovia.ColoredPoint(DU_2_SU(-150), new Fovia.Util.Color(r, g, b, 0.0 * a), Fovia.ColoredPoint.enableLighting);
    var cp2 = new Fovia.ColoredPoint(DU_2_SU(100), new Fovia.Util.Color(r, g, b, 1.0 * a), Fovia.ColoredPoint.enableLighting);
    var cp3 = new Fovia.ColoredPoint(DU_2_SU(2000), new Fovia.Util.Color(r, g, b, 1.0 * a), Fovia.ColoredPoint.enableLighting);
    var cp4 = new Fovia.ColoredPoint(DU_2_SU(3500), new Fovia.Util.Color(r, g, b, 0.0 * a), Fovia.ColoredPoint.enableLighting);

    var renderRange = new Fovia.RenderRangeParams([cp1, cp2, cp3, cp4], Fovia.RenderRangeParams.enable);

    return renderRange;
};

var makeColoredCTAirTF = function(r, g, b, a) {

    var cp1 = new Fovia.ColoredPoint(DU_2_SU(-1024), new Fovia.Util.Color(r, g, b, 1.0 * a), Fovia.ColoredPoint.enableLighting);
    var cp2 = new Fovia.ColoredPoint(DU_2_SU(-700), new Fovia.Util.Color(r, g, b, 1.0 * a), Fovia.ColoredPoint.enableLighting);
    var cp3 = new Fovia.ColoredPoint(DU_2_SU(-550), new Fovia.Util.Color(r, g, b, 0.0 * a), Fovia.ColoredPoint.enableLighting);

    var renderRange = new Fovia.RenderRangeParams([cp1, cp2, cp3], Fovia.RenderRangeParams.enable);

    return renderRange;
};

var makeColoredCTLiverTF1 = function(a) {
    var cp1 = new Fovia.ColoredPoint(DU_2_SU(0), new Fovia.Util.Color(0, 0, 100, 0.00 * a), Fovia.ColoredPoint.disableLighting);
    var cp2 = new Fovia.ColoredPoint(DU_2_SU(10), new Fovia.Util.Color(0, 100, 200, 0.02 * a), Fovia.ColoredPoint.disableLighting);
    var cp3 = new Fovia.ColoredPoint(DU_2_SU(100), new Fovia.Util.Color(0, 225, 255, 0.50 * a), Fovia.ColoredPoint.disableLighting);
    var cp4 = new Fovia.ColoredPoint(DU_2_SU(250), new Fovia.Util.Color(0, 225, 255, 0.50 * a), Fovia.ColoredPoint.disableLighting);

    var renderRange = new Fovia.RenderRangeParams([cp1, cp2, cp3, cp4], Fovia.RenderRangeParams.enable);

    return renderRange;
}

var makeColoredCTLiverTF2 = function(a) {
    var cp1 = new Fovia.ColoredPoint(DU_2_SU(0), new Fovia.Util.Color(50, 50, 0, 0.00 * a), Fovia.ColoredPoint.disableLighting);
    var cp2 = new Fovia.ColoredPoint(DU_2_SU(10), new Fovia.Util.Color(150, 150, 0, 0.02 * a), Fovia.ColoredPoint.disableLighting);
    var cp3 = new Fovia.ColoredPoint(DU_2_SU(100), new Fovia.Util.Color(235, 235, 0, 0.50 * a), Fovia.ColoredPoint.disableLighting);
    var cp4 = new Fovia.ColoredPoint(DU_2_SU(250), new Fovia.Util.Color(255, 255, 0, 0.50 * a), Fovia.ColoredPoint.disableLighting);

    var renderRange = new Fovia.RenderRangeParams([cp1, cp2, cp3, cp4], Fovia.RenderRangeParams.enable);

    return renderRange;
}

var makeColoredCTLiverTF3 = function(a) {
    var cp1 = new Fovia.ColoredPoint(DU_2_SU(0), new Fovia.Util.Color(100, 0, 0, 0.00 * a), Fovia.ColoredPoint.disableLighting);
    var cp2 = new Fovia.ColoredPoint(DU_2_SU(10), new Fovia.Util.Color(200, 100, 0, 0.02 * a), Fovia.ColoredPoint.disableLighting);
    var cp3 = new Fovia.ColoredPoint(DU_2_SU(100), new Fovia.Util.Color(255, 225, 0, 0.50 * a), Fovia.ColoredPoint.disableLighting);
    var cp4 = new Fovia.ColoredPoint(DU_2_SU(250), new Fovia.Util.Color(255, 225, 0, 0.50 * a), Fovia.ColoredPoint.disableLighting);

    var renderRange = new Fovia.RenderRangeParams([cp1, cp2, cp3, cp4], Fovia.RenderRangeParams.enable);

    return renderRange;
}

var makeBlueVeinsTF = function() {
    var cp1 = new Fovia.ColoredPoint(1178, new Fovia.Util.Color(7, 63, 248, 0.0137), Fovia.ColoredPoint.enableLighting);
    var cp2 = new Fovia.ColoredPoint(1390, new Fovia.Util.Color(7, 63, 248, 1.0), Fovia.ColoredPoint.enableLighting);
    var cp3 = new Fovia.ColoredPoint(1895, new Fovia.Util.Color(7, 63, 248, 0.0), Fovia.ColoredPoint.enableLighting);

    var renderRange = new Fovia.RenderRangeParams([cp1, cp2, cp3], Fovia.RenderRangeParams.enable);

    return renderRange;
}

var makeGreenLiverCloudTF = function() {
    var cp1 = new Fovia.ColoredPoint(1012, new Fovia.Util.Color(0, 255, 0, 0.0), Fovia.ColoredPoint.disableLighting);
    var cp2 = new Fovia.ColoredPoint(1022, new Fovia.Util.Color(0, 255, 0, 0.0003), Fovia.ColoredPoint.disableLighting);
    var cp3 = new Fovia.ColoredPoint(1112, new Fovia.Util.Color(0, 255, 0, 0.0005), Fovia.ColoredPoint.disableLighting);
    var cp4 = new Fovia.ColoredPoint(1262, new Fovia.Util.Color(0, 255, 0, 0.0005), Fovia.ColoredPoint.disableLighting);

    var renderRange = new Fovia.RenderRangeParams([cp1, cp2, cp3, cp4], Fovia.RenderRangeParams.enable);

    return renderRange;
}

var maketransparentCTBoneTF = function() {

    var cp1 = new Fovia.ColoredPoint(DU_2_SU(154), new Fovia.Util.Color(166, 36, 45, 0.000044), Fovia.ColoredPoint.enableLighting);
    var cp2 = new Fovia.ColoredPoint(DU_2_SU(319), new Fovia.Util.Color(207, 125, 58, 0.000208), Fovia.ColoredPoint.enableLighting);
    var cp3 = new Fovia.ColoredPoint(DU_2_SU(524), new Fovia.Util.Color(179, 164, 159, 0.000737), Fovia.ColoredPoint.enableLighting);
    var cp4 = new Fovia.ColoredPoint(DU_2_SU(892), new Fovia.Util.Color(199, 177, 173, 0.004017), Fovia.ColoredPoint.enableLighting);
    var cp5 = new Fovia.ColoredPoint(DU_2_SU(1946), new Fovia.Util.Color(55, 177, 192, 0.008452), Fovia.ColoredPoint.enableLighting);
    var cp6 = new Fovia.ColoredPoint(DU_2_SU(3071), new Fovia.Util.Color(44, 155, 192, 0.000945), Fovia.ColoredPoint.enableLighting);

    var renderRange = new Fovia.RenderRangeParams([cp1, cp2, cp3, cp4, cp5, cp6], Fovia.RenderRangeParams.enable);

    return renderRange;
};
