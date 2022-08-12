import './style.css'

import * as THREE from 'three';
import { Scene } from 'three';
import { AxesHelper } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(120, window.innerWidth / window.innerHeight, 0.05, 1000);

const renderer = new THREE.WebGL1Renderer({
  canvas: document.getElementById('bg'),
})


renderer.setPixelRatio(devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.z = 5;


renderer.render(scene, camera);

const lava_texture = new THREE.TextureLoader().load('./lava_texture.webp');
const torus_texture = new THREE.TextureLoader().load('./torus_texture.jpeg');
const planet_texture = new THREE.TextureLoader().load('./planet_texture.jpeg');
const normal_planet_texture = new THREE.TextureLoader().load('./planet_normal_map.jpeg');
const space_texture = new THREE.TextureLoader().load('./space_background.jpeg');
scene.background = space_texture;

const controls = new OrbitControls(camera, renderer.domElement);
const grid_helper = new THREE.GridHelper(200, 200);

const cube_1_geometry = new THREE.IcosahedronGeometry(5, 1);
const cube_1_material = new THREE.MeshStandardMaterial({map: lava_texture, roughness: 0.5});

const torus_1_geometry = new THREE.TorusKnotGeometry();
const torus_1_material = new THREE.MeshStandardMaterial({map: torus_texture, roughness: 0});

const cube_1 = new THREE.Mesh(cube_1_geometry, cube_1_material);
const torus_1 = new THREE.Mesh(torus_1_geometry, torus_1_material);
const planet = new THREE.Mesh(
    new THREE.SphereGeometry(4, 32, 32),
    new THREE.MeshStandardMaterial({
      map: planet_texture,
      normalMap: normal_planet_texture
    })
);

const point_light = new THREE.PointLight('#f04100', 2, 200, 0.5);
point_light.position.set(10, 10, 5);

const ambient_light = new THREE.AmbientLight('#f0ffa3', 2);
ambient_light.position.set(-10, 10, -10);

planet.position.set(-10, 10, -10);


cube_1.translateX(7);
cube_1.translateY(2);
cube_1.translateZ(-10);
torus_1.translateX(-2);
torus_1.translateY(2)
torus_1.translateZ(-5);

scene.add(torus_1);
scene.add(cube_1);

scene.add(planet);

scene.add(point_light);
scene.add(ambient_light);

scene.add(grid_helper);

function add_star() {
  const star_geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const star_material = new THREE.MeshNormalMaterial('#ffffff');
  const star = new THREE.Mesh(star_geometry, star_material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(200).fill().forEach(add_star);

function animate(time) {
  requestAnimationFrame(animate);
    torus_1.rotation.z += 0.02;
    torus_1.rotation.y += 0.001;
    torus_1.rotation.x += 0.03

    cube_1.rotation.x += 0.01;
    cube_1.rotation.y += 0.01;

    planet.rotation.y +=0.001;

    renderer.render(scene, camera);
    controls.update();
}

animate();