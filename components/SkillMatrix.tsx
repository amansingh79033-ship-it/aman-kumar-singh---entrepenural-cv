import React, { useEffect, useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types ---
interface Skill {
    name: string;
    usage: string;
    category: string;
}

interface Category {
    id: string;
    name: string;
    color: string;
}

// --- Data ---
const CATEGORIES: Category[] = [
    { id: 'neural', name: "Neural / AI", color: "#a855f7" },
    { id: 'web', name: "Modern Web", color: "#38bdf8" },
    { id: 'cloud', name: "Cloud & Ops", color: "#84cc16" },
    { id: 'strategy', name: "Strategy", color: "#f43f5e" },
    { id: 'dekhRekh', name: "DekhRekh (M&O)", color: "#f59e0b" }
];

const SKILLS: Skill[] = [
    // Neural
    { name: "TensorFlow", usage: "Semantic Search & Ranking Algorithms", category: 'neural' },
    { name: "PyTorch", usage: "Market Pattern Recognition Models", category: 'neural' },
    { name: "RAG", usage: "Contextual Knowledge Retrieval", category: 'neural' },
    { name: "LangChain", usage: "Autonomous Workflow Orchestration", category: 'neural' },
    { name: "OpenAI", usage: "GPT-4 Fine-tuning & Integration", category: 'neural' },
    { name: "Vector DB", usage: "Pinecone High-Dim Storage", category: 'neural' },

    // Web
    { name: "React", usage: "Component Architecture", category: 'web' },
    { name: "Next.js", usage: "SSR/ISR Performance", category: 'web' },
    { name: "Three.js", usage: "Immersive 3D Visuals", category: 'web' },
    { name: "TypeScript", usage: "Type-Safe Scalability", category: 'web' },
    { name: "Tailwind", usage: "Rapid Design Systems", category: 'web' },
    { name: "Framer", usage: "Advanced Animations", category: 'web' },

    // Cloud & Ops
    { name: "AWS", usage: "EC2, Lambda, S3 Infrastructure", category: 'cloud' },
    { name: "Docker", usage: "Microservices Containerization", category: 'cloud' },
    { name: "K8s", usage: "Container Orchestration", category: 'cloud' },
    { name: "Terraform", usage: "Infrastructure as Code", category: 'cloud' },
    { name: "CI/CD", usage: "Automated Pipeline Delivery", category: 'cloud' },
    { name: "ArgoCD", usage: "GitOps Deployment Sync", category: 'cloud' },

    // Strategy
    { name: "System Design", usage: "Scalable Architecture Patterns", category: 'strategy' },
    { name: "First Principles", usage: "Core Problem Deconstruction", category: 'strategy' },
    { name: "Growth", usage: "Loop Optimization", category: 'strategy' },

    // DekhRekh (M&O)
    { name: "metric+", usage: "Advanced Metric Aggregation", category: 'dekhRekh' },
    { name: "metric.wtf", usage: "Real-time Edge Observability", category: 'dekhRekh' },
    { name: "Prometheus", usage: "Time-series metrics collection", category: 'dekhRekh' },
    { name: "Grafana", usage: "Visualizing system health dashboards", category: 'dekhRekh' },
    { name: "ELK Stack", usage: "Log aggregation & analysis", category: 'dekhRekh' },
    { name: "PagerDuty", usage: "Incident response orchestration", category: 'dekhRekh' },
    { name: "New Relic", usage: "Full-stack observability", category: 'dekhRekh' }
];

const SkillMatrix: React.FC = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const [activeCategory, setActiveCategory] = useState<string>('all');
    const [hoveredSkill, setHoveredSkill] = useState<{ name: string; usage: string; color: string; x: number; y: number } | null>(null);

    // Filter skills based on active category
    const activeSkills = useMemo(() => {
        if (activeCategory === 'all') return SKILLS;
        return SKILLS.filter(s => s.category === activeCategory);
    }, [activeCategory]);

    // Ref for activeCategory to be accessed in animation loop
    const activeCatRef = useRef(activeCategory);
    useEffect(() => { activeCatRef.current = activeCategory; }, [activeCategory]);

    useEffect(() => {
        if (!mountRef.current) return;

        // --- Setup ---
        const width = mountRef.current.clientWidth;
        const height = mountRef.current.clientHeight;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x050505, 0.02); // Deep dark fog

        const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
        camera.position.z = 35;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "high-performance" });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mountRef.current.appendChild(renderer.domElement);

        // --- Objects Container ---
        const constellationGroup = new THREE.Group();
        scene.add(constellationGroup);

        // --- Nodes Creation ---
        const nodes: { mesh: THREE.Mesh; bgMesh: THREE.Mesh; data: Skill; originalPos: THREE.Vector3 }[] = [];
        const linesGeometry = new THREE.BufferGeometry();
        const linesMaterial = new THREE.LineBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.1,
            vertexColors: false,
            blending: THREE.AdditiveBlending
        });
        const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
        constellationGroup.add(linesMesh);

        // Geometries/Materials
        const nodeGeo = new THREE.IcosahedronGeometry(0.6, 1);
        const glowGeo = new THREE.SpriteMaterial({
            map: new THREE.TextureLoader().load('/glow_texture_placeholder.png'), // Fallback if no texture, uses default rect
            color: 0xffffff,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending
        });

        // Helper to generate positions on a sphere surface (Fibonacci Sphere)
        const getSpherePos = (i: number, n: number, radius: number) => {
            const phi = Math.acos(-1 + (2 * i) / n);
            const theta = Math.sqrt(n * Math.PI) * phi;
            return new THREE.Vector3(
                radius * Math.cos(theta) * Math.sin(phi),
                radius * Math.sin(theta) * Math.sin(phi),
                radius * Math.cos(phi)
            );
        };

        SKILLS.forEach((skill, i) => {
            const cat = CATEGORIES.find(c => c.id === skill.category)!;
            const pos = getSpherePos(i, SKILLS.length, 15 + Math.random() * 5); // Vary radius for depth

            // 1. Core Node
            const mat = new THREE.MeshBasicMaterial({ color: cat.color, wireframe: true });
            const mesh = new THREE.Mesh(nodeGeo, mat);
            mesh.position.copy(pos);
            mesh.userData = { skill, color: cat.color }; // Store data for raycaster

            // 2. Interactive Shell (Invisible hitbox)
            const hitGeo = new THREE.SphereGeometry(2, 16, 16);
            const hitMat = new THREE.MeshBasicMaterial({ color: 0xff0000, transparent: true, opacity: 0 }); // Debug color red
            const bgMesh = new THREE.Mesh(hitGeo, hitMat);
            bgMesh.position.copy(pos);
            bgMesh.userData = { skill, color: cat.color }; // Link data

            // 3. Text Label (Sprite)
            const canvas = document.createElement('canvas');
            canvas.width = 512;
            canvas.height = 128;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.font = 'bold 32px "Space Grotesk", sans-serif'; // Reduced font size for crispness
                ctx.fillStyle = cat.color;
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.shadowColor = 'black';
                ctx.shadowBlur = 4;
                ctx.fillText(skill.name, 256, 64);
            }
            const map = new THREE.CanvasTexture(canvas);
            const spriteMat = new THREE.SpriteMaterial({ map, transparent: true, depthWrite: false });
            const sprite = new THREE.Sprite(spriteMat);
            sprite.scale.set(8, 2, 1);
            sprite.position.set(0, 1.5, 0);
            mesh.add(sprite);

            constellationGroup.add(bgMesh); // Hitbox separate but at same pos? No, better group
            constellationGroup.add(mesh);

            nodes.push({ mesh, bgMesh, data: skill, originalPos: pos.clone() });
        });


        // --- Interaction State ---
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(-999, -999); // Offscreen default
        let currentIntersect: THREE.Object3D | null = null;


        // Initial resize to ensure canvas has dimensions
        const onResize = () => {
            if (!mountRef.current) return;
            // Use offsetWidth/Height for accurate integer pixel values
            const w = mountRef.current.offsetWidth;
            const h = mountRef.current.offsetHeight;
            if (w === 0 || h === 0) return; // Wait for layout

            renderer.setSize(w, h);
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
        };

        // Call resize once to setup initial state
        onResize();

        // Warning: event listeners need to be cleaned up
        const onMouseMove = (e: MouseEvent) => {
            const rect = mountRef.current?.getBoundingClientRect();
            if (!rect) return;
            // Calculate Normalized Device Coordinates (-1 to +1) for Raycaster
            mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        };

        // Add listeners
        mountRef.current.addEventListener('mousemove', onMouseMove);
        window.addEventListener('resize', onResize);

        // --- Animation Loop ---
        let frameId: number;
        // Capture specific dom element for cleanup to avoid ref mutability issues
        const domElement = renderer.domElement;

        // Target rotation for smooth interpolation
        let targetRotationX = 0;
        let targetRotationY = 0;

        const animate = () => {
            frameId = requestAnimationFrame(animate);

            // 1. Smooth Rotation + Mouse Parallax
            // Interactive rotation: Mouse X moves Y rotation, Mouse Y moves X rotation
            if (mouse.x !== -999) {
                targetRotationY += 0.001; // Constant spin
                // Add mouse influence (mapped from -1..1 to small angle)
                const mouseInfluenceX = mouse.y * 0.2;
                const mouseInfluenceY = mouse.x * 0.2;

                // Lerp towards mouse influence
                constellationGroup.rotation.x += (mouseInfluenceX - constellationGroup.rotation.x) * 0.05;
                constellationGroup.rotation.y += 0.002; // Consistent autorotation
            } else {
                constellationGroup.rotation.y += 0.001;
                constellationGroup.rotation.x = Math.sin(Date.now() * 0.0005) * 0.1;
            }

            // 2. Filter Logic (Lerp positions)
            const activeId = activeCatRef.current; // USE REF HERE
            const isAll = activeId === 'all';

            nodes.forEach(node => {
                const isMatch = isAll || node.data.category === activeId;

                // Target Scale based on match
                const targetScale = isMatch ? 1 : 0.001; // Never exactly 0 to keep matrices happy
                node.mesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
                node.bgMesh.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

                // Hide fully scaled down nodes to optimize raycasting
                node.bgMesh.visible = node.mesh.scale.x > 0.01;
            });

            // 3. Connections Update (Dynamic based on filter)
            // Usage of activeId from Ref ensure we filter lines correctly
            const visibleNodes = nodes.filter(n => (isAll || n.data.category === activeId) && n.mesh.scale.x > 0.5);
            const positions: number[] = [];

            // Limit connections for performance
            for (let i = 0; i < visibleNodes.length; i++) {
                for (let j = i + 1; j < visibleNodes.length; j++) {
                    const n1 = visibleNodes[i];
                    const n2 = visibleNodes[j];
                    const dist = n1.mesh.position.distanceTo(n2.mesh.position);

                    if (dist < 12) { // Connection threshold
                        positions.push(n1.mesh.position.x, n1.mesh.position.y, n1.mesh.position.z);
                        positions.push(n2.mesh.position.x, n2.mesh.position.y, n2.mesh.position.z);
                    }
                }
            }
            linesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
            linesGeometry.computeBoundingSphere();


            // 4. Raycasting
            raycaster.setFromCamera(mouse, camera);
            const hitboxes = nodes.filter(n => n.bgMesh.visible).map(n => n.bgMesh);
            const intersects = raycaster.intersectObjects(hitboxes);

            if (intersects.length > 0) {
                const target = intersects[0].object;
                if (currentIntersect !== target) {
                    currentIntersect = target; // It's the hitbox

                    // Find actual visual mesh to highlight
                    const node = nodes.find(n => n.bgMesh === target);
                    if (node && mountRef.current) {
                        // Highlight Logic
                        document.body.style.cursor = 'pointer';

                        // Tooltip Position
                        const pos = node.mesh.position.clone();
                        // Account for group rotation in world position
                        pos.applyMatrix4(constellationGroup.matrixWorld);
                        pos.project(camera);

                        // Use current measurements
                        const w = mountRef.current.clientWidth;
                        const h = mountRef.current.clientHeight;
                        setHoveredSkill({
                            name: node.data.name,
                            usage: node.data.usage,
                            color: node.mesh.userData.color,
                            x: (pos.x * 0.5 + 0.5) * w,
                            y: (-(pos.y * 0.5) + 0.5) * h
                        });
                    }
                }
            } else {
                if (currentIntersect) {
                    currentIntersect = null;
                    document.body.style.cursor = 'default';
                    setHoveredSkill(null);
                }
            }

            // Pulse/Spin Animation for Nodes
            nodes.forEach(node => {
                const isMatch = isAll || node.data.category === activeId;
                if (!isMatch) return;

                if (node.bgMesh === currentIntersect) {
                    node.mesh.scale.lerp(new THREE.Vector3(1.5, 1.5, 1.5), 0.2);
                    node.mesh.rotation.y += 0.05;
                    node.mesh.rotation.z -= 0.02;
                } else {
                    const baseScale = 1;
                    node.mesh.scale.lerp(new THREE.Vector3(baseScale, baseScale, baseScale), 0.1);
                    node.mesh.rotation.y += 0.005;
                }
            });

            renderer.render(scene, camera);
        };
        animate();

        // Cleanup
        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', onResize);
            if (mountRef.current) mountRef.current.removeEventListener('mousemove', onMouseMove);
            // Safe removal check
            if (domElement && domElement.parentNode) {
                domElement.parentNode.removeChild(domElement);
            }
            // Dispose
            nodeGeo.dispose();
            linesGeometry.dispose();
            linesMaterial.dispose();
            renderer.dispose();
        }
    }, []); // Empty dependency array!

    return (
        <section id="skillset" className="relative h-screen bg-black overflow-hidden flex flex-col items-center py-20">
            {/* Header */}
            <div className="z-10 text-center pointer-events-none mb-4">
                <div className="inline-block px-4 py-1 rounded-full border border-sky-500/30 bg-sky-500/10 text-sky-400 text-xs font-bold uppercase tracking-[0.3em] mb-4 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
                    skillSET
                </div>
            </div>

            {/* 3D Canvas */}
            <div ref={mountRef} className="absolute inset-0 z-0 cursor-crosshair" />

            {/* Hover Tooltip */}
            <AnimatePresence>
                {hoveredSkill && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute z-20 pointer-events-none"
                        style={{ left: hoveredSkill.x, top: hoveredSkill.y, transform: 'translate(-50%, -120%)' }}
                    >
                        <div className="bg-black/80 backdrop-blur-xl border border-white/10 p-5 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] min-w-[280px]" style={{ borderTop: `4px solid ${hoveredSkill.color}` }}>
                            <h3 className="text-xl font-bold text-white mb-1">{hoveredSkill.name}</h3>
                            <p className="text-gray-400 text-xs uppercase tracking-wider mb-3">Deployed Protocol</p>
                            <p className="text-gray-300 text-sm leading-relaxed">{hoveredSkill.usage}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Filter Controls */}
            <div className="absolute bottom-6 md:bottom-10 z-20 left-0 right-0 px-4">
                <div className="flex flex-nowrap md:flex-wrap justify-start md:justify-center gap-2 md:gap-3 overflow-x-auto pb-2 md:pb-0 scrollbar-hide">
                    <button
                        onClick={() => setActiveCategory('all')}
                        className={`px-4 md:px-6 py-2.5 md:py-2 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] transition-all whitespace-nowrap flex-shrink-0 ${activeCategory === 'all'
                            ? 'bg-white text-black shadow-[0_0_20px_white]'
                            : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                            }`}
                    >
                        ALL NODES
                    </button>
                    {CATEGORIES.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-4 md:px-6 py-2.5 md:py-2 rounded-full text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] transition-all border whitespace-nowrap flex-shrink-0 ${activeCategory === cat.id
                                ? `bg-${cat.color}/20 text-white shadow-[0_0_20px_${cat.color}]`
                                : 'bg-transparent text-gray-500 border-white/10 hover:border-white/30'
                                }`}
                            style={{
                                borderColor: activeCategory === cat.id ? cat.color : undefined,
                                backgroundColor: activeCategory === cat.id ? cat.color : undefined,
                                color: activeCategory === cat.id ? 'black' : undefined
                            }}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default SkillMatrix;
