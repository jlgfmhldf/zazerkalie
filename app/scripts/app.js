import lightbox from 'lightbox2';
import $ from 'jquery';
import validate from 'jquery-validation';
import mask from 'jquery-mask-plugin';


$(() => {
	'use strict';

	const	$d = $(document);
	const	$body = $('body');
	const	orderForm = 'order-form';
	const	$orderForm = $('.' + orderForm);
	const	$orderFormContent = $orderForm.find('.' + orderForm + '__form');
	const	$orderFormResult = $orderForm.find('.' + orderForm + '__result');
	const	$orderFormClose = $orderForm.find('.' + orderForm + '__close');
	const	$orderFormBtn = $('.products__btn');
	const	orderClass = orderForm + '_active';
	const	$lightbox = $('a[data-lightbox]');
	const	$lightboxOverlay = $('#lightboxOverlay');

	const $input = $('input');

	const	inputs = {
		phone: $input.filter('[name="phone"]'),
		email: $input.filter('[name="email"]')
	};

	const	error = 'error';

	const	fieldMasks = {
		phone: '+7 (999) 999-99-99',
		data: {
			autoclear: false
		}
	};

	const	utils = {
		toggleScroll: function (bool) {
			$body.toggleClass('body_ovh', bool);
		},
		highlight: function (toggle, el, errorClass) {
			var $el = $(el),
				$error = $el.next('.error');

			$el.toggleClass(error, toggle);
			$error.toggleClass(error, toggle);
		},
		numberValReduced: function (phone) {
			return phone.replace(/-|_|\s|\(|\)/g, '')
		}
	};

	function showOrderForm(bool) {
		utils.toggleScroll(bool);
		$orderForm.toggleClass(orderClass, bool);
	}

	//$lightbox.on('click', () => {
	//	utils.toggleScroll(true);
	//});
    //
	//$(document).on('click', $lightboxOverlay, () => {
	//	console.log('body 3');
	//	utils.toggleScroll(false);
	//});
    //
	//lightbox.option({
	//	albumLabel: 'Фото %1 из %2'
	//});

	$orderFormBtn.on('click', () => {
		showOrderForm(true);
	});

	$orderFormClose.on('click', () => {
		showOrderForm(false);
	});

	inputs.phone.mask(fieldMasks.phone, fieldMasks.data);

	$.extend($.validator.messages, {
		required: 'Поле обязательное',
		email: 'Неверный формат email',
		validPhone: 'Неверный формат номера телефона',
		validName: 'Допустимо использовать только буквы русского алфавита или латинского алфавита и дефис',
	});

	$.validator.addMethod('validName', function (value, el) {
		return this.optional(el) || /^[а-яА-ЯЁё\s\-]+$/i.test(value)
	});

	$.validator.addMethod('validPhone', function (value, el, options) {
		return this.optional(el) || /^.{12,}/.test(options.value())
	});


	$orderFormContent.validate({
		rules: {
			'email': {
				email: true,
				required: true
			},
			'phone': {
				required: true,
				validPhone: {
					value: function () {
						return utils.numberValReduced(inputs.phone.val());
					}
				}
			},
			'name': {
				required: true
			}
		},
		highlight: utils.highlight.bind(utils, true),
		unhighlight: utils.highlight.bind(utils, false),
		onkeyup: false,
		submitHandler: function (form) {
			$d.on('submit', '.order-form__form', function(e){
				//отменяем стандартное действие при отправке формы
				//e.preventDefault();
				//берем из формы метод передачи данных
				let self = $(this);
				let method = self.attr('method');
				//получаем адрес скрипта на сервере, куда нужно отправить форму
				let action = self.attr('action');
				//получаем данные, введенные пользователем в формате input1=value1&input2=value2...,
				//то есть в стандартном формате передачи данных формы
				let data = self.serialize();

				$.ajax({
					type: method,
					url: action,
					data: data,
					resetForm: 'true',
					success: function(result){
						console.log('done');
						var data = $(result).find(".overlay").html();
						$(".overlay").html(data);
					}
				});
			});
		},
		errorPlacement: function (error, el) {
			console.log('error');
		}
	})
});
