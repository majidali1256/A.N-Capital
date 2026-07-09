/**
 * ==========================================================================
 * A.N CAPITAL — LUXURY FINANCIAL DIGITAL PRESENCE
 * Centralized Three.js & WebGL 3D Visualization Engine
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initWebGLBackground('webgl-bg');
  initHeroMonogram3D('threejs-hero-container');
  initServices3DScene('threejs-services-container');
  initAboutSkyscrapers3D('threejs-about-hero');
  initServicesHeaderDual3D('threejs-services-header');
});

/**
 * 1. WebGL Luxury Liquid Gold & Charcoal Background Shader
 */
function initWebGLBackground(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const gl = canvas.getContext('webgl');
  if (!gl) return;

  const vsSource = `
    attribute vec4 a_position;
    varying vec2 v_texCoord;
    void main() {
      gl_Position = a_position;
      v_texCoord = a_position.xy;
    }
  `;

  const fsSource = `
    precision highp float;
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    varying vec2 v_texCoord;

    void main() {
      vec2 uv = v_texCoord;
      vec2 mouse = u_mouse / u_resolution;
      
      float noise = sin(uv.x * 3.0 + u_time * 0.2) * cos(uv.y * 3.0 - u_time * 0.3);
      noise += sin(uv.x * 5.0 - u_time * 0.4) * cos(uv.y * 2.0 + u_time * 0.2) * 0.5;
      
      vec3 color = vec3(0.05, 0.05, 0.05);
      vec3 gold = vec3(0.83, 0.69, 0.22);
      
      float highlight = smoothstep(0.4, 0.9, noise * 0.5 + 0.5);
      color = mix(color, gold * 0.15, highlight);
      
      float dist = distance(uv, mouse);
      float glow = smoothstep(0.3, 0.0, dist);
      color += gold * glow * 0.05;
      
      float vignette = smoothstep(0.8, 0.3, length(uv - 0.5));
      color *= vignette;
      
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  }

  const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

  const program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.useProgram(program);

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  const positions = [
    -1.0, -1.0,
     1.0, -1.0,
    -1.0,  1.0,
     1.0, -1.0,
     1.0,  1.0,
    -1.0,  1.0,
  ];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

  const posAttr = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(posAttr);
  gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

  const timeLocation = gl.getUniformLocation(program, "u_time");
  const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
  const mouseLocation = gl.getUniformLocation(program, "u_mouse");

  let mouseX = 0, mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function render(time) {
    time *= 0.001;
    const displayWidth  = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
      canvas.width  = displayWidth;
      canvas.height = displayHeight;
    }
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.uniform1f(timeLocation, time);
    gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
    gl.uniform2f(mouseLocation, mouseX, gl.canvas.height - mouseY);
    gl.drawArrays(gl.TRIANGLES, 0, 6);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

/**
 * 2. Hero Architectural Monogram 3D Sculpture
 */
function initHeroMonogram3D(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof THREE === 'undefined') return;

  const width = container.clientWidth || 560;
  const height = container.clientHeight || 500;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xd4af37, 2.5, 50);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  const group = new THREE.Group();
  const material = new THREE.MeshPhongMaterial({
    color: 0xd4af37,
    shininess: 120,
    specular: 0xffffff
  });

  const pillarGeo = new THREE.BoxGeometry(0.5, 3.2, 0.5);
  const leftPillar = new THREE.Mesh(pillarGeo, material);
  leftPillar.position.set(-1, 0, 0);
  leftPillar.rotation.z = 0.2;
  group.add(leftPillar);

  const rightPillar = new THREE.Mesh(pillarGeo, material);
  rightPillar.position.set(1, 0, 0);
  rightPillar.rotation.z = -0.2;
  group.add(rightPillar);

  const beamGeo = new THREE.BoxGeometry(2, 0.2, 0.2);
  for (let i = 0; i < 5; i++) {
    const beam = new THREE.Mesh(beamGeo, material);
    beam.position.y = -1 + (i * 0.6);
    beam.scale.x = 1 - (i * 0.15);
    group.add(beam);
  }

  scene.add(group);
  camera.position.z = 5.2;

  function animate() {
    requestAnimationFrame(animate);
    group.rotation.y += 0.006;
    group.position.y = Math.sin(Date.now() * 0.0012) * 0.18;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const w = container.clientWidth || 560;
    const h = container.clientHeight || 500;
    renderer.setSize(w, h);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  });
}

/**
 * 3. Services 3D Scene (Real Estate Building + Candlestick Chart + Upward Trend Line)
 */
function initServices3DScene(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  const group = new THREE.Group();
  scene.add(group);

  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.85,
    roughness: 0.2,
    emissive: 0xd4af37,
    emissiveIntensity: 0.12
  });
  const glassMat = new THREE.MeshPhysicalMaterial({
    color: 0x3a3939,
    metalness: 0.9,
    roughness: 0.05,
    transparent: true,
    opacity: 0.75,
    transmission: 0.5,
    thickness: 0.5
  });

  const elementsGroup = new THREE.Group();
  group.add(elementsGroup);

  /**
   * DIVISION 1: Real Estate Investments (Far Left: x = -6.2)
   * High-yield Glass & Gold Skyscraper Tower
   */
  const realEstateGroup = new THREE.Group();
  realEstateGroup.position.set(-6.2, 0, 0);
  elementsGroup.add(realEstateGroup);

  const towerBaseGeom = new THREE.BoxGeometry(1.8, 5.5, 1.8);
  const tower = new THREE.Mesh(towerBaseGeom, glassMat);
  realEstateGroup.add(tower);

  for (let i = -2.4; i <= 2.4; i += 0.8) {
    const ringGeom = new THREE.BoxGeometry(1.9, 0.06, 1.9);
    const ring = new THREE.Mesh(ringGeom, goldMat);
    ring.position.y = i;
    realEstateGroup.add(ring);
  }

  /**
   * DIVISION 2: Forex & Trading (Mid-Left: x = -2.1)
   * Candlesticks + Upward Gold Trend Line
   */
  const chartGroup = new THREE.Group();
  chartGroup.position.set(-2.1, 0, 0);
  elementsGroup.add(chartGroup);

  for (let i = 0; i < 4; i++) {
    const height = 1.2 + Math.random() * 2.8;
    const candleGeom = new THREE.BoxGeometry(0.38, height, 0.38);
    const candle = new THREE.Mesh(candleGeom, i % 2 === 0 ? goldMat : glassMat);
    candle.position.set((i - 1.5) * 0.65, (height / 2) - 1.8, 0);
    chartGroup.add(candle);
  }

  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1.2, -1.8, 0),
    new THREE.Vector3(-0.4, -0.6, 0.4),
    new THREE.Vector3(0.4, 0.5, 0),
    new THREE.Vector3(1.2, 2.2, 0.3)
  ]);
  const points = curve.getPoints(40);
  const lineGeom = new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 64, 0.06, 8, false);
  const lineMesh = new THREE.Mesh(lineGeom, goldMat);
  chartGroup.add(lineMesh);

  /**
   * DIVISION 3: Physical Imports / Exports & Commodities (Mid-Right: x = 2.1)
   * 3D Intermodal Shipping Cargo Containers + Bullion Bar
   */
  const cargoGroup = new THREE.Group();
  cargoGroup.position.set(2.1, -0.4, 0);
  elementsGroup.add(cargoGroup);

  // Stacked 3D Cargo Shipping Containers
  const containerGeo = new THREE.BoxGeometry(2.0, 0.85, 0.95);
  const containerMesh1 = new THREE.Mesh(containerGeo, goldMat);
  containerMesh1.position.set(0, -0.9, 0);
  cargoGroup.add(containerMesh1);

  const containerMesh2 = new THREE.Mesh(containerGeo, glassMat);
  containerMesh2.position.set(0.15, 0.05, 0.1);
  cargoGroup.add(containerMesh2);

  const containerMesh3 = new THREE.Mesh(containerGeo, goldMat);
  containerMesh3.position.set(-0.15, 1.0, -0.1);
  cargoGroup.add(containerMesh3);

  // Decorative crane/rig hoist lines
  const hoistGeo = new THREE.BoxGeometry(0.04, 3.0, 0.04);
  const hoist1 = new THREE.Mesh(hoistGeo, goldMat);
  hoist1.position.set(-0.95, 1.5, 0.45);
  cargoGroup.add(hoist1);

  const hoist2 = new THREE.Mesh(hoistGeo, goldMat);
  hoist2.position.set(0.95, 1.5, -0.45);
  cargoGroup.add(hoist2);

  /**
   * DIVISION 4: Wealth Creation & Architecture (Far Right: x = 6.2)
   * Institutional Vault Shield & Floating Diamond Core
   */
  const wealthGroup = new THREE.Group();
  wealthGroup.position.set(6.2, 0, 0);
  elementsGroup.add(wealthGroup);

  // Concentric Vault Shield Rings
  const outerRingGeo = new THREE.TorusGeometry(1.6, 0.08, 16, 64);
  const outerRing = new THREE.Mesh(outerRingGeo, goldMat);
  outerRing.rotation.x = Math.PI / 4;
  wealthGroup.add(outerRing);

  const innerRingGeo = new THREE.TorusGeometry(1.1, 0.06, 16, 64);
  const innerRing = new THREE.Mesh(innerRingGeo, glassMat);
  innerRing.rotation.y = Math.PI / 3;
  wealthGroup.add(innerRing);

  // Core Diamond Gem
  const diamondGeo = new THREE.OctahedronGeometry(0.7, 0);
  const diamond = new THREE.Mesh(diamondGeo, goldMat);
  wealthGroup.add(diamond);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xd4af37, 2.5, 100);
  pointLight.position.set(10, 12, 10);
  scene.add(pointLight);

  camera.position.set(0, 1.2, 11.5);
  camera.lookAt(0, 0, 0);

  const divisionGroups = [realEstateGroup, chartGroup, cargoGroup, wealthGroup];

  function animate() {
    requestAnimationFrame(animate);
    const time = Date.now() * 0.0009;

    // Orbital Carousel Motion
    const orbitRadiusX = 5.4;
    const orbitRadiusZ = 3.8;

    divisionGroups.forEach((node, index) => {
      const angle = time + index * (Math.PI / 2);

      const x = Math.sin(angle) * orbitRadiusX;
      const z = Math.cos(angle) * orbitRadiusZ;
      node.position.x = x;
      node.position.z = z;

      // Depth Factor: 0 (back) -> 1 (front)
      const depthFactor = (z + orbitRadiusZ) / (2 * orbitRadiusZ);

      // Smooth zoom: front icon scales up beautifully
      const zoom = 0.6 + Math.pow(depthFactor, 1.6) * 0.82;
      node.scale.set(zoom, zoom, zoom);

      // Float vertical motion and prominence elevation
      node.position.y = Math.sin(time * 2 + index) * 0.28 + (depthFactor * 0.5 - 0.25);
    });

    // Self rotations
    realEstateGroup.rotation.y += 0.012;
    chartGroup.rotation.y += 0.015;
    cargoGroup.rotation.y += 0.01;
    wealthGroup.rotation.y += 0.014;
    outerRing.rotation.z += 0.02;
    diamond.rotation.y += 0.03;

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

/**
 * 4. About Us 3D Skyscraper Cluster & Floating Financial Rings
 */
function initAboutSkyscrapers3D(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.55);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xd4af37, 2);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  const buildingGroup = new THREE.Group();
  const createTower = (w, h, d, x, z, color) => {
    const geometry = new THREE.BoxGeometry(w, h, d);
    const material = new THREE.MeshPhongMaterial({
      color: color,
      transparent: true,
      opacity: 0.85,
      shininess: 100
    });
    const tower = new THREE.Mesh(geometry, material);
    tower.position.set(x, h/2, z);
    const wireframeGeom = new THREE.EdgesGeometry(geometry);
    const wireframeMat = new THREE.LineBasicMaterial({ color: 0xd4af37, transparent: true, opacity: 0.4 });
    const wireframe = new THREE.LineSegments(wireframeGeom, wireframeMat);
    tower.add(wireframe);
    return tower;
  };

  buildingGroup.add(createTower(2, 8, 2, 0, 0, 0x1c1b1b));
  buildingGroup.add(createTower(1.5, 6, 1.5, -2.5, -1, 0x1c1b1b));
  buildingGroup.add(createTower(1.5, 5, 1.5, 2.5, -1, 0x1c1b1b));

  const financeGroup = new THREE.Group();
  for (let i = 0; i < 12; i++) {
    const h = 1 + Math.random() * 3;
    const geom = new THREE.BoxGeometry(0.3, h, 0.3);
    const mat = new THREE.MeshPhongMaterial({
      color: i % 2 === 0 ? 0xd4af37 : 0xffffff,
      emissive: i % 2 === 0 ? 0xd4af37 : 0x000000,
      emissiveIntensity: 0.25
    });
    const bar = new THREE.Mesh(geom, mat);
    const angle = (i / 12) * Math.PI * 2;
    bar.position.set(Math.cos(angle) * 6, h/2 - 1, Math.sin(angle) * 6);
    financeGroup.add(bar);
  }

  scene.add(buildingGroup);
  scene.add(financeGroup);
  camera.position.set(0, 4, 13);

  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();
    buildingGroup.rotation.y = elapsedTime * 0.12;
    financeGroup.rotation.y = -elapsedTime * 0.18;
    buildingGroup.position.y = Math.sin(elapsedTime * 0.6) * 0.25;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

/**
 * 5. Services Header Dual 3D Visualization
 */
function initServicesHeaderDual3D(containerId) {
  const container = document.getElementById(containerId);
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);
  const pointLight = new THREE.PointLight(0xd4af37, 2.5);
  pointLight.position.set(5, 8, 5);
  scene.add(pointLight);

  // Floating Geodesic Gold & Obsidian Sphere
  const geom = new THREE.IcosahedronGeometry(2.8, 2);
  const mat = new THREE.MeshStandardMaterial({
    color: 0x111111,
    metalness: 0.9,
    roughness: 0.15,
    wireframe: false
  });
  const sphere = new THREE.Mesh(geom, mat);

  const wireMat = new THREE.MeshBasicMaterial({ color: 0xd4af37, wireframe: true });
  const wireSphere = new THREE.Mesh(geom, wireMat);
  wireSphere.scale.set(1.02, 1.02, 1.02);
  sphere.add(wireSphere);

  scene.add(sphere);
  camera.position.z = 8;

  function animate() {
    requestAnimationFrame(animate);
    sphere.rotation.y += 0.007;
    sphere.rotation.x += 0.004;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}
