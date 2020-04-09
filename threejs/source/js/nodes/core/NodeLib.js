/**
 * Generated from 'examples/jsm/nodes/core/NodeLib.js'
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = global || self, factory(global.THREE = global.THREE || {}));
}(this, (function (exports) { 'use strict';

	/**
	 * @author sunag / http://www.sunag.com.br/
	 */

	var NodeLib = {

		nodes: {},
		keywords: {},

		add: function ( node ) {

			this.nodes[ node.name ] = node;

		},

		addKeyword: function ( name, callback, cache ) {

			cache = cache !== undefined ? cache : true;

			this.keywords[ name ] = { callback: callback, cache: cache };

		},

		remove: function ( node ) {

			delete this.nodes[ node.name ];

		},

		removeKeyword: function ( name ) {

			delete this.keywords[ name ];

		},

		get: function ( name ) {

			return this.nodes[ name ];

		},

		getKeyword: function ( name, builder ) {

			return this.keywords[ name ].callback.call( this, builder );

		},

		getKeywordData: function ( name ) {

			return this.keywords[ name ];

		},

		contains: function ( name ) {

			return this.nodes[ name ] !== undefined;

		},

		containsKeyword: function ( name ) {

			return this.keywords[ name ] !== undefined;

		}

	};

	exports.NodeLib = NodeLib;

})));