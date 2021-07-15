function common() {
    var scene = new THREE.Scene();

    var renderer = new THREE.WebGLRenderer();

    renderer.setClearColor(new THREE.Color("#ee5227"));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;

    var paneGeometry = new THREE.PlaneGeometry(100, 60);
    var planeMaterial = new THREE.MeshLambertMaterial({color: "#9c39fb"});
    var plane = new THREE.Mesh(paneGeometry, planeMaterial);
    plane.receiveShadow = true;

    plane.rotation.x = -0.5 * Math.PI;
    plane.position.set(0, 0, 0);
    scene.add(plane);
    var axes = new THREE.AxesHelper(20);
    scene.add(axes);

    return {
        scene: scene,
        renderer: renderer,
        plane: plane,
        camera: new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000)
    }
}
