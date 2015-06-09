*Register*

getridapi.azurewebsites.net/api/Account/Register

http://localhost:49581/api/Account/Register

headers:
- Content-Type: application/json

*Token*

getridapi.azurewebsites.net/token

http://localhost:49581/token

headers:
- Content-Type: application/x-www-form-urlencoded

- x-www-form-urlencoded:
	- grant_type: password
	- username: {username}
	- Password: {password}


*Products*

getridapi.azurewebsites.net/api/products

http://localhost:49581/api/products

headers:
	- Content-Type: application/json
	- Authorisation: Bearer {bearer token}

- x-www-form-urlencoded:
	- {key}: {value}
	- 
	
*Products Put*

getridapi/azurewebsties.net/api/Products/5

	- Content-Type: application/json
	- Authorisation: Bearer {bearer token}
(send the full product parameters back as a x-www-form-urlencoded - with status changed to True)       
        
