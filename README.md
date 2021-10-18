# [Find Your Bank](https)

> **Web application to search and list all the banks around multiple cities in India**

## Steps to run this project locally

- Fork this repo

- cd find-your-bank/

- **npm install**

- **Run the project** : [npm start](http://localhost:3000/)

_**Components**_

- [Table.js](https) : It is the parent component of application, that holds multiple core features like searching based on multiple parameters such as city and other categories like: IFSC code, Bank Name and Branch. Select the category that you want to search upon from Category dropdown and then put the value in the search bar on which you want to search.

- [BankDetail.js](https) : Display all the details of a single bank on a separate page using unique IFSC code.Result displayed is based on caching mechanism.

- [Pagination.js](https) : To implement pagination and its customizable options like set number of rows to be displayed, directly go to a specific page number, go to previous page, go to next page, go to first page, go to last page. Result displayed is based on caching mechanism.

- [Favorites.js](https) : Display all the favorite banks and gives you to the option to delete a bank from favorites as well.

_**Modules**_

- [CacheManager](https) : It is a class that is responsible to maintain multiple cache CRUD operations. It makes sure that cache is expired after a given time period.It stores cache data along with expiry in application state and localStorage of browser. This module can be reused in multiple components, for example: here it is consumed by BankDetails and Pagination Components.

- [Helper](https) : It is a module that contains all the common functions that are consumed by multiple components in the application. For example: Fetch all banks from local cache or via API call from web server.

> ### Author : Aakansha Jain
