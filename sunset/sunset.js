/////////////////////////////////////////////////////////////////////////////////////////
//  UBC CPSC 314,  September 2022, Assignment 1 
/////////////////////////////////////////////////////////////////////////////////////////


// COLORS
var bgColor = new THREE.Color(0xf89e9d);
var newColor = new THREE.Color(0xf89e9d);

// SETUP RENDERER & SCENE
var canvas = document.getElementById('canvas');
var scene = new THREE.Scene();
var renderer = new THREE.WebGLRenderer();
  // set background colour to 0xRRGGBB  where RR,GG,BB are values in [00,ff] in hexadecimal, i.e., [0,255] 
scene.background = bgColor;     
canvas.appendChild(renderer.domElement);

// SETUP CAMERA
var camera = new THREE.PerspectiveCamera(30,1,0.1,1000); // view angle, aspect ratio, near, far
camera.position.set(0,12,40);
camera.lookAt(0,0,0);
scene.add(camera);

// SETUP ORBIT CONTROLS OF THE CAMERA
var controls = new THREE.OrbitControls(camera);
controls.damping = 0.1;
controls.autoRotate = true;

// ADAPT TO WINDOW RESIZE
function resize() {
  renderer.setSize(window.innerWidth,window.innerHeight);
  camera.aspect = window.innerWidth/window.innerHeight;
  camera.updateProjectionMatrix();
}

// EVENT LISTENER RESIZE
window.addEventListener('resize',resize);
resize();

//SCROLLBAR FUNCTION DISABLE
window.onscroll = function () {
  window.scrollTo(0,0);
}

var leaveDarkMaterial = new THREE.MeshLambertMaterial( { color: 0x91E56E } );
var leaveLightMaterial = new THREE.MeshLambertMaterial( { color: 0xA2FF7A } );
var leaveDarkDarkMaterial = new THREE.MeshLambertMaterial( { color: 0x71B356 } );
var stemMaterial = new THREE.MeshLambertMaterial( { color: 0x7D5A4F } );
var sunMaterial = new THREE.MeshLambertMaterial({
  color: 0xffffe0,
  transparent: true,
  opacity: 0.5,
  side: THREE.DoubleSide,
});

/////////////////////////////////////	
// ADD LIGHTS  and define a simple material that uses lighting
/////////////////////////////////////	

light = new THREE.PointLight(0xffffff);
light.position.set(17, -2, 0);
scene.add(light);
ambientLight = new THREE.AmbientLight(0x606060);
scene.add(ambientLight);

///////////////////////////////////////////////////////////////////////////////////////////
//  OBJECTS
///////////////////////////////////////////////////////////////////////////////////////////

sphereGeometry = new THREE.SphereGeometry(0.3, 32, 32);    // radius, segments, segments
sphere = new THREE.Mesh(sphereGeometry, sunMaterial);
sphere.position.set(light.position.x, light.position.y, light.position.z);
scene.add(sphere);

geometry = new THREE.BoxGeometry( 1, 1, 1 );

var basex = -4;
var basez = -4;
const NUM_ROWS = 9;
const NUM_COLUMNS = 9;

for (let i = 0; i < NUM_ROWS; i++) {
  for (let j = 0; j < NUM_COLUMNS; j++) {
    if (Math.random() >= 0.5) {
      var stem = new THREE.Mesh( geometry, stemMaterial );
      stem.position.set( basex + i, 0, basez + j );
      stem.scale.set( 0.3, 1.5, 0.3 );

      var squareLeave01 = new THREE.Mesh( geometry, leaveDarkMaterial );
      squareLeave01.position.set( basex + 0.5 + i, 1.6, basez + 0.5 + j );
      squareLeave01.scale.set( 0.8, 0.8, 0.8 );

      var squareLeave02 = new THREE.Mesh( geometry, leaveDarkMaterial );
      squareLeave02.position.set( basex + -0.4 + i, 1.3, basez + -0.4 + j );
      squareLeave02.scale.set( 0.7, 0.7, 0.7 );

      var squareLeave03 = new THREE.Mesh( geometry, leaveDarkMaterial );
      squareLeave03.position.set( basex + 0.4 + i, 1.7, basez + -0.5 + j );
      squareLeave03.scale.set( 0.7, 0.7, 0.7 );

      var leaveDark = new THREE.Mesh( geometry, leaveDarkMaterial );
      leaveDark.position.set( basex + 0 + i, 1.2, basez + 0 + j );
      leaveDark.scale.set( 1, 2, 1 );

      var leaveLight = new THREE.Mesh( geometry, leaveLightMaterial );
      leaveLight.position.set( basex + 0 + i, 1.2, basez + 0 + j );
      leaveLight.scale.set( 1.1, 0.5, 1.1 );

      var ground = new THREE.Mesh( geometry, leaveDarkDarkMaterial );
      ground.position.set( basex + 0 + i, -1, basez + 0 + j );
      ground.scale.set( 2.4, 0.8, 2.4 );

      var tree = new THREE.Group();
      tree.add( leaveDark );
      tree.add( leaveLight );
      tree.add( squareLeave01 );
      tree.add( squareLeave02 );
      tree.add( squareLeave03 );
      tree.add( ground );
      tree.add( stem );

      tree.position.x = basex + i;
      tree.position.z = basez + j;
      scene.add( tree );

    } else {
      
      var ground = new THREE.Mesh( geometry, leaveDarkDarkMaterial );
      ground.position.set( (basex + 0 + i) * 2, -1, (basez + 0 + j) * 2);
      ground.scale.set( 2.4, 0.8, 2.4 );
      scene.add(ground);
    }
  }
}

///////////////////////////////////////////////////////////////////////////////////////
// EVENT LISTENER
///////////////////////////////////////////////////////////////////////////////////////

var keyboard = new THREEx.KeyboardState();
function checkKeyboard() {
  
  if (keyboard.pressed("A")) {
    light.position.x -= 0.1;
    light.position.y = - light.position.x * light.position.x * 0.05 + 14
  
  } else if (keyboard.pressed("D")) {
    light.position.x += 0.1;
    light.position.y = - light.position.x * light.position.x * 0.05 + 14;
  }
  
  sphere.position.set(light.position.x, light.position.y, light.position.z);

  // set new colors
  if (light.position.x < 17 && light.position.x > 10) {
    newColor = new THREE.Color(0xf89e9d);
  } else if (light.position.x < 10 && light.position.x > 3) {
    newColor = new THREE.Color(0xf5b041);
  } else if (light.position.x < 0 && light.position.x > -7) {
    newColor = new THREE.Color(0xfefebe);
  } else if (light.position.x < -7 && light.position.x > -15) {
    newColor = new THREE.Color(0x5B2C6F);
  } else if (light.position.x < -15) {
    newColor = new THREE.Color(0x000000);
  }
}

///////////////////////////////////////////////////////////////////////////////////////
// UPDATE CALLBACK
///////////////////////////////////////////////////////////////////////////////////////

tick = 0;
function update() {
  TWEEN.update();
  controls.update();
  checkKeyboard();
  tick++;
  
  tween = new TWEEN.Tween(scene.background).to(newColor).start();
  renderer.render(scene, camera);

  requestAnimationFrame(update);      // requests the next update call;  this creates a loop
}

update();

