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

const parserConfig = { delimeter: ",", from_line: 4, info: true, trim: true };

const parseCsv = () => {
	fs.createReadStream(csvFile)
		.pipe(parse(parserConfig))
		.on("data", function ({ info, record }) {
			const applicationName = record[1];
			const apiLink = record[2];
			let requestParams = record[3];

			try {
				requestParams = JSON.parse(requestParams);

				if (applicationName.length) {
					let rowData = {
						applicationName,
						apiLink,
						...{ requestMethod: "POST" },
						requestParams,
					};

					apis.push(rowData);
				}
			} catch (error) {
				console.log(`skipping line ${record[0]}. Couldn't process.`);
			}
		})
		.on("end", () => {
			Object.assign(requestObj, { apis: apis });
			console.log(JSON.stringify(requestObj));
		});
};

parseCsv();
