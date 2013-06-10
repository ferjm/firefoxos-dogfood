bulkinjection.js and bulkinjection2.js injects users in the database throught a file.xlsx
The difference between the two scripts are the structure of the file.xlsx
For bulkinjection2.js use that structure in the xlsx<FIRSTNAME,LASTNAME,EMAIL>
For bulkinjection.js .xlsx<"", "", "", "APELLIDOS, NOMBRE", "","EMAIL","">
Example: $node bulkinjection2.js usersList.xlsx