var T_WIDTH = 500;
var T_HEIGHT = 400;

var canvas = document.getElementById('item');
canvas.style="border: 1px solid #000;width: "+T_WIDTH+"px; height:"+T_HEIGHT+"px;";

// criar uma cena...
var cena = new THREE.Scene();
cena.background = new THREE.Color( 0xffffff );

var clock = new THREE.Clock();
var misturador = new THREE.AnimationMixer(cena);

var carregador = new THREE.GLTFLoader();

var renderer = new THREE.WebGLRenderer( { canvas: canvas } );
renderer.shadowMap.enabled = true;
renderer.setSize( T_WIDTH, T_HEIGHT );
// criar uma camara...
var camara = new THREE.PerspectiveCamera( 70, T_WIDTH / T_HEIGHT, 0.01, 1000 );

camara.position.set(-10, 10, 10);
camara.lookAt(0,0,0);

/* Alguns Objetos */
var mesa;

 /*Animações */
 var benchExtendAction,legExtend1Action,doorAction,door2Action;

carregador.load(
 'models/workbench.gltf',
 function ( gltf ) {
        
    cena.add( gltf.scene );

    let clipe = THREE.AnimationClip.findByName( gltf.animations, 'benchExtendAction' );
    lado = misturador.clipAction( clipe );
    clipe = THREE.AnimationClip.findByName( gltf.animations, 'legExtend1Action' );
    suporte = misturador.clipAction( clipe );
    clipe = THREE.AnimationClip.findByName( gltf.animations, 'doorAction' );
    door1 = misturador.clipAction( clipe );
    clipe = THREE.AnimationClip.findByName( gltf.animations, 'door2Action' );
    door2 = misturador.clipAction( clipe );
 }
);

// iniciar animação..
const controls = new THREE.OrbitControls( camara, renderer.domElement );
controls.update();

animar();
function animar() {
    requestAnimationFrame( animar );
    controls.update();
    misturador.update( clock.getDelta() );
    renderer.render( cena, camara );
}

var x = true
var y = true
var z = true

document.getElementById('button_side').onclick = function(){
    lado.setLoop(THREE.LoopOnce)
    suporte.setLoop(THREE.LoopOnce)
    lado.clampWhenFinished = true
    suporte.clampWhenFinished = true
    if (x) {
        lado.timeScale = 1
        suporte.timeScale = 1
    } else {
        lado.timeScale = -1
        suporte.timeScale = -1
    }
    x = ! x
    lado.paused = false
    suporte.paused = false
    lado.play()
    suporte.play()
}

document.getElementById('button_door1').onclick = function(){
    door1.setLoop(THREE.LoopOnce)
    door1.clampWhenFinished = true
    if (y) {
        door1.timeScale = 1
    } else {
        door1.timeScale = -1
    }
    y = ! y
    door1.paused = false
    door1.play()
}

document.getElementById('button_door2').onclick = function(){
    door2.setLoop(THREE.LoopOnce)
    door2.clampWhenFinished = true
    if (z) {
        door2.timeScale = 1
    } else {
        door2.timeScale = -1
    }
    z = ! z
    door2.paused = false
    door2.play()
}

animar()
