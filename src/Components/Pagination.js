import React, { useEffect, useState } from "react";
import "./Pagination.css";

import { useHistory } from "react-router-dom";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import LoaderIndicator from "./Loader";
import { fetchAllBanks } from "../Helper";
import CacheManager from "../CacheManager";

function Pagination({ title, search, city, category, pageLimit }) {
  let [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [myfav, setmyfav] = useState(null);
  const [dataSize, setDataSize] = useState(10);
  const [pages, setPages] = useState(Math.ceil(data.length / 10));

  //Fetch all banks from local cache or via API call from web server
  useEffect(() => {
    (async () => {
      setLoading(true);
      const allBanks = await fetchAllBanks();
      setLoading(false);
      setData((prevBank) => {
        const finalBanks = [...prevBank, ...allBanks];
        CacheManager.setCache(finalBanks);
        return finalBanks;
      });
    })();
  }, []);

  useEffect(() => {
    setPages(Math.ceil(data.length / dataSize));
  }, [dataSize, data]);

  useEffect(() => {}, [myfav]);

  const history = useHistory();

  function goToNextPage() {
    setCurrentPage((page) => page + 1);
  }

  function goToFirstPage() {
    setCurrentPage(1);
  }

  function goToPreviousPage() {
    setCurrentPage((page) => page - 1);
  }

  function goToLastPage() {
    setCurrentPage(pages);
  }

  function goToPage(e) {
    setCurrentPage(e - 1);
  }

  function changePage(event) {
    const pageNumber = Number(event.target.textContent);
    setCurrentPage(pageNumber);
  }

  const getPaginatedData = (search) => {
    const startIndex = currentPage * dataSize - dataSize;
    const endIndex = startIndex + dataSize;
    if (city.length > 0) {
      data = data.filter((bank) => {
        return city.indexOf(bank.city) > -1;
      });
    }

    if (category !== "" && search !== "") {
      data = data.filter((bank) => {
        return (
          bank[category.toLowerCase()].toUpperCase() === search.toUpperCase()
        );
      });
    }
    return data.slice(startIndex, endIndex);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, idx) => start + idx + 1);
  };

  const bankClickHandler = (bank) => {
    localStorage.setItem("bank", JSON.stringify(bank));
  };

  const handleRedirect = (link, bank) => {
    bankClickHandler(bank);
    history.push(link);
  };

  const isfav = (bank) => {
    const favourites = JSON.parse(localStorage.getItem("favourites"));

    if (favourites) {
      const myfav = favourites.find((fav) => {
        return fav.ifsc === bank.ifsc;
      });

      if (myfav) {
        return true;
      }
    }
    return false;
  };

  const bookmarkHandler = (bank) => {
    let favourites = JSON.parse(localStorage.getItem("favourites"));
    if (favourites && favourites.length > 0) {
      const myfav = favourites.find((fav) => {
        return fav.ifsc === bank.ifsc;
      });

      if (myfav) {
        favourites = favourites.filter((fav) => {
          return fav.ifsc !== bank.ifsc;
        });
        localStorage.setItem("favourites", JSON.stringify(favourites));
      } else {
        favourites.push(bank);
        localStorage.setItem("favourites", JSON.stringify(favourites));
      }
    } else {
      localStorage.setItem("favourites", JSON.stringify([bank]));
    }
    setmyfav(bank);
  };

  return isLoading ? (
    <LoaderIndicator />
  ) : (
    <div>
      <table className="banktable">
        <thead>
          <tr>
            <th> Favorites</th>
            <th>Bank IFSC</th>
            <th>Bank Name</th>
            <th>Bank ID</th>
            <th>Bank Branch</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>
          {getPaginatedData(search).map((bank) => {
            const link = "bank-details/" + bank.ifsc;
            const isfavourite = isfav(bank);
            return (
              // <Link to={link} onClick={ () => bankClickHandler(bank)}>

              <tr>
                <td onClick={() => bookmarkHandler(bank)}>
                  {isfavourite ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                </td>
                <td onClick={() => handleRedirect(link, bank)}>{bank.ifsc}</td>
                <td onClick={() => handleRedirect(link, bank)}>
                  {bank.bank_name}
                </td>
                <td onClick={() => handleRedirect(link, bank)}>
                  {bank.bank_id}
                </td>
                <td onClick={() => handleRedirect(link, bank)}>
                  {bank.branch}
                </td>
                <td onClick={() => handleRedirect(link, bank)}>
                  {bank.address}
                </td>
                <td onClick={() => handleRedirect(link, bank)}>{bank.city}</td>
                <td onClick={() => handleRedirect(link, bank)}>{bank.state}</td>
              </tr>
              // </Link>
            );
          })}
        </tbody>
      </table>

      {/* show the posts, 10 posts at a time */}
      {/* <div className="dataContainer">
          {getPaginatedData().map((d, idx) => (
           <li>{d.bank_name}</li>
          ))}
        </div> */}

      {/* show the pagiantion
            it consists of next and previous buttons
            along with page numbers, in our case, 5 page
            numbers at a time
        */}
      <div className="pagination">
        {/* previous button */}
        <div className="row">
          <div className="col">
            <button onClick={goToFirstPage} disabled={currentPage === 1}>
              start
            </button>

            <button onClick={goToPreviousPage} disabled={currentPage === 1}>
              prev
            </button>

            {/* show page numbers */}
            {getPaginationGroup().map((item, index) => (
              <button
                key={index}
                onClick={changePage}
                className={`paginationItem ${
                  currentPage === item ? "active" : null
                }`}
              >
                <span>{item}</span>
              </button>
            ))}

            {/* next button */}
            <button onClick={goToNextPage} disabled={currentPage === pages}>
              next
            </button>

            <button onClick={goToLastPage} disabled={currentPage === pages}>
              last
            </button>
          </div>

          <div className="pagedisplay">
            <h3>
              page {currentPage} of {pages}
            </h3>
          </div>
          {/* 
          <div className="pagedisplay">
            <h3>Go to page:</h3>
            <input
              type="text"
              className="search"
              onChange={(e) => changePage(e)}
            ></input>
          </div> */}

          <div className="pagedisplay2">
            <select
              value={dataSize}
              onChange={(e) => {
                setDataSize(Number(e.target.value));
                setPages(Math.ceil(data.length / Number(e.target.value)));
              }}
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pagination;
