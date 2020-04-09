/**
 * Generated from 'examples/jsm/nodes/materials/MeshStandardNodeMaterial.js'
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('E:\jiangheng90-three.js-r115-master\three.js-r115\examples\jsm\nodes\materials\nodes\MeshStandardNode.js'), require('E:\jiangheng90-three.js-r115-master\three.js-r115\examples\jsm\nodes\materials\NodeMaterial.js'), require('E:\jiangheng90-three.js-r115-master\three.js-r115\examples\jsm\nodes\core\NodeUtils.js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'E:\jiangheng90-three.js-r115-master\three.js-r115\examples\jsm\nodes\materials\nodes\MeshStandardNode.js', 'E:\jiangheng90-three.js-r115-master\three.js-r115\examples\jsm\nodes\materials\NodeMaterial.js', 'E:\jiangheng90-three.js-r115-master\three.js-r115\examples\jsm\nodes\core\NodeUtils.js'], factory) :
	(global = global || self, factory(global.THREE = global.THREE || {}, global.THREE, global.THREE, global.THREE));
}(this, (function (exports, MeshStandardNode_js, NodeMaterial_js, NodeUtils_js) { 'use strict';

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function MeshStandardNodeMaterial() {

		var node = new MeshStandardNode_js.MeshStandardNode();

		NodeMaterial_js.NodeMaterial.call( this, node, node );

		this.type = "MeshStandardNodeMaterial";

	}

	MeshStandardNodeMaterial.prototype = Object.create( NodeMaterial_js.NodeMaterial.prototype );
	MeshStandardNodeMaterial.prototype.constructor = MeshStandardNodeMaterial;

	NodeUtils_js.NodeUtils.addShortcuts( MeshStandardNodeMaterial.prototype, 'properties', [
		"color",
		"roughness",
		"metalness",
		"map",
		"normalMap",
		"normalScale",
		"metalnessMap",
		"roughnessMap",
		"envMap"
	] );

	exports.MeshStandardNodeMaterial = MeshStandardNodeMaterial;

})));
