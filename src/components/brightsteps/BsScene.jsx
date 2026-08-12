import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { BS_SYSTEM_BY_CODE } from "@/data/brightsteps";

const VIEWS = {
  reset: { pos: [0, 2.5, 7], tgt: [0, 1.1, 0] },
  front: { pos: [0, 1.4, 7.5], tgt: [0, 1.1, 0] },
  side: { pos: [7, 1.6, 0.5], tgt: [0, 1.1, 0] },
  top: { pos: [0.01, 8, 0.01], tgt: [0, 0.5, 0] },
  fit: { pos: [0, 3.4, 10.5], tgt: [0.8, 1.0, 0] },
};

export default function BsScene({ activeCode, view, modeColor, autoRotate = true, sessionActive = false }) {
  const mountRef = useRef(null);
  const stateRef = useRef(null);
  const sessionRef = useRef(sessionActive);
  const activeRef = useRef(activeCode);
  const viewRef = useRef(view);
  const modeColorRef = useRef(modeColor);

  const applyHighlight = () => {
    const s = stateRef.current;
    if (!s) return;
    const sys = BS_SYSTEM_BY_CODE[activeRef.current];
    Object.entries(s.zones).forEach(([key, mats]) => {
      const on = key === sys?.zone;
      mats.forEach((mat) => {
        if (!mat.userData) return;
        mat.userData.boost = on ? 1 : 0;
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

  const applyModeColor = () => {
    const s = stateRef.current;
    if (!s) return;
    const c = new THREE.Color(modeColorRef.current || "#00D4AA");
    s.canopyMat.emissive.copy(c);
    s.canopyMat.color.copy(c);
    s.podLight.color.copy(c);
    s.rimMat.emissive.copy(c).lerp(new THREE.Color("#38BDF8"), 0.5);
  };

  useEffect(() => { sessionRef.current = sessionActive; }, [sessionActive]);
  useEffect(() => { activeRef.current = activeCode; applyHighlight(); }, [activeCode]);
  useEffect(() => { viewRef.current = view; applyView(); }, [view]);
  useEffect(() => { modeColorRef.current = modeColor; applyModeColor(); }, [modeColor]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x070b14);
    scene.fog = new THREE.FogExp2(0x0a1628, 0.035);

    const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 100);
    camera.position.set(0, 2.5, 7);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.45;
    controls.minDistance = 3.5;
    controls.maxDistance = 14;
    controls.target.set(0, 1.1, 0);

    // Warm, inviting lighting
    scene.add(new THREE.AmbientLight(0x1a3a6a, 0.6));
    const dir = new THREE.DirectionalLight(0xffffff, 0.5);
    dir.position.set(2, 4, 2);
    scene.add(dir);
    const podLight = new THREE.PointLight(0x38bdf8, 1.0, 12);
    podLight.position.set(0, 3, 0);
    scene.add(podLight);
    const tealLight = new THREE.PointLight(0x2dd4bf, 0.5, 8);
    tealLight.position.set(-2, 1, 2);
    scene.add(tealLight);
    const violetLight = new THREE.PointLight(0xa78bfa, 0.3, 6);
    violetLight.position.set(2, 1, -2);
    scene.add(violetLight);

    // Floor
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.MeshStandardMaterial({ color: 0x0a1628, metalness: 0.5, roughness: 0.3 })
    );
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // Soft stars
    const starGeo = new THREE.BufferGeometry();
    const starPos = new Float32Array(600 * 3);
    for (let i = 0; i < 600; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 50;
      starPos[i * 3 + 1] = Math.random() * 25;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    scene.add(new THREE.Points(starGeo, new THREE.PointsMaterial({ color: 0xbfdcff, size: 0.02, transparent: true, opacity: 0.6 })));

    // Zones registry
    const zones = {};
    const registerZone = (key, mat, base = 0.3, peak = 1.5) => {
      mat.userData = { baseEmissive: base, peak, boost: 0 };
      if (!zones[key]) zones[key] = [];
      zones[key].push(mat);
    };

    // ---- POD GROUP ----
    const pod = new THREE.Group();
    pod.position.y = 1.15;
    scene.add(pod);

    // Egg shell, open at front (+z)
    const shellMat = new THREE.MeshStandardMaterial({ color: 0x0e2040, metalness: 0.4, roughness: 0.4, side: THREE.DoubleSide });
    const shell = new THREE.Mesh(new THREE.SphereGeometry(1, 48, 32, Math.PI * 0.3, Math.PI * 1.4), shellMat);
    shell.scale.set(2.0, 1.6, 1.8);
    shell.rotation.y = Math.PI / 2; // opening faces +z
    pod.add(shell);

    // Glowing rim on the open face
    const rimMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x38bdf8, emissiveIntensity: 0.8, transparent: true, opacity: 0.9 });
    const rim = new THREE.Mesh(new THREE.TorusGeometry(1.42, 0.035, 12, 64), rimMat);
    rim.position.z = 1.05;
    rim.scale.set(1.05, 1.0, 1);
    pod.add(rim);

    // Interior chromotherapy canopy (upper hemisphere, backside)
    const canopyMat = new THREE.MeshStandardMaterial({
      color: 0x00d4aa, emissive: 0x00d4aa, emissiveIntensity: 0.5, side: THREE.BackSide, transparent: true, opacity: 0.75,
    });
    const canopy = new THREE.Mesh(new THREE.SphereGeometry(0.92, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), canopyMat);
    canopy.scale.set(1.9, 1.5, 1.7);
    pod.add(canopy);
    registerZone("chm", canopyMat, 0.5, 1.4);

    // PBM panel overhead inside
    const pbmMat = new THREE.MeshStandardMaterial({ color: 0xcc4400, emissive: 0xcc4400, emissiveIntensity: 0.4, side: THREE.DoubleSide, transparent: true, opacity: 0.9 });
    const pbm = new THREE.Mesh(new THREE.PlaneGeometry(1.0, 0.6), pbmMat);
    pbm.position.set(0, 1.15, 0.1);
    pbm.rotation.x = -Math.PI / 2 - 0.3;
    pod.add(pbm);
    registerZone("pbm", pbmMat, 0.4, 1.5);

    // 7 chakra resonator spheres — vertical column along the seated spine (root i=0 → crown i=6)
    const chakra = [0xef4444, 0xf97316, 0xfacc15, 0x34d399, 0x38bdf8, 0x6366f1, 0xa78bfa];
    const nadNodes = [];
    const nadHalos = [];
    chakra.forEach((c, i) => {
      const mat = new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 0.7 });
      const f = i / 6;
      const node = new THREE.Mesh(new THREE.SphereGeometry(0.085, 20, 20), mat);
      node.position.set(0, -0.45 + f * 0.92, -0.12 - f * 0.28);
      node.userData.phase = i * 0.6;
      pod.add(node);
      nadNodes.push(node);
      registerZone("nad", mat, 0.7, 1.6);

      const haloMat = new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
      const halo = new THREE.Mesh(new THREE.SphereGeometry(0.085, 16, 16), haloMat);
      halo.position.copy(node.position);
      pod.add(halo);
      nadHalos.push(halo);
    });

    // Cocoon glow — soft additive shell around the pod
    const cocoonMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.06, side: THREE.BackSide, blending: THREE.AdditiveBlending, depthWrite: false });
    const cocoon = new THREE.Mesh(new THREE.SphereGeometry(1.18, 40, 28), cocoonMat);
    cocoon.scale.set(2.05, 1.7, 1.9);
    pod.add(cocoon);

    // Seat (reclined 15°)
    const seatMat = new THREE.MeshStandardMaterial({ color: 0x1a2a44, roughness: 0.9 });
    const seat = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.3, 1.4), seatMat);
    seat.position.set(0, -0.55, 0.25);
    seat.rotation.x = -0.26;
    pod.add(seat);
    registerZone("vat", seatMat, 0, 0.8);

    // FIT panels — interior side walls
    const fitMat = new THREE.MeshStandardMaterial({ color: 0x442200, emissive: 0xfbbf24, emissiveIntensity: 0.25, transparent: true, opacity: 0.85 });
    [-1.45, 1.45].forEach((x) => {
      const panel = new THREE.Mesh(new THREE.PlaneGeometry(0.9, 0.7), fitMat);
      panel.position.set(x, -0.1, 0.3);
      panel.rotation.y = x > 0 ? -Math.PI / 2 : Math.PI / 2;
      pod.add(panel);
    });
    registerZone("fit", fitMat, 0.25, 1.3);

    // Headrest + EEG dock ring
    const headrest = new THREE.Mesh(new THREE.SphereGeometry(0.28, 20, 16), new THREE.MeshStandardMaterial({ color: 0x1c3050, roughness: 0.8 }));
    headrest.scale.set(1.2, 0.9, 0.7);
    headrest.position.set(0, 0.25, -0.55);
    pod.add(headrest);
    const eegMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x38bdf8, emissiveIntensity: 0.6 });
    const eegRing = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.02, 10, 40), eegMat);
    eegRing.position.set(0, 0.35, -0.55);
    eegRing.rotation.x = Math.PI / 2.4;
    pod.add(eegRing);
    registerZone("eeg", eegMat, 0.6, 1.6);

    // Binaural rings at ear positions
    const binMatL = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.2, side: THREE.DoubleSide });
    const binMatR = binMatL.clone();
    const binL = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.008, 8, 32), binMatL);
    binL.position.set(-0.38, 0.25, -0.5);
    binL.rotation.y = Math.PI / 2;
    const binR = new THREE.Mesh(new THREE.TorusGeometry(0.14, 0.008, 8, 32), binMatR);
    binR.position.set(0.38, 0.25, -0.5);
    binR.rotation.y = Math.PI / 2;
    pod.add(binL, binR);
    registerZone("bin", binMatL, 0.2, 0.7);
    registerZone("bin", binMatR, 0.2, 0.7);

    // MCT armrest ports (gold dots)
    const mctMat = new THREE.MeshStandardMaterial({ color: 0xc9a84c, emissive: 0xc9a84c, emissiveIntensity: 0.3, metalness: 1, roughness: 0.2 });
    [[-0.75, 0.35], [0.75, 0.35]].forEach(([x, z]) => {
      for (let i = 0; i < 2; i++) {
        const port = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, 0.03, 12), mctMat);
        port.position.set(x, -0.32, z + i * 0.22);
        pod.add(port);
      }
    });
    registerZone("mct", mctMat, 0.3, 1.4);

    // Ghost child silhouette (seated)
    const ghostMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.13, wireframe: true });
    const ghost = new THREE.Group();
    const gHead = new THREE.Mesh(new THREE.SphereGeometry(0.16, 12, 10), ghostMat);
    gHead.position.set(0, 0.28, -0.35);
    const gTorso = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.2, 0.55, 10), ghostMat);
    gTorso.position.set(0, -0.12, -0.28);
    gTorso.rotation.x = 0.22;
    const gLegs = new THREE.Mesh(new THREE.CylinderGeometry(0.14, 0.1, 0.6, 10), ghostMat);
    gLegs.position.set(0, -0.42, 0.25);
    gLegs.rotation.x = Math.PI / 2.4;
    ghost.add(gHead, gTorso, gLegs);
    pod.add(ghost);

    // Status dots column (BIO) on pod right exterior
    const statusMats = [];
    for (let i = 0; i < 12; i++) {
      const cols = [0x34d399, 0xfbbf24, 0x38bdf8];
      const m = new THREE.MeshStandardMaterial({ color: cols[i % 3], emissive: cols[i % 3], emissiveIntensity: 0.7 });
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.03, 8, 8), m);
      dot.position.set(1.85, -0.5 + i * 0.11, 0.5);
      dot.userData.phase = i * 0.5;
      pod.add(dot);
      statusMats.push(m);
      registerZone("bio", m, 0.7, 1.6);
    }

    // PEMF particle rings under seat
    const pemfRings = [];
    const pemfMats = [];
    for (let r = 0; r < 4; r++) {
      const count = 60;
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(count * 3);
      const data = [];
      for (let i = 0; i < count; i++) {
        const a = (i / count) * Math.PI * 2;
        const rad = 0.5 + r * 0.35;
        pos[i * 3] = Math.cos(a) * rad;
        pos[i * 3 + 1] = -0.85 - r * 0.04;
        pos[i * 3 + 2] = Math.sin(a) * rad;
        data.push({ a, rad });
      }
      geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
      const mat = new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.025, transparent: true, opacity: 0.4, blending: THREE.AdditiveBlending });
      const ring = new THREE.Points(geo, mat);
      ring.userData = { geo, data, speed: 0.002 + r * 0.001 };
      pod.add(ring);
      pemfRings.push(ring);
      pemfMats.push(mat);
    }
    // register PEMF via a proxy standard material trick: track opacity boost manually
    pemfMats.forEach((m) => { m.userData = { baseEmissive: 0.4, peak: 0.9, boost: 0 }; if (!zones.pemf) zones.pemf = []; zones.pemf.push(m); });

    // Scalar corona — 4 violet rings above pod (GSC)
    const coronaRings = [];
    for (let i = 0; i < 4; i++) {
      const mat = new THREE.MeshStandardMaterial({
        color: 0xa78bfa, emissive: 0xa78bfa, emissiveIntensity: 0.8, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending,
      });
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.35 + i * 0.22, 0.015, 8, 48), mat);
      ring.position.y = 2.15 + i * 0.08;
      ring.rotation.x = Math.PI / 2;
      ring.userData.spin = (i % 2 === 0 ? 1 : -1) * 0.001 * (i + 1);
      scene.add(ring);
      coronaRings.push(ring);
      registerZone("gsc", mat, 0.8, 1.7);
    }

    // Biophoton fireflies
    const bioCount = 500;
    const bioGeo = new THREE.BufferGeometry();
    const bioPos = new Float32Array(bioCount * 3);
    const bioDrift = [];
    for (let i = 0; i < bioCount; i++) {
      bioPos[i * 3] = (Math.random() - 0.5) * 6;
      bioPos[i * 3 + 1] = 0.2 + Math.random() * 3.2;
      bioPos[i * 3 + 2] = (Math.random() - 0.5) * 6;
      bioDrift.push({ x: (Math.random() - 0.5) * 0.0015, y: (Math.random() - 0.5) * 0.001, z: (Math.random() - 0.5) * 0.0015 });
    }
    bioGeo.setAttribute("position", new THREE.BufferAttribute(bioPos, 3));
    const bioMat = new THREE.PointsMaterial({ color: 0xffffaa, size: 0.02, transparent: true, opacity: 0.5, blending: THREE.AdditiveBlending });
    scene.add(new THREE.Points(bioGeo, bioMat));

    // Vortex water unit (copper cylinder beside pod)
    const copper = new THREE.MeshStandardMaterial({ color: 0xb87333, metalness: 0.9, roughness: 0.3 });
    const vor = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.32, 1.1, 24), copper);
    vor.position.set(2.9, 0.55, 0.6);
    scene.add(vor);
    const vorWaterMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x0891b2, emissiveIntensity: 0.5, transparent: true, opacity: 0.7 });
    const vorWater = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.9, 20), vorWaterMat);
    vorWater.position.set(2.9, 0.6, 0.6);
    scene.add(vorWater);
    registerZone("vor", vorWaterMat, 0.5, 1.5);
    registerZone("vor", copper, 0, 0.5);

    const camTarget = camera.position.clone();
    const tgtTarget = controls.target.clone();
    controls.autoRotate = autoRotate;
    stateRef.current = { zones, camTarget, tgtTarget, canopyMat, podLight, rimMat, controls };
    applyHighlight();
    applyView();
    applyModeColor();

    let raf;
    const clock = new THREE.Clock();
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // Chakra nodes — idle breathing, or crown-to-root ignition cascade during a session
      const inSession = sessionRef.current;
      const CYCLE = 5.0, STEP = 0.5, GLOW = 1.6;
      nadNodes.forEach((n, i) => {
        let ign = 0;
        if (inSession) {
          const slot = (6 - i) * STEP; // crown first, root last
          let p = (t % CYCLE) - slot;
          if (p >= 0 && p < GLOW) ign = Math.sin((p / GLOW) * Math.PI) ** 1.5;
        }
        const breathe = 1 + Math.sin(t * 1.4 + n.userData.phase) * 0.08;
        n.scale.setScalar(breathe + ign * 0.85);
        n.material.userData.ign = ign;
        const halo = nadHalos[i];
        halo.scale.setScalar(1 + ign * 4.2);
        halo.material.opacity = ign * 0.3;
      });

      // Cocoon glow — gentle breathing, brighter and warmer while a session runs
      cocoonMat.color.copy(podLight.color);
      cocoonMat.opacity = THREE.MathUtils.lerp(
        cocoonMat.opacity,
        (inSession ? 0.15 : 0.06) + Math.sin(t * 0.9) * 0.02,
        0.05
      );

      // Binaural expanding rings
      const bl = 1 + ((t % 2.3) / 2.3);
      binL.scale.setScalar(bl);
      binMatL.opacity = (0.2 + (binMatL.userData?.boost || 0) * 0.4) * (1 - (t % 2.3) / 2.3);
      const br = 1 + ((t % 2.0) / 2.0);
      binR.scale.setScalar(br);
      binMatR.opacity = (0.2 + (binMatR.userData?.boost || 0) * 0.4) * (1 - (t % 2.0) / 2.0);

      // PEMF rings drift
      pemfRings.forEach((ring) => {
        ring.rotation.y += ring.userData.speed;
      });

      // Corona spin
      coronaRings.forEach((r) => { r.rotation.z += r.userData.spin; });

      // Fireflies drift
      const bp = bioGeo.attributes.position.array;
      for (let i = 0; i < bioCount; i++) {
        bp[i * 3] += bioDrift[i].x;
        bp[i * 3 + 1] += bioDrift[i].y;
        bp[i * 3 + 2] += bioDrift[i].z;
        if (bp[i * 3 + 1] > 3.6 || bp[i * 3 + 1] < 0.2) bioDrift[i].y *= -1;
        if (Math.abs(bp[i * 3]) > 3.2) bioDrift[i].x *= -1;
        if (Math.abs(bp[i * 3 + 2]) > 3.2) bioDrift[i].z *= -1;
      }
      bioGeo.attributes.position.needsUpdate = true;

      // Water shimmer
      vorWaterMat.emissiveIntensity = 0.4 + Math.sin(t * 2.5) * 0.15 + (vorWaterMat.userData?.boost || 0);
      vorWater.rotation.y += 0.02;

      // Zone highlight easing (emissive materials) + point materials via opacity
      Object.values(zones).flat().forEach((mat) => {
        if (!mat.userData) return;
        const { baseEmissive, peak, boost } = mat.userData;
        const target = baseEmissive + boost * (peak - baseEmissive);
        if (mat.emissiveIntensity !== undefined) {
          mat.emissiveIntensity = THREE.MathUtils.lerp(mat.emissiveIntensity, target, 0.08) + (mat.userData.ign || 0) * 2.6;
        } else if (mat.opacity !== undefined) {
          mat.opacity = THREE.MathUtils.lerp(mat.opacity, target, 0.08);
        }
      });

      // Status dot pulses (layered on top of highlight)
      statusMats.forEach((m, i) => {
        m.emissiveIntensity += Math.sin(t * 2 + i * 0.5) * 0.12;
      });

      camera.position.lerp(camTarget, 0.06);
      controls.target.lerp(tgtTarget, 0.06);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
      stateRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const s = stateRef.current;
    if (s && s.controls) s.controls.autoRotate = !!autoRotate;
  }, [autoRotate]);

  return <div ref={mountRef} className="absolute inset-0 no-select" style={{ background: "#070B14" }} />;
}