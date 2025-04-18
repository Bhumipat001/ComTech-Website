function doGet(e) {
    try {
      const allowedReferrer = ""; 
      const referer = e.parameter.referer;
      
      if (!referer || !referer.startsWith(allowedReferrer)) {
        return ContentService.createTextOutput(JSON.stringify({ error: "Unauthorized" }))
          .setMimeType(ContentService.MimeType.JSON);
      }
      
      const sheet = SpreadsheetApp.openById('');
      const range = sheet.getSheetByName('URL').getRange('A1:B6');
      const values = range.getValues();
      const result = {
        values: values
      };
      
      return ContentService.createTextOutput(JSON.stringify(result))
        .setMimeType(ContentService.MimeType.JSON);
        
    } catch (error) {
      return ContentService.createTextOutput(JSON.stringify({ error: error.message }))
        .setMimeType(ContentService.MimeType.JSON);
    }
}