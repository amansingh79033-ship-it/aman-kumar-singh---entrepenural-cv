import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface HologramProps {
    color?: string;
    shape?: 'sphere' | 'torus' | 'octahedron';
}

const Hologram: React.FC<HologramProps> = ({ color = "#38bdf8", shape = 'sphere' }) => {
    const mountRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mountRef.current) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(50, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
        mountRef.current.appendChild(renderer.domElement);

        // Geometry Selection
        let geometry: THREE.BufferGeometry;
        switch (shape) {
            case 'torus':
                geometry = new THREE.TorusGeometry(1.5, 0.4, 16, 100);
                break;
            case 'octahedron':
                geometry = new THREE.OctahedronGeometry(2, 0);
                break;
            case 'sphere':
            default:
                geometry = new THREE.IcosahedronGeometry(2, 1);
                break;
        }

        const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color(color),
            wireframe: true,
            transparent: true,
            opacity: 0.3
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        // Glow Effect (Inner Sphere)
        const glowGeo = new THREE.IcosahedronGeometry(shape === 'torus' ? 1 : 1.5, 2);
        const glowMat = new THREE.MeshBasicMaterial({
            color: new THREE.Color(color),
            transparent: true,
            opacity: 0.1,
        });
        const glowMesh = new THREE.Mesh(glowGeo, glowMat);
        scene.add(glowMesh);

        // Animation Loop
        const animate = () => {
            requestAnimationFrame(animate);
            mesh.rotation.x += 0.005;
            mesh.rotation.y += 0.01;
            glowMesh.rotation.x -= 0.005;
            glowMesh.rotation.y -= 0.01;

            // Pulse
            const scale = 1 + Math.sin(Date.now() * 0.002) * 0.05;
            mesh.scale.set(scale, scale, scale);

            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            if (mountRef.current) {
                const width = mountRef.current.clientWidth;
                const height = mountRef.current.clientHeight;
                renderer.setSize(width, height);
                camera.aspect = width / height;
                camera.updateProjectionMatrix();
            }
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            if (mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }
            geometry.dispose();
            material.dispose();
            renderer.dispose();
        };
    }, [color, shape]);

    return <div ref={mountRef} className="w-full h-full min-h-[300px]" />;
};

export default Hologram;
