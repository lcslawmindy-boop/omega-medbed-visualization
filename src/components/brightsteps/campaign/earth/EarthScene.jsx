import React, { useRef, useEffect } from "react";
import * as THREE from "three";

const DARK = {
  land: new THREE.Color("#241016"),
  ocean: new THREE.Color("#12060A"),
  grid: new THREE.Color("#FF2D2D"),
  atmo: new THREE.Color("#FF2A2A"),
  node: new THREE.Color("#FF3B30"),
  haze: new THREE.Color("#6E1414"),
};
const LIGHT = {
  land: new THREE.Color("#1B5E4A"),
  ocean: new THREE.Color("#08304A"),
  grid: new THREE.Color("#C9A84C"),
  atmo: new THREE.Color("#5BE0A0"),
  node: new THREE.Color("#F5D27A"),
  haze: new THREE.Color("#C9A84C"),
};

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

    // --- planet body
    const bodyMat = new THREE.MeshStandardMaterial({
      color: DARK.ocean.clone(), roughness: 0.85, metalness: 0.15,
      emissive: DARK.land.clone(), emissiveIntensity: 0.35,
    });
    const body = new THREE.Mesh(new THREE.SphereGeometry(2, low ? 40 : 72, low ? 28 : 52), bodyMat);
    globe.add(body);

    // --- lat/long grid (EMF net → scalar lattice)
    const gridMat = new THREE.LineBasicMaterial({ color: DARK.grid.clone(), transparent: true, opacity: 0.85 });
    const grid = new THREE.LineSegments(
      new THREE.WireframeGeometry(new THREE.SphereGeometry(2.02, low ? 20 : 30, low ? 14 : 20)),
      gridMat
    );
    globe.add(grid);

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

    // --- animate (t eases toward target over ~800ms)
    let t = targetRef.current;
    let raf, last = performance.now();
    const c = new THREE.Color();
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (!visible) return;

      const goal = targetRef.current;
      t += (goal - t) * Math.min(dt / 0.28, 1);
      const e = t * t * (3 - 2 * t); // smoothstep

      bodyMat.color.copy(c.copy(DARK.ocean).lerp(LIGHT.ocean, e));
      bodyMat.emissive.copy(c.copy(DARK.land).lerp(LIGHT.land, e));
      bodyMat.emissiveIntensity = 0.35 + e * 0.35;
      gridMat.color.copy(c.copy(DARK.grid).lerp(LIGHT.grid, e));
      gridMat.opacity = 0.85 - e * 0.35;
      nodeMat.color.copy(c.copy(DARK.node).lerp(LIGHT.node, e));
      atmoMat.color.copy(c.copy(DARK.atmo).lerp(LIGHT.atmo, e));
      atmoMat.opacity = 0.16 + e * 0.16;
      hazeMat.color.copy(c.copy(DARK.haze).lerp(LIGHT.haze, e));
      hazeMat.opacity = 0.55 - e * 0.3;
      rim.color.copy(c.copy(DARK.grid).lerp(LIGHT.grid, e));

      const pulse = 0.5 + 0.5 * Math.sin(now / 420);
      nodeMat.size = (low ? 0.075 : 0.06) * (1 + e * pulse * 0.7);
      rings.forEach((r, i) => {
        r.material.opacity = e * (0.5 + 0.5 * Math.sin(now / 600 + i));
        r.rotation.z += dt * (0.08 + i * 0.04) * (0.2 + e);
        r.scale.setScalar(0.9 + e * 0.1);
      });

      globe.rotation.y += dt * (0.05 + e * 0.03);
      haze.rotation.y -= dt * 0.02;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      renderer.dispose();
      scene.traverse((o) => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) o.material.dispose();
      });
      if (renderer.domElement.parentNode) renderer.domElement.parentNode.removeChild(renderer.domElement);
    };
  }, [quality]);

  return <div ref={mountRef} className="absolute inset-0" />;
}