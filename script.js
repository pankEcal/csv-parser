const fs = require("fs");
const path = require("path");
const XLSX = require("xlsx");
const { parse } = require("csv-parse");

const xlsxFile = path.join(__dirname, "./uploads/", "bikeIntell.xlsx");
const csvFile = path.join(__dirname, "./uploads/", "csvfile.csv");

const workBook = XLSX.readFile(xlsxFile);
XLSX.writeFile(workBook, csvFile, { bookType: "csv" });

const apis = [];
const requestObj = {
	applicationName: "Bike Intell",
	baseUrl: "https://evaai.enginecal.com/",
};

const parseCsv = () => {
	fs.createReadStream(csvFile)
		.pipe(parse({ delimeter: "," }))
		.on("data", function (row) {
			const applicationName = String(row[1]).replace(/[\r\n]+/gm, "");
			const apiLink = String(row[2]).replace(/[\r\n]+/gm, "");
			const requestParams = String(row[3]).replace(/[\r\n]+/gm, "");

			if (applicationName.length) {
				let rowData = {
					applicationName,
					apiLink,
					...{ requestMethod: "POST" },
					requestParams,
				};

				apis.push(rowData);
			}
		})
		.on("end", () => {
			Object.assign(requestObj, { apis: apis });
		});
};

parseCsv();
