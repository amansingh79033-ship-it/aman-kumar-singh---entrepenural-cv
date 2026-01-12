
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { ViewState } from '../App';

interface ThreeBackgroundProps {
  currentView: ViewState;
}

const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ currentView }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const frameIdRef = useRef<number>();

  useEffect(() => {
    if (!containerRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const particlesCount = 2000;
    const positions = new Float32Array(particlesCount * 3);
    const colors = new Float32Array(particlesCount * 3);
    
    const skyBlue = new THREE.Color(0x7dd3fc);
    const softYellow = new THREE.Color(0xfef08a);

    for (let i = 0; i < particlesCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;

      const mixedColor = Math.random() > 0.85 ? softYellow : skyBlue;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.02,
      vertexColors: true,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });

    const points = new THREE.Points(geometry, material);
    pointsRef.current = points;
    scene.add(points);

    camera.position.z = 4;

    let mouseX = 0;
    let mouseY = 0;
    let isMouseMoving = false;
    let lastMouseX = 0;
    let lastMouseY = 0;
    
    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
      
      // Detect if mouse is actively moving
      if (lastMouseX !== e.clientX || lastMouseY !== e.clientY) {
        isMouseMoving = true;
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      }
    };
    
    const onMouseEnter = () => {
      isMouseMoving = true;
    };
    
    const onMouseLeave = () => {
      isMouseMoving = false;
      mouseX = 0;
      mouseY = 0;
    };
    
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseenter', onMouseEnter);
    window.addEventListener('mouseleave', onMouseLeave);

    const animate = () => {
      frameIdRef.current = requestAnimationFrame(animate);
      
      if (pointsRef.current) {
        // Enhanced parallax effect when mouse is moving
        if (isMouseMoving) {
          pointsRef.current.rotation.x += (mouseY * 0.2 - pointsRef.current.rotation.x) * 0.08;
          pointsRef.current.rotation.y += (mouseX * 0.2 - pointsRef.current.rotation.y) * 0.08;
          
          // Increase particle size slightly for more dynamic effect
          (pointsRef.current.material as THREE.PointsMaterial).size = 0.025;
        } else {
          // Subtle auto-rotation when mouse is idle
          pointsRef.current.rotation.y += 0.001;
          (pointsRef.current.material as THREE.PointsMaterial).size = 0.02;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseenter', onMouseEnter);
      window.removeEventListener('mouseleave', onMouseLeave);
      if (frameIdRef.current) cancelAnimationFrame(frameIdRef.current);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (!pointsRef.current) return;
    
    const targetScale = currentView === 'home' ? 1 : 1.3;
    const targetOpacity = currentView === 'mindspace' ? 0.2 : 0.4;
    
    pointsRef.current.scale.set(targetScale, targetScale, targetScale);
    if (pointsRef.current.material instanceof THREE.PointsMaterial) {
      pointsRef.current.material.opacity = targetOpacity;
    }
  }, [currentView]);

  return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" />;
};

export default ThreeBackground;
