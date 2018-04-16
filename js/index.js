const rolls = {
	roll: function(sides) {
		return 1 + Math.random() * sides | 0
	},
	standardRoll: function(sides) {
		var result = rolls.roll(sides);
		return {
			sides,
			result
		}
	},
	withAdvantage: function(sides) {
		var rawRolls = [];
		rawRolls.push( rolls.roll(sides) );
		rawRolls.push( rolls.roll(sides) );
		return {
			sides,
			result: Math.max.apply(null, rawRolls),
			rawRolls,
		}
	},
	withDisadvantage: function(sides) {
		var rawRolls = [];
		rawRolls.push( rolls.roll(sides) );
		rawRolls.push( rolls.roll(sides) );
		return {
			sides,
			result: Math.min.apply(null, rawRolls),
			rawRolls,
		}
	}
}

const dice = {
	roll: function (expression) {
		var rolled_dice = [];
		expression.toLowerCase().replace(/(\d+)(d\d+)?/g, function (_, count, die) {
			if(die) {
				var sides = +die.replace(/d/gi, "");
				for (var i = 0; i < count; i++) {
					rolled_dice.push( rolls.standardRoll(sides) );
				}
			} else {
				rolled_dice.push({
					sides: 0,
					result: +count
				});
			}
		});
		console.log('rolled_dice');
		console.log(rolled_dice);
		return rolled_dice;
	},
	totalRolledDice: function (results) {
		var diceTotal = 0;
		for (var diceType in results) {
			diceTotal += results[diceType].result;
		}
		return diceTotal;
	}
};


// console.log(rolled_dice);

function printNumber(number) {
	var dicetotal = document.getElementById('dicetotal');
	dicetotal.innerHTML = number;
}

function printDice(rolledDice) {
	var dicelist = document.getElementById('dicelist');
	var formatted_string = '';
	for (var i = 0; i < rolledDice.length; i++) {
		var diceType = `d${rolledDice[i].sides}`;
		formatted_string += `<li class="${diceType}">${rolledDice[i].result}</li>`;
	}
	console.log(formatted_string);
	dicelist.innerHTML = formatted_string;
}

var button = document.getElementById('button');

button.onclick = function() {
	var result = dice.roll('1 + 4d4 + 8d6 + 1d8 + 2d10 + 2d12 + 2d20 + 1d100 + 10');
	console.log('result');
	// console.log(result);
	printDice( result );
	var totalOfDice = dice.totalRolledDice(result);
	printNumber( totalOfDice );
};