import React, { useState } from "react";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { saveAs } from "file-saver";
import { Button } from "@mui/material";

const CameraController = ({ mpSdk }) => {
  const handleTakePicture = async () => {
    const resolution = {
      width: 4096,
      height: 4096,
    };
    const visibility = {
      mattertags: false,
      sweeps: true,
    };
    try {
      const res = await mpSdk.Renderer.takeScreenShot(resolution, visibility);
      saveAs(res, "image.JPEG");
    } catch (error) {
      console.log("An error occured while moving in that direction.", error);
    }
  };

  return (
    <Button variant="contained" onClick={handleTakePicture}>
      <CameraAltIcon />
    </Button>
  );
};

export default CameraController;
