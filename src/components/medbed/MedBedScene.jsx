import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { MODALITIES, MODALITY_BY_CODE } from "@/data/modalities";

// Camera presets
const VIEWS = {
  reset: { pos: [0, 2, 6], tgt: [0, 0.6, 0] },
  front: { pos: [0, 1.4, 7], tgt: [0, 0.6, 0] },
  side: { pos: [7, 1.4, 0.5], tgt: [0, 0.6, 0] },
  top: { pos: [0.01, 7, 0.01], tgt: [0, 0, 0] },
};

export default function MedBedScene({ activeCode, view, onPickModality, paused, power }) {
  const mountRef = useRef(null);
  const stateRef = useRef(null);
  const activeCodeRef = useRef(activeCode);
  const viewRef = useRef(view);
  const powerRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => { activeCodeRef.current = activeCode; applyHighlight(); }, [activeCode]);
  useEffect(() => { viewRef.current = view; applyView(); }, [view]);
  useEffect(() => { pausedRef.current = paused; }, [paused]);
  useEffect(() => { powerRef.current = power || 0; }, [power]);

  // Expose imperative helpers via refs on the state object
  const applyHighlight = () => {
    const s = stateRef.current;
    if (!s) return;
    const m = MODALITY_BY_CODE[activeCodeRef.current];
    Object.entries(s.zones).forEach(([key, mats]) => {
      const target = key === m?.zone;
      mats.forEach((mat) => {
        if (!mat.userData) return;
        const base = mat.userData.baseEmissive ?? 0;
        mat.userData.boost = target ? 1 : 0;
        mat.userData.targetIntensity = target ? (mat.userData.peak ?? 1.4) : base;
      });
    });
  };

  const applyView = () => {
    const s = stateRef.current;
    if (!s) return;
    const v = VIEWS[viewRef.current] || VIEWS.reset;
    s.camTarget.set(...v.pos);
    s.tgtTarget.set(...v.tgt);
  };

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000408);
    scene.fog = new THREE.FogExp2(0x000408, 0.045);

    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 2, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampeningFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.6;
    controls.minDistance = 3;
    controls.maxDistance = 14;
    controls.target.set(0, 0.6, 0);

    // Lights
    scene.add(new THREE.AmbientLight(0x111133, 0.4));
    const dir = new THREE.DirectionalLight(0xffffff, 0.6);
    dir.position.set(2, 4, 3);
    scene.add(dir);
    const goldLight = new THREE.PointLight(0xc9a84c, 0.8, 10);
    goldLight.position.set(0, 2, 0);
    scene.add(goldLight);
    const violetLight = new THREE.PointLight(0x9b30ff, 0.4, 8);
    violetLight.position.set(-3, 1, -1);
    scene.add(violetLight);

    // Floor
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.MeshStandardMaterial({ color: 0x0a0a12, metalness: 0.9, roughness: 0.1 })
    );
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // Star field
    const starGeo = new THREE.BufferGeometry();
    const starCount = 1000;
    const starPos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const r = 30;
      const x = (Math.random() - 0.5) * 2 * r;
      const y = (Math.random() - 0.5) * 2 * r;
      const z = (Math.random() - 0.5) * 2 * r;
      starPos[i * 3] = x; starPos[i * 3 + 1] = y; starPos[i * 3 + 2] = z;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xaaaaff, size: 0.03, sizeAttenuation: true }));
    scene.add(stars);

    // Materials
    const charcoalMat = new THREE.MeshStandardMaterial({ color: 0x1a1a2e, metalness: 0.7, roughness: 0.3 });
    const titaniumMat = new THREE.MeshStandardMaterial({ color: 0x9a9a9a, metalness: 0.9, roughness: 0.25 });

    // Zones registry: zone key -> [materials whose emissive we pulse]
    const zones = {};

    const registerZone = (key, mat, baseEmissive = 0, peak = 1.4) => {
      mat.userData = { baseEmissive, peak, boost: 0, targetIntensity: baseEmissive };
      if (!zones[key]) zones[key] = [];
      zones[key].push(mat);
    };

    // MAIN CHASSIS
    const chassis = new THREE.Mesh(new THREE.BoxGeometry(4.0, 0.6, 2.6), charcoalMat);
    chassis.position.y = 0.3;
    scene.add(chassis);

    // Steel plinth
    const plinth = new THREE.Mesh(
      new THREE.BoxGeometry(4.1, 0.06, 2.7),
      new THREE.MeshStandardMaterial({ color: 0x050505, metalness: 0.5, roughness: 0.6 })
    );
    plinth.position.y = 0.0;
    scene.add(plinth);

    // Corner guards (titanium)
    const guardGeo = new THREE.BoxGeometry(0.12, 0.62, 0.12);
    [[-1.95, -1.25], [1.95, -1.25], [-1.95, 1.25], [1.95, 1.25]].forEach(([x, z]) => {
      const g = new THREE.Mesh(guardGeo, titaniumMat);
      g.position.set(x, 0.3, z);
      scene.add(g);
    });

    // MATTRESS
    const mattressMat = new THREE.MeshStandardMaterial({ color: 0x1c2333, roughness: 0.9 });
    const mattress = new THREE.Mesh(new THREE.BoxGeometry(3.8, 0.1, 2.4), mattressMat);
    mattress.position.set(0, 0.65, 0);
    scene.add(mattress);
    registerZone("mattress", mattressMat, 0, 0.5);

    // FIR base panel (orange glow under mattress)
    const firMat = new THREE.MeshStandardMaterial({
      color: 0x110000, emissive: 0xff3300, emissiveIntensity: 0.15, roughness: 0.7,
    });
    const firBase = new THREE.Mesh(new THREE.BoxGeometry(3.7, 0.04, 2.3), firMat);
    firBase.position.set(0, 0.58, 0);
    scene.add(firBase);
    registerZone("firBase", firMat, 0.15, 1.2);

    // CANOPY ARCH (torus segment)
    const canopyMat = new THREE.MeshStandardMaterial({ color: 0x1a1a2e, metalness: 0.6, roughness: 0.35 });
    const canopy = new THREE.Mesh(new THREE.TorusGeometry(1.3, 0.08, 12, 32, Math.PI), canopyMat);
    canopy.position.set(0, 1.0, 0);
    canopy.rotation.z = Math.PI; // arch over top
    scene.add(canopy);

    // Canopy ribs (geodesic suggestion)
    for (let i = 0; i < 5; i++) {
      const rib = new THREE.Mesh(new THREE.TorusGeometry(1.3, 0.03, 8, 24, Math.PI), canopyMat);
      rib.position.set(0, 1.0, 0);
      rib.rotation.z = Math.PI;
      rib.rotation.y = (i / 5) * Math.PI;
      rib.scale.set(1, 0.7, 1);
      scene.add(rib);
    }
    registerZone("canopy", canopyMat, 0, 0.4);

    // CANOPY INTERIOR emissive plane (violet chromotherapy)
    const canopyIntMat = new THREE.MeshStandardMaterial({
      color: 0x8b00ff, emissive: 0x8b00ff, emissiveIntensity: 0.6, side: THREE.DoubleSide, transparent: true, opacity: 0.85,
    });
    const canopyInterior = new THREE.Mesh(new THREE.PlaneGeometry(2.4, 1.2), canopyIntMat);
    canopyInterior.position.set(0, 1.6, 0);
    canopyInterior.rotation.x = -Math.PI / 2;
    scene.add(canopyInterior);
    registerZone("canopyInterior", canopyIntMat, 0.6, 1.4);

    // LED PANEL (PBM red, overhead inside canopy)
    const ledMat = new THREE.MeshStandardMaterial({
      color: 0xcc3300, emissive: 0xcc3300, emissiveIntensity: 0.4, side: THREE.DoubleSide, transparent: true, opacity: 0.9,
    });
    const ledPanel = new THREE.Mesh(new THREE.PlaneGeometry(3.6, 2.2), ledMat);
    ledPanel.position.set(0, 1.55, 0);
    ledPanel.rotation.x = -Math.PI / 2;
    ledPanel.scale.set(0.7, 0.7, 1);
    scene.add(ledPanel);
    registerZone("ledPanel", ledMat, 0.4, 1.4);

    // EEG dock at canopy apex
    const eegMat = new THREE.MeshStandardMaterial({ color: 0x050505, emissive: 0x34d399, emissiveIntensity: 0.25, metalness: 0.4, roughness: 0.5 });
    const eegDock = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.06, 24), eegMat);
    eegDock.position.set(0, 2.05, 0);
    scene.add(eegDock);
    registerZone("eegDock", eegMat, 0.25, 1.2);

    // ELECTRODE ports (gold) on left side
    const electrodeMat = new THREE.MeshStandardMaterial({ color: 0xc9a84c, emissive: 0xc9a84c, emissiveIntensity: 0.2, metalness: 1, roughness: 0.2 });
    for (let i = 0; i < 4; i++) {
      const port = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.04, 16), electrodeMat);
      port.position.set(-2.01, 0.4, -0.6 + i * 0.4);
      port.rotation.z = Math.PI / 2;
      scene.add(port);
    }
    registerZone("electrodes", electrodeMat, 0.2, 1.0);

    // EQUIPMENT COLUMN (right side)
    const column = new THREE.Mesh(new THREE.BoxGeometry(0.6, 2.8, 0.5), charcoalMat);
    column.position.set(2.5, 1.4, 0);
    scene.add(column);

    // Portholes
    const makePorthole = (y, color, zoneKey, base = 0.5) => {
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color), emissive: new THREE.Color(color), emissiveIntensity: base, transparent: true, opacity: 0.95,
      });
      const p = new THREE.Mesh(new THREE.CircleGeometry(0.15, 24), mat);
      p.position.set(2.81, y, 0);
      p.rotation.y = Math.PI / 2;
      scene.add(p);
      // brass ring
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.15, 0.18, 24), titaniumMat);
      ring.position.set(2.815, y, 0);
      ring.rotation.y = Math.PI / 2;
      scene.add(ring);
      registerZone(zoneKey, mat, base, 1.3);
    };
    makePorthole(2.2, 0xff8800, "portholeTop", 0.6);   // PRI
    makePorthole(1.4, 0x3aa0ff, "portholeMid", 0.5);    // HIT
    makePorthole(0.6, 0x00aaff, "portholeLow", 0.5);    // VOR

    // 18 STATUS STRIPS (green pulsing)
    const stripMats = [];
    const stripGroup = new THREE.Group();
    for (let i = 0; i < 18; i++) {
      const sm = new THREE.MeshStandardMaterial({ color: 0x10b981, emissive: 0x10b981, emissiveIntensity: 0.6 });
      const strip = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.08, 0.02), sm);
      strip.position.set(2.81, 0.2 + i * 0.13, 0.2);
      stripGroup.add(strip);
      stripMats.push(sm);
    }
    scene.add(stripGroup);
    stripMats.forEach((sm) => registerZone("statusStrip", sm, 0.6, 1.2));

    // SCALAR FIELD CORONA — the centerpiece: multi-ring energy structure
    const coronaGroup = new THREE.Group();
    coronaGroup.position.y = 2.3;
    const coronaMats = [];
    const coronaColors = [0xc9a84c, 0x9b30ff, 0x3a6fff, 0x10b981, 0xff3344];
    const coronaRadii = [0.45, 0.7, 0.95, 1.2, 1.45];
    const coronaRings = [];
    coronaRadii.forEach((rad, ri) => {
      const mat = new THREE.MeshStandardMaterial({
        color: coronaColors[ri], emissive: coronaColors[ri], emissiveIntensity: 1.0,
        transparent: true, opacity: 0.6, blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.Mesh(new THREE.TorusGeometry(rad, 0.02, 10, 10), mat);
      ring.userData.spin = (ri % 2 === 0 ? 1 : -1) * (0.003 + ri * 0.0015);
      coronaGroup.add(ring);
      coronaRings.push(ring);
      coronaMats.push(mat);
      registerZone("corona", mat, 0.9, 1.9);
      // 8 glowing orbiting nodes per ring
      for (let n = 0; n < 8; n++) {
        const nodeMat = new THREE.MeshStandardMaterial({
          color: coronaColors[ri], emissive: coronaColors[ri], emissiveIntensity: 1.3,
          transparent: true, opacity: 0.85, blending: THREE.AdditiveBlending,
        });
        const node = new THREE.Mesh(new THREE.SphereGeometry(0.04, 12, 12), nodeMat);
        const a = (n / 8) * Math.PI * 2;
        node.position.set(Math.cos(a) * rad, 0, Math.sin(a) * rad);
        node.userData.orbit = { rad, a, speed: (ri % 2 === 0 ? 1 : -1) * (0.004 + ri * 0.002) };
        coronaGroup.add(node);
        coronaMats.push(nodeMat);
        registerZone("corona", nodeMat, 0.9, 1.7);
      }
      // 4 radial spokes per ring
      for (let s = 0; s < 4; s++) {
        const spokeMat = new THREE.MeshStandardMaterial({
          color: coronaColors[ri], emissive: coronaColors[ri], emissiveIntensity: 0.5,
          transparent: true, opacity: 0.35, blending: THREE.AdditiveBlending,
        });
        const spoke = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.006, rad, 6), spokeMat);
        const a = (s / 4) * Math.PI * 2;
        spoke.position.set(Math.cos(a) * rad / 2, 0, Math.sin(a) * rad / 2);
        spoke.rotation.z = Math.PI / 2;
        spoke.rotation.y = -a;
        coronaGroup.add(spoke);
        coronaMats.push(spokeMat);
        registerZone("corona", spokeMat, 0.5, 1.3);
      }
    });

    // Central pulsing energy core
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xffffff, emissive: 0xc9a84c, emissiveIntensity: 1.6,
      transparent: true, opacity: 0.95, blending: THREE.AdditiveBlending,
    });
    const coronaCore = new THREE.Mesh(new THREE.SphereGeometry(0.14, 24, 24), coreMat);
    coronaGroup.add(coronaCore);
    const coronaLight = new THREE.PointLight(0xc9a84c, 0.6, 7);
    coronaGroup.add(coronaLight);

    // Upward energy beams (fade in with power)
    const beamMats = [];
    for (let b = 0; b < 6; b++) {
      const beamMat = new THREE.MeshBasicMaterial({
        color: 0xc9a84c, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
      });
      const beam = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.07, 1.4, 8, 1, true), beamMat);
      const a = (b / 6) * Math.PI * 2;
      beam.position.set(Math.cos(a) * 0.25, 0.7, Math.sin(a) * 0.25);
      coronaGroup.add(beam);
      beamMats.push(beamMat);
    }

    // Orbiting corona particle field
    const coronaParticleCount = 320;
    const cpGeo = new THREE.BufferGeometry();
    const cpPos = new Float32Array(coronaParticleCount * 3);
    const cpData = [];
    for (let i = 0; i < coronaParticleCount; i++) {
      const r = 0.4 + Math.random() * 1.15;
      const a = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 0.5;
      cpPos[i * 3] = Math.cos(a) * r;
      cpPos[i * 3 + 1] = y;
      cpPos[i * 3 + 2] = Math.sin(a) * r;
      cpData.push({ r, a, y, speed: 0.3 + Math.random() * 0.8, dir: Math.random() > 0.5 ? 1 : -1 });
    }
    cpGeo.setAttribute("position", new THREE.BufferAttribute(cpPos, 3));
    const cpMat = new THREE.PointsMaterial({
      color: 0xc9a84c, size: 0.035, transparent: true, opacity: 0.45,
      blending: THREE.AdditiveBlending, sizeAttenuation: true,
    });
    const coronaParticles = new THREE.Points(cpGeo, cpMat);
    coronaGroup.add(coronaParticles);

    scene.add(coronaGroup);

    // Power ambient light (intensifies with power)
    const powerLight = new THREE.PointLight(0xc9a84c, 0, 9);
    powerLight.position.set(0, 1.2, 0);
    scene.add(powerLight);

    // PLASMA GLOW PARTICLES (Rife)
    const plasmaCount = 200;
    const plasmaGeo = new THREE.BufferGeometry();
    const plasmaPos = new Float32Array(plasmaCount * 3);
    const plasmaVel = new Float32Array(plasmaCount * 3);
    for (let i = 0; i < plasmaCount; i++) {
      plasmaPos[i * 3] = 2.5 + (Math.random() - 0.5) * 0.4;
      plasmaPos[i * 3 + 1] = 0.2 + Math.random() * 1.4;
      plasmaPos[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
      plasmaVel[i * 3] = (Math.random() - 0.5) * 0.002;
      plasmaVel[i * 3 + 1] = 0.003 + Math.random() * 0.004;
      plasmaVel[i * 3 + 2] = (Math.random() - 0.5) * 0.002;
    }
    plasmaGeo.setAttribute("position", new THREE.BufferAttribute(plasmaPos, 3));
    const plasmaMat = new THREE.PointsMaterial({ color: 0xcc44ff, size: 0.04, transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
    const plasma = new THREE.Points(plasmaGeo, plasmaMat);
    scene.add(plasma);
    registerZone("plasma", plasmaMat, 0.8, 1.4);

    // ORGONE biofield shimmer — gold spheres
    const orgoneGroup = new THREE.Group();
    const orgoneMats = [];
    for (let i = 0; i < 100; i++) {
      const om = new THREE.MeshStandardMaterial({ color: 0xd4af37, emissive: 0xd4af37, emissiveIntensity: 0.4, transparent: true, opacity: 0.3 });
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.015, 6, 6), om);
      s.position.set((Math.random() - 0.5) * 3.6, 0.7 + Math.random() * 1.2, (Math.random() - 0.5) * 2.2);
      s.userData.drift = { x: (Math.random() - 0.5) * 0.001, y: (Math.random() - 0.5) * 0.001, z: (Math.random() - 0.5) * 0.001 };
      orgoneGroup.add(s);
      orgoneMats.push(om);
    }
    scene.add(orgoneGroup);
    orgoneMats.forEach((m) => registerZone("orgone", m, 0.4, 1.0));

    // FLOOR GRID (Global Scaling) — subtle grid lines
    const gridMat = new THREE.LineBasicMaterial({ color: 0x60a5fa, transparent: true, opacity: 0.12 });
    const gridGroup = new THREE.Group();
    for (let i = -8; i <= 8; i++) {
      const g1 = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i, 0.01, -8), new THREE.Vector3(i, 0.01, 8)]);
      gridGroup.add(new THREE.Line(g1, gridMat));
      const g2 = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-8, 0.01, i), new THREE.Vector3(8, 0.01, i)]);
      gridGroup.add(new THREE.Line(g2, gridMat));
    }
    scene.add(gridGroup);
    registerZone("floorGrid", gridMat, 0.12, 0.5);

    // Raycaster for click picking
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const zoneMeshMap = []; // { mesh, zone } for picking
    scene.traverse((obj) => {
      if (obj.isMesh && obj.geometry) {
        // map by material's zone membership
        for (const [key, mats] of Object.entries(zones)) {
          if (mats.includes(obj.material)) {
            zoneMeshMap.push({ mesh: obj, zone: key });
            break;
          }
        }
      }
    });

    const onPointerDown = (ev) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((ev.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((ev.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const meshes = zoneMeshMap.map((z) => z.mesh);
      const hits = raycaster.intersectObjects(meshes, false);
      if (hits.length) {
        const hit = hits[0].object;
        const entry = zoneMeshMap.find((z) => z.mesh === hit);
        if (entry) {
          const mod = MODALITIES.find((m) => m.zone === entry.zone);
          if (mod && onPickModality) onPickModality(mod.code);
        }
      }
    };
    renderer.domElement.addEventListener("pointerdown", onPointerDown);

    // Camera tween targets
    const camTarget = camera.position.clone();
    const tgtTarget = controls.target.clone();

    const state = {
      renderer, scene, camera, controls, coronaGroup, plasma, plasmaPos, plasmaVel, orgoneGroup,
      stripMats, camTarget, tgtTarget, zones,
    };
    stateRef.current = state;

    applyHighlight();
    applyView();

    let raf;
    let powerCur = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const dt = clock.getDelta();

      // Power ramp lerp toward target
      powerCur = THREE.MathUtils.lerp(powerCur, powerRef.current, 0.045);

      // Corona rings — spin faster with power, subtle tilt wobble
      coronaRings.forEach((ring, i) => {
        ring.rotation.y += ring.userData.spin * (1 + powerCur * 9);
        ring.rotation.x = Math.sin(t * 0.5 + i) * 0.12 * (0.3 + powerCur);
      });
      // Orbiting nodes
      coronaGroup.children.forEach((c) => {
        if (c.userData.orbit) {
          c.userData.orbit.a += c.userData.orbit.speed * (1 + powerCur * 6);
          c.position.x = Math.cos(c.userData.orbit.a) * c.userData.orbit.rad;
          c.position.z = Math.sin(c.userData.orbit.a) * c.userData.orbit.rad;
        }
      });
      // Central core pulse
      const corePulse = 1 + Math.sin(t * 3) * 0.18;
      coronaCore.scale.setScalar(corePulse * (1 + powerCur * 0.6));
      coreMat.emissiveIntensity = 1.4 + powerCur * 2.8 + Math.sin(t * 3) * 0.25;
      coronaLight.intensity = 0.6 + powerCur * 3.2;
      // Corona orbiting particles
      const cpa = cpGeo.attributes.position.array;
      for (let i = 0; i < coronaParticleCount; i++) {
        const d = cpData[i];
        d.a += d.dir * d.speed * 0.01 * (1 + powerCur * 5);
        cpa[i * 3] = Math.cos(d.a) * d.r;
        cpa[i * 3 + 2] = Math.sin(d.a) * d.r;
        cpa[i * 3 + 1] = d.y + Math.sin(t * 2 + i * 0.3) * 0.03;
      }
      cpGeo.attributes.position.needsUpdate = true;
      cpMat.opacity = 0.35 + powerCur * 0.55;
      cpMat.size = 0.025 + powerCur * 0.04;
      // Energy beams
      beamMats.forEach((bm, i) => {
        bm.opacity = powerCur * 0.55 * (0.7 + Math.sin(t * 4 + i) * 0.3);
      });
      // Power ambient light floods the chamber
      powerLight.intensity = powerCur * 2.8;

      // Plasma drift
      const pa = plasmaGeo.attributes.position.array;
      for (let i = 0; i < plasmaCount; i++) {
        pa[i * 3] += plasmaVel[i * 3];
        pa[i * 3 + 1] += plasmaVel[i * 3 + 1];
        pa[i * 3 + 2] += plasmaVel[i * 3 + 2];
        if (pa[i * 3 + 1] > 1.6) {
          pa[i * 3] = 2.5 + (Math.random() - 0.5) * 0.4;
          pa[i * 3 + 1] = 0.2;
          pa[i * 3 + 2] = (Math.random() - 0.5) * 0.4;
        }
      }
      plasmaGeo.attributes.position.needsUpdate = true;

      // Orgone drift
      orgoneGroup.children.forEach((s) => {
        s.position.x += s.userData.drift.x;
        s.position.y += s.userData.drift.y;
        s.position.z += s.userData.drift.z;
        if (Math.abs(s.position.x) > 1.9) s.userData.drift.x *= -1;
        if (s.position.y > 1.9 || s.position.y < 0.7) s.userData.drift.y *= -1;
        if (Math.abs(s.position.z) > 1.2) s.userData.drift.z *= -1;
      });

      // Status strip pulse (staggered)
      stripMats.forEach((sm, i) => {
        sm.emissiveIntensity = 0.6 + Math.sin(t * 2 + i * 0.4) * 0.3;
      });

      // Zone highlight easing — global power boosts all zones toward peak
      Object.values(zones).flat().forEach((mat) => {
        if (!mat.userData) return;
        const base = mat.userData.baseEmissive ?? 0;
        const boost = mat.userData.boost ?? 0;
        const peak = mat.userData.peak ?? 1;
        let target = base + boost * (peak - base) + powerCur * (peak - base) * 0.78;
        if (target > peak * 1.35) target = peak * 1.35;
        mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity ?? 0, target, 0.08);
      });

      // Camera tween
      camera.position.lerp(camTarget, 0.06);
      controls.target.lerp(tgtTarget, 0.06);
      controls.autoRotate = !pausedRef.current;
      controls.autoRotateSpeed = 0.6 + powerCur * 1.8;
      controls.update();

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      stateRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={mountRef} className="absolute inset-0" style={{ background: "#000408" }} />;
}