import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const AhiGlobe: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene Setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
        camera.position.z = 18;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        // Core Sphere (Human) - pulsating
        const coreGeometry = new THREE.IcosahedronGeometry(4, 2);
        const coreMaterial = new THREE.MeshBasicMaterial({
            color: 0x38bdf8, // Sky Blue
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });
        const coreSphere = new THREE.Mesh(coreGeometry, coreMaterial);
        scene.add(coreSphere);

        // Outer Network (AHI Augmentation)
        const outerGeometry = new THREE.IcosahedronGeometry(8, 1);
        const outerMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.05
        });
        const outerNetwork = new THREE.LineSegments(new THREE.WireframeGeometry(outerGeometry), outerMaterial);
        scene.add(outerNetwork);

        // Data Nodes (Floating interactive points)
        const particlesGeometry = new THREE.BufferGeometry();
        const particlesCount = 100;
        const posArray = new Float32Array(particlesCount * 3);

        for (let i = 0; i < particlesCount * 3; i++) {
            posArray[i] = (Math.random() - 0.5) * 25;
        }

        particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
        const particlesMaterial = new THREE.PointsMaterial({
            size: 0.15,
            color: 0xfef08a, // Yellow
            transparent: true,
            opacity: 0.8
        });
        const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
        scene.add(particlesMesh);

        // Connecting Lines (Neural Links)
        const lineGeo = new THREE.BufferGeometry();
        const lineMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.1 });
        const linesMesh = new THREE.LineSegments(lineGeo, lineMat);
        scene.add(linesMesh);

        // Interaction state
        const mouse = new THREE.Vector2();
        let targetRotationX = 0;
        let targetRotationY = 0;

        const handleMouseMove = (event: MouseEvent) => {
            const rect = mountRef.current?.getBoundingClientRect();
            if (rect) {
                mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
                mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
                targetRotationY = mouse.x * 0.8; // Increased sensitivity for better hover effect
                targetRotationX = mouse.y * 0.8; // Increased sensitivity for better hover effect
            }
        };

        const canvas = renderer.domElement;
        canvas.addEventListener('mousemove', handleMouseMove);

        const clock = new THREE.Clock();

        const animate = () => {
            requestAnimationFrame(animate);
            const elapsedTime = clock.getElapsedTime();

            // Rotate core
            coreSphere.rotation.y += 0.002;
            coreSphere.rotation.x += 0.001;

            // Pulse core
            const scale = 1 + Math.sin(elapsedTime * 2) * 0.05;
            coreSphere.scale.set(scale, scale, scale);

            // Rotate outer network inversely
            outerNetwork.rotation.y -= 0.001;

            // Smooth mouse look for entire group
            scene.rotation.y += (targetRotationY - scene.rotation.y) * 0.05;
            scene.rotation.x += (targetRotationX - scene.rotation.x) * 0.05;

            // Update Dynamic Connections
            // (Simple distance check for dynamic lines - computationally slightly heavy but fine for 100 particles)
            // Ideally we'd optimize this, but for <200 nodes it's okay for a demo.
            // ... actually let's skip expensive N^2 in loop for this specific request to keep FPS high.
            // animating particles instead.
            particlesMesh.rotation.y = elapsedTime * 0.05;

            renderer.render(scene, camera);
        };

        animate();

        // Resize handler
        const handleResize = () => {
            if (mountRef.current) {
                camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            canvas.removeEventListener('mousemove', handleMouseMove);
            mountRef.current?.removeChild(renderer.domElement);
            // Cleanup
            coreGeometry.dispose();
            coreMaterial.dispose();
            outerGeometry.dispose();
            outerMaterial.dispose();
            particlesGeometry.dispose();
            particlesMaterial.dispose();
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} className="w-full h-[500px] md:h-[600px] cursor-move hover:cursor-grab active:cursor-grabbing" title="Interactive AHI Neural Map" />;
};

export default AhiGlobe;
