/**
 * Generated from 'examples/jsm/nodes/materials/StandardNodeMaterial.js'
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('E:\jiangheng90-three.js-r115-master\three.js-r115\examples\jsm\nodes\materials\nodes\StandardNode.js'), require('E:\jiangheng90-three.js-r115-master\three.js-r115\examples\jsm\nodes\materials\NodeMaterial.js'), require('E:\jiangheng90-three.js-r115-master\three.js-r115\examples\jsm\nodes\core\NodeUtils.js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'E:\jiangheng90-three.js-r115-master\three.js-r115\examples\jsm\nodes\materials\nodes\StandardNode.js', 'E:\jiangheng90-three.js-r115-master\three.js-r115\examples\jsm\nodes\materials\NodeMaterial.js', 'E:\jiangheng90-three.js-r115-master\three.js-r115\examples\jsm\nodes\core\NodeUtils.js'], factory) :
	(global = global || self, factory(global.THREE = global.THREE || {}, global.THREE, global.THREE, global.THREE));
}(this, (function (exports, StandardNode_js, NodeMaterial_js, NodeUtils_js) { 'use strict';

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function StandardNodeMaterial() {

		var node = new StandardNode_js.StandardNode();

		NodeMaterial_js.NodeMaterial.call( this, node, node );

		this.type = "StandardNodeMaterial";

	}

	StandardNodeMaterial.prototype = Object.create( NodeMaterial_js.NodeMaterial.prototype );
	StandardNodeMaterial.prototype.constructor = StandardNodeMaterial;

	NodeUtils_js.NodeUtils.addShortcuts( StandardNodeMaterial.prototype, 'fragment', [
		'color',
		'alpha',
		'roughness',
		'metalness',
		'reflectivity',
		'clearcoat',
		'clearcoatRoughness',
		'clearcoatNormal',
		'normal',
		'emissive',
		'ambient',
		'light',
		'shadow',
		'ao',
		'environment',
		'mask',
		'position',
		'sheen'
	] );

	exports.StandardNodeMaterial = StandardNodeMaterial;

})));
