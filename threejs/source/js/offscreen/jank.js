/**
 * Generated from 'examples/jsm/offscreen/jank.js'
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.THREE = factory());
}(this, (function () { 'use strict';

	var interval = null;
	var result = null;

	function initJank() {

		var button = document.getElementById( 'button' );
		button.addEventListener( 'click', function () {

			if ( interval === null ) {

				interval = setInterval( jank, 1000 / 60 );

				button.textContent = 'STOP JANK';

			} else {

				clearInterval( interval );
				interval = null;

				button.textContent = 'START JANK';
				result.textContent = '';

			}

		} );

		result = document.getElementById( 'result' );

	}

	function jank() {

		var number = 0;

		for ( var i = 0; i < 10000000; i ++ ) {

			number += Math.random();

		}

		result.textContent = number;

	}

	return initJank;

})));
