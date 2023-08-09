function sendBdayRemonder() {
  var sheet = SpreadsheetApp.getActive().getSheetByName("Emails");
  lastRow = sheet.getLastRow();
  lastColumn = sheet.getLastColumn();
  BdayList = sheet.getRange(2, 1, lastRow - 1, lastColumn).getValues();
  var todayDate = new Date();
  var todayMonth = todayDate.getMonth();

  for (var x = 0; x < lastRow-1; x++) {
    // Get the day from the birthday date
    // from the column B, the 2nd column,
    // but the counting starts from 0, so it is the 2th position
    var monthBday = BdayList[x][1].getMonth();}

  var table="<html><body> <br> <table border=1>"
  var colVal="";

  for (var rowNo=1; rowNo<=lastRow; rowNo++){
    table=table+ "<tr>"
    for (var colNo=1; colNo<=lastColumn; colNo++){
      colVal=sheet.getRange(rowNo, colNo).getDisplayValue();
      if (rowNo==1){
        table=table+"<th>"+colVal+"</th>";}
      else{
        table=table+"<td>"+colVal+"</td>"}
      }
    }
    table=table+"</tr>"
 

    if (monthBday == todayMonth) {
      var emailMessage = HtmlService.createHtmlOutputFromFile('bdaycode').getContent();
      // Get the name from the first column -> position 0 in the list
      emailMessage = emailMessage.replace("Name", table);
      // Get the Name for the email subject
      var subject = "Happy Birthday our dear colleagues";
      // Get the email address from the list, column C -> position 2 in the list
      var emailAddress = "meongoccute@gmail.com";
      // Finali send the email
      MailApp.sendEmail(emailAddress, subject, emailMessage, {
        htmlBody : emailMessage, name:"Our team", noReply: true
        });
    }
  }


