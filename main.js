import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
var winW = window.innerWidth;
var winH = window.innerHeight;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(50, winW / winH, 0.01, 10);

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(winW, winH);
document.body.appendChild(renderer.domElement);

var radius = 4;
var height = 5;

var geometry = new THREE.CylinderGeometry(0, radius, height, 4, 1)
var material = new THREE.MeshNormalMaterial();
var pyramid = new THREE.Mesh(geometry, material);
scene.add(pyramid);

camera.position.z = 10;

var controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;  
controls.dampingFactor = 0.25; 
controls.screenSpacePanning = false;

var rotateLeft = false;
var rotateRight = false;

var render = function () {
    requestAnimationFrame(render);
    controls.update();
    if (rotateLeft) {
        pyramid.rotation.y += 0.01;
    }
    if (rotateRight) {
        pyramid.rotation.y -= 0.01;
    }
    renderer.render(scene, camera);
};

document.querySelector('.top-view').addEventListener('click', function () {
    camera.position.set(0, 10, 0); 
    camera.lookAt(0, 0, 0);      
});
document.querySelector('.front-view').addEventListener('click', function () {
    camera.position.set(0, 0, 10); 
    camera.lookAt(0, 0, 0);      
});
document.querySelector('.rotate-left').addEventListener('click', function () {
    rotateLeft = !rotateLeft;
});
document.querySelector('.rotate-right').addEventListener('click', function () {
    rotateRight = !rotateRight;
});

render();