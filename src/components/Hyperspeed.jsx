import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Hyperspeed = () => {
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const starsRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 1;
    camera.rotation.x = Math.PI / 2;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    rendererRef.current = renderer;

    // Create stars
    const starGeometry = new THREE.BufferGeometry();
    const starCount = 2000;
    const positions = new Float32Array(starCount * 3);
    const velocities = new Float32Array(starCount);

    for (let i = 0; i < starCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 800;
      positions[i3 + 1] = (Math.random() - 0.5) * 800;
      positions[i3 + 2] = (Math.random() - 0.5) * 800;
      velocities[i] = Math.random() * 3 + 1;
    }

    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const starMaterial = new THREE.PointsMaterial({
      color: 0x00ffff,
      size: 2,
      transparent: true,
      opacity: 0.8,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    starsRef.current = { mesh: stars, velocities };
    scene.add(stars);

    // Animation loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      if (starsRef.current) {
        const positions = starsRef.current.mesh.geometry.attributes.position.array;
        const velocities = starsRef.current.velocities;

        for (let i = 0; i < starCount; i++) {
          const i3 = i * 3;
          positions[i3 + 2] += velocities[i];

          // Reset star position when it goes behind camera
          if (positions[i3 + 2] > 200) {
            positions[i3 + 2] = -200;
            positions[i3] = (Math.random() - 0.5) * 800;
            positions[i3 + 1] = (Math.random() - 0.5) * 800;
          }
        }

        starsRef.current.mesh.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
      starGeometry.dispose();
      starMaterial.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ background: 'radial-gradient(ellipse at bottom, #1B2735 0%, #090A0F 100%)' }}
    />
  );
};

export default Hyperspeed;
