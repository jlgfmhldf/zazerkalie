import lightbox from 'lightbox2';
import $ from 'jquery';

$(() => {
	"use strict";

	lightbox.option({
		albumLabel: "Фото %1 из %2"
	});
});
