import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const DARK = {
  land: new THREE.Color("#2A0B08"),
  ocean: new THREE.Color("#12060A"),
  tint: new THREE.Color("#8F4038"),
  grid: new THREE.Color("#FF2D2D"),
  atmo: new THREE.Color("#FF2A2A"),
  node: new THREE.Color("#FF3B30"),
  haze: new THREE.Color("#6E1414"),
};
const LIGHT = {
  land: new THREE.Color("#1B5E4A"),
  ocean: new THREE.Color("#08304A"),
  tint: new THREE.Color("#E9F5EC"),
  grid: new THREE.Color("#C9A84C"),
  atmo: new THREE.Color("#5BE0A0"),
  node: new THREE.Color("#F5D27A"),
  haze: new THREE.Color("#C9A84C"),
};

function emojiTexture(emoji) {
  const cnv = document.createElement("canvas");
  cnv.width = cnv.height = 64;
  const ctx = cnv.getContext("2d");
  ctx.font = "48px serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(emoji, 32, 36);
  return new THREE.CanvasTexture(cnv);
}

function glowTexture() {
  const cnv = document.createElement("canvas");
  cnv.width = cnv.height = 128;
  const ctx = cnv.getContext("2d");
  const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,255,255,0.35)");
  g.addColorStop(1, "rgba(255,255,255,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(cnv);
}

