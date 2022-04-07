import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import SubmitButton from "./UI/Button";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";

const MatterPortSpaceId = () => {
  const [mpId, setMpId] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    if (!mpId) {
      setError(true);
      return;
    }
    router.push(`/showcase?id=${mpId}`);
  }
  
  return (
    <>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" component="h4" sx={{ mb: "30px" }}>
          Mp Tile Extractor
        </Typography>
        <TextField
          error={error}
          id="outlined-basic"
          variant="outlined"
          label="Please enter matterport ID"
          value={mpId}
          onChange={(e) => setMpId(e.target.value)}
          sx={{ minWidth: "250px" }}
          required
        />
        {error && (
          <Typography sx={{ color: "red", textAlign: "right", my: "5px" }}>
            metaport id is required
          </Typography>
        )}
        <SubmitButton
          type="submit"
          variant="contained"
          size="large"
          onClick={handleClick}
        >
          Submit
        </SubmitButton>
      </Grid>
    </>
  );
};

export default MatterPortSpaceId;
