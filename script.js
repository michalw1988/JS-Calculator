// initial screen values
var display1 = '0';
var display2 = '0';


$(document).ready(function () {

	// show initial screen values
	$('#display1').html(display1);
	$('#display2').html(display2);
	
	
	// pressing 'AC'
	$('#bac').on('click', function(){
		display1 = '0';
		$('#display1').html(display1);
		display2 = '0';
		$('#display2').html(display2);
	});
	
	
	// pressing 'CE'
	$('#bce').on('click', function(){
		display2 = display2.replace(/\+/g, ' + ');
		display2 = display2.replace(/\-/g, ' - ');
		display2 = display2.replace(/x/g, ' x ');
		display2 = display2.replace(/\//g, ' / ');
		display2 = display2.split(' ');
		
		if (display2[display2.length-1] === ''){
			display2.splice(display2.length-2, 2);
		} else {
			display2.splice(display2.length-1, 1);
		}
		
		if (display2.length === 0 || display2[0] === 'Digit') {
			display1 = '0';
			display2 = '0';
		} else {
			display1 = display2[display2.length-1];
			display2 = display2.join('');	
		}
		
		$('#display1').html(display1);
		$('#display2').html(display2);
	});
	
	
	// pressing '+'
	$('#bplus').on('click', function(){
		addSymbol('+');
	});
	
	// pressing '-'
	$('#bminus').on('click', function(){
		addSymbol('-');
	});
	
	// pressing 'x'
	$('#btimes').on('click', function(){
		addSymbol('x');
	});
	
	// pressing '/'
	$('#bdiv').on('click', function(){
		addSymbol('/');
	});
	
	
	// pressing '=' (and solving the equation)
	$('#beq').on('click', function(){
		var equation = display2.replace(/\+/g, ' + ');
		equation = equation.replace(/\-/g, ' - ');
		equation = equation.replace(/x/g, ' x ');
		equation = equation.replace(/\//g, ' / ');
		equation = equation.split(' ');
		
		if (equation[equation.length-1] === ''){
			equation.splice(equation.length-1, 1);
		}
		
		var last = equation[equation.length-1];
		if (equation.length < 3 || last === 'Met' || last === '+' || last === '-' || last === 'x' || last === '/'){
			//console.log('Something wrong');
		} else {
			//console.log(equation);
			
			// replace (a - b) with (a + -b) to solve chained subtraction problems
			for (var i = 1; i < equation.length-1; i++) {
				if(equation[i] === '-') {
					equation[i] = '+';
					equation[i+1] = '-' + equation[i+1];
				}
			}
			//console.log(equation);
			
			// deal with multiplication and division first
			for	(var i = equation.length-2; i > 0; i--) {
				if (equation[i] === 'x') {
					equation[i-1] = Number(equation[i-1]) * Number(equation[i+1]);
					equation.splice(i, 2);
					//console.log(equation);
				} else if (equation[i] === '/') {
					equation[i-1] = Number(equation[i-1]) / Number(equation[i+1]);
					equation[i-1] = Math.round(equation[i-1] * 1000) / 1000;
					equation.splice(i, 2);
					console.log(equation);
				}
			}
			
			// add and subtract what left
			for	(var i = equation.length-2; i > 0; i--) {
				if (equation[i] === '+') {
					equation[i-1] = Number(equation[i-1]) + Number(equation[i+1]);
					equation.splice(i, 2);
					//console.log(equation);
				} else if (equation[i] === '-') {
					equation[i-1] = Number(equation[i-1]) - Number(equation[i+1]);
					equation.splice(i, 2);
					//console.log(equation);
				}
			}
			
			if(equation[0] === Infinity || isNaN(equation[0])) {
				equation[0] = 'Error';
			}
			
			display1 = equation[0];
			display2 += '=' + equation[0];
			
			if (display1.length > 10 || display2.length > 20) {
				display1 = '0';
				display2 = 'Digit Limit Met';
			}
			$('#display1').html(display1);
			$('#display2').html(display2);
			
			display1 = '0';
			display2 = '0';
		}
	});
	
	
	// pressing '.' (dot)
	$('#bdot').on('click', function(){
		if (display1 === '+' || display1 === '-' || display1 === 'x' || display1 === '/') {
			display1 = '0.';
			display2 += '0.';
		} else if (display2 === 'Digit Limit Met'){
			display1 = '0.';
			display2 = '0.';
		} else if (display1.indexOf('.') === -1) {
			display1 += '.';
			display2 += '.';
		}
		
		if (display1.length > 10 || display2.length > 20) {
			display1 = '0';
			display2 = 'Digit Limit Met';
		}
		$('#display1').html(display1);
		$('#display2').html(display2);
	});
	
	
	// pressing '1'
	$('#b1').on('click', function(){
		addDigit('1');
	});
	
	// pressing '2'
	$('#b2').on('click', function(){
		addDigit('2');
	});
	
	// pressing '3'
	$('#b3').on('click', function(){
		addDigit('3');
	});
	
	// pressing '4'
	$('#b4').on('click', function(){
		addDigit('4');
	});
	
	// pressing '5'
	$('#b5').on('click', function(){
		addDigit('5');
	});
	
	// pressing '6'
	$('#b6').on('click', function(){
		addDigit('6');
	});
	
	// pressing '7'
	$('#b7').on('click', function(){
		addDigit('7');
	});
	
	// pressing '8'
	$('#b8').on('click', function(){
		addDigit('8');
	});
	
	// pressing '9'
	$('#b9').on('click', function(){
		addDigit('9');
	});
	
	// pressing '0'
	$('#b0').on('click', function(){
		addDigit('0');
	});
});



// add digit to the equation
function addDigit(d){
	if (display1 === '0') {
		if (display2 === '0' || display2 === 'Digit Limit Met') {
			display1 = d;
			display2 = d;
		}
	} else {
		if (display1 !== '+' && display1 !== '-' && display1 !== 'x' && display1 !== '/') {
			display1 += d;
			display2 += d;
		} else {
			display1 = d;
			display2 += d;
		}
	}

	if (display1.length > 10 || display2.length > 20) {
		display1 = '0';
		display2 = 'Digit Limit Met';
	}
	$('#display1').html(display1);
	$('#display2').html(display2);
}



// add a symbol to the equation ( + - x / )
function addSymbol(s){
	if (display1 !== '+' && display1 !== '-' && display1 !== 'x' && display1 !== '/' && display2 !== 'Digit Limit Met') {
		display1 = s;
		display2 += s;
	}
	if (display2.length > 20) {
		display1 = '0';
		display2 = 'Digit Limit Met';
	}
	$('#display1').html(display1);
	$('#display2').html(display2);
}