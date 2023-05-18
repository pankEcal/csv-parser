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
			const applicationName = row[1];
			const apiLink = row[2];
			const requestParams = row[3];

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
			console.log(requestObj);
		});
};

parseCsv();
