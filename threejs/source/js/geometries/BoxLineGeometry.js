/**
 * Generated from 'examples/jsm/geometries/BoxLineGeometry.js'
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
	(global = global || self, factory(global.THREE = global.THREE || {}, global.THREE));
}(this, (function (exports, THREE) { 'use strict';

	/**
	 * @author mrdoob / http://mrdoob.com/
	 */

	var BoxLineGeometry = function ( width, height, depth, widthSegments, heightSegments, depthSegments ) {

		THREE.BufferGeometry.call( this );

		width = width || 1;
		height = height || 1;
		depth = depth || 1;

		widthSegments = Math.floor( widthSegments ) || 1;
		heightSegments = Math.floor( heightSegments ) || 1;
		depthSegments = Math.floor( depthSegments ) || 1;

		var widthHalf = width / 2;
		var heightHalf = height / 2;
		var depthHalf = depth / 2;

		var segmentWidth = width / widthSegments;
		var segmentHeight = height / heightSegments;
		var segmentDepth = depth / depthSegments;

		var vertices = [];

		var x = - widthHalf, y = - heightHalf, z = - depthHalf;

		for ( var i = 0; i <= widthSegments; i ++ ) {

			vertices.push( x, - heightHalf, - depthHalf, x, heightHalf, - depthHalf );
			vertices.push( x, heightHalf, - depthHalf, x, heightHalf, depthHalf );
			vertices.push( x, heightHalf, depthHalf, x, - heightHalf, depthHalf );
			vertices.push( x, - heightHalf, depthHalf, x, - heightHalf, - depthHalf );

			x += segmentWidth;

		}

		for ( var i = 0; i <= heightSegments; i ++ ) {

			vertices.push( - widthHalf, y, - depthHalf, widthHalf, y, - depthHalf );
			vertices.push( widthHalf, y, - depthHalf, widthHalf, y, depthHalf );
			vertices.push( widthHalf, y, depthHalf, - widthHalf, y, depthHalf );
			vertices.push( - widthHalf, y, depthHalf, - widthHalf, y, - depthHalf );

			y += segmentHeight;

		}

		for ( var i = 0; i <= depthSegments; i ++ ) {

			vertices.push( - widthHalf, - heightHalf, z, - widthHalf, heightHalf, z );
			vertices.push( - widthHalf, heightHalf, z, widthHalf, heightHalf, z );
			vertices.push( widthHalf, heightHalf, z, widthHalf, - heightHalf, z );
			vertices.push( widthHalf, - heightHalf, z, - widthHalf, - heightHalf, z );

			z += segmentDepth;

		}

		this.setAttribute( 'position', new THREE.Float32BufferAttribute( vertices, 3 ) );

	};

	BoxLineGeometry.prototype = Object.create( THREE.BufferGeometry.prototype );
	BoxLineGeometry.prototype.constructor = BoxLineGeometry;

	exports.BoxLineGeometry = BoxLineGeometry;

})));
