import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './currency-service.js';

function clearFields() {
  $('#currency1').val("");
  $('.showErrors').text("");
  $('.showCurrency').text("");
}

function getElements(response) {
  if (response.result === 'success') {
    $('.showCurrency').text(`The conversion between ${response.base_code} & ${response.target_code} is ${response.conversion_rate}.`);
  } else {
    $('.showErrors').text(`There was an error: ${response}`);
  }
}

async function makeApiCall(code1, code2) {
  const response = await CurrencyService.getCurrency(code1, code2);
  getElements(response);
}

$(document).ready(function() {
  $('#currencyConversion').click(function() {
    let code1 = $('#currency1').val();
    const code2 = 'USD';
    clearFields();
    makeApiCall(code1,code2);
  });
});