<script>
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';

    let canvas;

    function makeFalcon() {
        const ship = new THREE.Group();
        const ink = new THREE.LineBasicMaterial({ color: 0x342d27, transparent: true, opacity: 0.72 });
        const hullMaterial = new THREE.MeshStandardMaterial({
            color: 0xd8cfb9,
            roughness: 0.78,
            metalness: 0.22,
            flatShading: true
        });
        const darkMaterial = new THREE.MeshStandardMaterial({ color: 0x423e3a, roughness: 0.7, metalness: 0.4 });
        const rustMaterial = new THREE.MeshStandardMaterial({ color: 0xa84f37, roughness: 0.82, metalness: 0.12 });
        const glassMaterial = new THREE.MeshStandardMaterial({
            color: 0x6bc3c3,
            emissive: 0x164e52,
            emissiveIntensity: 0.55,
            roughness: 0.25,
            metalness: 0.15
        });

        const outline = new THREE.Shape();
        outline.moveTo(-2.55, 0);
        outline.bezierCurveTo(-2.45, 1.45, -1.25, 2.35, 0.55, 2.3);
        outline.lineTo(3.15, 1.14);
        outline.lineTo(1.48, 0.34);
        outline.lineTo(1.48, -0.34);
        outline.lineTo(3.15, -1.14);
        outline.lineTo(0.55, -2.3);
        outline.bezierCurveTo(-1.25, -2.35, -2.45, -1.45, -2.55, 0);

        const hullGeometry = new THREE.ExtrudeGeometry(outline, {
            depth: 0.38,
            bevelEnabled: true,
            bevelSegments: 2,
            bevelSize: 0.12,
            bevelThickness: 0.1,
            curveSegments: 32
        });
        hullGeometry.translate(0, 0, -0.2);
        const hull = new THREE.Mesh(hullGeometry, hullMaterial);
        hull.castShadow = true;
        hull.receiveShadow = true;
        ship.add(hull);
        ship.add(new THREE.LineSegments(new THREE.EdgesGeometry(hullGeometry, 24), ink));

        const topRing = new THREE.Mesh(
            new THREE.RingGeometry(0.65, 1.05, 48),
            new THREE.MeshBasicMaterial({ color: 0x4d4841, side: THREE.DoubleSide })
        );
        topRing.position.set(-0.15, 0, 0.32);
        ship.add(topRing);

        const turret = new THREE.Mesh(new THREE.CylinderGeometry(0.43, 0.62, 0.3, 32), darkMaterial);
        turret.rotation.x = Math.PI / 2;
        turret.position.set(-0.15, 0, 0.43);
        ship.add(turret);

        const turretCap = new THREE.Mesh(new THREE.SphereGeometry(0.34, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), hullMaterial);
        turretCap.position.set(-0.15, 0, 0.58);
        ship.add(turretCap);

        const cockpitTube = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.34, 1.45, 16), hullMaterial);
        cockpitTube.rotation.z = Math.PI / 2;
        cockpitTube.position.set(1.5, -1.75, 0.05);
        ship.add(cockpitTube);

        const cockpit = new THREE.Mesh(new THREE.SphereGeometry(0.38, 20, 12), glassMaterial);
        cockpit.scale.set(1.2, 0.8, 0.72);
        cockpit.position.set(2.2, -1.75, 0.05);
        ship.add(cockpit);

        const dishBase = new THREE.Mesh(new THREE.CylinderGeometry(0.24, 0.3, 0.18, 16), rustMaterial);
        dishBase.rotation.x = Math.PI / 2;
        dishBase.position.set(-0.65, 1.2, 0.42);
        ship.add(dishBase);

        const dish = new THREE.Mesh(new THREE.SphereGeometry(0.48, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), hullMaterial);
        dish.scale.z = 0.25;
        dish.rotation.x = -0.45;
        dish.position.set(-0.62, 1.22, 0.64);
        ship.add(dish);

        for (let index = 0; index < 14; index += 1) {
            const angle = (index / 14) * Math.PI * 2;
            const radius = index % 3 === 0 ? 1.82 : 1.58;
            const points = [
                new THREE.Vector3(-0.12, 0, 0.335),
                new THREE.Vector3(Math.cos(angle) * radius - 0.12, Math.sin(angle) * radius, 0.335)
            ];
            const panelLine = new THREE.Line(
                new THREE.BufferGeometry().setFromPoints(points),
                new THREE.LineBasicMaterial({ color: index % 4 === 0 ? 0x9f4b35 : 0x5e574e, transparent: true, opacity: 0.58 })
            );
            ship.add(panelLine);
        }

        const ventGeometry = new THREE.CylinderGeometry(0.18, 0.18, 0.08, 20);
        for (let index = 0; index < 7; index += 1) {
            const vent = new THREE.Mesh(ventGeometry, darkMaterial);
            vent.rotation.x = Math.PI / 2;
            vent.position.set(-0.8 + (index % 3) * 0.58, -0.7 - Math.floor(index / 3) * 0.5, 0.37);
            ship.add(vent);
        }

        const enginePoints = [];
        for (let index = 0; index <= 24; index += 1) {
            const angle = THREE.MathUtils.lerp(2.24, 4.04, index / 24);
            enginePoints.push(new THREE.Vector3(Math.cos(angle) * 2.18 - 0.05, Math.sin(angle) * 2.18, 0.05));
        }
        const engineCurve = new THREE.CatmullRomCurve3(enginePoints);
        const engine = new THREE.Mesh(
            new THREE.TubeGeometry(engineCurve, 48, 0.12, 10, false),
            new THREE.MeshStandardMaterial({
                color: 0xbaf8ea,
                emissive: 0x58f7ca,
                emissiveIntensity: 3.4,
                roughness: 0.22
            })
        );
        ship.add(engine);

        const engineGlow = new THREE.PointLight(0x68f7cf, 7, 7, 2);
        engineGlow.position.set(-2.2, 0, -0.1);
        ship.add(engineGlow);

        ship.rotation.x = 0.06;
        ship.scale.setScalar(0.72);
        return ship;
    }

    function makeStars() {
        const count = 850;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const palette = [new THREE.Color(0xf8edcf), new THREE.Color(0x70d7d2), new THREE.Color(0xe0aa3e)];

        for (let index = 0; index < count; index += 1) {
            const offset = index * 3;
            positions[offset] = (Math.random() - 0.5) * 35;
            positions[offset + 1] = (Math.random() - 0.5) * 24;
            positions[offset + 2] = -3 - Math.random() * 14;
            const color = palette[index % palette.length];
            colors[offset] = color.r;
            colors[offset + 1] = color.g;
            colors[offset + 2] = color.b;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        return new THREE.Points(
            geometry,
            new THREE.PointsMaterial({ size: 0.035, vertexColors: true, transparent: true, opacity: 0.8, sizeAttenuation: true })
        );
    }

    onMount(() => {
        gsap.registerPlugin(ScrollTrigger);

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
        renderer.setSize(window.innerWidth, window.innerHeight);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 100);
        camera.position.set(0, 0, 11);

        const stars = makeStars();
        scene.add(stars);

        const flightRig = new THREE.Group();
        const falcon = makeFalcon();
        flightRig.add(falcon);
        scene.add(flightRig);

        scene.add(new THREE.HemisphereLight(0xf7e7bd, 0x172032, 3.1));
        const keyLight = new THREE.DirectionalLight(0xffc95c, 4.4);
        keyLight.position.set(5, 6, 8);
        scene.add(keyLight);
        const rimLight = new THREE.DirectionalLight(0x67d9d0, 3.8);
        rimLight.position.set(-6, -3, 5);
        scene.add(rimLight);

        const planet = new THREE.Mesh(
            new THREE.SphereGeometry(2.2, 32, 18),
            new THREE.MeshStandardMaterial({ color: 0x9f4938, roughness: 1, flatShading: true })
        );
        planet.position.set(-7.2, 4.6, -8);
        scene.add(planet);

        const path = new THREE.CatmullRomCurve3(
            [
                new THREE.Vector3(4.6, 1.45, -0.8),
                new THREE.Vector3(2.1, -0.65, 0.55),
                new THREE.Vector3(-3.9, 0.9, -0.55),
                new THREE.Vector3(3.7, -1.3, 0.25),
                new THREE.Vector3(-2.8, -0.2, 1.05),
                new THREE.Vector3(4.8, 1.2, -1.1)
            ],
            false,
            'catmullrom',
            0.42
        );
        const flight = { progress: 0 };
        const point = new THREE.Vector3();
        const tangent = new THREE.Vector3();
        const nextTangent = new THREE.Vector3();

        const flightTween = gsap.to(flight, {
            progress: 1,
            ease: 'none',
            scrollTrigger: {
                trigger: document.documentElement,
                start: 'top top',
                end: 'bottom bottom',
                scrub: 1.65
            }
        });

        const clock = new THREE.Clock();
        let animationFrame;

        function render() {
            const elapsed = clock.getElapsedTime();
            const progress = THREE.MathUtils.clamp(flight.progress, 0, 1);
            path.getPointAt(progress, point);
            path.getTangentAt(progress, tangent);
            path.getTangentAt(Math.min(progress + 0.018, 1), nextTangent);

            flightRig.position.copy(point);
            flightRig.rotation.order = 'ZXY';
            flightRig.rotation.z = Math.atan2(tangent.y, tangent.x);
            flightRig.rotation.x = THREE.MathUtils.clamp((nextTangent.y - tangent.y) * -2.8, -0.34, 0.34);
            flightRig.rotation.y = Math.sin(progress * Math.PI * 4) * 0.18;

            falcon.position.z = Math.sin(elapsed * 0.72) * 0.06;
            falcon.rotation.y = Math.sin(elapsed * 0.42) * 0.055;
            stars.rotation.z = elapsed * 0.003;
            stars.position.x = Math.sin(elapsed * 0.05) * 0.18;
            planet.rotation.y = elapsed * 0.018;

            renderer.render(scene, camera);
            animationFrame = window.requestAnimationFrame(render);
        }

        function resize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        window.addEventListener('resize', resize);
        render();

        return () => {
            window.removeEventListener('resize', resize);
            window.cancelAnimationFrame(animationFrame);
            flightTween.kill();
            renderer.dispose();
            scene.traverse((object) => {
                if (object.geometry) object.geometry.dispose();
                if (object.material) {
                    const materials = Array.isArray(object.material) ? object.material : [object.material];
                    materials.forEach((material) => material.dispose());
                }
            });
        };
    });
</script>

<canvas bind:this={canvas} class="falcon-canvas" aria-hidden="true"></canvas>

<style>
    .falcon-canvas {
        position: fixed;
        z-index: 0;
        inset: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }
</style>
