const xlsx = require("xlsx");
const fs = require("fs");

function generateJSONFile(data) {
  try {
    fs.writeFileSync("data.json", JSON.stringify(data));
    console.log("---------done----------");
  } catch (err) {
    console.error(err);
  }
}

function convertExcelFileToJson() {
  // Read the file using pathname
  const file = xlsx.readFile("./data.xlsx");
  // Grab the sheet names from the file
  const sheetNames = file.SheetNames;
  // Loop through sheets and store the data in parseedData
  let parsedData = sheetNames.map((el) => {
    const tempData = xlsx.utils.sheet_to_json(file.Sheets[el]);
    // Add the sheet's data and name into our data array
    return {
      sheetName: el,
      data: tempData,
    };
  });

  // call a function to save the data in a json file
  generateJSONFile(parsedData);
}

convertExcelFileToJson();
