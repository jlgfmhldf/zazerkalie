import $ from 'jquery';
import validate from 'jquery-validation';
import mask from 'jquery-mask-plugin';
import {selectors, classes} from '../index/index.js';


const formCls = 'order-form';
const formClsActive = 'order-form_active';
const $form = $('.' + formCls);
const $input = $('input');


//const formActiveClass: 'order-form_active'

const dom = {
	$content: $form.find('.' + formCls + '__form'),
	$result: $form.find('.' + formCls + '__result'),
	$close: $form.find('.' + formCls + '__close'),
	$btn: $form.find('.' + formCls + '__btn')
};

const inputs = {
	$name: $input.filter('[name="name"]'),
	$phone: $input.filter('[name="phone"]'),
	$email: $input.filter('[name="email"]'),
	$message: $('textarea').filter('[name="message"]'),
	$file: $input.filter('[name="file"]')
};

const	fieldMasks = {
	phone: '+7 (999) 999-99-99',
	data: {
		autoclear: false
	}
};

const utils = {
	toggleScroll: function (bool) {
		selectors.$body.toggleClass('body_ovh', bool);
	},
	highlight: function (toggle, el, errorClass) {

		var $el = $(el),
			$error = $el.next('.error');

		$el.toggleClass(classes.error, toggle);
		$error.toggleClass(classes.error, toggle);
	},
	clearErrors: function (form) {
		const $form = $(form);
		const $input = $form.find('input');
		const $inputErr = $input.filter('[class="error"]');
		const $label = $form.find('label.error');

		$input.val('');
		$inputErr.removeClass(classes.error);
		$label.remove();
	},
	numberValReduced: function (phone) {
		return phone.replace(/-|_|\s|\(|\)/g, '')
	}
};

$.extend($.validator.messages, {
	required: 'Поле обязательное',
	email: 'Неверный формат email',
	validPhone: 'Неверный формат номера телефона',
	validName: 'Допустимо использовать только буквы русского алфавита',
	accept: 'Допустимо добавлять только изображения'
});

$.validator.addMethod('validName', function (value, el) {
	return this.optional(el) || /^[а-яА-ЯЁё\s\-]+$/i.test(value)
});

$.validator.addMethod('validPhone', function (value, el, options) {
	return this.optional(el) || /^.{12,}/.test(options.value())
});

export default class Form {
	clearForm() {
		dom.$content.trigger('reset');
	}

	init() {
		this.clearForm();
		dom.$content.removeClass(classes.hidden);
		dom.$result.addClass(classes.hidden);
	}

	toggle(bool) {
		utils.toggleScroll(bool);
		this.init();
		$form.toggleClass(formClsActive, bool);
	}

	showResult() {
		dom.$content.addClass(classes.hidden);
		dom.$result.removeClass(classes.hidden);
	}
}

let oform = new Form();

dom.$content.validate({
	rules: {
		'email': {
			email: true,
			required: true
		},
		'phone': {
			required: true,
			validPhone: {
				value: function () {
					return utils.numberValReduced(inputs.$phone.val());
				}
			}
		},
		'name': {
			required: true,
			validName: true
		}
	},
	highlight: utils.highlight(true),
	unhighlight: utils.highlight(false),
	submitHandler: function(form) {
		let file = inputs.$file[0].files[0];

		let self = dom.$content;
		let method = self.attr('method');
		let action = self.attr('action');

		let data = new FormData(self);
		let request = new XMLHttpRequest();

		data.append('name', inputs.$name.val());
		data.append('email', inputs.$email.val());
		data.append('phone', inputs.$phone.val());
		data.append('message', inputs.$message.text());
		data.append('formid', self.attr('id'));

		file !== undefined ? data.append('file', file): null;

		request.open(method, action, true);
		request.send(data);

		request.onload = oform.showResult();

	},
	focusCleanup: true,
	focusInvalid: false
});

dom.$close.on('click', () => {
	oform.toggle(false);
});

inputs.$phone.mask(fieldMasks.phone, fieldMasks.data);
