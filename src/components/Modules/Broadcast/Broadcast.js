import React, { useEffect, useState, useRef } from "react";
import { Redirect } from "react-router";
import NoBalance from "../../../../src/components/Pages/NoBalance/NoBalance";
import BroadcastCSS from "./Broadcast.module.scss";
import { TextField, Box, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import axios from "axios";
import AppBar from "../../../components/UI/AppBar/AppBar";
import socket from "../../../utils/SocketIo";
import validator from "validator";

const {
  BlobServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");

const isBalance = localStorage.getItem("balance");

const isLoggedIn = localStorage.getItem("jwt");

const phone = localStorage.getItem("phone");
// localStorage.setItem("duration", 0);

const Broadcast = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [uploading, setUploading] = useState(null);
  const [phoneError, setPhoneError] = useState();
  const [callBackStatus, setCallBackStatus] = useState({});
  const [phoneNumbers, setPhoneNumbers] = useState([]);
  const [totalCallDuration, setTotalCallDuration] = useState();
  const [phoneLength, setPhoneLength] = useState();
  const [totalCost, setTotalCost] = useState();

  useEffect(() => {
    if (!isLoggedIn) {
      window.location = "/unauthorized";
    }
    socket.on("disconnect", () => {
      console.log("Socked disconnected from massDialer Component");
    });
  }, []);

  useEffect(() => {
    socket.on("outgoing-status", (data) => {
      console.log("Original CallBack Status Data", data);
      setCallBackStatus(data);
      if (data.CallDuration && phoneNumbers.length == 0) {
        console.log("Length", phoneNumbers.length);
        console.log("binary if ran");
        // setTotalCallDuration(data.CallDuration);
        localStorage.setItem("duration", data.CallDuration);
      }
      if (data.CallStatus == "completed") {
        console.log("Waiting for 3 seconds");
        setTimeout(() => {
          const makeNextCall = async () => {
            if (phoneNumbers.length > 0) {
              const currentPhoneNumber = phoneNumbers.shift();
              console.log(currentPhoneNumber);
              console.log("New Array", phoneNumbers);
              await axios.post("http://localhost:4000/mass-dialer", {
                headers: {
                  fileName: selectedFile.name,
                  phone: currentPhoneNumber,
                },
              });
            } else {
              console.log("all calls done");
              if (phoneNumbers.length == 0) {
                const duration = localStorage.getItem("duration");
                const length = localStorage.getItem("length");
                const totalCostInSeconds = duration * length;
                setTotalCost(totalCostInSeconds);
                // console.log("redirect if ran");
                // window.location = "/mass-dialer-bill";
                console.log("all done");
              }

              // <Redirect to="/mass-dialer-bill" bill="$100" />;
              return false;
            }
          };
          makeNextCall();
        }, 5000);
      } else {
        console.log("red flag");
        // console.log("else ran");
      }
    });
    if (phoneNumbers.length > 0) {
      const currentPhoneNumber = phoneNumbers.shift();
      console.log("Current Phone Number", currentPhoneNumber);
      console.log("New Array", phoneNumbers);

      const makeCall = async () => {
        if (selectedFile) {
          const callStatus = await axios.post(
            "http://localhost:4000/mass-dialer",
            {
              headers: {
                fileName: selectedFile.name,
                phone: currentPhoneNumber,
              },
            }
          );
        } else {
          console.log("No file available");
        }
      };
      makeCall();
    } else {
      console.log("UseEffect not ran");
    }
  }, [phoneNumbers]);

  useEffect(() => {
    console.log("Removing USEEFFECT STATEMENTS");
    localStorage.removeItem("duration");
    localStorage.removeItem("length");
  }, []);

  const recipientRef = useRef();

  // const { register, handleSubmit } = useForm();

  const onSubmit = async () => {
    localStorage.setItem("fileName", selectedFile.name);

    const checkAllPhones = recipientRef.current.value.split(",");
    const checkAllPhonesLength = checkAllPhones.length;

    setPhoneLength(checkAllPhonesLength);
    localStorage.setItem("length", checkAllPhonesLength);

    for (let i = 0; i < checkAllPhonesLength; i++) {
      const isValid = validator.isMobilePhone(checkAllPhones[i]);
      if (isValid != true) {
        setPhoneError(true);
        return false;
      } else {
        setPhoneError(false);
      }
    }

    const uploadFileToAzure = async () => {
      const blobSasUrl =
        "https://moaz.blob.core.windows.net/?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2025-05-23T16:37:48Z&st=2022-05-23T08:37:48Z&spr=https,http&sig=5VMu4GsC6ErxjljvemjhdVQACdEs2k5OM25twiLJeNQ%3D";
      const blobServiceClient = new BlobServiceClient(blobSasUrl);

      const containerName = "test";
      const containerClient =
        blobServiceClient.getContainerClient(containerName);

      const blockBlobClient = containerClient.getBlockBlobClient(
        selectedFile.name
      );

      const blobOptions = {
        blobHTTPHeaders: { blobContentType: "audio/mpeg" },
      };

      setUploading(true);

      blockBlobClient
        .uploadBrowserData(selectedFile, blobOptions)
        .then((res) => {
          if (res.etag) {
            console.log("Res", res);
            const allPhones = recipientRef.current.value.split(",");
            console.log(allPhones);
            setPhoneNumbers(allPhones);
            setUploading(false);
          }
        })
        .catch((err) => console.log(err));
    };

    uploadFileToAzure();
  };

  const uploadFileHandler = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  return (
    <div className={BroadcastCSS.container}>
      {isBalance == 0 ? (
        <NoBalance />
      ) : (
        <div className={BroadcastCSS.container}>
          <AppBar color="secondary" title={"MASS DIALER"} />
          <div>
            <Box width={350}>
              <TextField
                style={{ marginTop: "15px" }}
                id="outlined-basic"
                label="Phone numbers separated by comma"
                variant="outlined"
                fullWidth
                inputRef={recipientRef}
                required
              />
            </Box>
          </div>
          <br></br>
          <Box width={350}>
            <input
              type="file"
              accept=".mp3,audio/*"
              required
              onChange={uploadFileHandler}
              style={{ marginRight: "1.8rem", marginBottom: "1.4rem" }}
            />
            {phoneError && (
              <p
                style={{
                  color: "red",
                  marginRight: "4.4rem",
                  marginBottom: "1rem",
                }}
              >
                Invalid Phone Numbers Format
              </p>
            )}
            <Button
              required
              type="submit"
              variant="contained"
              color="primary"
              style={{
                marginTop: "1.5 rem",
                marginRight: "11.2rem",
              }}
              onClick={selectedFile ? onSubmit : () => {}}
            >
              Broadcast NOW
            </Button>
            {uploading && (
              <p
                style={{
                  color: "green",
                  marginTop: "1rem",
                  marginRight: "6.5rem",
                }}
              >
                Uploading file... please wait
              </p>
            )}
          </Box>
          {callBackStatus.Called && (
            <div style={{ marginTop: "1rem" }}>
              <p style={{ textAlign: "left", color: "green" }}>
                <span style={{ color: "red" }}>Calling: </span>
                {callBackStatus.Called && callBackStatus.Called}
              </p>
              <p style={{ textAlign: "left", color: "green" }}>
                <span style={{ color: "red" }}>Call Status: </span>
                {callBackStatus.CallStatus && callBackStatus.CallStatus}
              </p>
              <p style={{ textAlign: "left", color: "green" }}>
                <span style={{ color: "red" }}>Called Country: </span>
                {callBackStatus.CalledCountry && callBackStatus.CalledCountry}
              </p>
            </div>
          )}
          {totalCost && callBackStatus.CallStatus == "completed" && (
            <Redirect to="mass-dialer-bill" />
          )}
        </div>
      )}
    </div>
  );
};

export default Broadcast;
