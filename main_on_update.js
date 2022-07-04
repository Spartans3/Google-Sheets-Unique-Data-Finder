var token = ""; //bot token
var url = "https://api.telegram.org/bot" + token 

var id = 1;

function myFunction() {
  
  var newData = checkRows();
  if(newData != null){
    var send = url + "/sendMessage?chat_id=" + id + "&text=" + encodeURIComponent(newData);
    var response = UrlFetchApp.fetch(send);
    Logger.log(response.getContentText());
  }
};


function checkRows(){
  var activeCol =SpreadsheetApp.getActiveSheet().getActiveCell().getColumn();
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  if(Object.is(spreadsheet.getSheets()[0].getName() , SpreadsheetApp.getActiveSheet().getName()) && activeCol == 1  ){
    
   var values = spreadsheet.getSheets()[1].getDataRange().getValues();
   var cells = new Array(0) ;

   for(i = 0 ; i<values.length ; i++){
     if(values[i][1] != ''){
       cells.push(values[i][1]);
     }
   }
    
    var newData= SpreadsheetApp.getActiveSheet().getActiveCell().getValue();
    
    if(!cells.includes(newData)){
      var activeSheet = spreadsheet.getSheets()[1];
      activeSheet.getRange(1 , 2 ).setValue("Unique Data");
      activeSheet.getRange(1 , 1 ).setValue("Date");
      var lastRow = activeSheet.getLastRow()+1;
      var currentdate = new Date(); 
      const month = currentdate.toLocaleString('default', { month: 'short' });
      var dateString = month + " " + currentdate.getDate() + " | " + String(currentdate.getHours()).padStart(2, '0') + ":" + currentdate.getMinutes();
      activeSheet.getRange(lastRow , 2 ).setValue(newData);
      activeSheet.getRange(lastRow , 1 ).setValue(dateString);
      return newData;
    }else{
      return null;
    }
    
  }else{
    return null;
  }
  
  
}