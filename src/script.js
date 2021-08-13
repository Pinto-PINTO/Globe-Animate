import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'  // The adjust control window
import { PointLight } from 'three'


// Texture Loader [Loads textures properly and fast]
const textureLoader = new THREE.TextureLoader()
const normalTexture = textureLoader.load('/textures/circle-texture.png') // Importing texture to variable

// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects [Body]
const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64) // The parameters are radius, width and height respectively

// Materials [Skin] or [Textures]

const material = new THREE.MeshStandardMaterial() // Add roughness, metalness, etc. to the object
material.roughness = 0.2
material.metalness = 0.7
material.normalMap = normalTexture;  // Applying the imported texture(as Normal Map) in line 9 to the material
material.color = new THREE.Color(0x292929)

// Mesh [Combines body and skin]
const sphere = new THREE.Mesh(geometry,material)
scene.add(sphere)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)


// Light 2

const pointLight2 = new THREE.PointLight(0xff0000, 0.1) // Parameters color and intensity respectively
pointLight2.position.set(-1.86,1,-1.65) // Setting positions of all three x,y,z axis respectively
pointLight2.intensity = 10
scene.add(pointLight2)

const light2 = gui.addFolder('Light 2')  // Creating a gui folder
// Adding gui to change the positioning of the light
light2.add(pointLight2.position, 'x').min(-6).max(6).step(0.01) // [step() = Slider in gui which increments the position by 0.01]
light2.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
light2.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
light2.add(pointLight2, 'intensity').min(0).max(10).step(0.01) // Gui to change the intensity

// Point Light Helper [Comment the gui after finalizing the positioning and colors]
// const pointLightHelper = new THREE.PointLightHelper(pointLight2, 1) // Parameters are light and size of light respectively
// scene.add(pointLightHelper)


// Light 3

const pointLight3 = new THREE.PointLight(0x109cff, 0.1) 
pointLight3.position.set(2.13,-3,-1.98) 
pointLight3.intensity = 10

scene.add(pointLight3)

const light3 = gui.addFolder('Light 3')

light3.add(pointLight3.position, 'x').min(-6).max(6).step(0.01)
light3.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
light3.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
light3.add(pointLight3, 'intensity').min(0).max(10).step(0.01) 

// Controlling color of Light 3 in gui
// 1) Create object with property color
const light3color = {
    color: 0xff0000
}

// 2) Passing the object
light3.addColor(light3color, 'color') // Parameters target object and property respectively
    .onChange(() => {
        pointLight3.color.set(light3color.color)
    })


// const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 1) 
// scene.add(pointLightHelper2)




/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true // Makes the background transparent
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */

// Adding mouse position effects




const clock = new THREE.Clock()

const tick = () =>
{

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .5 * elapsedTime

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()