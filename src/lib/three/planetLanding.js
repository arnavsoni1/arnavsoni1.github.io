import * as THREE from 'three';

export const LANDING_DURATION = 24;
export const ATMOSPHERE_ENTRY = 9;

const smooth = (value) => {
    const t = THREE.MathUtils.clamp(value, 0, 1);
    return t * t * t * (t * (t * 6 - 15) + 10);
};

// A deterministic height field: a sheltered landing basin between coastal ridges.
function hash(x, z) {
    const value = Math.sin(x * 127.1 + z * 311.7) * 43758.5453;
    return value - Math.floor(value);
}

function noise(x, z) {
    const ix = Math.floor(x);
    const iz = Math.floor(z);
    const fx = smooth(x - ix);
    const fz = smooth(z - iz);
    return THREE.MathUtils.lerp(
        THREE.MathUtils.lerp(hash(ix, iz), hash(ix + 1, iz), fx),
        THREE.MathUtils.lerp(hash(ix, iz + 1), hash(ix + 1, iz + 1), fx),
        fz
    );
}

function terrainHeight(x, z) {
    const distance = Math.hypot(x, z);
    const basin = smooth((distance - 85) / 470);
    const corridor = smooth((Math.abs(x) - 160 - Math.max(0, z) * 0.1) / 620);
    const ridge = 1 - Math.abs(noise(x * 0.00045 + 8, z * 0.00045 + 4) * 2 - 1);
    const detail = noise(x * 0.003, z * 0.003) * 0.55
        + noise(x * 0.009, z * 0.009) * 0.28
        + noise(x * 0.025, z * 0.025) * 0.17;
    const coast = smooth((-x - 650) / 1300);
    const hills = ridge ** 3 * 1050 * corridor + detail * 42 - 16;
    return THREE.MathUtils.lerp(hills, -28 + detail * 18, coast) * basin
        + (noise(x * 0.14, z * 0.14) - 0.5) * 0.28;
}

function makeGroundTexture(renderer) {
    const canvas = document.createElement('canvas');
    canvas.width = canvas.height = 256;
    const context = canvas.getContext('2d');
    const pixels = context.createImageData(256, 256);
    for (let y = 0; y < 256; y += 1) {
        for (let x = 0; x < 256; x += 1) {
            const offset = (y * 256 + x) * 4;
            const grain = 155 + noise(x * 0.075, y * 0.075) * 48 + hash(x, y) * 40;
            pixels.data[offset] = grain;
            pixels.data[offset + 1] = grain;
            pixels.data[offset + 2] = grain;
            pixels.data[offset + 3] = 255;
        }
    }
    context.putImageData(pixels, 0, 0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
    return texture;
}

function makeTerrain(renderer, compact) {
    const segments = compact ? 144 : 240;
    const geometry = new THREE.PlaneGeometry(1, 1, segments, segments);
    geometry.rotateX(-Math.PI / 2);
    const positions = geometry.attributes.position;
    const uvs = geometry.attributes.uv;
    // Concentrate vertices around touchdown without allocating an enormous uniform grid.
    for (let index = 0; index < positions.count; index += 1) {
        const px = positions.getX(index) * 2;
        const pz = positions.getZ(index) * 2;
        const x = Math.sign(px) * Math.abs(px) ** 2.25 * 9500;
        const z = Math.sign(pz) * Math.abs(pz) ** 2.25 * 9500;
        positions.setXYZ(index, x, terrainHeight(x, z), z);
        uvs.setXY(index, x / 32, z / 32);
    }
    geometry.computeVertexNormals();
    const colors = new Float32Array(positions.count * 3);
    const sand = new THREE.Color('#a7a38b');
    const grass = new THREE.Color('#4d665c');
    const rock = new THREE.Color('#707e83');
    const color = new THREE.Color();
    for (let index = 0; index < positions.count; index += 1) {
        const height = positions.getY(index);
        const slope = 1 - geometry.attributes.normal.getY(index);
        const x = positions.getX(index);
        const z = positions.getZ(index);
        color.copy(sand).lerp(grass, smooth((height - 8) / 100));
        color.lerp(rock, Math.max(smooth((height - 230) / 340), smooth(slope * 3)));
        color.multiplyScalar(0.82 + noise(x * 0.018, z * 0.018) * 0.24);
        color.toArray(colors, index * 3);
    }
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({
        vertexColors: true,
        map: makeGroundTexture(renderer),
        roughness: 0.96,
        metalness: 0
    }));
}

