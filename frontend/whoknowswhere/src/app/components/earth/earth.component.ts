import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';

var THREE = require('three');
var OBJLoader = require('three-obj-loader');
OBJLoader(THREE);
var OrbitControls = require('three-orbit-controls')(THREE);

@Component({
  selector: 'div [app-earth]',
  templateUrl: './earth.component.html',
  styleUrls: ['./earth.component.css']
})
export class EarthComponent implements OnInit {

  @ViewChild('rendererContainer', {static: false}) rendererContainer: ElementRef;

  public animationFrame = null;

  renderer = new THREE.WebGLRenderer();
  scene = null;
  camera = null;
  mesh = null;
  objLoader = null;
  earthMaterial = null;
  earth = null;
  atmosphere = null;
  clouds = null;
  controls = null;

  customMaterial = null;
  atmosphereMesh = null;
  directionalLight = null;
  x = 0;


  vertexShader = `
  uniform vec3 viewVector;
  uniform float c;
  uniform float p;
  varying float intensity;
  void main() 
  {
      vec3 vNormal = normalize( normalMatrix * normal );
      vec3 vNormel = normalize( normalMatrix * viewVector );
      intensity = pow( c - dot(vNormal, vNormel), p );
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
  `;

  fragmentShader = `
  uniform vec3 glowColor;
  varying float intensity;
  void main() 
  {
      vec3 glow = glowColor * intensity;
      gl_FragColor = vec4( glow, 1.0 );
  }
  `;


  cloudsVertexShader = `
  varying vec2 vUv; 
  void main()
  {
      vUv = uv;

      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0 );
      gl_Position = projectionMatrix * mvPosition;
  }
  `;

  cloudsFragmentShader = `
  uniform sampler2D iChannel0;
        
  varying vec2 vUv;  
  varying vec4 vColor;
  void main() {
      vec2 uv = vUv;
      vec4 tex1 = texture2D( iChannel0,  vec2(uv.x, uv.y));
      gl_FragColor = vec4(tex1.r,tex1.g,tex1.b,tex1.a * 0.8);
  }
  `;




  constructor() { 

    var that = this;
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.z = 180;
    this.scene.add(this.camera);
    this.objLoader = new THREE.OBJLoader();
    let textureLoader = new THREE.TextureLoader();

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = .1;
    this.controls.enablePan = false;
    this.controls.maxDistance = 340;
    this.controls.minDistance = 100;
    this.controls.autoRotate = false;
    this.controls.autoRotateSpeed = .02;
    this.controls.autoRotate = true;
    this.controls.rotateSpeed = .07;

    this.earthMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFFFF, emissive: 0xFFFFFF, wireframe: false, metalness: 0.0 });

    this.earthMaterial.map = textureLoader.load("assets/textures/earth_daymap.jpg");
    this.earthMaterial.emissiveMap = textureLoader.load("assets/textures/earth_night_emition.png");
    this.earthMaterial.normalMap = textureLoader.load("assets/textures/earth_normal.png");
    this.earthMaterial.bumpScale = 0;
    this.earthMaterial.roughnessMap = textureLoader.load("assets/textures/earth_routhness2.png");
    this.earthMaterial.roughness = 0;


    this.customMaterial = new THREE.ShaderMaterial({
      uniforms: 
      { 
        "c":   { type: "f", value: .5 },
        "p":   { type: "f", value: 6 },
        glowColor: { type: "c", value: new THREE.Color(0x6be4ff) },
        viewVector: { type: "v3", value: that.camera.position }
      },
      vertexShader:   that.vertexShader,
      fragmentShader: that.fragmentShader,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true
    });

    var _uniforms = {
      iGlobalTime:    { type: 'f', value: 0.1 },
      iChannel0:  { type: 't', value: textureLoader.load( 'assets/textures/EarthClouds_Mask_transparent.png') },
    };
    var newMaterial = new THREE.ShaderMaterial( {
      uniforms: _uniforms,
      vertexShader: this.cloudsVertexShader,
      fragmentShader: this.cloudsFragmentShader,
      transparent: true
    } );
    

    this.objLoader.load(
      'assets/models/earth6m.obj', function ( object ) {
        object.material = that.earthMaterial;
        object.traverse( function ( child ) {
          if ( child instanceof THREE.Mesh ) {
              child.material = that.earthMaterial;
              that.scene.add( object );
        that.earth = object;
          }
        });
    });

    this.objLoader.load(
      'assets/models/earth6m.obj', function ( object ) {
        object.material = newMaterial;
        object.traverse( function ( child ) {
          if ( child instanceof THREE.Mesh ) {
              child.material = newMaterial;
          }
        });

        that.scene.add( object );
              
        that.clouds = object;
        that.clouds.scale.multiplyScalar(1.0005);
    });

    this.objLoader.load(
      'assets/models/earth6m.obj', function ( object ) {
      object.traverse( function ( child ) {
        if ( child instanceof THREE.Mesh ) {
            child.material = that.customMaterial;
            that.atmosphereMesh = child;
        }
      });
      that.atmosphere = object;
      that.atmosphere.scale.multiplyScalar(1.25);
      that.scene.add( that.atmosphere );
    });

    this.directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    this.directionalLight.position.set(0, 0, -1);
    this.scene.add( this.directionalLight );

    this.controls.update();
  }

  ngOnInit() {
    
  }

  ngOnDestroy() {
    this.earth = null;
  }

  ngAfterViewInit() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
    this.animate();
  }

  animate() {
    this.animationFrame = window.requestAnimationFrame(() => this.animate());
    if (this.earth == null) return; //|| this.atmosphere == null) return;
    this.controls.update();

    let vector = new THREE.Vector3().subVectors(this.camera.position, this.atmosphere.position );
    this.customMaterial.uniforms.viewVector.value = vector;
    
    this.clouds.rotation.y -= 0.0001;

    this.renderer.render(this.scene, this.camera);
    
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(event.target.innerWidth, event.target.innerHeight);
  }

}
