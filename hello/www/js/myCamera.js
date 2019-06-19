var app = {
  startCameraAbove: function(){
    CameraPreview.startCamera({x: 50, y: 50, width: 300, height: 300, toBack: false, previewDrag: true, tapPhoto: true});
  },

  startCameraBelow: function(){
    CameraPreview.startCamera({x: 0, y: 0, width: screen.width, height: screen.height * 0.8, camera: "front", tapPhoto: true, previewDrag: false, toBack: true});
  },

  stopCamera: function(){
    CameraPreview.stopCamera();
  },

  takePicture: function(){
	  
	  /*CameraPreview.takePicture(function(imgData){
      document.getElementById('img').src = 'data:image/jpeg;base64,' + imgData;
	  CameraPreview.hide();
	  document.getElementById('block2').classList.remove("displayNone");
	  document.getElementById('block1').classList.add("displayNone");
    },function(err){alert(err);});*/
	
	  cordova.plugins.permissions.checkPermission(cordova.plugins.permissions.CAMERA, function( status ){
		if ( status.hasPermission ) {
			alert("Yes :D ");
		}else {
			
			alert("No :( ");
			
			cordova.plugins.permissions.requestPermission(cordova.plugins.permissions.CAMERA, function(){alert("got it");}, 
			function(){alert("NOO..")});
		}
	});
	
   
  },

  switchCamera: function(){
    CameraPreview.switchCamera();
  },

  show: function(){
    CameraPreview.show();
  },

  hide: function(){
    //CameraPreview.hide();
	  document.getElementById('img').src = '';
	  CameraPreview.show();
	  document.getElementById('block1').classList.remove("displayNone");
	  document.getElementById('block2').classList.add("displayNone");
  },

  changeColorEffect: function(){
    var effect = document.getElementById('selectColorEffect').value;
    CameraPreview.setColorEffect(effect);
  },

  changeFlashMode: function(){
    var mode = document.getElementById('selectFlashMode').value;
    CameraPreview.setFlashMode(mode);
  },

  changeZoom: function(){
    var zoom = document.getElementById('zoomSlider').value;
    document.getElementById('zoomValue').innerHTML = zoom;
    CameraPreview.setZoom(zoom);
  },

  changePreviewSize: function(){
    window.smallPreview = !window.smallPreview;
    if(window.smallPreview){
      CameraPreview.setPreviewSize({width: 100, height: 100});
    }else{
      CameraPreview.setPreviewSize({width: window.screen.width, height: window.screen.height});
    }
  },

  showSupportedPictureSizes: function(){
    CameraPreview.getSupportedPictureSizes(function(dimensions){
      dimensions.forEach(function(dimension) {
        alert(dimension.width + 'x' + dimension.height);
      });
    });
  },

  init: function(){
	this.startCameraBelow();
	  
	document.getElementById('taker').addEventListener('click', this.takePicture, false);
	document.getElementById('again').addEventListener('click', this.hide, false);
    /*document.getElementById('startCameraAboveButton').addEventListener('click', this.startCameraAbove, false);
    document.getElementById('startCameraBelowButton').addEventListener('click', this.startCameraBelow, false);

    document.getElementById('stopCameraButton').addEventListener('click', this.stopCamera, false);
    document.getElementById('switchCameraButton').addEventListener('click', this.switchCamera, false);
    document.getElementById('showButton').addEventListener('click', this.show, false);
    document.getElementById('hideButton').addEventListener('click', this.hide, false);
   
    document.getElementById('selectColorEffect').addEventListener('change', this.changeColorEffect, false);
    document.getElementById('selectFlashMode').addEventListener('change', this.changeFlashMode, false);

    if(navigator.userAgent.match(/Android/i)  == "Android"){
      document.getElementById('zoomSlider').addEventListener('change', this.changeZoom, false);
    }else{
      document.getElementById('androidOnly').style.display = 'none';
    }

    window.smallPreview = false;
    document.getElementById('changePreviewSize').addEventListener('click', this.changePreviewSize, false);

    document.getElementById('showSupportedPictureSizes').addEventListener('click', this.showSupportedPictureSizes, false);*/

    // legacy - not sure if this was supposed to fix anything
    //window.addEventListener('orientationchange', this.onStopCamera, false);
  },

};

document.addEventListener('deviceready', function(){	
  app.init();
}, false);