function makeRocks(compact) {
    const count = compact ? 280 : 650;
    const geometry = new THREE.IcosahedronGeometry(1, 1);
    const positions = geometry.attributes.position;
    for (let index = 0; index < positions.count; index += 1) {
        const scale = 0.82 + hash(positions.getX(index) * 8, positions.getZ(index) * 8) * 0.3;
        positions.setXYZ(index, positions.getX(index) * scale, positions.getY(index) * scale, positions.getZ(index) * scale);
    }
    geometry.computeVertexNormals();
    const rocks = new THREE.InstancedMesh(geometry, new THREE.MeshStandardMaterial({
        color: '#737b77', roughness: 1
    }), count);
    const transform = new THREE.Object3D();
    const color = new THREE.Color();
    for (let index = 0; index < count; index += 1) {
        const angle = hash(index, 2) * Math.PI * 2;
        const radius = 12 + hash(index, 7) ** 2 * 2100;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const size = 0.35 + hash(index, 11) ** 3 * (radius > 250 ? 24 : 2.8);
        transform.position.set(x, terrainHeight(x, z) + size * 0.24, z);
        transform.rotation.set(hash(index, 3) * 0.5, angle, hash(index, 4) * 0.35);
        transform.scale.set(size * 1.3, size * 0.72, size);
        transform.updateMatrix();
        rocks.setMatrixAt(index, transform.matrix);
        color.setRGB(0.58 + hash(index, 6) * 0.22, 0.64 + hash(index, 6) * 0.15, 0.61 + hash(index, 6) * 0.2);
        rocks.setColorAt(index, color);
    }
    return rocks;
}

function makeSky() {
    return new THREE.Mesh(new THREE.SphereGeometry(28000, 32, 20), new THREE.ShaderMaterial({
        side: THREE.BackSide,
        depthWrite: false,
        uniforms: { sunDirection: { value: new THREE.Vector3(-0.5, 0.65, -0.8).normalize() } },
        vertexShader: `
            varying vec3 skyDirection;
            void main() {
                skyDirection = position;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            varying vec3 skyDirection;
            uniform vec3 sunDirection;
            void main() {
                vec3 direction = normalize(skyDirection);
                float elevation = max(direction.y, 0.0);
                vec3 horizon = vec3(0.65, 0.78, 0.79);
                vec3 zenith = vec3(0.12, 0.35, 0.50);
                vec3 color = mix(horizon, zenith, pow(elevation, 0.45));
                float sunlight = max(dot(direction, sunDirection), 0.0);
                color += vec3(0.6, 0.44, 0.25) * pow(sunlight, 18.0) * 0.32;
                color += vec3(2.2, 1.9, 1.4) * smoothstep(0.9995, 0.99985, sunlight);
                gl_FragColor = vec4(color, 1.0);
                #include <tonemapping_fragment>
                #include <colorspace_fragment>
            }
        `
    }));
}

function disposeScene(scene) {
    const geometries = new Set();
    const materials = new Set();
    const textures = new Set();
    scene.traverse((object) => {
        if (object.isInstancedMesh) object.dispose();
        if (object.geometry) geometries.add(object.geometry);
        for (const material of object.material ? [object.material].flat() : []) {
            materials.add(material);
            for (const value of Object.values(material)) if (value?.isTexture) textures.add(value);
        }
    });
    geometries.forEach((geometry) => geometry.dispose());
    materials.forEach((material) => material.dispose());
    textures.forEach((texture) => texture.dispose());
}

/**
 * One renderer and one clock own both legs of the flight. A cloud bank conceals
 * the change from orbital units to metres; neither camera changes its focal length.
 * Call update with visible elapsed seconds, and stop calling it after touchdown.
 */
