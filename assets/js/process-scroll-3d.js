/**
 * ==========================================================================
 * A.N CAPITAL — LUXURY FINANCIAL DIGITAL PRESENCE
 * Stitch MCP Premium 3D Scroll-Driven Animation Engine (Process Page)
 * ==========================================================================
 * Responds smoothly to scrolling down and up:
 * - Dynamic 3D Camera Flight Path
 * - 5 Morphing Financial/Architectural 3D Stage Sculptures per Phase
 * - Interactive Scroll Velocity Particle Field
 * - Glowing Gold Centerline Progress Indicator & Active Card Highlighting
 */

document.addEventListener('DOMContentLoaded', () => {
  initProcessScroll3D();
  initTimelineScrollHUD();
});

function initProcessScroll3D() {
  const container = document.getElementById('threejs-process-scroll-stage');
  if (!container || typeof THREE === 'undefined') return;

  // 1. Scene setup
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x111111, 0.04);

  const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;

  container.innerHTML = '';
  container.appendChild(renderer.domElement);

  // 2. Premium Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const goldPointLight = new THREE.PointLight(0xd4af37, 3, 50);
  goldPointLight.position.set(5, 5, 8);
  scene.add(goldPointLight);

  const rimLight = new THREE.PointLight(0xf2ca50, 2, 40);
  rimLight.position.set(-8, -5, -5);
  scene.add(rimLight);

  // Materials
  const goldMaterial = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.9,
    roughness: 0.18,
    emissive: 0xd4af37,
    emissiveIntensity: 0.15
  });

  const glassMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x1f1e1e,
    metalness: 0.85,
    roughness: 0.1,
    transparent: true,
    opacity: 0.6,
    wireframe: false
  });

  const wireGoldMat = new THREE.MeshBasicMaterial({
    color: 0xd4af37,
    wireframe: true,
    transparent: true,
    opacity: 0.45
  });

  // Master Group holding the 5 phase sculptures
  const masterGroup = new THREE.Group();
  scene.add(masterGroup);

  /**
   * NODE 1: Phase 01 — Bespoke Consultation (Geodesic Advisory Sphere)
   */
  const node1 = new THREE.Group();
  const sphereGeo = new THREE.IcosahedronGeometry(2.2, 2);
  const sphereMesh = new THREE.Mesh(sphereGeo, glassMaterial);
  const sphereWire = new THREE.Mesh(sphereGeo, wireGoldMat);
  sphereWire.scale.set(1.03, 1.03, 1.03);
  node1.add(sphereMesh, sphereWire);
  node1.position.set(0, 0, 0);
  masterGroup.add(node1);

  /**
   * NODE 2: Phase 02 — Strategic Plan Architecture (Architectural Tower Blueprint)
   */
  const node2 = new THREE.Group();
  const towerGeo = new THREE.BoxGeometry(1.6, 4.5, 1.6);
  const towerMesh = new THREE.Mesh(towerGeo, glassMaterial);
  const towerWire = new THREE.Mesh(towerGeo, wireGoldMat);
  towerWire.scale.set(1.04, 1.04, 1.04);
  node2.add(towerMesh, towerWire);
  // Add horizontal structural gold rings
  for (let i = -1.8; i <= 1.8; i += 0.9) {
    const ringGeo = new THREE.BoxGeometry(1.8, 0.08, 1.8);
    const ringMesh = new THREE.Mesh(ringGeo, goldMaterial);
    ringMesh.position.y = i;
    node2.add(ringMesh);
  }
  node2.position.set(0, -12, 0);
  masterGroup.add(node2);

  /**
   * NODE 3: Phase 03 — Opportunity Screening (Concentric Filtering Rings)
   */
  const node3 = new THREE.Group();
  for (let r = 1; r <= 3; r++) {
    const ringGeo = new THREE.TorusGeometry(r * 0.9, 0.06, 16, 64);
    const ringMesh = new THREE.Mesh(ringGeo, r % 2 === 0 ? goldMaterial : wireGoldMat);
    ringMesh.rotation.x = Math.PI / 3;
    ringMesh.rotation.y = r * 0.4;
    node3.add(ringMesh);
  }
  // Central core
  const coreGeo = new THREE.OctahedronGeometry(0.8, 0);
  const coreMesh = new THREE.Mesh(coreGeo, goldMaterial);
  node3.add(coreMesh);
  node3.position.set(0, -24, 0);
  masterGroup.add(node3);

  /**
   * NODE 4: Phase 04 — Seamless Execution (Institutional Vault Gears)
   */
  const node4 = new THREE.Group();
  const gearGeo = new THREE.CylinderGeometry(2.1, 2.1, 0.4, 12);
  const gearMesh = new THREE.Mesh(gearGeo, goldMaterial);
  gearMesh.rotation.x = Math.PI / 2;
  const gearWire = new THREE.Mesh(gearGeo, wireGoldMat);
  gearWire.scale.set(1.05, 1.05, 1.05);
  gearWire.rotation.x = Math.PI / 2;
  node4.add(gearMesh, gearWire);
  node4.position.set(0, -36, 0);
  masterGroup.add(node4);

  /**
   * NODE 5: Phase 05 — Long-Term Growth (Ascending Gold Candlestick Spiral)
   */
  const node5 = new THREE.Group();
  for (let i = 0; i < 9; i++) {
    const h = 0.8 + i * 0.45;
    const candleGeo = new THREE.BoxGeometry(0.35, h, 0.35);
    const candleMesh = new THREE.Mesh(candleGeo, i % 2 === 0 ? goldMaterial : glassMaterial);
    const angle = (i / 9) * Math.PI * 2;
    candleMesh.position.set(Math.cos(angle) * 2.2, (h / 2) - 1.8, Math.sin(angle) * 2.2);
    node5.add(candleMesh);
  }
  node5.position.set(0, -48, 0);
  masterGroup.add(node5);

  /**
   * 3. Floating Gold Dust Particle Field
   */
  const particleCount = 450;
  const particlePositions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount * 3; i += 3) {
    particlePositions[i] = (Math.random() - 0.5) * 25;
    particlePositions[i + 1] = 10 - Math.random() * 70; // spread from +10 down to -60
    particlePositions[i + 2] = (Math.random() - 0.5) * 20;
  }
  const particleGeo = new THREE.BufferGeometry();
  particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
  const particleMat = new THREE.PointsMaterial({
    color: 0xd4af37,
    size: 0.12,
    transparent: true,
    opacity: 0.65
  });
  const particleSystem = new THREE.Points(particleGeo, particleMat);
  scene.add(particleSystem);

  // Initial Camera position
  camera.position.set(0, 0, 7.5);

  // Scroll tracking state
  let targetY = 0;
  let currentY = 0;
  let targetRotationY = 0;
  let currentRotationY = 0;
  let scrollVelocity = 0;
  let lastScrollTop = window.scrollY;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollProgress = docHeight > 0 ? scrollTop / docHeight : 0; // 0.0 to 1.0

    scrollVelocity = scrollTop - lastScrollTop;
    lastScrollTop = scrollTop;

    // Map scroll progress (0..1) to vertical camera travel through our 5 nodes (0 to -48)
    targetY = -(scrollProgress * 48);
    targetRotationY = scrollProgress * Math.PI * 4;
  });

  // Animation Loop
  const clock = new THREE.Clock();
  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    // Smooth camera & group interpolation (Lerp for ultra-silky feel)
    currentY += (targetY - currentY) * 0.07;
    currentRotationY += (targetRotationY - currentRotationY) * 0.05;

    camera.position.y = currentY;
    masterGroup.rotation.y = currentRotationY + time * 0.2;

    // Dynamic node breathing & rotation
    node1.rotation.x = time * 0.3;
    node2.rotation.y = -time * 0.4;
    node3.rotation.z = time * 0.5;
    node4.rotation.y = time * 0.6;
    node5.rotation.y = -time * 0.35;

    // Particle drift reacting to scroll velocity
    particleSystem.rotation.y = time * 0.05;
    particleSystem.position.y += scrollVelocity * 0.01;
    scrollVelocity *= 0.92; // dampen

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
}

/**
 * 4. Timeline Scroll HUD & Interactive Step Card Highlighting
 */
function initTimelineScrollHUD() {
  const fillLine = document.getElementById('scroll-progress-fill');
  const stepCards = document.querySelectorAll('.timeline-step-card');

  function updateHUD() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressPercent = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;

    if (fillLine) {
      fillLine.style.height = `${progressPercent}%`;
    }

    // Check which step card is closest to the screen center
    const viewportCenter = window.innerHeight / 2;
    stepCards.forEach((card, index) => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.top + rect.height / 2;
      const distance = Math.abs(cardCenter - viewportCenter);

      if (distance < window.innerHeight * 0.38) {
        card.classList.add('active-step-card');
      } else {
        card.classList.remove('active-step-card');
      }
    });
  }

  window.addEventListener('scroll', updateHUD, { passive: true });
  updateHUD();
}
