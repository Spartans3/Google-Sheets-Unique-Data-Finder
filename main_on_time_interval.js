var token = ""; //bot token
var url = "https://api.telegram.org/bot" + token;

var id = 1;

function findUniqueWithInterval() {
  var difference = checkRows();
  if (difference != null) {
    for (i = 0; i < difference.length; i++) {
      var send =
        url +
        "/sendMessage?chat_id=" +
        id +
        "&text=" +
        encodeURIComponent(difference[i]);
      setTimeout(function () {
        UrlFetchApp.fetch(send);
      }, 1000); // wait 1 second before sending the next message
    }
  }
}

function checkRowsWithInterval() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var uniqueValues = spreadsheet.getSheets()[1].getDataRange().getValues();

  var commonValues = spreadsheet.getSheets()[0].getDataRange().getValues();

  var commonCells = new Array(0);
  var uniqueCells = new Array(0);

  for (i = 0; i < commonValues.length; i++) {
    if (commonValues[i][0] != "") {
      commonCells.push(commonValues[i][0]);
    }
  }

  for (i = 0; i < uniqueValues.length; i++) {
    if (uniqueValues[i][1] != "") {
      uniqueCells.push(uniqueValues[i][1]);
    }
  }

  let difference = commonCells.filter((x) => !uniqueCells.includes(x));
  if (difference.length > 0) {
    var activeSheet = spreadsheet.getSheets()[1];
    activeSheet.getRange(1, 2).setValue("Unique Data");
    activeSheet.getRange(1, 1).setValue("Date");
    var currentdate = new Date();
    const month = currentdate.toLocaleString("default", { month: "short" });
    var dateString =
      month +
      " " +
      currentdate.getDate() +
      " | " +
      String(currentdate.getHours()).padStart(2, "0") +
      ":" +
      currentdate.getMinutes();
    for (i = 0; i < difference.length; i++) {
      var lastRow = activeSheet.getLastRow() + 1;
      activeSheet.getRange(lastRow, 2).setValue(difference[i]);
      activeSheet.getRange(lastRow, 1).setValue(dateString);
    }
    return difference;
  } else {
    return null;
  }
}
