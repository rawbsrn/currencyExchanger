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

function getElements(response, value) {
  if (response.result === 'success') {
    let worth = response.conversion_rate;
    worth = worth * value;
    $('.showCurrency').append(`The conversion between ${response.base_code} & ${response.target_code} is ${response.conversion_rate}. You have ${worth} ${response.target_code}.`);
  } else {
    $('.showErrors').text(`There was an error: ${response}. You probably got here by entering a nonexistent currency, good job.`);
  }
}


async function makeApiCall(code1, code2,value) {
  const response = await CurrencyService.getCurrency(code1, code2);
  getElements(response,value);
}

$(document).ready(function() {
  $('#currencyConversion').click(function() {
    let code1 = $('#currency1').val()||"USD";
    let code2 = $('#currency2').val()||"ZWL";
    let value = $('#value').val();
    clearFields();
    makeApiCall(code1,code2,value);
  });
});