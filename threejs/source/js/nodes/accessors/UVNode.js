/**
 * Generated from 'examples/jsm/nodes/accessors/UVNode.js'
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('E:\jiangheng90-three.js-r115-master\three.js-r115\examples\jsm\nodes\core\TempNode.js'), require('E:\jiangheng90-three.js-r115-master\three.js-r115\examples\jsm\nodes\core\NodeLib.js')) :
	typeof define === 'function' && define.amd ? define(['exports', 'E:\jiangheng90-three.js-r115-master\three.js-r115\examples\jsm\nodes\core\TempNode.js', 'E:\jiangheng90-three.js-r115-master\three.js-r115\examples\jsm\nodes\core\NodeLib.js'], factory) :
	(global = global || self, factory(global.THREE = global.THREE || {}, global.THREE, global.THREE));
}(this, (function (exports, TempNode_js, NodeLib_js) { 'use strict';

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	function UVNode( index ) {

		TempNode_js.TempNode.call( this, 'v2', { shared: false } );

		this.index = index || 0;

	}

	UVNode.prototype = Object.create( TempNode_js.TempNode.prototype );
	UVNode.prototype.constructor = UVNode;
	UVNode.prototype.nodeType = "UV";

	UVNode.prototype.generate = function ( builder, output ) {

		builder.requires.uv[ this.index ] = true;

		var uvIndex = this.index > 0 ? this.index + 1 : '';
		var result = builder.isShader( 'vertex' ) ? 'uv' + uvIndex : 'vUv' + uvIndex;

		return builder.format( result, this.getType( builder ), output );

	};

	UVNode.prototype.copy = function ( source ) {

		TempNode_js.TempNode.prototype.copy.call( this, source );

		this.index = source.index;

		return this;

	};

	UVNode.prototype.toJSON = function ( meta ) {

		var data = this.getJSONNode( meta );

		if ( ! data ) {

			data = this.createJSONNode( meta );

			data.index = this.index;

		}

		return data;

	};

	NodeLib_js.NodeLib.addKeyword( 'uv', function () {

		return new UVNode();

	} );

	NodeLib_js.NodeLib.addKeyword( 'uv2', function () {

		return new UVNode( 1 );

	} );

	exports.UVNode = UVNode;

})));