export function createPlanetLanding({ renderer, orbitScene, orbitCamera, planetSystem, compact }) {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#a6c7cb');
    scene.fog = new THREE.FogExp2('#a6c7cb', 0.00019);
    const camera = new THREE.PerspectiveCamera(orbitCamera.fov, orbitCamera.aspect, 0.2, 40000);
    scene.add(makeTerrain(renderer, compact), makeRocks(compact), makeSky());

    const water = new THREE.Mesh(new THREE.PlaneGeometry(50000, 50000), new THREE.MeshStandardMaterial({
        color: '#397b8c', roughness: 0.38, metalness: 0.3
    }));
    water.rotation.x = -Math.PI / 2;
    water.position.y = -8;
    scene.add(water);
    scene.add(new THREE.HemisphereLight(0xd3efff, 0x555748, 2));
    const sun = new THREE.DirectionalLight(0xffe3b7, 3.2);
    sun.position.set(-5000, 6500, -8000);
    scene.add(sun);
    const moon = new THREE.Mesh(new THREE.SphereGeometry(560, 32, 24), new THREE.MeshStandardMaterial({
        color: '#b9c8c5', roughness: 1, fog: false
    }));
    moon.position.set(6500, 6600, -19000);
    scene.add(moon);

    const start = orbitCamera.position.clone();
    const startRotation = orbitCamera.quaternion.clone();
    const center = planetSystem.getWorldPosition(new THREE.Vector3());
    const radius = planetSystem.scale.x * 3.5;
    const normal = start.clone().sub(center).normalize();
    const destination = center.clone().addScaledVector(normal, radius * 1.012);
    const facing = new THREE.Matrix4().lookAt(destination, center, new THREE.Vector3(0, 1, 0));
    const endRotation = new THREE.Quaternion().setFromRotationMatrix(facing);
    const target = new THREE.Vector3();
    const orbitNear = orbitCamera.near;
    let elapsed = 0;

    function update(seconds) {
        elapsed = THREE.MathUtils.clamp(seconds, 0, LANDING_DURATION);
        let veil;
        let altitude;
        if (elapsed < ATMOSPHERE_ENTRY) {
            const progress = smooth(elapsed / ATMOSPHERE_ENTRY);
            orbitCamera.position.lerpVectors(start, destination, progress);
            orbitCamera.quaternion.slerpQuaternions(startRotation, endRotation, smooth(elapsed / 5.5));
            orbitCamera.near = 0.005;
            orbitCamera.updateProjectionMatrix();
            renderer.render(orbitScene, orbitCamera);
            veil = smooth((elapsed - 5.5) / 3.5);
        } else {
            const progress = (elapsed - ATMOSPHERE_ENTRY) / (LANDING_DURATION - ATMOSPHERE_ENTRY);
            const remaining = 1 - smooth(progress);
            altitude = 1900 * remaining ** 1.7;
            const shake = Math.sin(progress * Math.PI) * remaining;
            camera.position.set(
                -280 * remaining ** 1.8 + Math.sin(elapsed * 1.1) * shake * 0.5,
                terrainHeight(0, 0) + 3.2 + altitude,
                2600 * remaining ** 1.2
            );
            // Keep shoreline depth precision at altitude, then admit nearby rocks on approach.
            camera.near = THREE.MathUtils.clamp(altitude * 0.01, 0.2, 12);
            camera.updateProjectionMatrix();
            target.set(0, 2 + smooth(progress) * 2, -1100 + smooth(progress) * 700);
            camera.lookAt(target);
            camera.rotateZ(Math.sin(elapsed * 0.75) * shake * 0.006);
            renderer.render(scene, camera);
            veil = 1 - smooth((elapsed - ATMOSPHERE_ENTRY) / 3.5);
        }
        return { veil, complete: elapsed === LANDING_DURATION };
    }

    return {
        update,
        resize(width, height) {
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        },
        dispose() {
            orbitCamera.near = orbitNear;
            orbitCamera.updateProjectionMatrix();
            disposeScene(scene);
        }
    };
}
