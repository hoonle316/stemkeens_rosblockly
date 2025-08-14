(function() {
  window.App = window.App || {};

  App.axes = true;
  App.ground = false;
  App.clock = new THREE.Clock();

  // Three.js 장면을 채우는 함수
  App.initializeScene = function() {
      var ambientLight, dirLight, light, light2;
      window.scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x808080, 2000, 4000);

      ambientLight = new THREE.AmbientLight(0x222222);
      light = new THREE.DirectionalLight(0xffffff, 0.7);
      light.position.set(200, -400, 500);

      light2 = new THREE.DirectionalLight(0xffffff, 1.0);
      light2.position.set(73, 184, 184);

      dirLight = new THREE.DirectionalLight(0xffffff, 1);
      dirLight.color.setHSL(0.1, 1, 0.95);
      dirLight.position.set(0, 40, 0).multiplyScalar(50);

      scene.add(dirLight);
      scene.add(ambientLight);
      scene.add(light);
      scene.add(light2);

      // XY 평면에 그리드 추가
      const gridHelper = new THREE.GridHelper(10, 10);
      gridHelper.rotation.x = Math.PI / 2;
      scene.add(gridHelper);

      if (App.ground) {
          Coordinates.drawGround({ size: 10000 });
      }

      // 재질 설정
      window.robotBaseMaterial = new THREE.MeshPhongMaterial({
          color: 0x6E23BB,
          specular: 0x6E23BB,
          shininess: 20
      });

      window.robotForearmMaterial = new THREE.MeshPhongMaterial({
          color: 0xF4C154,
          specular: 0xF4C154,
          shininess: 100
      });

      window.robotUpperArmMaterial = new THREE.MeshPhongMaterial({
          color: 0x95E4FB,
          specular: 0x95E4FB,
          shininess: 100
      });
  };

  // 초기화 함수
  App.init = function() {
      const container = document.getElementById('container');
      if (!container) {
          console.error("Element with ID 'container' not found.");
          return;
      }

      const canvasWidth = window.innerWidth;
      const canvasHeight = window.innerHeight;
      const canvasRatio = canvasWidth / canvasHeight;

      window.renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.outputEncoding = THREE.sRGBEncoding;
      renderer.setSize(canvasWidth, canvasHeight);
      renderer.setClearColor(new THREE.Color(0xAAAAAA), 1.0);

      container.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(30, canvasRatio, 1, 10000);
      camera.position.set(2.5, 2, 4);
      camera.up = new THREE.Vector3(0, 0, 1);

      App.camera = camera;
      App.cameraControls = new THREE.TrackballControls(camera, renderer.domElement);
      App.cameraControls.rotateSpeed = 4;
      App.cameraControls.target.set(0, 0, 0);

      App.initializeScene(); // 장면 초기화 호출
  };

  $(document).ready(App.init);
})();
