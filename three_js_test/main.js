import './style.css'

import * as THREE from 'three';
import { Scene } from 'three';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.05, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.getElementById('bg'),
})


renderer.setPixelRatio(devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 2;


renderer.render(scene, camera);

const cube_1_geometry = new THREE.BoxGeometry(1, 1, 1);
const cube_1_material = new THREE.MeshMatcapMaterial({color: '#f6c412'});

const torus_1_geometry = new THREE.TorusKnotGeometry();
const torus_1_material = new THREE.MeshBasicMaterial({color: '#f6c412', wireframe: true});

const cube_1 = new THREE.Mesh(cube_1_geometry, cube_1_material);
const torus_1 = new THREE.Mesh(torus_1_geometry, torus_1_material);

cube_1.translateX(2);
cube_1.translateZ(-5);
torus_1.translateX(-2);
torus_1.translateZ(-3);

scene.add(torus_1);
scene.add(cube_1);

function animate(time) {
  requestAnimationFrame(animate);
    torus_1.rotation.z += 0.02;

    cube_1.rotation.x += 0.01;
    cube_1.rotation.y += 0.01;
    renderer.render(scene, camera);
}

animate();