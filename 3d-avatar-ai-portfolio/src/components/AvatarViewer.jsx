import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";

const AvatarViewer = () => {
  const containerRef = useRef(null);
  const mixerRef = useRef(null);
  const canvasCreatedRef = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (canvasCreatedRef.current) {
      console.log("Canvas ya existente. No se creará uno nuevo.");
      return;
    }
    canvasCreatedRef.current = true;

    const loader = new GLTFLoader();
    loader.load(
      "/avatar.glb",
      (gltf) => {
        setupScene(gltf);
        console.log("Modelo cargado");
        setIsLoading(false);
      },
      (xhr) => {
        const percentCompletion = Math.round((xhr.loaded / xhr.total) * 100);
        console.log(`Loading model... ${percentCompletion}%`);
      },
      (error) => {
        console.log(error);
      }
    );

    const setupScene = (gltf) => {
      const container = containerRef.current;

      // Configuración del renderer
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
      });

      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      container.appendChild(renderer.domElement);

      // Configuración de la cámara
      const camera = new THREE.PerspectiveCamera(
        45,
        container.clientWidth / container.clientHeight
      );
      camera.position.set(0.2, 0.5, 1);

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.enablePan = false;
      controls.enableZoom = false;
      controls.minDistance = 3;
      controls.minPolarAngle = 1.4;
      controls.maxPolarAngle = 1.4;
      controls.target = new THREE.Vector3(0, 0.75, 0);
      controls.update();

      const scene = new THREE.Scene();
      scene.add(new THREE.AmbientLight());

      const spotlight = new THREE.SpotLight(0xffffff, 20, 8, 1);
      spotlight.penumbra = 0.5;
      spotlight.position.set(0, 4, 2);
      spotlight.castShadow = true;
      scene.add(spotlight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 2);
      keyLight.position.set(1, 1, 2);
      keyLight.lookAt(new THREE.Vector3());
      scene.add(keyLight);

      const avatar = gltf.scene;
      avatar.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
      scene.add(avatar);

      const groundGeometry = new THREE.CylinderGeometry(0.6, 0.6, 0.1, 64);
      const groundMaterial = new THREE.MeshStandardMaterial();
      const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
      //add ed1b76 color to the ground mesh
      groundMaterial.color.setHex(0xed1b76);
      groundMesh.castShadow = false;
      groundMesh.receiveShadow = true;
      groundMesh.position.y -= 0.05;
      scene.add(groundMesh);

      const mixer = new THREE.AnimationMixer(avatar);
      mixerRef.current = mixer;
      const clips = gltf.animations;

      const waveClip = THREE.AnimationClip.findByName(clips, "waving");
      const stumbleClip = THREE.AnimationClip.findByName(clips, "hit");
      const waveAction = mixer.clipAction(waveClip);
      const stumbleAction = mixer.clipAction(stumbleClip);

      waveAction.play();

      let isStumbling = false;
      const raycaster = new THREE.Raycaster();

      container.addEventListener("mousedown", (ev) => {
        const coords = {
          x: (ev.offsetX / container.clientWidth) * 2 - 1,
          y: -(ev.offsetY / container.clientHeight) * 2 + 1,
        };

        raycaster.setFromCamera(coords, camera);
        const intersections = raycaster.intersectObject(avatar);

        if (intersections.length > 0) {
          if (isStumbling) return;

          isStumbling = true;
          stumbleAction.reset();
          stumbleAction.play();
          waveAction.crossFadeTo(stumbleAction, 0.3);

          setTimeout(() => {
            waveAction.reset();
            waveAction.play();
            stumbleAction.crossFadeTo(waveAction, 1);
            setTimeout(() => (isStumbling = false), 1000);
          }, 1200);
        }
      });

      window.addEventListener("resize", () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      });

      const clock = new THREE.Clock();
      const animate = () => {
        requestAnimationFrame(animate);
        mixer.update(clock.getDelta());
        renderer.render(scene, camera);
      };

      animate();
    };

    return () => {
      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
      }
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: "auto", marginTop: "-150px" }}
    >
      <Grid xs={12} sm={6} md={3}>
        <Box
          id="avatar-container"
          sx={{
            position: "relative",
            margin: "0 auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: { xs: "200px", sm: "300px", md: "400px" }, // Ancho responsivo basado en el tamaño de pantalla
            height: { xs: "350px", sm: "400px", md: "600px" }, // Altura responsiva según el tamaño de pantalla
          }}
          ref={containerRef}
        >
          {/* Puedes agregar aquí el contenido del avatar, como una imagen o animación */}
          <div
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "lightblue",
            }}
          >
            {/* Placeholder de avatar */}
          </div>
        </Box>
        {isLoading && (
          <Box sx={{ textAlign: "center", marginTop: "10px" }}>Loading...</Box>
        )}
      </Grid>
    </Grid>
  );
};

export default AvatarViewer;
