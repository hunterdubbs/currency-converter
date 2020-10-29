//Currency Converter
//made by Hunter Dubbs

let conversionRate = 0;

//get initial rate
$(document).ready(function(e){
	$('.amountText').prop('disabled', true);
	updateRate(function(){
		updateToAmount();
		$('.amountText').prop('disabled', false);
	});
});

//handle changes to currency type
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

//handle changes to currency amount
$(document).on('change', '#fromAmount', updateToAmount);
$(document).on('change', '#toAmount', updateFromAmount);


function updateRate(callback){
	//prevent looking up a conversion rate to itself
	if($('#fromCurrency').val() !== $('#toCurrency').val()){
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
	}else{
		conversionRate = 1;
		$('#conversionRateDisp').html('1 ' + $('#fromCurrency').val() + ' equals ' + conversionRate + ' ' + $('#toCurrency').val());
		callback();
	}
	
};

function updateFromAmount(){
	$('#fromAmount').val(roundCurrency($('#toAmount').val() / conversionRate));
}

function updateToAmount(){
	$('#toAmount').val(roundCurrency($('#fromAmount').val() * conversionRate));
}

function roundCurrency(x){
	return Math.round(x * 100) / 100;
}