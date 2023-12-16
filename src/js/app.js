import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import { gsap } from 'gsap';

export default function () {
  const body = document.querySelector('body');

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
  });

  const container = document.querySelector('#container');
  container.appendChild(renderer.domElement);

  const canvasSize = {
    width: window.innerWidth,
    height: window.innerHeight,
  };


  
  let mouseY;
  let object

  const clock = new THREE.Clock();
  const textureLoader = new THREE.TextureLoader();
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    canvasSize.width / canvasSize.height,
    0.1,
    100
  );

  /** fog */
  // scene.fog = new THREE.Fog('rgba(255,0,255,0.0001)', 1, 1);
  
  /** light */
  const pointLight = new THREE.PointLight('#00b3ff', 3.4)
  pointLight.position.x = 2
  pointLight.position.y = 3
  pointLight.position.z = 4
  scene.add(pointLight)
  

 
  /** texture */
  const texture = textureLoader.load('public/assets/mountin.avif')
  const height = textureLoader.load('public/static/height.png')
  const height2 = textureLoader.load('public/static/height2.png')
  const height3 = textureLoader.load('public/static/height3.png')
  const height4 = textureLoader.load('public/static/height4.png')
  const height5 = textureLoader.load('public/static/height5.png')
  const alpha = textureLoader.load('public/static/alpha2.png')

  /** Camera */
  camera.position.set(0.1, 0, 3.4);
  
  
  /** Controls */
  


  /** createObject */
  const creatObject = () =>{
    const geometry = new THREE.PlaneBufferGeometry(3, 3, 64, 64)
    const material = new THREE.MeshStandardMaterial({
      color: 'gray',
      map:texture,
      displacementMap : height5,
      displacementScale : .9,
      alphaMap: alpha,
      transparent: true,
      depthTest :false,
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.rotation.x = 181
    // mesh.rotation.y = 0.15
    object = mesh;
    return mesh;
  }

  /** create */
  const create = () => {
    const mesh = creatObject()
    scene.add(mesh);
    return {
      mesh
    };
  };

  const resize = () => {
    canvasSize.width = window.innerWidth;
    canvasSize.height = window.innerHeight;

    camera.aspect = canvasSize.width / canvasSize.height;
    camera.updateProjectionMatrix();

    renderer.setSize(canvasSize.width, canvasSize.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if(window.innerWidth <= 576){
        object.position.x = -.2
        object.position.y = -.3
    }else if(window.innerWidth >= 577){
      
      object.position.x = .7
      object.position.y = 0
    } 
    body.style.fontSize = window.innerWidth / 1920 + 'px'

  };



  const addEvent = () => {
    window.addEventListener('resize', resize);
    window.addEventListener("scroll", () => {
    });
    window.addEventListener('mousemove', (e) => {
      mouseY = e.clientY;
    })
  };
  


  const draw = (obj) => {
    const { mesh } = obj;
    const time = clock.getElapsedTime();
    mesh.rotation.z = .3 * time
    
    mesh.material.displacementScale = mouseY * 0.0007 + 0.5

    renderer.render(scene, camera);

    requestAnimationFrame(() => {
      draw(obj);
    });
  };




  const initialize = () => {
    const obj = create();
    addEvent();
    resize();
    draw(obj);
  };

  initialize();
}