import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Pagination";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import CacheManager from "../CacheManager";
import "./Pagination.css";
import {fetchAllBanks} from "../Helper";
import LoaderIndicator from "./Loader";

function Table() {
  const [search, setSearch] = useState("");
  const [city, setCity] = useState([]);
  const [category, setCategory] = useState([]);



  //Search by IFSC, Branch, Bank Name
  const Search = (e) => {
    setSearch(e.target.value.toUpperCase());
  };

  const handleChange = (event) => {
    const {
      target: {value},
    } = event;
    setCity(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  // setting what category to be searched on search bar
  const handleChangeCategory = (event) => {
    const {
      target: { value },
    } = event;
    setCategory(value);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 200,
      },
    },
  };

  const cityNames = ["DELHI", "MUMBAI", "BANGALORE", "PUNE", "HYDERABAD"];
  const categ = ["IFSC", "branch", "bank_name"];
  const link = "favourites";

  return (
    <div>
      <div className="row">
        <div className="column">
          <h1> All Banks</h1>
        </div>
        <div className="column">
          <div>
            {/* Dropdown for selecting cities on which you need to find banks */}
            <FormControl sx={{ m: 1, width: 200, height: 10 }}>
              <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={city}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {cityNames.map((cityname) => (
                  <MenuItem key={cityname} value={cityname}>
                    <Checkbox checked={city.indexOf(cityname) > -1} />
                    <ListItemText primary={cityname} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <div>
            {/* Dropdown for selecting on which category you want to search upon in search bar  */}
            <FormControl sx={{ m: 1, width: 200 }}>
              <InputLabel id="demo-multiple-name-label">Category</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                value={category}
                onChange={handleChangeCategory}
                input={<OutlinedInput label="Category" />}
                MenuProps={MenuProps}
              >
                {categ.map((catego) => (
                  <MenuItem key={catego} value={catego}>
                    {catego}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          {/* Search bar to search the value for the category selected in category dropdown */}
          <input
            type="text"
            placeholder="Search here"
            className="search"
            onChange={(e) => Search(e)}
            className="colchild"
          ></input>

          <div>
            <Link to={link} style={{ textDecoration: "none" }}>
              <h4>Go to Favorites❤</h4>
            </Link>
          </div>
        </div>
      </div>

       <Pagination
          title="Posts"
          search={search}
          city={city}
          category={category}
          pageLimit={5}
      />

    </div>
  );
}

export default Table;
