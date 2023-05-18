const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");
const { parse } = require("csv-parse");

const xlsxFile = path.join(__dirname, "./uploads/", "bikeIntell.xlsx");
const csvFile = path.join(__dirname, "./uploads/", "csvfile.csv");

const workBook = XLSX.readFile(xlsxFile);
XLSX.writeFile(workBook, csvFile, { bookType: "csv" });

const finalData = [];

const parseCsv = () => {
	fs.createReadStream(csvFile)
		// .pipe(parse({ delimiter: ",", relax_quotes: true }))
		.pipe(parse({ delimeter: "," }))
		.on("data", function (row) {
			if (row[1].length) {
				const applicationName = row[1];
				const apiLink = row[2];
				const requestParam = row[4];
				let rowData = { applicationName, apiLink, requestParam };
				// Object.assign(finalData, rowData);
				finalData.push(rowData);
			}
		})
		.on("end", () => {
			// application name, apiLink, requestParams
			console.log(finalData);
		});
};

parseCsv();
