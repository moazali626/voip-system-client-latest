import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CancelIcon from "@mui/icons-material/Cancel";
import DataUsageIcon from "@mui/icons-material/DataUsage";
import { Link } from "react-router-dom";
import AdminSideBarMenuCSS from "./AdminSideBarMenu.module.scss";
import { Redirect } from "react-router";
import MailIcon from "@mui/icons-material/Mail";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const AdminSideBarMenu = ({ selectedIndexInfo, setSelectedIndexInfo }) => {
  const classes = useStyles();

  const handleListItemClick = (event, index) => {
    setSelectedIndexInfo(index);
  };

  return (
    <>
      <div className={classes.root}>
        <List
          component="nav"
          aria-label="main mailbox folders"
          style={{ backgroundColor: "white" }}
        >
          <div className={AdminSideBarMenuCSS.wrapper}>
            <ListItem
              button
              selected={selectedIndexInfo === 0}
              onClick={(event) => handleListItemClick(event, 0)}
              style={{ width: "18.9rem", marginTop: "6.0rem" }}
            >
              <ListItemIcon>
                <AccountBalanceWalletIcon />
              </ListItemIcon>
              <ListItemText primary="Add Balance" style={{ color: "black" }} />
            </ListItem>
            <ListItem
              button
              selected={selectedIndexInfo === 1}
              onClick={(event) => handleListItemClick(event, 1)}
              style={{ width: "18.9rem" }}
            >
              <ListItemIcon>
                <CancelIcon />
              </ListItemIcon>
              <ListItemText primary="Suspend User" style={{ color: "black" }} />
            </ListItem>
            <ListItem
              button
              selected={selectedIndexInfo === 2}
              onClick={(event) => handleListItemClick(event, 2)}
              style={{ width: "18.9rem" }}
            >
              <ListItemIcon>
                <DataUsageIcon />
              </ListItemIcon>
              <ListItemText
                primary="View Activty Usage"
                style={{ color: "black" }}
              />
            </ListItem>

            <ListItem
              button
              selected={selectedIndexInfo === 3}
              onClick={(event) => handleListItemClick(event, 3)}
              style={{ width: "18.9rem" }}
            >
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText
                primary="Get Inbox Messages"
                style={{ color: "black" }}
              />
            </ListItem>
          </div>
        </List>
      </div>
      <footer />
    </>
  );
};

export default AdminSideBarMenu;
