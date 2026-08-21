<script>
    import { onMount } from 'svelte';
    import * as THREE from 'three';

    export let active = true;
    export let onExit = () => {};
    export let onClosed = () => {};

    const WARP_DURATION = 6;

    let overlay;
    let canvas;
    let closeButton;
    let phase = 'warp';
    let reducedMotion = false;
    let sceneUnavailable = false;
    let pauseForExit = () => {};

    $: if (!active) pauseForExit();

    function requestExit() {
        if (active) onExit();
    }

    function handleKeydown(event) {
        if (!active) return;

        if (event.key === 'Escape') {
            event.preventDefault();
            requestExit();
            return;
        }

        if (event.key !== 'Tab' || !overlay) return;
        const focusable = [...overlay.querySelectorAll('button:not([disabled])')];
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    }

    function handleTransitionEnd(event) {
        if (!active && event.currentTarget === event.target && event.propertyName === 'opacity') {
            onClosed();
        }
    }

    onMount(() => {
        const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
        reducedMotion = motionPreference.matches;
        closeButton?.focus();

        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({
                canvas,
                alpha: true,
                antialias: true,
                powerPreference: 'high-performance'
            });
        } catch (error) {
            sceneUnavailable = true;
            phase = 'arrival';
            console.warn('The hyperdrive 3D scene could not start. A static destination is shown instead.', error);
            return () => {};
        }

        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.18;
        renderer.setClearColor(0x02050d, 0);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x02050d, 0.012);

        const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 180);
        camera.position.set(0, 0, 0);

        const seedRandom = (() => {
            let state = 2187;
            return () => {
                state = (state * 16807) % 2147483647;
                return (state - 1) / 2147483646;
            };
        })();

        const toonGradient = new THREE.DataTexture(
            new Uint8Array([
                18, 18, 24, 255,
                76, 76, 86, 255,
                158, 158, 166, 255,
                244, 244, 236, 255
            ]),
            4,
            1,
            THREE.RGBAFormat
        );
        toonGradient.minFilter = THREE.NearestFilter;
        toonGradient.magFilter = THREE.NearestFilter;
        toonGradient.needsUpdate = true;

        const makeToonMaterial = (color, options = {}) => new THREE.MeshToonMaterial({
            color,
            gradientMap: toonGradient,
            ...options
        });

        function addEdges(mesh, color = 0x07111e, opacity = 0.72) {
            const edges = new THREE.LineSegments(
                new THREE.EdgesGeometry(mesh.geometry, 24),
                new THREE.LineBasicMaterial({ color, transparent: opacity < 1, opacity })
            );
            edges.renderOrder = 4;
            mesh.add(edges);
            return mesh;
        }

        function makeBackgroundStars() {
            const count = window.innerWidth < 700 ? 460 : 780;
            const positions = new Float32Array(count * 3);
            const colors = new Float32Array(count * 3);
            const palette = [
                new THREE.Color(0xf4f6ff),
                new THREE.Color(0x76c8ff),
                new THREE.Color(0xb5e3ff),
                new THREE.Color(0x8b9fff)
            ];

            for (let index = 0; index < count; index += 1) {
                const offset = index * 3;
                positions[offset] = (seedRandom() - 0.5) * 110;
                positions[offset + 1] = (seedRandom() - 0.5) * 64;
                positions[offset + 2] = -8 - seedRandom() * 115;
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
                new THREE.PointsMaterial({
                    size: 0.12,
                    vertexColors: true,
                    transparent: true,
                    opacity: 0.78,
                    sizeAttenuation: true
                })
            );
        }

        const backgroundStars = makeBackgroundStars();
        backgroundStars.visible = false;
        scene.add(backgroundStars);

        function makeWarpTunnel() {
            const count = window.innerWidth < 700 ? 260 : 440;
            const positions = new Float32Array(count * 6);
            const colors = new Float32Array(count * 6);
            const pointPositions = new Float32Array(count * 3);
            const pointColors = new Float32Array(count * 3);
            const states = [];
            const palette = [
                new THREE.Color(0x8de5ff),
                new THREE.Color(0x4b8dff),
                new THREE.Color(0xd8f6ff),
                new THREE.Color(0x665cff)
            ];

            for (let index = 0; index < count; index += 1) {
                const color = palette[index % palette.length];
                const colorOffset = index * 6;
                colors[colorOffset] = color.r;
                colors[colorOffset + 1] = color.g;
                colors[colorOffset + 2] = color.b;
                colors[colorOffset + 3] = color.r;
                colors[colorOffset + 4] = color.g;
                colors[colorOffset + 5] = color.b;
                const pointOffset = index * 3;
                pointColors[pointOffset] = color.r;
                pointColors[pointOffset + 1] = color.g;
                pointColors[pointOffset + 2] = color.b;
                states.push({
                    x: (seedRandom() - 0.5) * 34,
                    y: (seedRandom() - 0.5) * 21,
                    z: -5 - seedRandom() * 80,
                    speed: 18 + seedRandom() * 25,
                    length: 3 + seedRandom() * 8
                });
            }

            const geometry = new THREE.BufferGeometry();
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            const material = new THREE.LineBasicMaterial({
                vertexColors: true,
                transparent: true,
                opacity: 0.82,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });
            const lines = new THREE.LineSegments(geometry, material);

            const pointGeometry = new THREE.BufferGeometry();
            pointGeometry.setAttribute('position', new THREE.BufferAttribute(pointPositions, 3));
            pointGeometry.setAttribute('color', new THREE.BufferAttribute(pointColors, 3));
            const pointMaterial = new THREE.PointsMaterial({
                size: 0.12,
                vertexColors: true,
                transparent: true,
                opacity: 0.88,
                sizeAttenuation: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });
            const points = new THREE.Points(pointGeometry, pointMaterial);

            function reset(state) {
                state.x = (seedRandom() - 0.5) * 36;
                state.y = (seedRandom() - 0.5) * 23;
                state.z = -72 - seedRandom() * 24;
                state.speed = 20 + seedRandom() * 28;
                state.length = 3 + seedRandom() * 9;
            }

            function update(delta, progress, streakMix) {
                const speedMultiplier = 0.04 + streakMix * (0.76 + progress * 2.8);
                states.forEach((state, index) => {
                    state.z += state.speed * speedMultiplier * delta;
                    if (state.z > -1.15) reset(state);

                    const offset = index * 6;
                    const pointOffset = index * 3;
                    const streakLength = state.length * (0.015 + streakMix * (0.685 + progress * 2.2));
                    positions[offset] = state.x;
                    positions[offset + 1] = state.y;
                    positions[offset + 2] = state.z;
                    positions[offset + 3] = state.x;
                    positions[offset + 4] = state.y;
                    positions[offset + 5] = state.z - streakLength;
                    pointPositions[pointOffset] = state.x;
                    pointPositions[pointOffset + 1] = state.y;
                    pointPositions[pointOffset + 2] = state.z;
                });
                geometry.attributes.position.needsUpdate = true;
                pointGeometry.attributes.position.needsUpdate = true;
                material.opacity = streakMix * (0.72 + Math.sin(progress * Math.PI * 10) * 0.08);
                pointMaterial.opacity = (1 - streakMix) * 0.88;
            }

            update(0, 0, 0);
            return { lines, points, update };
        }

        const warpTunnel = makeWarpTunnel();
        const warpGroup = new THREE.Group();
        warpGroup.add(warpTunnel.points, warpTunnel.lines);
        scene.add(warpGroup);

        function makePlanetMap() {
            const mapCanvas = document.createElement('canvas');
            mapCanvas.width = 768;
            mapCanvas.height = 384;
            const context = mapCanvas.getContext('2d');
            const ocean = context.createLinearGradient(0, 0, 0, mapCanvas.height);
            ocean.addColorStop(0, '#5bc8e8');
            ocean.addColorStop(0.5, '#267ec9');
            ocean.addColorStop(1, '#173f8f');
            context.fillStyle = ocean;
            context.fillRect(0, 0, mapCanvas.width, mapCanvas.height);

            context.globalAlpha = 0.28;
            context.strokeStyle = '#bdefff';
            context.lineWidth = 4;
            context.lineCap = 'round';
            context.lineJoin = 'round';
            for (let y = 28; y < mapCanvas.height; y += 43) {
                context.beginPath();
                context.moveTo(0, y);
                for (let x = 0; x <= mapCanvas.width; x += 8) {
                    context.lineTo(x, y + Math.sin(x * 0.027 + y * 0.045) * 4.5);
                }
                context.stroke();
                context.beginPath();
                context.moveTo(0, y + 11);
                for (let x = 0; x <= mapCanvas.width; x += 8) {
                    context.lineTo(x, y + 11 + Math.sin(x * 0.022 + y * 0.035 + 1.7) * 2.2);
                }
                context.stroke();
            }
            context.globalAlpha = 1;

            const texture = new THREE.CanvasTexture(mapCanvas);
            texture.colorSpace = THREE.SRGBColorSpace;
            texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
            return texture;
        }

        function makePlanet() {
            const group = new THREE.Group();
            const geometry = new THREE.SphereGeometry(3.5, 56, 40);
            const outline = new THREE.Mesh(
                geometry,
                new THREE.MeshBasicMaterial({ color: 0x06111f, side: THREE.BackSide })
            );
            outline.scale.setScalar(1.035);
            group.add(outline);

            const surface = new THREE.Mesh(
                geometry,
                new THREE.MeshStandardMaterial({
                    color: 0xffffff,
                    map: makePlanetMap(),
                    roughness: 0.78,
                    metalness: 0.02
                })
            );
            group.add(surface);

            const atmosphere = new THREE.Mesh(
                new THREE.SphereGeometry(3.7, 48, 32),
                new THREE.MeshBasicMaterial({
                    color: 0x5ad8ff,
                    transparent: true,
                    opacity: 0.16,
                    side: THREE.BackSide,
                    blending: THREE.AdditiveBlending
                })
            );
            group.add(atmosphere);
            group.userData.surface = surface;
            return group;
        }

        function makeMoon({ size, color, accent, orbitRadius, speed, tilt, start }) {
            const orbitPlane = new THREE.Group();
            orbitPlane.rotation.z = tilt;

            const pivot = new THREE.Group();
            pivot.rotation.y = start;
            orbitPlane.add(pivot);

            const moon = new THREE.Group();
            moon.position.x = orbitRadius;
            pivot.add(moon);

            const geometry = new THREE.IcosahedronGeometry(size, 2);
            const outline = new THREE.Mesh(
                geometry,
                new THREE.MeshBasicMaterial({ color: 0x07111e, side: THREE.BackSide })
            );
            outline.scale.setScalar(1.075);
            moon.add(outline);

            const surface = addEdges(new THREE.Mesh(geometry, makeToonMaterial(color)), 0x142131, 0.5);
            moon.add(surface);

            for (let index = 0; index < 4; index += 1) {
                const crater = new THREE.Mesh(
                    new THREE.CircleGeometry(size * (0.11 + seedRandom() * 0.1), 12),
                    new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.72, side: THREE.DoubleSide })
                );
                const phi = seedRandom() * Math.PI * 2;
                const theta = 0.45 + seedRandom() * 1.5;
                crater.position.setFromSphericalCoords(size * 1.005, theta, phi);
                crater.lookAt(0, 0, 0);
                crater.rotateY(Math.PI);
                moon.add(crater);
            }

            return { orbitPlane, pivot, moon, speed, start };
        }

        const arrivalGroup = new THREE.Group();
        arrivalGroup.visible = false;
        scene.add(arrivalGroup);

        const planetSystem = new THREE.Group();
        const planet = makePlanet();
        planetSystem.add(planet);
        const moons = [
            makeMoon({ size: 0.55, color: 0xffcb70, accent: 0x9c5b42, orbitRadius: 5.25, speed: 0.26, tilt: 0.16, start: 0.4 }),
            makeMoon({ size: 0.38, color: 0xf0ede0, accent: 0x8896a6, orbitRadius: 6.3, speed: -0.18, tilt: -0.34, start: 2.2 }),
            makeMoon({ size: 0.72, color: 0x9ed8cf, accent: 0x356f74, orbitRadius: 7.3, speed: 0.12, tilt: 0.48, start: 4.1 })
        ];
        moons.forEach(({ orbitPlane }) => planetSystem.add(orbitPlane));
        arrivalGroup.add(planetSystem);

        function addShipPart(group, geometry, material, position, rotation = [0, 0, 0], edges = true) {
            const part = new THREE.Mesh(geometry, material);
            part.position.set(...position);
            part.rotation.set(...rotation);
            if (edges) addEdges(part, 0x111722, 0.82);
            group.add(part);
            return part;
        }

        function makeXWing(accent) {
            const ship = new THREE.Group();
            ship.name = 'X-Wing escort';
            const hull = makeToonMaterial(0xe8e1cf);
            const hullDark = makeToonMaterial(0x77776f);
            const stripe = makeToonMaterial(accent);
            const glass = makeToonMaterial(0x246078, { emissive: 0x0d3146, emissiveIntensity: 0.8 });
            const engine = makeToonMaterial(0x333a41);
            const engineGlow = new THREE.MeshBasicMaterial({ color: 0xff6f4b, transparent: true, opacity: 0.9 });

            addShipPart(ship, new THREE.CylinderGeometry(0.13, 0.19, 1.7, 8), hull, [0, 0, 0], [0, 0, -Math.PI / 2]);
            addShipPart(ship, new THREE.ConeGeometry(0.145, 0.64, 8), stripe, [1.03, 0, 0], [0, 0, -Math.PI / 2]);
            const canopy = addShipPart(ship, new THREE.SphereGeometry(0.2, 12, 8), glass, [0.22, 0.12, 0], [0, 0, 0]);
            canopy.scale.set(1.35, 0.78, 0.72);

            const wingShape = new THREE.Shape();
            wingShape.moveTo(0.38, 0.08);
            wingShape.lineTo(-0.46, 0.1);
            wingShape.lineTo(-0.38, 0.78);
            wingShape.lineTo(0.18, 0.62);
            wingShape.closePath();
            const wingGeometry = new THREE.ShapeGeometry(wingShape, 8);

            [-1, 1].forEach((side) => {
                [-1, 1].forEach((split) => {
                    const wing = addShipPart(
                        ship,
                        wingGeometry,
                        split > 0 ? hull : hullDark,
                        [-0.18, 0, 0],
                        [split * 0.42, 0, 0]
                    );
                    wing.scale.y = side;

                    const engineY = side * 0.52;
                    const engineZ = split * 0.23;
                    addShipPart(
                        ship,
                        new THREE.CylinderGeometry(0.085, 0.105, 0.68, 8),
                        engine,
                        [-0.25, engineY, engineZ],
                        [0, 0, -Math.PI / 2]
                    );
                    addShipPart(
                        ship,
                        new THREE.CylinderGeometry(0.025, 0.025, 1.05, 6),
                        stripe,
                        [0.15, side * 0.78, split * 0.31],
                        [0, 0, -Math.PI / 2],
                        false
                    );
                    const glow = addShipPart(
                        ship,
                        new THREE.CircleGeometry(0.08, 12),
                        engineGlow,
                        [-0.61, engineY, engineZ],
                        [0, -Math.PI / 2, 0],
                        false
                    );
                    glow.renderOrder = 6;
                });
            });

            ship.rotation.order = 'ZYX';
            return ship;
        }

        const xWings = [makeXWing(0xd75b42), makeXWing(0xdda93b)];
        xWings[0].scale.setScalar(0.88);
        xWings[1].scale.setScalar(0.68);
        arrivalGroup.add(...xWings);

        scene.add(new THREE.HemisphereLight(0xcbeeff, 0x071126, 2.6));
        const keyLight = new THREE.DirectionalLight(0xffe6a8, 5.8);
        keyLight.position.set(5, 7, 8);
        scene.add(keyLight);
        const rimLight = new THREE.DirectionalLight(0x49a7ff, 4.4);
        rimLight.position.set(-8, 2, 4);
        scene.add(rimLight);

        let frameRequest;
        let running = true;
        let tabVisible = !document.hidden;
        let animationSuspended = reducedMotion;
        let lastTimestamp;
        let warpElapsed = reducedMotion ? WARP_DURATION : 0;
        let arrivalElapsed = reducedMotion ? 2.2 : 0;
        let flightExtent = 13;

        function enterArrival(skipIntro = false) {
            if (phase === 'arrival') return;
            phase = 'arrival';
            warpGroup.visible = false;
            backgroundStars.visible = true;
            arrivalGroup.visible = true;
            arrivalElapsed = skipIntro ? 2.2 : 0;
            overlay?.style.setProperty('--jump-progress', '1');
            overlay?.style.setProperty('--streak-mix', '1');
            updateArrival(0, skipIntro);
        }

        function updateShips(time, staticPose = false) {
            if (staticPose) {
                xWings[0].position.set(flightExtent * 0.42, 1.55, -8.2);
                xWings[1].position.set(flightExtent * 0.12, 2.65, -10.4);
                xWings[0].rotation.set(0.08, -0.12, -0.14);
                xWings[1].rotation.set(-0.03, -0.08, -0.08);
                return;
            }

            const cycle = 9.5;
            const progresses = [(time % cycle) / cycle, ((time + 0.72) % cycle) / cycle];
            xWings.forEach((ship, index) => {
                const progress = progresses[index];
                const x = THREE.MathUtils.lerp(-flightExtent * 1.08, flightExtent * 1.12, progress);
                const y = (index === 0 ? -1.2 : 0.25) + progress * (index === 0 ? 4.8 : 3.5) + Math.sin(progress * Math.PI) * 0.7;
                const z = (index === 0 ? -7.8 : -10.2) + Math.sin(progress * Math.PI) * 1.1;
                ship.position.set(x, y, z);
                ship.rotation.set(
                    Math.sin(progress * Math.PI * 2) * 0.08,
                    -0.08 + Math.sin(progress * Math.PI) * 0.08,
                    -0.18 + Math.sin(progress * Math.PI * 2) * 0.1
                );
            });
        }

        function updateArrival(delta, staticPose = false) {
            if (!staticPose) arrivalElapsed += delta;
            const intro = staticPose ? 1 : THREE.MathUtils.smoothstep(arrivalElapsed, 0, 2.1);
            camera.position.set(0, 0, THREE.MathUtils.lerp(4.6, 0, intro));
            camera.rotation.set(0, 0, 0);
            planet.userData.surface.rotation.y += staticPose ? 0 : delta * 0.12;
            planet.rotation.z = -0.08;
            moons.forEach((moon, index) => {
                moon.pivot.rotation.y = moon.start + (staticPose ? index * 0.65 : arrivalElapsed * moon.speed);
                if (!staticPose) moon.moon.rotation.y += delta * (0.15 + index * 0.04);
            });
            backgroundStars.rotation.y += staticPose ? 0 : delta * 0.007;
            updateShips(arrivalElapsed, staticPose);
        }

        function render(timestamp) {
            frameRequest = undefined;
            if (!running || !tabVisible || !active) return;

            if (lastTimestamp === undefined) lastTimestamp = timestamp;
            const rawDelta = Math.max(0, (timestamp - lastTimestamp) / 1000);
            const delta = Math.min(rawDelta, 0.05);
            lastTimestamp = timestamp;

            if (phase === 'warp') {
                warpElapsed = Math.min(WARP_DURATION, warpElapsed + rawDelta);
                const progress = warpElapsed / WARP_DURATION;
                const streakMix = THREE.MathUtils.smoothstep(warpElapsed, 0, 1);
                overlay?.style.setProperty('--jump-progress', String(progress));
                overlay?.style.setProperty('--streak-mix', String(streakMix));
                warpTunnel.update(delta, progress, streakMix);
                camera.position.x = Math.sin(warpElapsed * 7.1) * 0.018 * streakMix;
                camera.position.y = Math.cos(warpElapsed * 6.3) * 0.014 * streakMix;
                camera.rotation.z = Math.sin(warpElapsed * 2.4) * 0.0025 * streakMix;
                if (warpElapsed >= WARP_DURATION) enterArrival(false);
            } else if (!animationSuspended) {
                updateArrival(delta, false);
            }

            renderer.render(scene, camera);
            if (phase === 'warp' || !animationSuspended) frameRequest = window.requestAnimationFrame(render);
        }

        function requestRender() {
            if (!frameRequest && running && tabVisible && active) {
                lastTimestamp = undefined;
                frameRequest = window.requestAnimationFrame(render);
            }
        }

        pauseForExit = () => {
            animationSuspended = true;
            if (frameRequest) window.cancelAnimationFrame(frameRequest);
            frameRequest = undefined;
        };

        function resize() {
            const width = Math.max(1, window.innerWidth);
            const height = Math.max(1, window.innerHeight);
            const compact = width < 700;
            camera.aspect = width / height;
            camera.fov = compact ? 53 : 46;
            camera.updateProjectionMatrix();
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
            renderer.setSize(width, height, false);
            planetSystem.position.set(compact ? 0 : -2.5, compact ? -0.75 : -0.2, -15.5);
            planetSystem.scale.setScalar(compact ? 0.72 : 1);
            flightExtent = compact ? 8.5 : 13;
            if (phase === 'arrival' && (animationSuspended || reducedMotion)) {
                updateArrival(0, true);
                renderer.render(scene, camera);
            }
        }

        function handleVisibility() {
            tabVisible = !document.hidden;
            if (!tabVisible) {
                if (frameRequest) window.cancelAnimationFrame(frameRequest);
                frameRequest = undefined;
                return;
            }
            requestRender();
        }

        function handleMotionPreference() {
            reducedMotion = motionPreference.matches;
            animationSuspended = reducedMotion;
            if (reducedMotion) {
                enterArrival(true);
                updateArrival(0, true);
                renderer.render(scene, camera);
                if (frameRequest) window.cancelAnimationFrame(frameRequest);
                frameRequest = undefined;
            } else {
                requestRender();
            }
        }

        function handleContextLost(event) {
            event.preventDefault();
            sceneUnavailable = true;
            phase = 'arrival';
            running = false;
            if (frameRequest) window.cancelAnimationFrame(frameRequest);
            frameRequest = undefined;
        }

        window.addEventListener('resize', resize);
        document.addEventListener('visibilitychange', handleVisibility);
        motionPreference.addEventListener('change', handleMotionPreference);
        canvas.addEventListener('webglcontextlost', handleContextLost);
        resize();

        if (reducedMotion) {
            enterArrival(true);
            updateArrival(0, true);
            renderer.render(scene, camera);
        } else {
            requestRender();
        }

        return () => {
            running = false;
            window.removeEventListener('resize', resize);
            document.removeEventListener('visibilitychange', handleVisibility);
            motionPreference.removeEventListener('change', handleMotionPreference);
            canvas.removeEventListener('webglcontextlost', handleContextLost);
            if (frameRequest) window.cancelAnimationFrame(frameRequest);
            pauseForExit = () => {};

            const geometries = new Set();
            const materials = new Set();
            const textures = new Set([toonGradient]);
            scene.traverse((object) => {
                if (object.geometry) geometries.add(object.geometry);
                if (!object.material) return;
                const objectMaterials = Array.isArray(object.material) ? object.material : [object.material];
                objectMaterials.forEach((material) => {
                    materials.add(material);
                    Object.values(material).forEach((value) => {
                        if (value?.isTexture) textures.add(value);
                    });
                });
            });
            geometries.forEach((geometry) => geometry.dispose());
            materials.forEach((material) => material.dispose());
            textures.forEach((texture) => texture.dispose());
            renderer.dispose();
        };
    });
