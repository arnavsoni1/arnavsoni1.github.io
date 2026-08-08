<script>
    import { onMount } from 'svelte';
    import * as THREE from 'three';
    import { gsap } from 'gsap';
    import { ScrollTrigger } from 'gsap/ScrollTrigger';

    export let onExploreViewChange = () => {};

    let canvas;
    let updateExploreMode = (enabled) => onExploreViewChange(Boolean(enabled));
    let updateExploreProgress = () => {};

    const FORWARD = new THREE.Vector3(1, 0, 0);
    const WORLD_TOP = new THREE.Vector3(0, 0, 1);
    const EXPLORE_UP = new THREE.Vector3(0, 1, 0);
    const EXPLORE_ROUTE_RADIUS = 22;

    export function setExploreMode(enabled) {
        updateExploreMode(Boolean(enabled));
    }

    export function setExploreProgress(progress) {
        updateExploreProgress(progress);
    }

    function sampleExploreRoute(progress, position, tangent) {
        const angle = progress * Math.PI * 2;
        position.set(
            Math.cos(angle) * EXPLORE_ROUTE_RADIUS,
            Math.sin(angle * 2) * 1.55,
            Math.sin(angle) * EXPLORE_ROUTE_RADIUS
        );
        tangent.set(
            -Math.sin(angle) * EXPLORE_ROUTE_RADIUS,
            Math.cos(angle * 2) * 3.1,
            Math.cos(angle) * EXPLORE_ROUTE_RADIUS
        ).normalize();
        return angle;
    }

    function seededRandom(seed) {
        let state = seed % 2147483647;
        if (state <= 0) state += 2147483646;
        return () => {
            state = (state * 16807) % 2147483647;
            return (state - 1) / 2147483646;
        };
    }

    function makeCanvasTexture(width, height, paint, anisotropy, colorTexture = true) {
        const textureCanvas = document.createElement('canvas');
        textureCanvas.width = width;
        textureCanvas.height = height;
        const context = textureCanvas.getContext('2d');
        paint(context, width, height);

        const texture = new THREE.CanvasTexture(textureCanvas);
        texture.anisotropy = anisotropy;
        if (colorTexture) texture.colorSpace = THREE.SRGBColorSpace;
        return texture;
    }

    function makeHullTextures(anisotropy) {
        const random = seededRandom(1138);
        const panels = [];
        const stains = [];

        for (let index = 0; index < 46; index += 1) {
            panels.push({
                x: random(),
                y: random(),
                width: 0.035 + random() * 0.12,
                height: 0.018 + random() * 0.075,
                tone: random()
            });
        }

        for (let index = 0; index < 95; index += 1) {
            stains.push({
                x: random(),
                y: random(),
                radius: 0.003 + random() * 0.026,
                alpha: 0.025 + random() * 0.1,
                rust: random() > 0.74
            });
        }

        const color = makeCanvasTexture(
            1024,
            1024,
            (context, width, height) => {
                context.fillStyle = '#c5beaa';
                context.fillRect(0, 0, width, height);

                const wash = context.createRadialGradient(width * 0.34, height * 0.28, 30, width * 0.45, height * 0.5, width * 0.72);
                wash.addColorStop(0, 'rgba(247,239,212,0.32)');
                wash.addColorStop(0.58, 'rgba(105,96,80,0.05)');
                wash.addColorStop(1, 'rgba(42,36,31,0.24)');
                context.fillStyle = wash;
                context.fillRect(0, 0, width, height);

                context.lineWidth = 2;
                context.strokeStyle = 'rgba(45,42,37,0.36)';
                panels.forEach((panel) => {
                    const x = panel.x * width;
                    const y = panel.y * height;
                    const panelWidth = panel.width * width;
                    const panelHeight = panel.height * height;
                    context.strokeRect(x, y, panelWidth, panelHeight);
                    if (panel.tone > 0.77) {
                        context.fillStyle = panel.tone > 0.9 ? 'rgba(143,60,41,0.34)' : 'rgba(72,78,78,0.24)';
                        context.fillRect(x + 3, y + 3, panelWidth - 6, panelHeight - 6);
                    }
                });

                stains.forEach((stain) => {
                    const gradient = context.createRadialGradient(
                        stain.x * width,
                        stain.y * height,
                        0,
                        stain.x * width,
                        stain.y * height,
                        stain.radius * width
                    );
                    gradient.addColorStop(0, stain.rust ? `rgba(126,55,35,${stain.alpha})` : `rgba(35,31,27,${stain.alpha})`);
                    gradient.addColorStop(1, 'rgba(35,31,27,0)');
                    context.fillStyle = gradient;
                    context.beginPath();
                    context.arc(stain.x * width, stain.y * height, stain.radius * width, 0, Math.PI * 2);
                    context.fill();
                });

                const scratchRandom = seededRandom(1977);
                context.lineCap = 'round';
                for (let index = 0; index < 175; index += 1) {
                    const x = scratchRandom() * width;
                    const y = scratchRandom() * height;
                    const length = 4 + scratchRandom() * 28;
                    context.strokeStyle = scratchRandom() > 0.5 ? 'rgba(250,240,210,0.22)' : 'rgba(39,35,31,0.18)';
                    context.lineWidth = 0.5 + scratchRandom();
                    context.beginPath();
                    context.moveTo(x, y);
                    context.lineTo(x + length, y + (scratchRandom() - 0.5) * 6);
                    context.stroke();
                }
            },
            anisotropy
        );

        const relief = makeCanvasTexture(
            1024,
            1024,
            (context, width, height) => {
                context.fillStyle = '#929292';
                context.fillRect(0, 0, width, height);
                context.lineWidth = 3;
                context.strokeStyle = '#555555';
                panels.forEach((panel) => {
                    context.strokeRect(panel.x * width, panel.y * height, panel.width * width, panel.height * height);
                });
                stains.forEach((stain) => {
                    context.fillStyle = stain.rust ? '#666666' : '#858585';
                    context.beginPath();
                    context.arc(stain.x * width, stain.y * height, stain.radius * width, 0, Math.PI * 2);
                    context.fill();
                });

                const grainRandom = seededRandom(77);
                for (let index = 0; index < 6200; index += 1) {
                    const tone = Math.round(110 + grainRandom() * 55);
                    context.fillStyle = `rgba(${tone},${tone},${tone},0.42)`;
                    const size = 0.5 + grainRandom() * 2.2;
                    context.fillRect(grainRandom() * width, grainRandom() * height, size, size);
                }
            },
            anisotropy,
            false
        );

        return { color, relief };
    }

    function makeRockyPlanetTextures(anisotropy) {
        const random = seededRandom(404);
        const craters = Array.from({ length: 88 }, () => ({
            x: random(),
            y: random(),
            radius: 0.004 + random() * 0.035,
            depth: random()
        }));

        const color = makeCanvasTexture(
            1024,
            512,
            (context, width, height) => {
                const background = context.createLinearGradient(0, 0, 0, height);
                background.addColorStop(0, '#6d2e31');
                background.addColorStop(0.32, '#b6573c');
                background.addColorStop(0.64, '#79362f');
                background.addColorStop(1, '#472735');
                context.fillStyle = background;
                context.fillRect(0, 0, width, height);

                const bandRandom = seededRandom(81);
                for (let band = 0; band < 34; band += 1) {
                    const y = bandRandom() * height;
                    const bandHeight = 2 + bandRandom() * 18;
                    context.fillStyle = bandRandom() > 0.5 ? 'rgba(236,139,78,0.1)' : 'rgba(47,24,36,0.13)';
                    context.beginPath();
                    context.moveTo(0, y);
                    for (let x = 0; x <= width; x += 24) {
                        context.lineTo(x, y + Math.sin(x * 0.018 + band) * bandHeight * 0.35);
                    }
                    context.lineTo(width, y + bandHeight);
                    context.lineTo(0, y + bandHeight);
                    context.closePath();
                    context.fill();
                }

                craters.forEach((crater) => {
                    const x = crater.x * width;
                    const y = crater.y * height;
                    const radius = crater.radius * width;
                    const craterGradient = context.createRadialGradient(x - radius * 0.22, y - radius * 0.2, radius * 0.08, x, y, radius);
                    craterGradient.addColorStop(0, 'rgba(245,166,101,0.28)');
                    craterGradient.addColorStop(0.38, 'rgba(55,24,28,0.28)');
                    craterGradient.addColorStop(0.76, 'rgba(38,18,24,0.18)');
                    craterGradient.addColorStop(1, 'rgba(34,18,23,0)');
                    context.fillStyle = craterGradient;
                    context.beginPath();
                    context.ellipse(x, y, radius, radius * (0.35 + crater.depth * 0.4), 0, 0, Math.PI * 2);
                    context.fill();
                });
            },
            anisotropy
        );

        const bump = makeCanvasTexture(
            1024,
            512,
            (context, width, height) => {
                context.fillStyle = '#868686';
                context.fillRect(0, 0, width, height);
                craters.forEach((crater) => {
                    const x = crater.x * width;
                    const y = crater.y * height;
                    const radius = crater.radius * width;
                    context.strokeStyle = '#b8b8b8';
                    context.fillStyle = '#555555';
                    context.lineWidth = Math.max(2, radius * 0.18);
                    context.beginPath();
                    context.ellipse(x, y, radius, radius * (0.35 + crater.depth * 0.4), 0, 0, Math.PI * 2);
                    context.fill();
                    context.stroke();
                });

                const grainRandom = seededRandom(909);
                for (let index = 0; index < 4200; index += 1) {
                    const tone = Math.round(92 + grainRandom() * 84);
                    context.fillStyle = `rgba(${tone},${tone},${tone},0.5)`;
                    const size = 1 + grainRandom() * 3;
                    context.fillRect(grainRandom() * width, grainRandom() * height, size, size);
                }
            },
            anisotropy,
            false
        );

        return { color, bump };
    }

    function makeGasPlanetTextures(anisotropy) {
        const color = makeCanvasTexture(
            1024,
            512,
            (context, width, height) => {
                const random = seededRandom(1980);
                let y = 0;
                const colors = ['#284f62', '#376f77', '#c88755', '#dab075', '#254452', '#8b5b49'];
                while (y < height) {
                    const bandHeight = 4 + random() * 25;
                    context.fillStyle = colors[Math.floor(random() * colors.length)];
                    context.fillRect(0, y, width, bandHeight + 1);
                    context.fillStyle = `rgba(244,218,160,${0.025 + random() * 0.09})`;
                    for (let x = 0; x < width; x += 12) {
                        context.fillRect(x, y + Math.sin(x * 0.02 + y) * 2, 14, Math.max(1, bandHeight * 0.18));
                    }
                    y += bandHeight;
                }

                const storm = context.createRadialGradient(width * 0.67, height * 0.59, 5, width * 0.67, height * 0.59, 82);
                storm.addColorStop(0, 'rgba(255,209,139,0.92)');
                storm.addColorStop(0.35, 'rgba(177,83,56,0.78)');
                storm.addColorStop(0.72, 'rgba(87,50,52,0.45)');
                storm.addColorStop(1, 'rgba(87,50,52,0)');
                context.save();
                context.scale(1, 0.38);
                context.fillStyle = storm;
                context.beginPath();
                context.arc(width * 0.67, (height * 0.59) / 0.38, 84, 0, Math.PI * 2);
                context.fill();
                context.restore();

                context.globalAlpha = 0.16;
                const streakRandom = seededRandom(55);
                for (let index = 0; index < 180; index += 1) {
                    context.strokeStyle = index % 2 ? '#f4d79c' : '#142d38';
                    context.lineWidth = 0.5 + streakRandom() * 2;
                    const streakY = streakRandom() * height;
                    context.beginPath();
                    context.moveTo(streakRandom() * width * 0.2, streakY);
                    context.bezierCurveTo(width * 0.35, streakY + streakRandom() * 9, width * 0.7, streakY - streakRandom() * 9, width, streakY);
                    context.stroke();
                }
                context.globalAlpha = 1;
            },
            anisotropy
        );

        const bump = makeCanvasTexture(
            1024,
            512,
            (context, width, height) => {
                const random = seededRandom(1980);
                let y = 0;
                while (y < height) {
                    const bandHeight = 4 + random() * 25;
                    const tone = Math.round(105 + random() * 60);
                    context.fillStyle = `rgb(${tone},${tone},${tone})`;
                    context.fillRect(0, y, width, bandHeight + 1);
                    y += bandHeight;
                }
            },
            anisotropy,
            false
        );

        return { color, bump };
    }

    function makeGlowTexture(anisotropy) {
        return makeCanvasTexture(
            256,
            256,
            (context, width, height) => {
                const glow = context.createRadialGradient(width / 2, height / 2, 0, width / 2, height / 2, width / 2);
                glow.addColorStop(0, 'rgba(233,255,252,1)');
                glow.addColorStop(0.16, 'rgba(119,255,226,0.92)');
                glow.addColorStop(0.5, 'rgba(48,218,211,0.36)');
                glow.addColorStop(1, 'rgba(48,218,211,0)');
                context.fillStyle = glow;
                context.fillRect(0, 0, width, height);
            },
            anisotropy
        );
    }

    function makeFalcon(anisotropy) {
        const ship = new THREE.Group();
        ship.name = 'Millennium Falcon';

        const { color: hullMap, relief: hullRelief } = makeHullTextures(anisotropy);
        const hullMaterial = new THREE.MeshPhysicalMaterial({
            color: 0xe1d8c1,
            map: hullMap,
            bumpMap: hullRelief,
            bumpScale: 0.055,
            roughness: 0.76,
            metalness: 0.3,
            clearcoat: 0.08,
            clearcoatRoughness: 0.8
        });
        const hullLightMaterial = hullMaterial.clone();
        hullLightMaterial.color.set(0xf0e7d0);
        const darkMaterial = new THREE.MeshStandardMaterial({ color: 0x363b3b, roughness: 0.64, metalness: 0.58 });
        const insetMaterial = new THREE.MeshStandardMaterial({ color: 0x242728, roughness: 0.84, metalness: 0.32 });
        const rustMaterial = new THREE.MeshStandardMaterial({ color: 0x963f31, roughness: 0.79, metalness: 0.24 });
        const armorMaterial = new THREE.MeshStandardMaterial({ color: 0x8b8e86, roughness: 0.73, metalness: 0.38 });
        const glassMaterial = new THREE.MeshPhysicalMaterial({
            color: 0x69c8ca,
            emissive: 0x103f47,
            emissiveIntensity: 0.85,
            roughness: 0.13,
            metalness: 0.24,
            transmission: 0.12,
            thickness: 0.2
        });
        const lineMaterial = new THREE.LineBasicMaterial({ color: 0x2f302e, transparent: true, opacity: 0.68 });

        const outline = new THREE.Shape();
        outline.moveTo(-2.58, 0);
        outline.bezierCurveTo(-2.48, 1.52, -1.3, 2.38, 0.5, 2.32);
        outline.lineTo(3.24, 1.18);
        outline.lineTo(1.52, 0.35);
        outline.lineTo(1.52, -0.35);
        outline.lineTo(3.24, -1.18);
        outline.lineTo(0.5, -2.32);
        outline.bezierCurveTo(-1.3, -2.38, -2.48, -1.52, -2.58, 0);

        const hullGeometry = new THREE.ExtrudeGeometry(outline, {
            depth: 0.42,
            bevelEnabled: true,
            bevelSegments: 5,
            bevelSize: 0.14,
            bevelThickness: 0.12,
            curveSegments: 64
        });
        hullGeometry.translate(0, 0, -0.22);
        const hull = new THREE.Mesh(hullGeometry, hullMaterial);
        hull.castShadow = true;
        hull.receiveShadow = true;
        ship.add(hull);
        ship.add(new THREE.LineSegments(new THREE.EdgesGeometry(hullGeometry, 27), lineMaterial));

        const lowerSaucer = new THREE.Mesh(new THREE.CylinderGeometry(1.55, 1.91, 0.2, 64), darkMaterial);
        lowerSaucer.rotation.x = Math.PI / 2;
        lowerSaucer.position.set(-0.18, 0, -0.26);
        ship.add(lowerSaucer);

        const upperSaucer = new THREE.Mesh(new THREE.CylinderGeometry(1.48, 1.78, 0.22, 64), hullLightMaterial);
        upperSaucer.rotation.x = Math.PI / 2;
        upperSaucer.position.set(-0.18, 0, 0.34);
        ship.add(upperSaucer);

        const upperTier = new THREE.Mesh(new THREE.CylinderGeometry(0.76, 1.13, 0.2, 48), hullMaterial);
        upperTier.rotation.x = Math.PI / 2;
        upperTier.position.set(-0.18, 0, 0.53);
        ship.add(upperTier);

        const topTrench = new THREE.Mesh(new THREE.RingGeometry(0.62, 1.07, 64), insetMaterial);
        topTrench.position.set(-0.18, 0, 0.65);
        ship.add(topTrench);
        const topTrenchOutline = new THREE.Mesh(new THREE.TorusGeometry(1.06, 0.035, 8, 64), darkMaterial);
        topTrenchOutline.position.set(-0.18, 0, 0.67);
        ship.add(topTrenchOutline);

        const armorPlateShape = new THREE.Shape();
        armorPlateShape.moveTo(0.66, -0.17);
        armorPlateShape.lineTo(1.62, -0.34);
        armorPlateShape.lineTo(1.78, 0.18);
        armorPlateShape.lineTo(0.7, 0.2);
        armorPlateShape.closePath();
        [0.66, 1.7, 2.72, -2.5, -0.72].forEach((angle, index) => {
            const plateGeometry = new THREE.ShapeGeometry(armorPlateShape, 12);
            const plate = new THREE.Mesh(plateGeometry, index === 1 ? hullLightMaterial : armorMaterial);
            plate.position.set(-0.18, 0, 0.695);
            plate.rotation.z = angle;
            ship.add(plate);
            const plateOutline = new THREE.LineSegments(new THREE.EdgesGeometry(plateGeometry), lineMaterial);
            plateOutline.position.copy(plate.position);
            plateOutline.position.z += 0.006;
            plateOutline.rotation.z = angle;
            ship.add(plateOutline);
        });

        [
            [0.82, 1.15, 0.42],
            [-1.12, -1.18, -0.58],
            [-1.34, 0.82, 2.64]
        ].forEach(([x, y, rotation]) => {
            const marking = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.13, 0.026), rustMaterial);
            marking.position.set(x, y, 0.735);
            marking.rotation.z = rotation;
            ship.add(marking);
        });

        const turretBase = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.51, 0.2, 32), darkMaterial);
        turretBase.rotation.x = Math.PI / 2;
        turretBase.position.set(-0.18, 0, 0.72);
        ship.add(turretBase);
        const turretCap = new THREE.Mesh(new THREE.SphereGeometry(0.31, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), hullLightMaterial);
        turretCap.rotation.x = Math.PI / 2;
        turretCap.position.set(-0.18, 0, 0.83);
        ship.add(turretCap);
        [-0.11, 0.11].forEach((offset) => {
            const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.027, 0.038, 0.64, 10), darkMaterial);
            barrel.rotation.z = -Math.PI / 2;
            barrel.position.set(0.12, offset, 0.93);
            ship.add(barrel);
        });

        const lowerTurretBase = new THREE.Mesh(new THREE.CylinderGeometry(0.31, 0.45, 0.16, 28), darkMaterial);
        lowerTurretBase.rotation.x = Math.PI / 2;
        lowerTurretBase.position.set(-0.18, 0, -0.43);
        ship.add(lowerTurretBase);
        const lowerTurretCap = new THREE.Mesh(
            new THREE.SphereGeometry(0.27, 28, 14, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2),
            hullMaterial
        );
        lowerTurretCap.rotation.x = Math.PI / 2;
        lowerTurretCap.position.set(-0.18, 0, -0.52);
        ship.add(lowerTurretCap);

        const corridor = new THREE.Group();
        corridor.position.set(1.18, -1.35, 0.08);
        corridor.rotation.z = -0.31;
        const corridorTube = new THREE.Mesh(new THREE.CylinderGeometry(0.26, 0.36, 1.62, 24), hullMaterial);
        corridorTube.rotation.z = -Math.PI / 2;
        corridorTube.position.x = 0.47;
        corridor.add(corridorTube);
        const cockpit = new THREE.Mesh(new THREE.SphereGeometry(0.4, 32, 20), glassMaterial);
        cockpit.scale.set(1.18, 0.78, 0.68);
        cockpit.position.set(1.3, 0, 0);
        corridor.add(cockpit);
        [-0.13, 0.13].forEach((offset) => {
            const frame = new THREE.Mesh(new THREE.BoxGeometry(0.055, 0.58, 0.055), darkMaterial);
            frame.position.set(1.45, offset, 0.14);
            frame.rotation.z = offset * 1.9;
            corridor.add(frame);
        });
        const windowRim = new THREE.Mesh(new THREE.TorusGeometry(0.27, 0.038, 10, 28), darkMaterial);
        windowRim.scale.y = 0.74;
        windowRim.position.set(1.62, 0, 0);
        windowRim.rotation.y = Math.PI / 2;
        corridor.add(windowRim);
        ship.add(corridor);

        [-1, 1].forEach((side) => {
            const dock = new THREE.Mesh(new THREE.CylinderGeometry(0.46, 0.46, 0.3, 32), hullMaterial);
            dock.position.set(-0.38, side * 2.18, 0);
            ship.add(dock);
            const dockRim = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.09, 10, 32), darkMaterial);
            dockRim.rotation.x = Math.PI / 2;
            dockRim.position.set(-0.38, side * 2.34, 0);
            ship.add(dockRim);
        });

        const dishAssembly = new THREE.Group();
        dishAssembly.position.set(-0.72, 1.06, 0.68);
        dishAssembly.rotation.x = -0.25;
        dishAssembly.rotation.y = -0.42;
        const dishStalk = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.11, 0.42, 14), darkMaterial);
        dishStalk.rotation.x = Math.PI / 2;
        dishStalk.position.z = 0.2;
        dishAssembly.add(dishStalk);
        const dish = new THREE.Mesh(
            new THREE.SphereGeometry(0.52, 36, 18, 0, Math.PI * 2, 0, Math.PI / 2),
            new THREE.MeshStandardMaterial({ color: 0xd5ccb5, roughness: 0.68, metalness: 0.4, side: THREE.DoubleSide })
        );
        dish.rotation.x = Math.PI / 2;
        dish.scale.y = 0.22;
        dish.position.z = 0.46;
        dishAssembly.add(dish);
        const dishReceiver = new THREE.Mesh(new THREE.SphereGeometry(0.065, 12, 8), darkMaterial);
        dishReceiver.position.z = 0.75;
        dishAssembly.add(dishReceiver);
        ship.add(dishAssembly);

        const panelRandom = seededRandom(427);
        const greebleGeometry = new THREE.BoxGeometry(1, 1, 1);
        for (let index = 0; index < 62; index += 1) {
            const angle = panelRandom() * Math.PI * 2;
            const radius = 0.7 + panelRandom() * 0.88;
            const panel = new THREE.Mesh(
                greebleGeometry,
                index % 13 === 0 ? rustMaterial : index % 4 === 0 ? darkMaterial : hullLightMaterial
            );
            panel.position.set(-0.18 + Math.cos(angle) * radius, Math.sin(angle) * radius, 0.68 + panelRandom() * 0.055);
            panel.rotation.z = angle + (panelRandom() - 0.5) * 0.34;
            panel.scale.set(0.08 + panelRandom() * 0.28, 0.035 + panelRandom() * 0.11, 0.025 + panelRandom() * 0.06);
            ship.add(panel);
        }

        for (let index = 0; index < 22; index += 1) {
            const angle = (index / 22) * Math.PI * 2 + 0.05;
            const startRadius = index % 2 ? 1.08 : 0.7;
            const endRadius = index % 3 === 0 ? 1.76 : 1.58;
            const points = [
                new THREE.Vector3(-0.18 + Math.cos(angle) * startRadius, Math.sin(angle) * startRadius, 0.665),
                new THREE.Vector3(-0.18 + Math.cos(angle) * endRadius, Math.sin(angle) * endRadius, 0.665)
            ];
            ship.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(points), lineMaterial));
        }

        const ventGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.07, 24);
        const ventPositions = [
            [-0.95, -0.72], [-0.53, -0.83], [-0.1, -0.78], [0.34, -0.69],
            [-0.73, -1.15], [-0.25, -1.2], [0.24, -1.08], [0.68, -0.88]
        ];
        ventPositions.forEach(([x, y]) => {
            const vent = new THREE.Mesh(ventGeometry, insetMaterial);
            vent.rotation.x = Math.PI / 2;
            vent.position.set(x, y, 0.68);
            ship.add(vent);
            const ventRim = new THREE.Mesh(new THREE.TorusGeometry(0.15, 0.022, 6, 24), rustMaterial);
            ventRim.position.set(x, y, 0.72);
            ship.add(ventRim);
        });

        [1, -1].forEach((side) => {
            const trench = new THREE.Mesh(new THREE.BoxGeometry(1.52, 0.24, 0.11), insetMaterial);
            trench.position.set(2.07, side * 0.82, 0.43);
            trench.rotation.z = side * 0.18;
            ship.add(trench);
            for (let index = 0; index < 5; index += 1) {
                const detail = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.14, 0.09), index === 2 ? rustMaterial : darkMaterial);
                detail.position.set(1.55 + index * 0.27, side * (0.68 + index * 0.065), 0.52);
                ship.add(detail);
            }
        });

        const enginePoints = [];
        for (let index = 0; index <= 48; index += 1) {
            const angle = THREE.MathUtils.lerp(2.2, 4.08, index / 48);
            enginePoints.push(new THREE.Vector3(Math.cos(angle) * 2.2 - 0.07, Math.sin(angle) * 2.2, 0.02));
        }
        const engineCurve = new THREE.CatmullRomCurve3(enginePoints);
        const engineCoreMaterial = new THREE.MeshStandardMaterial({
            color: 0xe9fffa,
            emissive: 0x72ffe2,
            emissiveIntensity: 3.35,
            roughness: 0.1,
            metalness: 0.08
        });
        const engineHaloMaterial = new THREE.MeshBasicMaterial({
            color: 0x5bffe1,
            transparent: true,
            opacity: 0.2,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });
        ship.add(new THREE.Mesh(new THREE.TubeGeometry(engineCurve, 96, 0.19, 16, false), engineHaloMaterial));
        ship.add(new THREE.Mesh(new THREE.TubeGeometry(engineCurve, 96, 0.075, 12, false), engineCoreMaterial));

        const glowTexture = makeGlowTexture(anisotropy);
        const engineSprites = [];
        [-0.86, 0, 0.86].forEach((offset, index) => {
            const sprite = new THREE.Sprite(
                new THREE.SpriteMaterial({
                    map: glowTexture,
                    color: index === 1 ? 0xa8ffed : 0x5ee4dc,
                    transparent: true,
                    opacity: index === 1 ? 0.24 : 0.15,
                    blending: THREE.AdditiveBlending,
                    depthWrite: false
                })
            );
            sprite.position.set(-2.24, offset, -0.08);
            sprite.scale.set(index === 1 ? 1.6 : 1.22, index === 1 ? 1.22 : 0.82, 1);
            ship.add(sprite);
            engineSprites.push(sprite);
        });

        const engineLights = [-0.92, 0, 0.92].map((offset) => {
            const light = new THREE.PointLight(0x68ffe3, 2.6, 4.2, 2);
            light.position.set(-2.05, offset, 0.18);
            ship.add(light);
            return light;
        });

        ship.traverse((object) => {
            if (object.isMesh) {
                object.castShadow = true;
                object.receiveShadow = true;
            }
        });

        ship.userData.engineCoreMaterial = engineCoreMaterial;
        ship.userData.engineHaloMaterial = engineHaloMaterial;
        ship.userData.engineSprites = engineSprites;
        ship.userData.engineLights = engineLights;
        ship.scale.setScalar(0.54);
        return ship;
    }

    function makeStars() {
        const count = 1050;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const palette = [new THREE.Color(0xf8edcf), new THREE.Color(0x70d7d2), new THREE.Color(0xe0aa3e)];
        const random = seededRandom(927);

        for (let index = 0; index < count; index += 1) {
            const offset = index * 3;
            positions[offset] = (random() - 0.5) * 38;
            positions[offset + 1] = (random() - 0.5) * 26;
            positions[offset + 2] = -3 - random() * 18;
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
            new THREE.PointsMaterial({ size: 0.034, vertexColors: true, transparent: true, opacity: 0.82, sizeAttenuation: true })
        );
    }

    function makePlanetSystem(anisotropy) {
        const rockyTextures = makeRockyPlanetTextures(anisotropy);
        const rockyGroup = new THREE.Group();
        const rockyPlanet = new THREE.Mesh(
            new THREE.SphereGeometry(2.35, 72, 48),
            new THREE.MeshPhysicalMaterial({
                map: rockyTextures.color,
                bumpMap: rockyTextures.bump,
                bumpScale: 0.16,
                roughness: 0.94,
                metalness: 0.02,
                clearcoat: 0.04
            })
        );
        rockyGroup.add(rockyPlanet);
        const rockyAtmosphere = new THREE.Mesh(
            new THREE.SphereGeometry(2.41, 64, 40),
            new THREE.MeshBasicMaterial({ color: 0xe68b5e, transparent: true, opacity: 0.075, side: THREE.BackSide })
        );
        rockyGroup.add(rockyAtmosphere);
        rockyGroup.position.set(-7.2, 4.55, -9);

        const gasTextures = makeGasPlanetTextures(anisotropy);
        const gasGroup = new THREE.Group();
        const gasPlanet = new THREE.Mesh(
            new THREE.SphereGeometry(1.62, 72, 48),
            new THREE.MeshPhysicalMaterial({
                map: gasTextures.color,
                bumpMap: gasTextures.bump,
                bumpScale: 0.06,
                roughness: 0.82,
                metalness: 0.02,
                clearcoat: 0.12,
                clearcoatRoughness: 0.72
            })
        );
        gasPlanet.rotation.z = -0.18;
        gasGroup.add(gasPlanet);

        const ring = new THREE.Mesh(
            new THREE.RingGeometry(2.02, 3.3, 128, 12),
            new THREE.MeshBasicMaterial({
                color: 0xd8a83f,
                transparent: true,
                opacity: 0.34,
                side: THREE.DoubleSide,
                depthWrite: false
            })
        );
        ring.rotation.x = 1.18;
        ring.rotation.y = 0.2;
        gasGroup.add(ring);
        [2.18, 2.42, 2.76, 3.08].forEach((radius, index) => {
            const ringLine = new THREE.Mesh(
                new THREE.TorusGeometry(radius, index % 2 ? 0.024 : 0.038, 8, 128),
                new THREE.MeshBasicMaterial({ color: index % 2 ? 0xf0d59a : 0x8e6945, transparent: true, opacity: 0.52 })
            );
            ringLine.rotation.x = 1.18;
            ringLine.rotation.y = 0.2;
            gasGroup.add(ringLine);
        });
        gasGroup.position.set(7.1, -4.25, -11.5);
        gasGroup.scale.setScalar(0.9);

        return { rockyGroup, rockyPlanet, gasGroup, gasPlanet };
    }

    function makeDeepStars() {
        const count = 1800;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const palette = [new THREE.Color(0xf8edcf), new THREE.Color(0x7df5a0), new THREE.Color(0x69c4ca), new THREE.Color(0xdda93b)];
        const random = seededRandom(2187);

        for (let index = 0; index < count; index += 1) {
            const offset = index * 3;
            positions[offset] = (random() - 0.5) * 120;
            positions[offset + 1] = (random() - 0.5) * 72;
            positions[offset + 2] = (random() - 0.5) * 120;
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
                size: 0.075,
                vertexColors: true,
                transparent: true,
                opacity: 0.88,
                sizeAttenuation: true
            })
        );
    }

    function makeCartoonPlanet({ color, accent, radius = 2.8, ring = false, seed = 1 }) {
        const group = new THREE.Group();
        const sphereGeometry = new THREE.IcosahedronGeometry(radius, 3);
        const outline = new THREE.Mesh(
            sphereGeometry,
            new THREE.MeshBasicMaterial({ color: 0x090c12, side: THREE.BackSide })
        );
        outline.scale.setScalar(1.045);
        group.add(outline);

        const surface = new THREE.Mesh(
            sphereGeometry,
            new THREE.MeshStandardMaterial({
                color,
                emissive: new THREE.Color(color).multiplyScalar(0.06),
                roughness: 0.82,
                metalness: 0.03,
                flatShading: true
            })
        );
        surface.castShadow = true;
        surface.receiveShadow = true;
        group.add(surface);

        const latitudeMaterial = new THREE.MeshBasicMaterial({ color: accent, transparent: true, opacity: 0.72 });
        [-0.78, 0.14, 0.92].forEach((height, index) => {
            const latitudeRadius = Math.sqrt(Math.max(0.1, radius * radius - height * height));
            const latitude = new THREE.Mesh(
                new THREE.TorusGeometry(latitudeRadius, index === 1 ? 0.075 : 0.045, 7, 72),
                latitudeMaterial
            );
            latitude.rotation.x = Math.PI / 2;
            latitude.position.y = height;
            latitude.rotation.z = (index - 1) * 0.08;
            group.add(latitude);
        });

        const random = seededRandom(seed);
        for (let index = 0; index < 7; index += 1) {
            const patch = new THREE.Mesh(
                new THREE.SphereGeometry(0.18 + random() * 0.24, 12, 8),
                new THREE.MeshStandardMaterial({ color: index % 3 === 0 ? accent : 0x2c3132, roughness: 0.9 })
            );
            const phi = random() * Math.PI * 2;
            const theta = 0.35 + random() * (Math.PI - 0.7);
            patch.position.setFromSphericalCoords(radius * 0.99, theta, phi);
            patch.scale.z = 0.38;
            patch.lookAt(0, 0, 0);
            group.add(patch);
        }

        if (ring) {
            const planetRing = new THREE.Mesh(
                new THREE.RingGeometry(radius * 1.25, radius * 1.82, 96, 8),
                new THREE.MeshBasicMaterial({
                    color: accent,
                    transparent: true,
                    opacity: 0.38,
                    side: THREE.DoubleSide,
                    depthWrite: false
                })
            );
            planetRing.rotation.x = 1.18;
            planetRing.rotation.y = 0.2;
            group.add(planetRing);

            const ringOutline = new THREE.Mesh(
                new THREE.TorusGeometry(radius * 1.58, 0.055, 8, 96),
                new THREE.MeshBasicMaterial({ color: 0x090c12, transparent: true, opacity: 0.7 })
            );
            ringOutline.rotation.x = 1.18;
            ringOutline.rotation.y = 0.2;
            group.add(ringOutline);
        }

        group.userData.surface = surface;
        return group;
    }

    function makeExploreWorld() {
        const world = new THREE.Group();
        world.name = 'Circular Explore Route';
        const deepStars = makeDeepStars();
        world.add(deepStars);

        const configs = [
            { color: 0xdda93b, accent: 0xd75b42, radius: 3.15, seed: 11 },
            { color: 0xd75b42, accent: 0xf4e7c5, radius: 2.85, ring: true, seed: 22 },
            { color: 0x69c4ca, accent: 0x7df5a0, radius: 3.05, seed: 33 },
            { color: 0x7df5a0, accent: 0xdda93b, radius: 2.9, ring: true, seed: 44 }
        ];
        const verticalOffsets = [-0.4, 0.75, -0.75, 0.45];
        const routePosition = new THREE.Vector3();
        const routeTangent = new THREE.Vector3();
        const routeRadial = new THREE.Vector3();

        const planets = configs.map((config, index) => {
            const progress = index / configs.length;
            sampleExploreRoute(progress, routePosition, routeTangent);
            routeRadial.set(routePosition.x, 0, routePosition.z).normalize();
            const planet = makeCartoonPlanet(config);
            const position = routePosition.clone()
                .addScaledVector(routeTangent, 9)
                .addScaledVector(routeRadial, 7.5)
                .addScaledVector(EXPLORE_UP, verticalOffsets[index]);
            planet.position.copy(position);
            planet.rotation.z = index % 2 ? 0.12 : -0.1;
            planet.userData.routePosition = position.clone();
            planet.userData.rotationRate = 0.018 + index * 0.004;
            world.add(planet);
            return planet;
        });

        world.visible = false;
        return { world, planets, deepStars };
    }

    onMount(() => {
        gsap.registerPlugin(ScrollTrigger);

        const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
        let reduceMotion = motionPreference.matches;
        let renderer;
        try {
            renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
        } catch (error) {
            canvas.dataset.sceneState = 'unavailable';
            console.warn('The decorative 3D scene could not start. The portfolio remains available.', error);
            return () => {};
        }
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.14;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
        renderer.setSize(window.innerWidth, window.innerHeight);

        const anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 160);
        camera.position.set(0, 0, 11);

        const normalWorld = new THREE.Group();
        normalWorld.name = 'Exterior Portfolio Scene';
        const stars = makeStars();
        normalWorld.add(stars);

        const { rockyGroup, rockyPlanet, gasGroup, gasPlanet } = makePlanetSystem(anisotropy);
        normalWorld.add(rockyGroup, gasGroup);

        const flightRig = new THREE.Group();
        const falcon = makeFalcon(anisotropy);
        flightRig.add(falcon);
        normalWorld.add(flightRig);
        scene.add(normalWorld);

        const { world: exploreWorld, planets: explorePlanets, deepStars } = makeExploreWorld();
        scene.add(exploreWorld);

        scene.add(new THREE.HemisphereLight(0xf7e7bd, 0x111b2a, 2.35));
        const keyLight = new THREE.DirectionalLight(0xffd57b, 5.2);
        keyLight.position.set(5.5, 6.5, 8);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.set(1024, 1024);
        keyLight.shadow.camera.near = 1;
        keyLight.shadow.camera.far = 28;
        keyLight.shadow.camera.left = -8;
        keyLight.shadow.camera.right = 8;
        keyLight.shadow.camera.top = 8;
        keyLight.shadow.camera.bottom = -8;
        scene.add(keyLight);
        const rimLight = new THREE.DirectionalLight(0x63e4dd, 4.6);
        rimLight.position.set(-6, -3, 5);
        scene.add(rimLight);
        const fillLight = new THREE.PointLight(0xc86b4d, 18, 20, 2);
        fillLight.position.set(-6, 3.8, -2);
        scene.add(fillLight);

        function makeFlightPath() {
            const verticalHalf = Math.tan(THREE.MathUtils.degToRad(38 * 0.5)) * 11;
            const horizontalHalf = verticalHalf * camera.aspect;
            const extent = THREE.MathUtils.clamp(horizontalHalf * 1.06, 3.2, 5.2);
            return new THREE.CatmullRomCurve3(
                [
                    new THREE.Vector3(-extent * 1.18, 0.92, -5.7),
                    new THREE.Vector3(-extent * 0.68, 0.42, -4.95),
                    new THREE.Vector3(-extent * 0.12, -0.06, -4.55),
                    new THREE.Vector3(extent * 0.48, -0.3, -4.92),
                    new THREE.Vector3(extent * 1.2, 0.18, -5.75)
                ],
                false,
                'centripetal'
            );
        }

        let path = makeFlightPath();
        const flight = { progress: 0 };
        const point = new THREE.Vector3();
        const tangent = new THREE.Vector3();
        const previousTangent = new THREE.Vector3();
        const nextTangent = new THREE.Vector3();
        const side = new THREE.Vector3();
        const top = new THREE.Vector3();
        const orientationMatrix = new THREE.Matrix4();
        const bankQuaternion = new THREE.Quaternion();
        const targetQuaternion = new THREE.Quaternion();
        const launchTarget = new THREE.Vector3(0, -0.3, 7.6);
        const exploreCameraPosition = new THREE.Vector3();
        const exploreCameraTangent = new THREE.Vector3();
        const exploreLookTarget = new THREE.Vector3();
        const reducedPlanetPosition = new THREE.Vector3(4.6, -0.7, -6.8);
        const exploreState = { mix: 0, progress: 0 };
        let exploreRequested = false;
        let modeTween;
        let baseFalconScale = 0.54;
        let previousCockpitView = false;

        let flightTween;

        function configureNormalFlight() {
            flightTween?.kill();
            flightTween = undefined;
            if (reduceMotion) {
                flight.progress = 0.42;
                return;
            }

            flightTween = gsap.to(flight, {
                progress: 1,
                ease: 'none',
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: true
                }
            });
        }

        updateExploreMode = (enabled) => {
            exploreRequested = enabled;
            modeTween?.kill();
            if (reduceMotion) {
                exploreState.mix = enabled ? 1 : 0;
                return;
            }
            modeTween = gsap.to(exploreState, {
                mix: enabled ? 1 : 0,
                duration: enabled ? 0.86 : 0.68,
                ease: 'power2.inOut'
            });
        };

        updateExploreProgress = (value) => {
            const numericProgress = Number(value);
            exploreState.progress = Number.isFinite(numericProgress)
                ? THREE.MathUtils.clamp(numericProgress, 0, 1)
                : 0;
        };

        const handleMotionPreference = () => {
            reduceMotion = motionPreference.matches;
            modeTween?.kill();
            exploreState.mix = exploreRequested ? 1 : 0;
            configureNormalFlight();
        };

        configureNormalFlight();
        motionPreference.addEventListener('change', handleMotionPreference);

        const clock = new THREE.Clock();
        let animationFrame;
        let rendering = true;

        function render() {
            if (!rendering) return;
            const elapsed = clock.getElapsedTime();
            const progress = THREE.MathUtils.clamp(flight.progress, 0, 1);
            const sampleOffset = 0.018;
            path.getPointAt(progress, point);
            path.getTangentAt(progress, tangent).normalize();
            path.getTangentAt(Math.max(0, progress - sampleOffset), previousTangent).normalize();
            path.getTangentAt(Math.min(1, progress + sampleOffset), nextTangent).normalize();

            side.crossVectors(WORLD_TOP, tangent).normalize();
            top.crossVectors(tangent, side).normalize();
            orientationMatrix.makeBasis(tangent, side, top);
            targetQuaternion.setFromRotationMatrix(orientationMatrix);
            const bank = THREE.MathUtils.clamp((nextTangent.y - previousTangent.y) * -1.7, -0.14, 0.14);
            bankQuaternion.setFromAxisAngle(FORWARD, bank);
            targetQuaternion.multiply(bankQuaternion);

            flightRig.quaternion.copy(targetQuaternion);

            const cockpitView = exploreState.mix >= 0.58;
            if (cockpitView !== previousCockpitView) {
                camera.fov = cockpitView ? 52 : 38;
                camera.updateProjectionMatrix();
                previousCockpitView = cockpitView;
                onExploreViewChange(cockpitView);
            }

            normalWorld.visible = !cockpitView;
            exploreWorld.visible = cockpitView;

            if (cockpitView) {
                const exploreProgress = THREE.MathUtils.clamp(exploreState.progress, 0, 1);
                if (reduceMotion) {
                    camera.position.set(0, 0, 11);
                    camera.up.copy(EXPLORE_UP);
                    camera.lookAt(0, 0, -5.5);
                    const selectedPlanet = Math.round(exploreProgress * 4) % explorePlanets.length;
                    explorePlanets.forEach((planet, index) => {
                        planet.visible = index === selectedPlanet;
                        if (planet.visible) planet.position.copy(reducedPlanetPosition);
                    });
                } else {
                    sampleExploreRoute(exploreProgress, exploreCameraPosition, exploreCameraTangent);
                    exploreLookTarget.copy(exploreCameraPosition).addScaledVector(exploreCameraTangent, 8);
                    camera.position.copy(exploreCameraPosition);
                    camera.up.copy(EXPLORE_UP);
                    camera.lookAt(exploreLookTarget);
                    explorePlanets.forEach((planet) => {
                        planet.visible = true;
                        planet.position.copy(planet.userData.routePosition);
                    });
                }
            } else {
                const launchProgress = THREE.MathUtils.smoothstep(exploreState.mix, 0, 0.58);
                flightRig.position.lerpVectors(point, launchTarget, launchProgress);
                falcon.scale.setScalar(baseFalconScale * (1 + launchProgress * 3.8));
                camera.position.set(0, 0, 11);
                camera.up.set(0, 1, 0);
                camera.lookAt(0, 0, -0.6);
            }

            const enginePulse = reduceMotion ? 1 : 0.97 + Math.sin(elapsed * 4.2) * 0.025;
            falcon.userData.engineCoreMaterial.emissiveIntensity = 3.35 * enginePulse;
            falcon.userData.engineHaloMaterial.opacity = 0.17 + enginePulse * 0.03;
            falcon.userData.engineLights.forEach((light, index) => {
                light.intensity = 2.05 + enginePulse * 0.52 + Math.sin(elapsed * 4.8 + index) * 0.06;
            });
            falcon.userData.engineSprites.forEach((sprite, index) => {
                const pulse = 1 + Math.sin(elapsed * 4.1 + index) * 0.012;
                sprite.scale.x = (index === 1 ? 1.6 : 1.22) * pulse;
            });

            if (!reduceMotion) {
                stars.rotation.z = elapsed * 0.0024;
                stars.position.x = Math.sin(elapsed * 0.05) * 0.16;
                rockyPlanet.rotation.y = elapsed * 0.022;
                rockyGroup.rotation.z = -0.08 + Math.sin(elapsed * 0.035) * 0.012;
                gasPlanet.rotation.y = elapsed * 0.035;
                gasGroup.rotation.z = 0.05 + Math.sin(elapsed * 0.04) * 0.01;
                deepStars.rotation.y = elapsed * 0.0018;
                explorePlanets.forEach((planet) => {
                    planet.userData.surface.rotation.y = elapsed * planet.userData.rotationRate;
                });
            }

            renderer.render(scene, camera);
            animationFrame = window.requestAnimationFrame(render);
        }

        function resize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
            renderer.setSize(window.innerWidth, window.innerHeight);
            baseFalconScale = window.innerWidth < 640 ? 0.34 : window.innerWidth < 960 ? 0.44 : 0.54;
            if (exploreState.mix === 0) falcon.scale.setScalar(baseFalconScale);
            path = makeFlightPath();
        }

        function handleVisibility() {
            if (document.hidden) {
                rendering = false;
                window.cancelAnimationFrame(animationFrame);
                return;
            }
            if (!rendering) {
                rendering = true;
                render();
            }
        }

        window.addEventListener('resize', resize);
        document.addEventListener('visibilitychange', handleVisibility);
        resize();
        render();

        return () => {
            window.removeEventListener('resize', resize);
            document.removeEventListener('visibilitychange', handleVisibility);
            motionPreference.removeEventListener('change', handleMotionPreference);
            rendering = false;
            window.cancelAnimationFrame(animationFrame);
            flightTween?.kill();
            modeTween?.kill();
            updateExploreMode = () => {};
            updateExploreProgress = () => {};
            renderer.dispose();

            const disposedTextures = new Set();
            scene.traverse((object) => {
                if (object.geometry) object.geometry.dispose();
                if (!object.material) return;
                const materials = Array.isArray(object.material) ? object.material : [object.material];
                materials.forEach((material) => {
                    Object.values(material).forEach((value) => {
                        if (value?.isTexture && !disposedTextures.has(value)) {
                            value.dispose();
                            disposedTextures.add(value);
                        }
                    });
                    material.dispose();
                });
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
        opacity: 0.78;
        pointer-events: none;
    }
</style>
