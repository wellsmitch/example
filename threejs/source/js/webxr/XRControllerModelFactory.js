/**
 * Generated from 'examples/jsm/webxr/XRControllerModelFactory.js'
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three'), require('E:\jiangheng90-three.js-r115-master\three.js-r115\examples\jsm\loaders\GLTFLoader.js'), require('E:\jiangheng90-three.js-r115-master\three.js-r115\examples\jsm\libs\motion-controllers.module.js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three', 'E:\jiangheng90-three.js-r115-master\three.js-r115\examples\jsm\loaders\GLTFLoader.js', 'E:\jiangheng90-three.js-r115-master\three.js-r115\examples\jsm\libs\motion-controllers.module.js'], factory) :
	(global = global || self, factory(global.THREE = global.THREE || {}, global.THREE, global.THREE, global.THREE));
}(this, (function (exports, THREE, GLTFLoader_js, motionControllers_module_js) { 'use strict';

	/**
	 * @author Nell Waliczek / https://github.com/NellWaliczek
	 * @author Brandon Jones / https://github.com/toji
	 */

	const DEFAULT_PROFILES_PATH = 'https://cdn.jsdelivr.net/npm/@webxr-input-profiles/assets@1.0/dist/profiles';
	const DEFAULT_PROFILE = 'generic-trigger';

	function XRControllerModel( ) {

		THREE.Object3D.call( this );

		this.motionController = null;
		this.envMap = null;

	}

	XRControllerModel.prototype = Object.assign( Object.create( THREE.Object3D.prototype ), {

		constructor: XRControllerModel,

		setEnvironmentMap: function ( envMap ) {

			if ( this.envMap == envMap ) {

				return this;

			}

			this.envMap = envMap;
			this.traverse( ( child ) => {

				if ( child.isMesh ) {

					child.material.envMap = this.envMap;
					child.material.needsUpdate = true;

				}

			} );

			return this;

		},

		/**
		 * Polls data from the XRInputSource and updates the model's components to match
		 * the real world data
		 */
		updateMatrixWorld: function ( force ) {

			THREE.Object3D.prototype.updateMatrixWorld.call( this, force );

			if ( ! this.motionController ) return;

			// Cause the MotionController to poll the Gamepad for data
			this.motionController.updateFromGamepad();

			// Update the 3D model to reflect the button, thumbstick, and touchpad state
			Object.values( this.motionController.components ).forEach( ( component ) => {

				// Update node data based on the visual responses' current states
				Object.values( component.visualResponses ).forEach( ( visualResponse ) => {

					const { valueNode, minNode, maxNode, value, valueNodeProperty } = visualResponse;

					// Skip if the visual response node is not found. No error is needed,
					// because it will have been reported at load time.
					if ( ! valueNode ) return;

					// Calculate the new properties based on the weight supplied
					if ( valueNodeProperty === motionControllers_module_js.Constants.VisualResponseProperty.VISIBILITY ) {

						valueNode.visible = value;

					} else if ( valueNodeProperty === motionControllers_module_js.Constants.VisualResponseProperty.TRANSFORM ) {

						THREE.Quaternion.slerp(
							minNode.quaternion,
							maxNode.quaternion,
							valueNode.quaternion,
							value
						);

						valueNode.position.lerpVectors(
							minNode.position,
							maxNode.position,
							value
						);

					}

				} );

			} );

		}

	} );

	/**
	 * Walks the model's tree to find the nodes needed to animate the components and
	 * saves them to the motionContoller components for use in the frame loop. When
	 * touchpads are found, attaches a touch dot to them.
	 */
	function findNodes( motionController, scene ) {

		// Loop through the components and find the nodes needed for each components' visual responses
		Object.values( motionController.components ).forEach( ( component ) => {

			const { type, touchPointNodeName, visualResponses } = component;

			if ( type === motionControllers_module_js.Constants.ComponentType.TOUCHPAD ) {

				component.touchPointNode = scene.getObjectByName( touchPointNodeName );
				if ( component.touchPointNode ) {

					// Attach a touch dot to the touchpad.
					const sphereGeometry = new THREE.SphereGeometry( 0.001 );
					const material = new THREE.MeshBasicMaterial( { color: 0x0000FF } );
					const sphere = new THREE.Mesh( sphereGeometry, material );
					component.touchPointNode.add( sphere );

				} else {

					console.warn( `Could not find touch dot, ${component.touchPointNodeName}, in touchpad component ${component.id}` );

				}

			}

			// Loop through all the visual responses to be applied to this component
			Object.values( visualResponses ).forEach( ( visualResponse ) => {

				const { valueNodeName, minNodeName, maxNodeName, valueNodeProperty } = visualResponse;

				// If animating a transform, find the two nodes to be interpolated between.
				if ( valueNodeProperty === motionControllers_module_js.Constants.VisualResponseProperty.TRANSFORM ) {

					visualResponse.minNode = scene.getObjectByName( minNodeName );
					visualResponse.maxNode = scene.getObjectByName( maxNodeName );

					// If the extents cannot be found, skip this animation
					if ( ! visualResponse.minNode ) {

						console.warn( `Could not find ${minNodeName} in the model` );
						return;

					}

					if ( ! visualResponse.maxNode ) {

						console.warn( `Could not find ${maxNodeName} in the model` );
						return;

					}

				}

				// If the target node cannot be found, skip this animation
				visualResponse.valueNode = scene.getObjectByName( valueNodeName );
				if ( ! visualResponse.valueNode ) {

					console.warn( `Could not find ${valueNodeName} in the model` );

				}

			} );

		} );

	}

	function addAssetSceneToControllerModel( controllerModel, scene ) {

		// Find the nodes needed for animation and cache them on the motionController.
		findNodes( controllerModel.motionController, scene );

		// Apply any environment map that the mesh already has set.
		if ( controllerModel.envMap ) {

			scene.traverse( ( child ) => {

				if ( child.isMesh ) {

					child.material.envMap = controllerModel.envMap;
					child.material.needsUpdate = true;

				}

			} );

		}

		// Add the glTF scene to the controllerModel.
		controllerModel.add( scene );

	}

	var XRControllerModelFactory = ( function () {

		function XRControllerModelFactory( gltfLoader = null ) {

			this.gltfLoader = gltfLoader;
			this.path = DEFAULT_PROFILES_PATH;
			this._assetCache = {};

			// If a GLTFLoader wasn't supplied to the constructor create a new one.
			if ( ! this.gltfLoader ) {

				this.gltfLoader = new GLTFLoader_js.GLTFLoader();

			}

		}

		XRControllerModelFactory.prototype = {

			constructor: XRControllerModelFactory,

			createControllerModel: function ( controller ) {

				const controllerModel = new XRControllerModel();
				let scene = null;

				controller.addEventListener( 'connected', ( event ) => {

					const xrInputSource = event.data;

					if ( xrInputSource.targetRayMode !== 'tracked-pointer' || ! xrInputSource.gamepad ) return;

					motionControllers_module_js.fetchProfile( xrInputSource, this.path, DEFAULT_PROFILE ).then( ( { profile, assetPath } ) => {

						controllerModel.motionController = new motionControllers_module_js.MotionController(
							xrInputSource,
							profile,
							assetPath
						);

						let cachedAsset = this._assetCache[ controllerModel.motionController.assetUrl ];
						if ( cachedAsset ) {

							scene = cachedAsset.scene.clone();

							addAssetSceneToControllerModel( controllerModel, scene );

						} else {

							if ( ! this.gltfLoader ) {

								throw new Error( `GLTFLoader not set.` );

							}

							this.gltfLoader.setPath( '' );
							this.gltfLoader.load( controllerModel.motionController.assetUrl, ( asset ) => {

								this._assetCache[ controllerModel.motionController.assetUrl ] = asset;

								scene = asset.scene.clone();

								addAssetSceneToControllerModel( controllerModel, scene );

							},
							null,
							() => {

								throw new Error( `Asset ${controllerModel.motionController.assetUrl} missing or malformed.` );

							} );

						}

					} ).catch( ( err ) => {

						console.warn( err );

					} );

				} );

				controller.addEventListener( 'disconnected', () => {

					controllerModel.motionController = null;
					controllerModel.remove( scene );
					scene = null;

				} );

				return controllerModel;

			}

		};

		return XRControllerModelFactory;

	} )();

	exports.XRControllerModelFactory = XRControllerModelFactory;

})));
