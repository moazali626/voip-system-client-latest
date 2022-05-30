// import * as React from "react";
// import { styled } from "@mui/material/styles";
// import Button from "@mui/material/Button";
// import IconButton from "@mui/material/IconButton";
// import PhotoCamera from "@mui/icons-material/PhotoCamera";
// import Stack from "@mui/material/Stack";

// const Input = styled("input")({
//   display: "none",
// });

// export default function UploadButtons() {
//   return (
//     <Stack direction="row" alignItems="center" spacing={2}>
//       <label htmlFor="contained-button-file">
//         <Input
//           accept="image/*"
//           id="contained-button-file"
//           multiple
//           type="file"

//         />
//         <Button variant="contained" component="span">
//           Upload
//         </Button>
//       </label>
//       {/* <label htmlFor="icon-button-file">
//         <Input accept="image/*" id="icon-button-file" type="file" />
//         <IconButton
//           color="primary"
//           aria-label="upload picture"
//           component="span"
//         >
//           <PhotoCamera />
//         </IconButton>
//       </label> */}
//     </Stack>
//   );
// }
// // import React, { useEffect } from "react";
// // import UploadFileCSS from "./UploadFile.module.scss";
// // const { BlobServiceClient } = require("@azure/storage-blob");

// // const isLoggedIn = localStorage.getItem("jwt");

// // const UploadFile = () => {
// //   useEffect(() => {
// //     if (!isLoggedIn) {
// //       window.location = "/unauthorized";
// //     }
// //   }, []);
// //   const sasToken =
// //     "?sv=2020-08-04&ss=bfqt&srt=sco&sp=rwdlacupitfx&se=2024-05-01T17:00:14Z&st=2022-05-01T09:00:14Z&spr=https,http&sig=PXp3GV4DMeRO4BdZiXWJApfm2BvODkKrqz%2BSZnFXHbQ%3D";
// //   const containerName = `test`;
// //   const storageAccountName = "moaz";

// //   const uploadFileToBlob = async (e) => {
// //     const formData = new FormData();
// //     formData.append("file", e.target.files[0]);

// //     console.log(formData);

// //     if (!formData) return [];

// //     // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
// //     const blobService = new BlobServiceClient(
// //       `https://${storageAccountName}.blob.core.windows.net/?${sasToken}`
// //     );
// //     // get Container - full public read access
// //     const containerClient = blobService.getContainerClient(containerName);

// //     // upload file
// //     await createBlobInContainer(containerClient, formData);

// //     // get list of blobs in container
// //     return getBlobsInContainer(containerClient);
// //   };
// //   return (
// //     <div className={UploadFileCSS.container}>
// //       <input type="file" onChange={uploadFileToBlob} />
// //       {/* <button type="submit" onClick={uploadFileToBlob}>
// //         Upload!
// //       </button> */}
// //     </div>
// //   );
// // };

// // export default UploadFile;
