function createSceneTuto(engine) {
    //Creation of the scene
    var canvas = document.getElementById("renderCanvas");
    var scene = new BABYLON.Scene(engine);

    var light = new BABYLON.PointLight("Omni", new BABYLON.Vector3(10, 50, 50), scene);
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 1.2, 30, new BABYLON.Vector3(-10,10,0), scene);

    // Define Skybox
    var skybox = BABYLON.Mesh.CreateBox("skyBox", 100.0, scene);
    var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", scene);
    skyboxMaterial.backFaceCulling = false;
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("images/skybox/skybox", scene);
    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
    skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    skybox.material = skyboxMaterial;

    // Define main ground - with height map
    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "images/heightMap.png", 100, 100, 100, 0, 10, scene, false);
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("images/ground.jpg", scene);
    groundMaterial.diffuseTexture.uScale = 6;
    groundMaterial.diffuseTexture.vScale = 6;
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    ground.position.y = -2.0;
    ground.material = groundMaterial;


    // Define extra ground to cover entire viewport
    var extraGround = BABYLON.Mesh.CreateGround("extraGround", 1000, 1000, 1, scene, false);
    var extraGroundMaterial = new BABYLON.StandardMaterial("extraGround", scene);
    extraGroundMaterial.diffuseTexture = new BABYLON.Texture("images/ground.jpg", scene);
    extraGroundMaterial.diffuseTexture.uScale = 60;
    extraGroundMaterial.diffuseTexture.vScale = 60;
    extraGround.position.y = -2.05;
    extraGround.material = extraGroundMaterial;

    // Water - covers entire viewport
    // WaterMaterial object defined in waterMaterial.js
    BABYLON.Engine.ShadersRepository = "";
    var water = BABYLON.Mesh.CreateGround("water", 1000, 1000, 1, scene, false);
    var waterMaterial = new WaterMaterial("water", scene, light);

    waterMaterial.refractionTexture.renderList.push(extraGround);
    waterMaterial.refractionTexture.renderList.push(ground);
    waterMaterial.reflectionTexture.renderList.push(skybox);

    water.material = waterMaterial;

    return scene;
}