</script>

<svelte:window onkeydown={handleKeydown} />

<div
    bind:this={overlay}
    class:mode-closing={!active}
    class:arrival-phase={phase === 'arrival'}
    class:scene-unavailable={sceneUnavailable}
    class="hyperdrive-experience"
    role="dialog"
    aria-modal="true"
    aria-label="Hyperdrive destination experience"
    ontransitionend={handleTransitionEnd}
>
    <canvas bind:this={canvas} class="hyperdrive-canvas" aria-hidden="true"></canvas>

    {#if sceneUnavailable}
        <div class="fallback-system" aria-hidden="true">
            <i class="fallback-moon moon-one"></i>
            <i class="fallback-moon moon-two"></i>
            <i class="fallback-moon moon-three"></i>
            <div class="fallback-planet"></div>
            <span class="fallback-fighter fighter-one">✦</span>
            <span class="fallback-fighter fighter-two">✦</span>
        </div>
    {/if}

    <div class="jump-flash" aria-hidden="true"></div>
    <div class="arrival-vignette" aria-hidden="true"></div>

    <div class="hyperdrive-ui">
        <div class="jump-header">
            <button
                bind:this={closeButton}
                class="return-button"
                type="button"
                aria-label="Return to the Explore cockpit"
                onclick={requestExit}
            >
                <span aria-hidden="true">←</span>
                Return to cockpit
            </button>
        </div>

        {#if phase === 'arrival'}
            <div class="arrival-copy" aria-live="polite">
                <h2>Orbit reached</h2>
            </div>
        {/if}
    </div>
</div>

<style>
    .hyperdrive-experience {
        position: fixed;
        z-index: 500;
        inset: 0;
        overflow: hidden;
        isolation: isolate;
        background: #02050d;
        color: #eff8ff;
        opacity: 1;
        transition: opacity 420ms cubic-bezier(0.45, 0, 0.55, 1);
        --jump-progress: 0;
        --streak-mix: 0;
        animation: backdrop-settle 1000ms ease-in-out both;
    }

    .mode-closing {
        opacity: 0;
        pointer-events: none;
    }

    .hyperdrive-canvas {
        position: absolute;
        z-index: 0;
        inset: 0;
        width: 100%;
        height: 100%;
        max-width: none;
    }

    .jump-flash,
    .arrival-vignette {
        position: absolute;
        z-index: 1;
        inset: 0;
        pointer-events: none;
    }

    .jump-flash {
        background:
            radial-gradient(circle at 50% 50%, rgba(225, 248, 255, calc(var(--jump-progress) * 0.24)), transparent 16%),
            radial-gradient(
                circle at 50% 50%,
                transparent 0 34%,
                rgba(56, 129, 255, calc(var(--streak-mix) * 0.13)) 74%,
                rgba(3, 10, 27, calc(var(--streak-mix) * 0.68)) 100%
            );
        mix-blend-mode: screen;
        animation: safe-blue-pulse 1400ms ease-in-out infinite;
    }

    .arrival-phase .jump-flash {
        animation: arrival-flash 900ms ease-out both;
    }

    .arrival-vignette {
        background:
            linear-gradient(180deg, rgba(2, 5, 13, 0.55), transparent 23% 72%, rgba(2, 5, 13, 0.72)),
            radial-gradient(circle at 42% 48%, transparent 0 34%, rgba(2, 5, 13, 0.18) 66%, rgba(2, 5, 13, 0.66) 100%);
        opacity: calc(0.25 + var(--streak-mix) * 0.75);
    }

    .hyperdrive-ui {
        position: relative;
        z-index: 3;
        width: 100%;
        height: 100%;
        pointer-events: none;
    }

    .jump-header {
        display: flex;
        position: absolute;
        top: clamp(1rem, 3vw, 2rem);
        right: clamp(1rem, 3vw, 2.5rem);
        left: clamp(1rem, 3vw, 2.5rem);
        justify-content: flex-end;
        align-items: center;
    }

    .return-button {
        display: inline-flex;
        min-height: 2.8rem;
        gap: 0.55rem;
        justify-content: center;
        align-items: center;
        border: 2px solid #07111e;
        border-radius: 999px;
        background: #e8f5ff;
        box-shadow: 4px 5px 0 #07111e;
        color: #07111e;
        cursor: pointer;
        font-family: var(--display);
        font-size: 0.7rem;
        letter-spacing: 0.05em;
        line-height: 1;
        text-transform: uppercase;
        transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;
        pointer-events: auto;
    }

    .return-button {
        padding: 0.7rem 1rem;
    }

    .return-button:hover {
        transform: translate(-1px, -2px);
        box-shadow: 6px 7px 0 #07111e;
        background: #fff8df;
    }

    .arrival-copy {
        position: absolute;
        bottom: clamp(5.8rem, 11vh, 8rem);
        left: clamp(1rem, 5vw, 5rem);
        max-width: min(36rem, calc(100vw - 2rem));
        animation: copy-arrival 850ms 300ms cubic-bezier(0.2, 0.8, 0.2, 1) both;
    }

    .arrival-copy h2 {
        margin: 0;
        color: #f2f7f1;
        font-family: var(--display);
        font-size: clamp(3.1rem, 8vw, 7rem);
        font-weight: 400;
        letter-spacing: -0.055em;
        line-height: 0.9;
        text-shadow: 5px 6px 0 rgba(13, 55, 90, 0.82);
        text-transform: uppercase;
    }

    .fallback-system {
        display: grid;
        position: absolute;
        z-index: 0;
        inset: 0;
        place-items: center;
        background: radial-gradient(circle at 50% 46%, #173b68, #02050d 58%);
    }

    .fallback-planet {
        width: min(44vw, 22rem);
        aspect-ratio: 1;
        border: 0.45rem solid #07111e;
        border-radius: 50%;
        background:
            repeating-radial-gradient(
                ellipse at 50% 125%,
                transparent 0 9%,
                rgba(189, 239, 255, 0.25) 9.5% 10.4%,
                transparent 11% 18%
            ),
            linear-gradient(145deg, #63d8ee, #236fb9 58%, #173a82);
        box-shadow: 0 0 0 0.55rem rgba(93, 213, 255, 0.18), 0 0 5rem rgba(65, 151, 255, 0.38);
    }

    .fallback-moon {
        position: absolute;
        z-index: 1;
        width: 1rem;
        aspect-ratio: 1;
        border: 2px solid #07111e;
        border-radius: 50%;
        background: #ffd27d;
        box-shadow: 0 0 1rem rgba(118, 215, 255, 0.3);
    }

    .moon-one { top: 27%; left: 26%; }
    .moon-two { top: 33%; right: 24%; width: 0.78rem; background: #e9edf1; }
    .moon-three { right: 31%; bottom: 24%; width: 1.4rem; background: #9ed8cf; }

    .fallback-fighter {
        position: absolute;
        color: #e8e1cf;
        font-size: 3rem;
        text-shadow: 0 0 0.7rem #76d7ff;
        transform: rotate(42deg);
    }

    .fighter-one { top: 34%; right: 16%; }
    .fighter-two { top: 23%; right: 29%; font-size: 2rem; }

    @keyframes backdrop-settle {
        from { background-color: rgba(2, 5, 13, 0); }
        to { background-color: #02050d; }
    }

    @keyframes safe-blue-pulse {
        0%, 100% { opacity: 0.72; }
        50% { opacity: 1; }
    }

    @keyframes arrival-flash {
        0% { background: #eafaff; opacity: 1; }
        38% { background: rgba(92, 178, 255, 0.28); opacity: 0.7; }
        100% { background: transparent; opacity: 0; }
    }

    @keyframes copy-arrival {
        from { opacity: 0; transform: translateY(1.2rem); }
        to { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 620px) {
        .return-button { min-height: 2.65rem; padding: 0.65rem 0.8rem; font-size: 0.63rem; }
        .arrival-copy { bottom: 6.2rem; }
        .arrival-copy h2 { max-width: 17rem; }
    }

    @media (prefers-reduced-motion: reduce) {
        .hyperdrive-experience { transition-duration: 120ms; animation: none; }
        .jump-flash,
        .arrival-phase .jump-flash,
        .arrival-copy { animation: none; }
        .return-button { transition: none; }
    }
</style>
