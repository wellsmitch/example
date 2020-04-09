/**
 * Generated from 'examples/jsm/nodes/materials/PhongNodeMaterial.js'
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('E:\jiangheng90-three.js-r115-master\three.js-r115\examples\jsm\nodes\materials\nodes\PhongNode.js'), require('E:\jiangheng90-three.js-r115-master\three.js-r115\examples\jsm\nodes\materials\NodeMaterial.js'), require('E:\jiangheng90-three.js-r115-master\three.js-r115\examples\jsm\nodes\core\NodeUtils.js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'E:\jiangheng90-three.js-r115-master\three.js-r115\examples\jsm\nodes\materials\nodes\PhongNode.js', 'E:\jiangheng90-three.js-r115-master\three.js-r115\examples\jsm\nodes\materials\NodeMaterial.js', 'E:\jiangheng90-three.js-r115-master\three.js-r115\examples\jsm\nodes\core\NodeUtils.js'], factory) :
	(global = global || self, factory(global.THREE = global.THREE || {}, global.THREE, global.THREE, global.THREE));
}(this, (function (exports, PhongNode_js, NodeMaterial_js, NodeUtils_js) { 'use strict';

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function PhongNodeMaterial() {

		var node = new PhongNode_js.PhongNode();

		NodeMaterial_js.NodeMaterial.call( this, node, node );

		this.type = "PhongNodeMaterial";

	}

	PhongNodeMaterial.prototype = Object.create( NodeMaterial_js.NodeMaterial.prototype );
	PhongNodeMaterial.prototype.constructor = PhongNodeMaterial;

	NodeUtils_js.NodeUtils.addShortcuts( PhongNodeMaterial.prototype, 'fragment', [
		'color',
		'alpha',
		'specular',
		'shininess',
		'normal',
		'emissive',
		'ambient',
		'light',
		'shadow',
		'ao',
		'environment',
		'environmentAlpha',
		'mask',
		'position'
	] );

	exports.PhongNodeMaterial = PhongNodeMaterial;

})));
