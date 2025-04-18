function doGet(e) {
    try { 
      const allowedReferrer = "";
      const referer = e.parameter.referer;
  
      if (!referer || !referer.startsWith(allowedReferrer)) {
        return ContentService.createTextOutput(JSON.stringify({ error: "Unauthorized" }))
          .setMimeType(ContentService.MimeType.JSON);
      }
  
      const sheetId = '';
      const sheetNames = ['Members', 'Supervisors', 'President & Vice president'];
  
      const jsonData = {};
      const sheetObj = SpreadsheetApp.openById(sheetId);
  
      sheetNames.forEach(sheetName => {
        const sheet = sheetObj.getSheetByName(sheetName);
        if (!sheet) return;
  
        let data;
        let sheetData = [];
  
        if (sheetName === 'Members') {
          data = sheet.getRange('D3:I').getValues();
        } else {
          data = sheet.getDataRange().getValues();
        }
  
        if (data.length < 1) return;
  
        if (sheetName === 'Members') {
          for (let i = 0; i < data.length; i++) {
            if (data[i].join("").trim() === "") continue;
            let entry = {
              "Display Name": data[i][0],
              "Display Role": data[i][3],
              "Picture": data[i][1],
              "Card Background": data[i][4],
              "Text Color": data[i][5],
              "KUS": data[i][2]
            };
            sheetData.push(entry);
          }
        } else {
          for (let i = 1; i < data.length; i++) { 
            if (data[i].join("").trim() === "") continue;
            let entry = {
              "Display Name": data[i][0],
              "Display Role": data[i][1],
              "Picture": data[i][2],
              "Card Background": data[i][3],
              "Text Color": data[i][4]
            };
            sheetData.push(entry);
          }
        }
  
        jsonData[sheetName] = sheetData;
      });
  
      return ContentService.createTextOutput(JSON.stringify(jsonData))
        .setMimeType(ContentService.MimeType.JSON);
  
    } catch (error) {
      return ContentService.createTextOutput(JSON.stringify({ error: error.message }))
        .setMimeType(ContentService.MimeType.JSON);
    }
}