import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShape({ position, geometry, color, speed = 1 }: { 
  position: [number, number, number]; 
  geometry: 'box' | 'sphere' | 'torus'; 
  color: string;
  speed?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.003 * speed;
      meshRef.current.rotation.y += 0.005 * speed;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef} position={position}>
        {geometry === 'box' && <boxGeometry args={[0.8, 0.8, 0.8]} />}
        {geometry === 'sphere' && <sphereGeometry args={[0.5, 32, 32]} />}
        {geometry === 'torus' && <torusKnotGeometry args={[0.4, 0.15, 64, 16]} />}
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.6}
          wireframe
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const count = 200;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 15;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  const pointsRef = useRef<THREE.Points>(null!);
  const geoRef = useRef<THREE.BufferGeometry>(null!);

  useFrame(() => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.0002;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    return geo;
  }, [positions]);

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial size={0.03} color="#3B82F6" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function MouseTracker() {
  const { camera } = useThree();
  
  useFrame((state) => {
    const x = state.pointer.x * 0.3;
    const y = state.pointer.y * 0.3;
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, x, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, y, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

const Scene3D = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 6], fov: 60 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#3B82F6" />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#8B5CF6" />
        
        <FloatingShape position={[-3, 2, -2]} geometry="box" color="#3B82F6" speed={0.8} />
        <FloatingShape position={[3, -1, -1]} geometry="sphere" color="#8B5CF6" speed={1.2} />
        <FloatingShape position={[-1, -2, -3]} geometry="torus" color="#0D9488" speed={0.6} />
        <FloatingShape position={[2, 2, -4]} geometry="box" color="#3B82F6" speed={1} />
        <FloatingShape position={[-2, 0, -2]} geometry="sphere" color="#8B5CF6" speed={0.9} />
        
        <Particles />
        <MouseTracker />
      </Canvas>
    </div>
  );
};

export default Scene3D;
