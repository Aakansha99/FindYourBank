import React, { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link, useHistory } from "react-router-dom";

function Favorites() {
  const [fav, setfav] = useState([]);

  //taking out the favourite banks from localStorage on every fav state change
  useEffect(() => {
    let favourites = JSON.parse(localStorage.getItem("favourites"));
    if (favourites && favourites.length > 0) {
      setfav(favourites);
    }
  }, [fav]);

  const history = useHistory();

  //deleting the bank from localStorage on clicking delete button
  const onDelete = (bank) => {
    const myfav = fav.filter((f) => {
      return f.ifsc !== bank.ifsc;
    });
    setfav(myfav);
    localStorage.setItem("favourites", JSON.stringify(myfav));
  };

  //storing the bank in localStorage if we want its complete details on single page
  const bankClickHandler = (bank) => {
    localStorage.setItem("bank", JSON.stringify(bank));
  };

  // handling redirect for single bank info page
  const handleRedirect = (link, bank) => {
    bankClickHandler(bank);
    history.push(link);
  };

  const goBack = "< Go back to search all banks";

  return (
    <div>
      <h1 align="center">Your Favorite Banks</h1>

      <Link to="/" style={{ textDecoration: "none" }}>
        <h3>{goBack}</h3>
      </Link>

      {fav && fav.length > 0 ? (
        <div>
          <table className="banktable">
            <thead>
              <tr>
                <th> Favorites </th>
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
              {fav.map((f) => {
                const link = "bank-details/" + f.ifsc;
                return (
                  <tr>
                    <td>
                      <DeleteIcon onClick={() => onDelete(f)} />
                    </td>
                    <td onClick={() => handleRedirect(link, f)}>{f.ifsc}</td>
                    <td onClick={() => handleRedirect(link, f)}>
                      {f.bank_name}
                    </td>
                    <td onClick={() => handleRedirect(link, f)}>{f.bank_id}</td>
                    <td onClick={() => handleRedirect(link, f)}>{f.branch}</td>
                    <td onClick={() => handleRedirect(link, f)}>{f.address}</td>
                    <td onClick={() => handleRedirect(link, f)}>{f.city}</td>
                    <td onClick={() => handleRedirect(link, f)}>{f.state}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <h1> You don't have any favorites</h1>
      )}
    </div>
  );
}

export default Favorites;
