import $ from 'jquery';
import validate from 'jquery-validation';
import mask from 'jquery-mask-plugin';
import Form from '../order-form/order-form.js';
import {selectors, classes} from '../index/index.js';


const $btn = $('.products__btn');

const form = new Form();

$btn.on('click', () => {
	form.toggle(true);
});

//function mailTo(self) {
//	const $self = $(self);
//	let href = $self.attr('href');
//
//	let productValue = {
//		name: $self.closest('.products__product').find('.products__text-inside_' + 'name').text(),
//		price: $self.closest('.products__product').find('.products__text-inside_' + 'price').text(),
//		size: $self.closest('.products__product').find('.products__text-inside_' + 'size').text(),
//		img: $self.closest('.products__product').find('.products__photo').attr('src'),
//	};
//
//	let mailto = {
//		address: '300706@inbox.ru',
//		toMailString: function () {
//			return 'mailto:' + this.address + '?'
//		}
//	};
//
//	let params = {
//		data: {
//			subject: 'Новый заказ',
//			body:
//			'<h3>Информация о заказываемом товаре</h3>' +
//			'Название: <b>' + productValue.name + '</b><br/> ' +
//			'Цена: <b>' + productValue.price + '</b><br/>' +
//			'Размер: <b>' + productValue.size + '</b><br/>'+
//			'Количество: <b style="color: red">(Укажите здесь количество заказываемого товара)</b><br/>'+
//			'Детали: <b style="color: red">(Комментарии, особые пожелания)</b><br/>' +
//
//			'<h3>Контактная информация</h3>' +
//			'Имя: <b style="color: red">(Укажите, как к вам обращаться)</b><br/>' +
//			'Номер телефона: <b style="color: red">(Укажите, если вам удобнее общаться по телефону)</b><br/>'
//		},
//		toMailString: function () {
//			let str = decodeURIComponent($.param(this.data));
//			str = str.replace(/\+/g, ' ');
//			return str
//		}
//	};
//
//	$self.attr('href', mailto.toMailString() + params.toMailString());
//}
//
//$.each($orderFormBtn, (i, self) => mailTo(self));
