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
		.pipe(parse({ delimeter: "," }))
		.on("data", function (row) {
			if (row[1].length) {
				const applicationName = String(row[1]).replace(/[\r\n]+/gm, "");
				const apiLink = String(row[2]).replace(/[\r\n]+/gm, "");
				const requestParam = String(row[4]).replace(/[\r\n]+/gm, "");
				let rowData = { applicationName, apiLink, requestParam };
				finalData.push(rowData);
			}
		})
		.on("end", () => {
			console.log(finalData);
		});
};

parseCsv();
