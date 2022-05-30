import React, { useEffect, useState, useRef } from "react";
import NoBalance from "../../../../Pages/NoBalance/NoBalance";
import CallCSS from "./Call.module.scss";
import { TextField, Box, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import axios from "axios";
import UploadFile from "../../../../Modules/UploadFile/UploadFile";
import AppBar from "../../../../UI/AppBar/AppBar";

const {
  BlobServiceClient,
  StorageSharedKeyCredential,
} = require("@azure/storage-blob");

const isBalance = localStorage.getItem("balance");

const isLoggedIn = localStorage.getItem("jwt");

const phone = localStorage.getItem("phone");

const Call = () => {
  const [uploading, setUploading] = useState(null);
  const [callSuccess, setCallSuccess] = useState(null);

  useEffect(() => {
    if (!isLoggedIn) {
      window.location = "/unauthorized";
    }
  }, []);

  const recipientRef = useRef();
  const uploadFileRef = useRef();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    if (!data.file) {
      console.log("exit");
      return;
    }
    const blobSasUrl =
      "https://moaz.blob.core.windows.net/?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2025-05-23T16:37:48Z&st=2022-05-23T08:37:48Z&spr=https,http&sig=5VMu4GsC6ErxjljvemjhdVQACdEs2k5OM25twiLJeNQ%3D";
    const blobServiceClient = new BlobServiceClient(blobSasUrl);

    const containerName = "test";
    const containerClient = blobServiceClient.getContainerClient(containerName);

    const blockBlobClient = containerClient.getBlockBlobClient(
      data.file[0].name
    );

    const blobOptions = {
      blobHTTPHeaders: { blobContentType: "audio/mpeg" },
    };

    setUploading(true);

    blockBlobClient
      .uploadBrowserData(data.file[0], blobOptions)
      .then((res) => {
        if (res.etag) {
          console.log(res);
          // setUploading(false);
        }
      })
      .catch((err) => console.log(err));

    const callStatus = await axios.post("http://localhost:4000/make-call", {
      headers: {
        fileName: data.file[0].name,
        phone: recipientRef.current.value,
      },
    });

    if (callStatus.data) {
      setCallSuccess(true);
    }

    // uploadFileRef.current.value = "";
    recipientRef.current.value = "";
  };

  return (
    <>
      <div className={CallCSS.container}>
        {isBalance == 0 ? (
          <NoBalance />
        ) : (
          <div className={CallCSS.container}>
            <form
              onSubmit={handleSubmit(onSubmit)}
              method="POST"
              enctype="multipart/form-data"
            >
              {/* <label htmlFor="myfile">Make a call</label> */}
              <AppBar title={"MAKE A CALL"} />

              <div>
                <Box width={350}>
                  <TextField
                    style={{ marginTop: "15px" }}
                    id="outlined-basic"
                    label="Sender phone number"
                    variant="outlined"
                    fullWidth
                    type="number"
                    inputRef={recipientRef}
                    required
                  />
                </Box>
              </div>
              <br></br>
              <Box width={350}>
                <input
                  type="file"
                  {...register("file")}
                  Inputref={uploadFileRef}
                />
                <Button
                  required
                  type="submit"
                  variant="contained"
                  style={{
                    backgroundColor: "#4250A7",
                    color: "white",
                    marginTop: "1rem",
                  }}
                  onClick={onSubmit}
                >
                  Send Now
                </Button>
                {/* {uploading && (
                  <p style={{ color: "green", marginTop: "0.8rem" }}>
                    Uploading file... please wait
                  </p>
                )}
                {callSuccess && (
                  <p style={{ color: "green", marginTop: "0.8rem" }}>
                    Call has been placed successfully
                  </p>
                )} */}
              </Box>
            </form>
          </div>
        )}
      </div>
      <div className={CallCSS.status}>
        {uploading && (
          <p style={{ color: "green", marginTop: "0.8rem" }}>
            Uploading file... please wait
          </p>
        )}
        {callSuccess && (
          <p style={{ color: "green", marginTop: "0.8rem" }}>
            Call has been placed successfully
          </p>
        )}
      </div>
    </>
  );
};

export default Call;
