/**
 * Generated from 'examples/jsm/nodes/materials/SpriteNodeMaterial.js'
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('E:\jiangheng90-three.js-r115-master\three.js-r115\examples\jsm\nodes\materials\nodes\SpriteNode.js'), require('E:\jiangheng90-three.js-r115-master\three.js-r115\examples\jsm\nodes\materials\NodeMaterial.js'), require('E:\jiangheng90-three.js-r115-master\three.js-r115\examples\jsm\nodes\core\NodeUtils.js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'E:\jiangheng90-three.js-r115-master\three.js-r115\examples\jsm\nodes\materials\nodes\SpriteNode.js', 'E:\jiangheng90-three.js-r115-master\three.js-r115\examples\jsm\nodes\materials\NodeMaterial.js', 'E:\jiangheng90-three.js-r115-master\three.js-r115\examples\jsm\nodes\core\NodeUtils.js'], factory) :
	(global = global || self, factory(global.THREE = global.THREE || {}, global.THREE, global.THREE, global.THREE));
}(this, (function (exports, SpriteNode_js, NodeMaterial_js, NodeUtils_js) { 'use strict';

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function SpriteNodeMaterial() {

		var node = new SpriteNode_js.SpriteNode();

		NodeMaterial_js.NodeMaterial.call( this, node, node );

		this.type = "SpriteNodeMaterial";

	}

	SpriteNodeMaterial.prototype = Object.create( NodeMaterial_js.NodeMaterial.prototype );
	SpriteNodeMaterial.prototype.constructor = SpriteNodeMaterial;

	NodeUtils_js.NodeUtils.addShortcuts( SpriteNodeMaterial.prototype, 'fragment', [
		'color',
		'alpha',
		'mask',
		'position',
		'spherical'
	] );

	exports.SpriteNodeMaterial = SpriteNodeMaterial;

})));
