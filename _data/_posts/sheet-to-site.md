---
title: "Use google sheets as a content management system (CMS) for an eCommerce site"
date: "2021-02-10T09:40:32.169Z"
description: "Use google sheets as a content management system (CMS) for an eCommerce site"
---

![Google sheet page](/img/sheetExample.png)

**[DEMO](https://next-shopping-cart.vercel.app)**

The previous blog: [next-shopping-cart](https://zjusticy.github.io/blog/next-react-shopping-cart)

You can check the code of this project on [Github](https://github.com/zjusticy/next-shopping-cart).

Google Sheets have some great advantage as a content management system.

- It is easy for people to get started and the cost of learning is extremely low
- Build-in collaboration support

Cons:

- There are [usage limits](https://developers.google.com/sheets/api/limits) for the Google Sheets API.
- It is not a proper database if your business keeps growing. However, it is still capable of connecting Google Sheets with other headless CMSs.

Here is an example of using Google Sheets for an eCommerce site.

[Google Sheets Example](https://docs.google.com/spreadsheets/d/1UsOkG1kRY6Qb50F76v-msb18-mvXxvX-0CmcAtv_aoA/edit?usp=sharing)

For a small site, it is easy to maintain and update by using Google Sheets. Also, we can use Google App Script to select the data and output it to other platforms. In Google App Script, we have to first implement a **doGet()** function as a response to an HTTP get request. From the sheets’ URL and page name, we can reach the data we need. The code below can explain itself.

```js
function doGet(e) {
  var SPREADSHEET_URL = "Google Sheets' URL";
  var SHEET_NAME_ONE = "Sheets' name";

  // Get the sheets by name
  var ss = SpreadsheetApp.openByUrl(SPREADSHEET_URL);
  // Get the certain sheet by name
  var sheet = ss.getSheetByName(SHEET_NAME_ONE);
  var jo = getItems(sheet);

  // Stringify and output the data
  var result = JSON.stringify(jo);
  return ContentService.createTextOutput(result).setMimeType(
    ContentService.MimeType.JSON
  );
}

function getItems(sheet) {
  var dataArray = [];

  // Collect data from the 2nd row to the last row vertically,
  // and from the first column to the last column horizontally for each row
  var rows = sheet
    .getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn())
    .getValues();

  // For the equation use getFormulas instead of getValues
  var urls = sheet.getRange(2, 5, sheet.getLastRow() - 1, 1).getFormulas();

  // Go through all the rows to put data into an array

  for (var i = 0, j = rows.length; i < j; i++) {
    var dataRow = rows[i];
    var record = {};

    record["id"] = dataRow[0].toString();
    record["name"] = dataRow[1];
    record["unit"] = dataRow[2];
    record["price"] = dataRow[3].toString();
    // Extract the URL data using regular expression
    record["image"] = urls[i][0].match(/=image\("(.*)"/i)[1];
    record["categary"] = dataRow[5];

    dataArray.push(record);
  }

  return dataArray;
}
```

Then save the file --> click deploy --> new deploy --> select type ( web application) --> select anyone can access the application --> deploy. We can check the result from an API testing tool online.

![Screen Shot 2021-02-16 at 10.00.37 PM](/img/apiTest.png)

This is really useful for some showcase websites.

## Reference

[Simple site from Goole Sheets](https://medium.com/野薑開業日記/運用-google-sheet-製作簡易的-cms-b5b2a99b101e)
