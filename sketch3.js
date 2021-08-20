// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");
const { TextureLoader } = require("three");

const settings = {
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl"
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas
  });

  // WebGL background color
  renderer.setClearColor("#000", 1);

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 500);
  camera.position.set(-1, 2, -6);
  camera.lookAt(new THREE.Vector3());

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera, context.canvas);

  // Setup your scene
  const scene = new THREE.Scene();

  // Setup a geometry
  const geometry = new THREE.SphereGeometry(1, 32, 16);

  // Texture
  const loader = new TextureLoader();
  const earthTexture = loader.load("earth.jpg");
  const moonTexture = loader.load("moon.jpg");

  // Setup a material
  const material = new THREE.MeshStandardMaterial({
    roughness: 1,
    map: earthTexture
  });

  const moonGroup = new THREE.Group();
  const moonMaterial = new THREE.MeshStandardMaterial({
    roughness: 1,
    map: moonTexture,
  });

  // Setup a mesh with geometry + material
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const moonMesh = new THREE.Mesh(geometry, moonMaterial);
  moonMesh.position.set(2, 0, 0);
  moonMesh.scale.setScalar(1/6);
  moonGroup.add(moonMesh);
  scene.add(moonGroup);

  const light = new THREE.PointLight('white', 1);
  light.position.set(3,1,-5);
  scene.add(light);

  // scene.add(new THREE.PointLightHelper(light, 0.2));
  // scene.add(new THREE.GridHelper(5, 20));
  // scene.add(new THREE.AxesHelper(5));


  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({ time }) {
      mesh.rotation.y = time * 0.2;
      moonMesh.rotation.y = time * 0.18;
      moonGroup.rotation.y = time * 0.5;
      controls.update();
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      controls.dispose();
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