/** t: 0 = Dark Timeline, 1 = Light Timeline — animated externally via `target` prop */
export default function EarthScene({ target = 0, quality = "high" }) {
  const mountRef = useRef(null);
  const targetRef = useRef(target);
  targetRef.current = target;

  useEffect(() => {
    const mount = mountRef.current;
    const low = quality === "low";
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.6, 6.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: !low, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, low ? 1.4 : 2));
    mount.appendChild(renderer.domElement);

    const globe = new THREE.Group();
    scene.add(globe);

    // --- starfield
    const starCount = low ? 350 : 800;
    const spos = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(18 + Math.random() * 22);
      spos.set([v.x, v.y, v.z], i * 3);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(spos, 3));
    const starMat = new THREE.PointsMaterial({ color: 0xdfe9ff, size: 0.09, transparent: true, opacity: 0.5, depthWrite: false });
    scene.add(new THREE.Points(starGeo, starMat));

    // --- planet body (real Earth surface, blood-tinted when smothered)
    const bodyMat = new THREE.MeshStandardMaterial({
      color: DARK.tint.clone(), roughness: 0.85, metalness: 0.15,
      emissive: DARK.land.clone(), emissiveIntensity: 0.35,
      transparent: true, opacity: 0.72,
    });
    const body = new THREE.Mesh(new THREE.SphereGeometry(2, low ? 40 : 72, low ? 28 : 52), bodyMat);
    globe.add(body);
    new THREE.TextureLoader().load(
      "https://unpkg.com/three-globe@2.31.0/example/img/earth-blue-marble.jpg",
      (tx) => { tx.colorSpace = THREE.SRGBColorSpace; bodyMat.map = tx; bodyMat.needsUpdate = true; }
    );

    // --- lat/long grid (EMF net → scalar lattice)
    const gridMat = new THREE.LineBasicMaterial({ color: DARK.grid.clone(), transparent: true, opacity: 0.85 });
    const grid = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.SphereGeometry(2.02, low ? 20 : 30, low ? 14 : 20)),
      gridMat
    );
    globe.add(grid);

    // --- second choke-net: dense inner gridlock that constricts in the dark timeline
    const chokeMat = new THREE.LineBasicMaterial({ color: DARK.grid.clone(), transparent: true, opacity: 0.35 });
    const choke = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.SphereGeometry(2.06, low ? 36 : 48, low ? 24 : 32)),
      chokeMat
    );
    choke.rotation.z = 0.5;
    globe.add(choke);

    // --- dark-timeline surface markers (fade away when the planet heals)
    const darkFade = []; // { mat, base }
    const surfPoint = (r) => new THREE.Vector3().randomDirection().multiplyScalar(r);

    // EMF towers: red spikes jutting from the surface
    const towerMat = new THREE.MeshBasicMaterial({ color: DARK.grid.clone(), transparent: true, opacity: 0.9 });
    darkFade.push({ mat: towerMat, base: 0.9 });
    const towerGeo = new THREE.ConeGeometry(0.015, 0.3, 4);
    const towerCount = low ? 22 : 40;
    for (let i = 0; i < towerCount; i++) {
      const dir = new THREE.Vector3().randomDirection();
      const tower = new THREE.Mesh(towerGeo, towerMat);
      tower.position.copy(dir.clone().multiplyScalar(2.12));
      tower.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
      globe.add(tower);
    }

    // emoji marker fields: nuclear, fossil fuel, ocean trash, dying plankton, vanishing animals, bees gone
    const MARKERS = [
      { emoji: "☢️", count: low ? 6 : 10, scale: 0.26, base: 0.95 },
      { emoji: "🛢️", count: low ? 6 : 10, scale: 0.24, base: 0.95 },
      { emoji: "🏭", count: low ? 5 : 8, scale: 0.24, base: 0.9 },
      { emoji: "🗑️", count: low ? 6 : 10, scale: 0.2, base: 0.85 },
      { emoji: "🦠", count: low ? 8 : 14, scale: 0.16, base: 0.7 },
      { emoji: "💀", count: low ? 5 : 8, scale: 0.22, base: 0.9 },
      { emoji: "🐘", count: 3, scale: 0.24, base: 0.85 },
      { emoji: "🐋", count: 3, scale: 0.24, base: 0.85 },
      { emoji: "🐝", count: low ? 5 : 8, scale: 0.18, base: 0.8, flicker: true },
    ];
    const flickerMats = [];
    const markerTextures = [];
    MARKERS.forEach((mk) => {
      const tex = emojiTexture(mk.emoji);
      markerTextures.push(tex);
      const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: mk.base, depthWrite: false });
      darkFade.push({ mat, base: mk.base });
      if (mk.flicker) flickerMats.push(mat);
      for (let i = 0; i < mk.count; i++) {
        const s = new THREE.Sprite(mat);
        s.position.copy(surfPoint(2.18 + Math.random() * 0.1));
        s.scale.setScalar(mk.scale);
        globe.add(s);
      }
    });

    // --- city / node points
    const nodeMat = new THREE.PointsMaterial({ color: DARK.node.clone(), size: low ? 0.075 : 0.06, transparent: true, opacity: 0.95 });
    const nodeCount = low ? 220 : 420;
    const npos = new Float32Array(nodeCount * 3);
    for (let i = 0; i < nodeCount; i++) {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(2.05);
      npos.set([v.x, v.y, v.z], i * 3);
    }
    const nodeGeo = new THREE.BufferGeometry();
    nodeGeo.setAttribute("position", new THREE.BufferAttribute(npos, 3));
    const nodes = new THREE.Points(nodeGeo, nodeMat);
    globe.add(nodes);

    // --- atmosphere shell
    const atmoMat = new THREE.MeshBasicMaterial({
      color: DARK.atmo.clone(), transparent: true, opacity: 0.16, side: THREE.BackSide,
    });
    const atmo = new THREE.Mesh(new THREE.SphereGeometry(2.42, low ? 32 : 56, low ? 22 : 40), atmoMat);
    globe.add(atmo);

    // --- scalar healing rings (Light Timeline)
    const rings = [];
    [2.7, 3.05, 3.4].forEach((r, i) => {
      const m = new THREE.MeshBasicMaterial({ color: LIGHT.grid.clone(), transparent: true, opacity: 0, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.012, 8, low ? 90 : 180), m);
      ring.rotation.x = Math.PI / 2 + (i - 1) * 0.42;
      ring.rotation.z = i * 0.6;
      scene.add(ring);
      rings.push(ring);
    });

    // --- haze / smoke field
    const hazeCount = low ? 340 : 900;
    const hpos = new Float32Array(hazeCount * 3);
    for (let i = 0; i < hazeCount; i++) {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(2.6 + Math.random() * 2.6);
      hpos.set([v.x, v.y, v.z], i * 3);
    }
    const hazeGeo = new THREE.BufferGeometry();
    hazeGeo.setAttribute("position", new THREE.BufferAttribute(hpos, 3));
    const hazeMat = new THREE.PointsMaterial({ color: DARK.haze.clone(), size: 0.05, transparent: true, opacity: 0.55 });
    const haze = new THREE.Points(hazeGeo, hazeMat);
    scene.add(haze);

    // --- rising golden motes (Light Timeline healing particles)
    const moteCount = low ? 140 : 320;
    const mpos = new Float32Array(moteCount * 3);
    const mspeed = new Float32Array(moteCount);
    for (let i = 0; i < moteCount; i++) {
      const v = new THREE.Vector3().randomDirection().multiplyScalar(2.15 + Math.random() * 1.3);
      mpos.set([v.x, v.y, v.z], i * 3);
      mspeed[i] = 0.25 + Math.random() * 0.55;
    }
    const moteGeo = new THREE.BufferGeometry();
    moteGeo.setAttribute("position", new THREE.BufferAttribute(mpos, 3));
    const moteMat = new THREE.PointsMaterial({
      color: LIGHT.node.clone(), size: 0.055, transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const motes = new THREE.Points(moteGeo, moteMat);
    scene.add(motes);

    // --- healing shockwave (fires on every timeline flip)
    const waveMat = new THREE.MeshBasicMaterial({
      color: LIGHT.node.clone(), transparent: true, opacity: 0, side: THREE.BackSide,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const wave = new THREE.Mesh(new THREE.SphereGeometry(1, low ? 24 : 40, low ? 16 : 28), waveMat);
    scene.add(wave);

    // --- sun-glow backlight
    const glowTex = glowTexture();
    const glowMat = new THREE.SpriteMaterial({
      map: glowTex, color: DARK.grid.clone(), transparent: true, opacity: 0.22,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const glow = new THREE.Sprite(glowMat);
    glow.position.set(-2.6, 1.3, -4);
    glow.scale.setScalar(6);
    scene.add(glow);

    // --- lights
    const key = new THREE.DirectionalLight(0xffffff, 1.5);
    key.position.set(4, 3, 5);
    scene.add(key, new THREE.AmbientLight(0xffffff, 0.35));
    const rim = new THREE.PointLight(DARK.grid.getHex(), 3.2, 22);
    rim.position.set(-4, 1.5, -3);
    scene.add(rim);

    // --- resize
    const resize = () => {
      const w = mount.clientWidth, h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // --- pause when off-screen
    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.05 });
    io.observe(mount);

    // --- animate (t eases toward target — slow, weighty morph ~2s)
    let t = targetRef.current;
    let prevGoal = targetRef.current;
    let waveT = 1;
    let raf, last = performance.now();
    const c = new THREE.Color();
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible) return;

      const goal = targetRef.current;
      if (goal !== prevGoal) {
        prevGoal = goal;
        waveT = 0;
        waveMat.color.copy(goal === 1 ? LIGHT.node : DARK.grid);
      }
      t += (goal - t) * Math.min(dt / 0.75, 1);
      const e = t * t * (3 - 2 * t); // smoothstep

      bodyMat.color.copy(c.copy(DARK.tint).lerp(LIGHT.tint, e));
      bodyMat.opacity = 0.72 + e * 0.24;
      // sickness markers dissolve as the field is restored; bees flicker out
      darkFade.forEach((f) => { f.mat.opacity = (1 - e) * f.base; });
      flickerMats.forEach((m) => { m.opacity = (1 - e) * (0.25 + 0.55 * Math.abs(Math.sin(now / 310))); });
      bodyMat.emissive.copy(c.copy(DARK.land).lerp(LIGHT.land, e));
      bodyMat.emissiveIntensity = 0.3 - e * 0.18;
      gridMat.color.copy(c.copy(DARK.grid).lerp(LIGHT.grid, e));
      gridMat.opacity = 0.85 - e * 0.55;
      nodeMat.color.copy(c.copy(DARK.node).lerp(LIGHT.node, e));
      atmoMat.color.copy(c.copy(DARK.atmo).lerp(LIGHT.atmo, e));
      atmoMat.opacity = 0.26 - e * 0.08;
      // choke-net throbs and constricts as it smothers; dissolves in the light
      chokeMat.opacity = (1 - e) * (0.3 + 0.18 * Math.sin(now / 340));
      choke.scale.setScalar(1 - (1 - e) * 0.012 * (0.5 + 0.5 * Math.sin(now / 480)));
      choke.rotation.y -= dt * 0.02 * (1 - e);
      hazeMat.color.copy(c.copy(DARK.haze).lerp(LIGHT.haze, e));
      hazeMat.opacity = 0.55 - e * 0.38;
      rim.color.copy(c.copy(DARK.grid).lerp(LIGHT.grid, e));
      rim.intensity = 3.2 + e * 1.4;
      glowMat.color.copy(c.copy(DARK.grid).lerp(LIGHT.haze, e));
      glowMat.opacity = 0.22 + e * 0.3;
      glow.scale.setScalar(6 + e * 3.5);
      starMat.opacity = 0.5 + e * 0.3;

      // dark timeline: the grid throbs like a tightening net
      grid.scale.setScalar(1 + (1 - e) * 0.006 * Math.sin(now / 260));

      // healing shockwave sweep
      if (waveT < 1) {
        waveT = Math.min(waveT + dt / 1.5, 1);
        wave.scale.setScalar(2 + waveT * 7.5);
        waveMat.opacity = Math.sin(waveT * Math.PI) * 0.4;
      } else {
        waveMat.opacity = 0;
      }

      // rising golden motes
      moteMat.opacity = e * 0.85;
      if (e > 0.02) {
        const arr = moteGeo.attributes.position.array;
        for (let i = 0; i < moteCount; i++) {
          arr[i * 3 + 1] += dt * mspeed[i] * e;
          if (arr[i * 3 + 1] > 3.6) arr[i * 3 + 1] = -3.6;
        }
        moteGeo.attributes.position.needsUpdate = true;
      }

      const pulse = 0.5 + 0.5 * Math.sin(now / 420);
      nodeMat.size = (low ? 0.075 : 0.06) * (1 + e * pulse * 0.7);
      rings.forEach((r, i) => {
        r.material.opacity = e * (0.5 + 0.5 * Math.sin(now / 600 + i));
        r.rotation.z += dt * (0.08 + i * 0.04) * (0.2 + e);
        r.scale.setScalar(0.9 + e * 0.1);
      });

      // cinematic camera drift + punch-in during the flip
      const punch = waveT < 1 ? Math.sin(waveT * Math.PI) * 0.55 : 0;
      camera.position.x = Math.sin(now / 9000) * 0.3;
      camera.position.y = 0.6 + Math.sin(now / 7000) * 0.12;
      camera.position.z = 6.2 - punch;
      camera.lookAt(0, 0, 0);

      globe.rotation.y += dt * (0.05 + e * 0.03);
      haze.rotation.y -= dt * 0.02;
      motes.rotation.y += dt * 0.015;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      renderer.dispose();
      glowTex.dispose();
      markerTextures.forEach((t) => t.dispose());
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) o.material.dispose();
      });
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, [quality]);

  return <div ref={mountRef} className="absolute inset-0" />;
}