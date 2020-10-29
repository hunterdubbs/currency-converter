//Currency Converter
//made by Hunter Dubbs

let conversionRate = 0;

$(document).ready(function(e){
	$('.amountText').prop('disabled', true);
	updateRate(function(){
		updateToAmount();
		$('.amountText').prop('disabled', false);
	});
});

$(document).on('change', '.currencySelect', function(e){
	$('.amountText').prop('disabled', true);
	if(e.target.id === 'fromCurrency'){
		updateRate(function(){
			updateFromAmount();
			$('.amountText').prop('disabled', false);
		});
	}else{
		updateRate(function(){
			updateToAmount();
			$('.amountText').prop('disabled', false);
		});
	}
});

$(document).on('change', '#fromAmount', updateToAmount);
$(document).on('change', '#toAmount', updateFromAmount);


function updateRate(callback){
	$.ajax({
		url: 'https://api.exchangeratesapi.io/latest',
		method: 'GET',
		data: {
			base: $('#fromCurrency').val(),
			symbols: $('#toCurrency').val()
		},
		success: function(response){
			$.each(response.rates, function(k, v){
				conversionRate = v;
			});
	$('#conversionRateDisp').html('1 ' + $('#fromCurrency').val() + ' equals ' + conversionRate + ' ' + $('#toCurrency').val());
			callback();
		}
	});
};

function updateFromAmount(){
	$('#fromAmount').val($('#toAmount').val() / conversionRate);
}

function updateToAmount(){
	$('#toAmount').val($('#fromAmount').val() * conversionRate);
}