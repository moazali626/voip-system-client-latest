import React, { useReducer } from "react";
import ProfileInformationCSS from "./ProfileInformation.module.scss";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import axios from "axios";

const localName = localStorage.getItem("name");
const localEmail = localStorage.getItem("email");
const localId = localStorage.getItem("id");

const initial = {
  name: localName,
  nameIsValid: false,

  email: localEmail,
  emailIsValid: false,

  currentPassword: "",
  newPassword: "",
  confirmNewPassword: "",

  basicInfoSaved: "",
  passInfoSaved: "",
  // profileError: "",
  passError: "",
};

const reducer = (state, action) => {
  const { type, payload } = action;
  return { ...state, [type]: payload };
};

const ProfileInformation = () => {
  const [state, dispatch] = useReducer(reducer, initial);

  const {
    name,
    email,

    currentPassword,
    newPassword,
    confirmNewPassword,

    basicInfoSaved,
    passInfoSaved,

    // profileError,
    passError,
    nameIsValid,
    emailIsValid,
  } = state;

  const newNameHandler = (e) => {
    dispatch({ type: "name", payload: e.target.value });

    // const string = /^[A-Za-z_ ]{4,}$/;
    // const regexTest = string.test(e.target.value.trim());
    // if (regexTest) {
    //   dispatch({ type: "nameIsValid", payload: true });
    // }
  };

  const newEmailHandler = (e) => {
    dispatch({ type: "email", payload: e.target.value });

    // const string =
    //   /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // const regexTest = string.test(e.target.value.trim());
    // if (regexTest) {
    //   dispatch({ type: "emailIsValid", payload: true });
    // }
  };

  const basicInfoHandler = async () => {
    const request = await axios.patch(
      "http://localhost:4000/update-basic-profile",
      {
        id: localId,
        updates: {
          name: name,
          email: email,
        },
      }
    );

    if (request.status == 200) {
      dispatch({ type: "basicInfoSaved", payload: true });
      localStorage.setItem("name", name);
      localStorage.setItem("email", email);
    }
  };

  const passHandler = async () => {
    dispatch({ type: "passError", payload: "" });
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      dispatch({
        type: "passError",
        payload: "All password fields are required to be filled",
      });
      return;
    }

    if (newPassword === confirmNewPassword) {
      const string = /^((?=.*\d)(?=.*[A-Z])(?=.*\W).{8,})$/;
      const regexTest = string.test(newPassword.trim());

      if (!regexTest) {
        dispatch({
          type: "passError",
          payload:
            "New Password must be 8 characters long with 1 number, 1 lowercase, 1 uppercase & 1 special character",
        });
        return;
      }
    } else if (newPassword !== confirmNewPassword) {
      dispatch({
        type: "passError",
        payload: "New Password & Confirm New Password must match",
      });
      return;
    }

    const request = await axios.patch(
      "http://localhost:4000/update-pass-profile",
      {
        id: localId,
        updates: {
          currentPass: currentPassword,
          newPass: newPassword,
        },
      }
    );

    if (request.data.error == "passNotMatch") {
      return dispatch({
        type: "passError",
        payload: "Current Password is Wrong",
      });
    }
    if (request.status === 200) {
      dispatch({ type: "passInfoSaved", payload: true });
    }
  };

  const isBasicInfoChanged = name != localName || email != localEmail;

  return (
    <div className={ProfileInformationCSS.container}>
      <div className={ProfileInformationCSS.wrapper}>
        <h3>Edit Profile</h3>
        <TextField
          id={ProfileInformationCSS["full-name"]}
          className={ProfileInformationCSS["profile-info-wrapper"]}
          label="Full Name"
          variant="outlined"
          margin="dense"
          value={name}
          InputLabelProps={{ shrink: true }}
          onChange={newNameHandler}
          style={{ width: "100%", maxWidth: "320px" }}
        />

        <TextField
          id={ProfileInformationCSS["email"]}
          className={ProfileInformationCSS["profile-info-wrapper"]}
          label="Email"
          variant="outlined"
          margin="dense"
          type="email"
          value={email}
          onChange={newEmailHandler}
          InputLabelProps={{ shrink: true }}
          style={{ width: "100%", maxWidth: "320px" }}
        />

        {/* {profileError && (
          <p className={ProfileInformationCSS["error-msg"]}>{profileError}</p>
        )} */}

        {basicInfoSaved && (
          <p className={ProfileInformationCSS["info-saved"]}>
            Profile Information has been updated successfully
          </p>
        )}

        <Button
          id={ProfileInformationCSS["basic-info-btn"]}
          style={{ padding: "0.4rem 2rem", margin: "1rem 0rem" }}
          variant="outlined"
          color="primary"
          type="submit"
          disabled={!isBasicInfoChanged}
          onClick={basicInfoHandler}
        >
          Submit
        </Button>

        <TextField
          id={ProfileInformationCSS["current-password"]}
          className={ProfileInformationCSS["profile-info-wrapper"]}
          label="Current Password"
          variant="outlined"
          margin="dense"
          type="password"
          onChange={(e) => {
            // setCurrentPassword(e.target.value);
            dispatch({ type: "currentPassword", payload: e.target.value });
          }}
          style={{ width: "100%", maxWidth: "320px" }}
        />

        <TextField
          id={ProfileInformationCSS["new-password"]}
          className={ProfileInformationCSS["profile-info-wrapper"]}
          label="New Password"
          variant="outlined"
          margin="dense"
          type="password"
          onChange={(e) => {
            dispatch({ type: "newPassword", payload: e.target.value });
          }}
          style={{ width: "100%", maxWidth: "320px" }}
        />

        <TextField
          id={ProfileInformationCSS["confirm-new-password"]}
          className={ProfileInformationCSS["profile-info-wrapper"]}
          label="Confirm New Password"
          variant="outlined"
          margin="dense"
          type="password"
          onChange={(e) => {
            dispatch({ type: "confirmNewPassword", payload: e.target.value });
          }}
          style={{ width: "100%", maxWidth: "320px" }}
        />

        {passInfoSaved && (
          <p className={ProfileInformationCSS["info-saved"]}>
            Password has been updated Successfully
          </p>
        )}

        {passError && (
          <p className={ProfileInformationCSS["error-msg"]}>{passError}</p>
        )}

        <Button
          style={{ padding: "0.4rem 2rem", marginTop: "1rem" }}
          variant="outlined"
          color="primary"
          type="submit"
          onClick={passHandler}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ProfileInformation;
