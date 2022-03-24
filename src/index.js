import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import CurrencyService from './currency-service.js';

function clearFields() {
  $('#currency1').val("");
  $('#currency2').val("");
  $('.showErrors').text("");
  $('.showCurrency').text("");
}

function getElements(response) {
  if (response.result === 'success') {
    $('.showCurrency').text(`The conversion between ${response.base_code} & ${response.target_code} is ${response.conversion_rate}.`);
  } else {
    console.log(response)
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
    let code2 = $('#currency2').val();
    clearFields();
    makeApiCall(code1,code2);
  });
});