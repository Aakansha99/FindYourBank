import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./BankDetails.css";
import { Link } from "react-router-dom";
import { fetchAllBanks } from "../Helper";
import LoaderIndicator from "./Loader";
import Pagination from "./Pagination";

function BankDetails() {
  const [isLoading, setLoading] = useState(true);

  // I have used useParams() hook to access the dynamic pieces of the URL
  let { ifsc } = useParams();

  const [bankdetail, setBankDetail] = useState(null);

  // will take the item from fresh API call, since we don't have a API for fetch by ID or ifsc,
  // we are fetching all banks, and finding our bank via searching in response array
  useEffect(() => {
    (async () => {
      setLoading(true);
      const allBanks = await fetchAllBanks();
      setLoading(false);

      if (allBanks) {
        allBanks.forEach((bank) => {
          if (bank.ifsc === ifsc) {
            setBankDetail(bank);
          }
        });
      } else {
        alert("No bank available !!");
      }
    })();
  }, []);

  const goBack = "< Go back to search all banks";

  return isLoading ? (
    <LoaderIndicator />
  ) : (
    <div>
      <h1 align="center">Single Bank Details</h1>
      <Link to="/" style={{ textDecoration: "none" }}>
        <h3>{goBack}</h3>
      </Link>
      {bankdetail ? (
        <div className="card">
          <div className="bankname">
            <h1>{bankdetail.bank_name}</h1>
          </div>
          <div>
            <h3>
              <u>Branch:</u> {bankdetail.branch}
            </h3>
            <h3>
              <u>Bank ID:</u> {bankdetail.bank_id}
            </h3>
            <h3>
              <u>IFSC:</u>
              {bankdetail.ifsc}
            </h3>
          </div>
          <div className="address">
            <h3>
              <u>Address:</u> {bankdetail.address}
            </h3>
            <h3>
              <u>City:</u> {bankdetail.city}
            </h3>
            <h3>
              <u>State:</u> {bankdetail.state}
            </h3>
          </div>
        </div>
      ) : (
        <h1>Loading !!! Please wait</h1>
      )}
    </div>
  );
}

export default BankDetails;
