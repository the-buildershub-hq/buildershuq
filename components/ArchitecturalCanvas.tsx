"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ArchitecturalCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      36,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.8);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    container.appendChild(renderer.domElement);

    // Procedural concrete noise texture for tactile stone finish
    const noiseCanvas = document.createElement("canvas");
    noiseCanvas.width = 256;
    noiseCanvas.height = 256;
    const ctx = noiseCanvas.getContext("2d");
    if (ctx) {
      const imgData = ctx.createImageData(256, 256);
      for (let i = 0; i < imgData.data.length; i += 4) {
        const val = 175 + Math.floor(Math.random() * 80);
        imgData.data[i] = val;
        imgData.data[i + 1] = val;
        imgData.data[i + 2] = val;
        imgData.data[i + 3] = 255;
      }
      ctx.putImageData(imgData, 0, 0);
    }
    const noiseTexture = new THREE.CanvasTexture(noiseCanvas);
    noiseTexture.wrapS = THREE.RepeatWrapping;
    noiseTexture.wrapT = THREE.RepeatWrapping;
    noiseTexture.repeat.set(2, 2);

    // Materials
    const createStoneMaterial = (colorHex: number, roughness = 0.85, metalness = 0.08) => {
      return new THREE.MeshStandardMaterial({
        color: colorHex,
        roughness,
        metalness,
        bumpMap: noiseTexture,
        bumpScale: 0.012,
      });
    };

    const lightConcreteMat = createStoneMaterial(0xdcdce0, 0.82);
    const midConcreteMat = createStoneMaterial(0x8a8a92, 0.88);
    const darkSlateMat = createStoneMaterial(0x38383f, 0.9);
    const graphiteMat = createStoneMaterial(0x202024, 0.92);
    const accentRodMat = createStoneMaterial(0xb0b0b8, 0.5, 0.25);

    // Sculptural Group
    const group = new THREE.Group();
    scene.add(group);

    // 1. Archway (Roman / brutalist portal)
    const archShape = new THREE.Shape();
    const aw = 1.25;
    const ah = 1.7;
    archShape.moveTo(-aw / 2, -ah / 2);
    archShape.lineTo(aw / 2, -ah / 2);
    archShape.lineTo(aw / 2, ah / 2);
    archShape.lineTo(-aw / 2, ah / 2);
    archShape.closePath();

    const archHole = new THREE.Path();
    const hw = 0.55;
    const hh = 0.85;
    const hr = 0.275;
    archHole.moveTo(-hw / 2, -ah / 2);
    archHole.lineTo(hw / 2, -ah / 2);
    archHole.lineTo(hw / 2, -ah / 2 + hh);
    archHole.absarc(0, -ah / 2 + hh, hr, 0, Math.PI, false);
    archHole.lineTo(-hw / 2, -ah / 2);
    archShape.holes.push(archHole);

    const archGeo = new THREE.ExtrudeGeometry(archShape, {
      depth: 0.55,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.025,
      bevelThickness: 0.025,
    });
    archGeo.center();
    const archMesh = new THREE.Mesh(archGeo, lightConcreteMat);
    archMesh.position.set(0.95, 0.9, 0.1);
    group.add(archMesh);

    // 2. Large Tilted Concrete Cube (Left)
    const largeCubeGeo = new THREE.BoxGeometry(1.4, 1.4, 1.4);
    const largeCubeMesh = new THREE.Mesh(largeCubeGeo, midConcreteMat);
    largeCubeMesh.position.set(-0.9, 0.75, 0.1);
    largeCubeMesh.rotation.set(0.38, 0.44, 0.22);
    group.add(largeCubeMesh);

    // 3. Lower Dark Concrete Block (Right)
    const lowerBlockGeo = new THREE.BoxGeometry(1.15, 1.15, 1.15);
    const lowerBlockMesh = new THREE.Mesh(lowerBlockGeo, darkSlateMat);
    lowerBlockMesh.position.set(0.42, -0.75, 0.25);
    lowerBlockMesh.rotation.set(0.48, -0.38, 0.28);
    group.add(lowerBlockMesh);

    // 4. Central Nestled Sphere
    const centerSphereGeo = new THREE.SphereGeometry(0.38, 36, 36);
    const centerSphereMesh = new THREE.Mesh(centerSphereGeo, lightConcreteMat);
    centerSphereMesh.position.set(0.38, 0.56, 0.42);
    group.add(centerSphereMesh);

    // 5. Lower Nestled Sphere
    const lowerSphereGeo = new THREE.SphereGeometry(0.24, 32, 32);
    const lowerSphereMesh = new THREE.Mesh(lowerSphereGeo, graphiteMat);
    lowerSphereMesh.position.set(0.26, -1.35, 0.2);
    group.add(lowerSphereMesh);

    // 6. Cones / Pyramidal Elements
    // Top upright cone
    const topConeGeo = new THREE.ConeGeometry(0.24, 0.65, 32);
    const topConeMesh = new THREE.Mesh(topConeGeo, darkSlateMat);
    topConeMesh.position.set(-0.06, 1.5, 0.25);
    group.add(topConeMesh);

    // Left upright cone
    const leftConeGeo = new THREE.ConeGeometry(0.28, 0.62, 32);
    const leftConeMesh = new THREE.Mesh(leftConeGeo, midConcreteMat);
    leftConeMesh.position.set(-1.25, -0.28, 0.35);
    group.add(leftConeMesh);

    // Bottom right inverted cone
    const bottomConeGeo = new THREE.ConeGeometry(0.26, 0.72, 32);
    const bottomConeMesh = new THREE.Mesh(bottomConeGeo, darkSlateMat);
    bottomConeMesh.position.set(1.18, -0.85, 0.18);
    bottomConeMesh.rotation.x = Math.PI;
    group.add(bottomConeMesh);

    // 7. Structural Cantilever Slabs and Beams
    // Horizontal slab under left cone
    const leftSlabGeo = new THREE.BoxGeometry(0.9, 0.08, 0.75);
    const leftSlabMesh = new THREE.Mesh(leftSlabGeo, lightConcreteMat);
    leftSlabMesh.position.set(-1.25, -0.62, 0.35);
    group.add(leftSlabMesh);

    // Tilted platform under right cone
    const rightPlatformGeo = new THREE.BoxGeometry(0.9, 0.08, 0.75);
    const rightPlatformMesh = new THREE.Mesh(rightPlatformGeo, lightConcreteMat);
    rightPlatformMesh.position.set(1.08, -0.52, 0.2);
    rightPlatformMesh.rotation.set(0.15, 0.2, -0.25);
    group.add(rightPlatformMesh);

    // Central cross beam
    const centerBeamGeo = new THREE.BoxGeometry(1.75, 0.18, 0.55);
    const centerBeamMesh = new THREE.Mesh(centerBeamGeo, lightConcreteMat);
    centerBeamMesh.position.set(0.05, 0.38, 0.22);
    centerBeamMesh.rotation.set(-0.1, 0.15, -0.32);
    group.add(centerBeamMesh);

    // Vertical pillar slab
    const verticalPillarGeo = new THREE.BoxGeometry(0.18, 1.25, 0.35);
    const verticalPillarMesh = new THREE.Mesh(verticalPillarGeo, midConcreteMat);
    verticalPillarMesh.position.set(-0.95, -0.58, 0.25);
    group.add(verticalPillarMesh);

    // 8. Stepped and Floating Geometric Blocks
    // Top cube
    const topCubeGeo = new THREE.BoxGeometry(0.48, 0.48, 0.48);
    const topCubeMesh = new THREE.Mesh(topCubeGeo, lightConcreteMat);
    topCubeMesh.position.set(0.42, 1.82, -0.05);
    topCubeMesh.rotation.set(0.1, 0.2, 0.1);
    group.add(topCubeMesh);

    // Bottom base cantilever block
    const baseBlockGeo = new THREE.BoxGeometry(0.65, 0.42, 0.5);
    const baseBlockMesh = new THREE.Mesh(baseBlockGeo, darkSlateMat);
    baseBlockMesh.position.set(0.2, -1.62, 0.12);
    baseBlockMesh.rotation.set(0.2, 0.1, 0.35);
    group.add(baseBlockMesh);

    // Bottom-left cube
    const bottomCubeGeo = new THREE.BoxGeometry(0.52, 0.52, 0.52);
    const bottomCubeMesh = new THREE.Mesh(bottomCubeGeo, graphiteMat);
    bottomCubeMesh.position.set(-1.08, -0.98, 0.28);
    group.add(bottomCubeMesh);

    // 9. Connecting Support Rods
    const rodGeo = new THREE.CylinderGeometry(0.035, 0.035, 1.5, 20);
    const rodMesh = new THREE.Mesh(rodGeo, accentRodMat);
    rodMesh.position.set(-0.02, -0.28, 0.32);
    rodMesh.rotation.z = Math.PI / 2;
    group.add(rodMesh);

    const upperRodGeo = new THREE.CylinderGeometry(0.035, 0.035, 0.85, 20);
    const upperRodMesh = new THREE.Mesh(upperRodGeo, accentRodMat);
    upperRodMesh.position.set(0.18, 1.58, 0.08);
    upperRodMesh.rotation.z = Math.PI / 4;
    group.add(upperRodMesh);

    // Group centering adjustment
    group.position.set(0, 0, 0);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(-4, 5, 4.5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xd4d4d8, 1.4);
    fillLight.position.set(4, -3, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 2.6);
    rimLight.position.set(3, 4, -4);
    scene.add(rimLight);

    const softPointLight = new THREE.PointLight(0xffffff, 1.5, 10);
    softPointLight.position.set(0, 1.5, 3.5);
    scene.add(softPointLight);

    setIsLoaded(true);

    // Interaction state
    let targetRotationX = 0;
    let targetRotationY = 0;
    let currentRotationX = 0;
    let currentRotationY = 0;
    let isDragging = false;
    let previousPointerX = 0;
    let previousPointerY = 0;
    let isVisible = true;

    // Visibility observer to pause animation loop when scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    // Pointer event handlers for drag and hover
    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      setIsInteracting(true);
      previousPointerX = e.clientX;
      previousPointerY = e.clientY;
      container.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - previousPointerX;
        const deltaY = e.clientY - previousPointerY;
        previousPointerX = e.clientX;
        previousPointerY = e.clientY;

        targetRotationY += deltaX * 0.008;
        targetRotationX += deltaY * 0.008;
        // Clamp vertical tilt to prevent awkward flipping
        targetRotationX = Math.max(-0.7, Math.min(0.7, targetRotationX));
      } else {
        // Subtle parallax tracking on mouse move
        const rect = container.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        targetRotationY += (nx * 0.3 - targetRotationY) * 0.05;
        targetRotationX += (-ny * 0.25 - targetRotationX) * 0.05;
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (isDragging) {
        isDragging = false;
        setIsInteracting(false);
        try {
          container.releasePointerCapture(e.pointerId);
        } catch {
          // ignore
        }
      }
    };

    container.addEventListener("pointerdown", handlePointerDown);
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerup", handlePointerUp);
    container.addEventListener("pointercancel", handlePointerUp);

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      // Gentle intrinsic rotation when not actively dragging
      if (!isDragging) {
        targetRotationY += 0.0025;
      }

      // Smooth lerp damping
      currentRotationX += (targetRotationX - currentRotationX) * 0.06;
      currentRotationY += (targetRotationY - currentRotationY) * 0.06;

      group.rotation.x = currentRotationX;
      group.rotation.y = currentRotationY;

      // Dynamic light adjustment
      softPointLight.position.x = Math.sin(currentRotationY) * 2.5;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", handleResize);

      container.removeEventListener("pointerdown", handlePointerDown);
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerup", handlePointerUp);
      container.removeEventListener("pointercancel", handlePointerUp);

      // Dispose Three.js resources
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else if (obj.material) {
            obj.material.dispose();
          }
        }
      });

      noiseTexture.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full max-w-[500px] aspect-square rounded-3xl overflow-hidden bg-black select-none touch-none ${isInteracting ? "cursor-grabbing" : "cursor-grab"
        }`}
    >
      {/* Fallback poster while WebGL context initializes */}
      {!isLoaded && (
        <img
          src="/abstract.png"
          alt="Digital Foundation 3D sculpture"
          className="w-full h-full object-cover"
        />
      )}

    </div>
  );
}
