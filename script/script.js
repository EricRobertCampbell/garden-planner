// Utility Functions

function findPlantByName(plantings, name) {
	for (let plant of plantings) {
		if (plant.name === name) {
			return plant;
		}
	}
}



// Main Program Stuff
let startDate = new Date(2020,4,1);
let endDate = new Date(2020,9,31);

let beets1 = {
	name: 'Beets - First Planting',
	variety: 'Beets',
	startDate: new Date(2020, 4, 24),
	daysToMaturity: 55,
	getHarvestDate: function () {
		//console.log(`in beets`, self);
		return new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate() + this.daysToMaturity - 1);
	},
};
let beets2 = {
	name: 'Beets - Second Planting',
	variety: 'Beets',
	startDate: new Date(2020, 4, 31),
	daysToMaturity: 55,
	getHarvestDate: function () {
		//console.log(`in beets`, self);
		return new Date(this.startDate.getFullYear(), this.startDate.getMonth(), this.startDate.getDate() + this.daysToMaturity - 1);
	},
};

let plantings = [
	beets1,
	beets2,
];
//console.log(`Plantings:`, plantings);

function buildTable(start, stop, plantings) {
	let thead = document.createElement('thead')
	let tr = document.createElement('tr');
	let firstHeading = document.createElement('th');
	//firstHeading.innerHTML = 'Planting';
	tr.appendChild(firstHeading);

	let plantingRows = plantings.reduce((acc, el) => {
		let th = document.createElement('th');
		th.setAttribute('class', 'nowrap');
		th.appendChild(document.createTextNode(`${el.name}`))
		let row = document.createElement('tr');
		row.appendChild(th);
		acc[el.name] = row;
		return acc;
	}, {});
	//console.log(`plantingRows: ${plantingRows}`);


	for (let current = start; current <= stop; current = new Date(current.getFullYear(), current.getMonth(), current.getDate() + 1)) {
		let th = document.createElement('th');
		th.innerHTML = current.toDateString();
		th.setAttribute('class', 'date');
		tr.appendChild(th);

		//now create the planting rows 
		for (plantName in plantingRows) {
			let plant = findPlantByName(plantings, plantName);
			//console.log(`plant: `, plant);
			let td = document.createElement('td');
			if (current >= plant.startDate && current <= plant.getHarvestDate()) {
				td.setAttribute('class', 'plant');
				td.appendChild(document.createTextNode('P'));
			} else {
				td.appendChild(document.createTextNode(''));
			}
				plantingRows[plantName].appendChild(td);
		}
	}

	let table = document.getElementsByTagName('table')[0];

	thead.appendChild(tr);
	table.appendChild(thead);

	//now do the planting rows
	for (plant in plantingRows) {
		//console.log(`Making row: `, plant);
		table.appendChild(plantingRows[plant]);
	}
}

window.onload = () => {
	buildTable(startDate, endDate, plantings);
}
