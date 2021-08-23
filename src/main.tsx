import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import space from './space.jpg'
import utopia from './utopia-clear.png'


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);


const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0xffffff, 0);
renderer.setClearAlpha(.1)
renderer.domElement.style.position = "fixed"
renderer.domElement.style.top = "0"
renderer.domElement.style.left = "0"
renderer.domElement.style.zIndex = "-1"
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

camera.position.setZ(30);
camera.position.setX(-3);

const utopiaTexture = new THREE.TextureLoader().load(utopia);


const spaceTexture = new THREE.TextureLoader().load(space);
scene.background = spaceTexture;

// Torus

const geometry = new THREE.CylinderBufferGeometry(15, 15, 2, 100);
const material = new THREE.MeshBasicMaterial({ map: utopiaTexture , color: 0x999999, wireframe: false, transparent: false, opacity: 0.85 })
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

function addStar() {
  const geometry = new THREE.SphereGeometry(THREE.MathUtils.randFloatSpread(1), 24, 24);
  const material = new THREE.MeshBasicMaterial({ color: THREE.Color.NAMES.aliceblue });
  console.log(material.color)
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = [THREE.MathUtils.randFloatSpread(500), THREE.MathUtils.randFloatSpread(500), THREE.MathUtils.randFloatSpread(500)];

  star.position.set(x, y, z);
  scene.add(star);
}


var times = 2000;
for(var i=0; i < times; i++){
  addStar();
}



// Helpers

//const lightHelper = new THREE.PointLightHelper(pointLight)
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
  render()
}

function render() {
  renderer.render(scene, camera)
}

function animate() {
  requestAnimationFrame(animate)

  torus.rotation.x += 0.01
  torus.rotation.y += 0.01

  controls.update()

  render()
}
animate()