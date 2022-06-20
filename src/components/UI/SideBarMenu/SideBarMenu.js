import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import InboxIcon from "@mui/icons-material/Inbox";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SmsIcon from "@material-ui/icons/Sms";
import CallIcon from "@material-ui/icons/Call";
import DialpadIcon from "@material-ui/icons/Dialpad";
import HelpIcon from "@material-ui/icons/Help";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import { Link } from "react-router-dom";
import SidebarCSS from "./SidebarMenu.module.scss";
import { Redirect } from "react-router";
import CallReceivedIcon from "@mui/icons-material/CallReceived";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

const SelectedListItem = ({ selectedIndexInfo, setSelectedIndexInfo }) => {
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
          <div className={SidebarCSS.wrapper}>
            <ListItem
              button
              selected={selectedIndexInfo === -2}
              onClick={(event) => handleListItemClick(event, -2)}
              style={{ width: "18.9rem", marginTop: "6.0rem" }}
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Inbox" style={{ color: "black" }} />
            </ListItem>
            <ListItem
              button
              selected={selectedIndexInfo === -1}
              onClick={(event) => handleListItemClick(event, -1)}
              style={{ width: "18.9rem" }}
            >
              <ListItemIcon>
                <PhoneAndroidIcon />
              </ListItemIcon>
              <ListItemText
                primary="Buy Virtual Number"
                style={{ color: "black" }}
              />
            </ListItem>
            <ListItem
              button
              selected={selectedIndexInfo === 0}
              onClick={(event) => handleListItemClick(event, 0)}
              style={{ width: "18.9rem" }}
            >
              <ListItemIcon>
                <AttachMoneyIcon />
              </ListItemIcon>
              <ListItemText primary="TopUp" style={{ color: "black" }} />
            </ListItem>
            {/* <ListItem
              button
              selected={selectedIndexInfo === 1}
              onClick={(event) => handleListItemClick(event, 1)}
            >
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Edit Profile" style={{ color: "black" }} />
            </ListItem> */}

            <ListItem
              button
              selected={selectedIndexInfo === 2}
              onClick={(event) => handleListItemClick(event, 2)}
            >
              <ListItemIcon>
                <SmsIcon />
              </ListItemIcon>
              <ListItemText primary="Send SMS" style={{ color: "black" }} />
            </ListItem>

            <ListItem
              button
              selected={selectedIndexInfo === 2.5}
              onClick={(event) => handleListItemClick(event, 2.5)}
            >
              <ListItemIcon>
                <CallIcon />
              </ListItemIcon>
              <ListItemText
                primary="Make Live Call"
                style={{ color: "black" }}
              />
            </ListItem>

            <ListItem
              button
              selected={selectedIndexInfo === 3}
              onClick={(event) => handleListItemClick(event, 3)}
            >
              <ListItemIcon>
                <AudiotrackIcon />
              </ListItemIcon>
              <ListItemText
                primary="Make Pre-recorded Call"
                style={{ color: "black" }}
              />
            </ListItem>

            <ListItem
              button
              selected={selectedIndexInfo === 4}
              onClick={(event) => handleListItemClick(event, 4)}
            >
              <ListItemIcon>
                <DialpadIcon />
              </ListItemIcon>
              <ListItemText primary="Mass Dialer" style={{ color: "black" }} />
            </ListItem>
            <ListItem
              button
              selected={selectedIndexInfo === 4.5}
              onClick={(event) => handleListItemClick(event, 4.5)}
            >
              <ListItemIcon>
                <CallReceivedIcon />
              </ListItemIcon>
              <ListItemText primary="Receive call" style={{ color: "black" }} />
            </ListItem>
          </div>
        </List>
      </div>
      <footer />
    </>
  );
};

export default SelectedListItem;
