import React, { useRef, useState } from "react";
import ConvetToMP3CSS from "./ConvertToMP3.module.scss";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import axios from "axios";
import FileDownload from "js-file-download";
import { Link } from "react-router-dom";

const ConvertToMP3 = () => {
  const [isConverting, setIsConverting] = useState(false);
  const textRef = useRef();

  const submitHandler = async () => {
    if (!textRef.current.value) {
      return;
    }
    // console.log(textRef.current.value);
    setIsConverting(true);
    const text = textRef.current.value;
    await axios.post("http://localhost:4000/text-to-mp3", {
      headers: {
        text,
      },
    });

    textRef.current.value = "";

    axios({
      url: "http://localhost:4000/download-converted-file",
      method: "GET",
      responseType: "blob",
    }).then((res) => {
      FileDownload(res.data, "audio.mp3");
    });
    setIsConverting(false);
  };

  return (
    <>
      <div className={ConvetToMP3CSS.container}>
        <div>
          <h4 style={{ marginBottom: " 1rem" }}>Convert Text to MP3</h4>
        </div>
        <div>
          <TextField
            required
            variant="outlined"
            label="Enter text"
            inputProps={{
              style: {
                // height: "100px",
                width: "300px",
              },
            }}
            inputRef={textRef}
          />
        </div>
        <Button
          style={{
            marginTop: "1rem",
          }}
          color="primary"
          variant="outlined"
          onClick={submitHandler}
        >
          Convert Now
        </Button>

        <Link to="/mass-dialer" style={{ textDecoration: "none" }}>
          <Button
            variant="outlined"
            color="secondary"
            style={{
              marginTop: "1rem",
              marginLeft: "0.5rem",
              padding: "0.3rem 3.1rem",
            }}
          >
            GO Back
          </Button>
        </Link>
      </div>
      <div className={ConvetToMP3CSS.message}>
        {isConverting && (
          <p style={{ color: "green", marginTop: "0.5rem" }}>
            Converting, Please wait...
          </p>
        )}
      </div>
    </>
  );
};

export default ConvertToMP3;
