import BillingCSS from "./Billing.module.scss";
import TextField from "@material-ui/core/TextField";

const Billing = () => {
  return (
    <div className={BillingCSS.container}>
      <div className={BillingCSS.wrapper}>
        <div className={BillingCSS["billing-address"]}>
          <p className={BillingCSS["information-heading"]}>
            Billing Information
          </p>
          <TextField
            variant="outlined"
            label="Full Name"
            type="text"
            margin="dense"
            style={{ width: "250px" }}
          />
          <TextField
            variant="outlined"
            label="Address"
            type="text"
            margin="dense"
            style={{ width: "250px" }}
          />
          <TextField
            variant="outlined"
            label="City"
            type="text"
            margin="dense"
            style={{ width: "130px" }}
          />
          <TextField
            variant="outlined"
            label="ZipCode"
            type="number"
            margin="dense"
            style={{ width: "110px", marginLeft: "0.6rem" }}
          />
          <CountrySelector />
        </div>
        <div className={BillingCSS["credit-card"]}>
          <p className={BillingCSS["information-heading"]}>
            Credit Card Information
          </p>
        </div>
      </div>
    </div>
  );
};

export default Billing;
