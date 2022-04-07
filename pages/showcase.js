import React, { useEffect, useState, useRef } from "react";
import { Grid, Button } from "@mui/material";
import { useRouter } from "next/router";
import CameraController from "../components/MPControllers/CameraController";

const Showcase = () => {
  const [state, setState] = useState("");
  const [moveToPoint, setMoveToPoint] = useState([]);
  const [isSelected, setSelected] = useState(false)
  const {query: { id: id }} = useRouter();

  const getIframe = async () => {
    const iframe = document.getElementById("showcase-iframe");
    try {
      const mpSdk = await window.MP_SDK.connect(
        iframe,
        "49ne7ss7tudeapfuzqe6k9nfd",
        " "
      );
      setState(mpSdk);
      onshowcaseConnect(mpSdk);
    } catch (e) {
      console.error(e, "errror");
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {   
       getIframe();
    }
  }, [id]);

  console.log("moveToPoint",moveToPoint)
  const onshowcaseConnect = async (mpSdk) => {
    try {
      mpSdk.Sweep.data.subscribe({
        onCollectionUpdated: function (collection) {
          setMoveToPoint(Object.values(collection));
        },
      });
      rotateMethode(mpSdk)
    } catch (e) {
      console.error(e, "error");
    }
  };

const rotateMethode =(mpSdk)=>{
const mode = mpSdk.Mode.Mode.FLOORPLAN;
const position = {x: 0, y: 0, z: 0};
const rotation = {x: -90, y: 0};
const transition = mpSdk.Mode.Transition.FLY;
const zoom = 5;

mpSdk.Mode.moveTo(mode, {
    position: position,
    rotation: rotation,
    transition: transition,
    zoom,
  })
  .then(function(nextMode){
    // Move successful.
    console.log('Arrived at new view mode ' + nextMode);
  })
  .catch(function(error){
    // Error with moveTo command
  });
  }

  const rotate = () => {
    try {
      const rotation = { x: -90, y: 0 };
      const position = { x: 0, y: 0, z: 0 };
      const zoom = 5;
      const transition = 2000;
      state.Mode.moveTo("mode.floorplan", {
        position: position,
        rotation: rotation,
        zoom,
      });
    } catch (e) {
      console.error(e, "error");
    }
  };

  const handleMove = async (sweepId) => {
    setSelected(!isSelected)
    const rotation = { x: 0, y: 270 };
    const transition = state.Sweep.Transition.FLY;
    const transitionTime = 2000; 
    try {
      state.Sweep.moveTo(sweepId, {
        rotation: rotation,
        transition: transition,
        transitionTime: transitionTime,
      });
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <Grid container spacing={2} sx={{ m: 2 }}>
      <Grid item xs={6}>
        <iframe
          width="100%"
          height="50vh"
          src={`https://my.matterport.com/show/?m=${id}&play=1&applicationKey=49ne7ss7tudeapfuzqe6k9nfd`}
          frameBorder="0"
          allow="xr-spatial-tracking"
          style={{
            height: "75vh",
          }}
          id="showcase-iframe"
        />
      </Grid>
      <Grid item xs={4}>
        <Grid container>
          {moveToPoint.length &&
            moveToPoint.map((point, index) => {
              return (
                <Grid xs={2} item key={point.id}>
                  <Button
                    onClick={() => handleMove(point.sid)}
                    variant="outlined"
                    sx={{ m: 1 ,'&:hover': {
                      backgroundColor: '#3f50b5',
                      color: '#fff',
                  }, }}
                  >
                    {index + 1}
                  </Button>
                </Grid>
              );
            })}
        </Grid>
      </Grid>
      <Grid container sx={{m:2}}>
      <CameraController   mpSdk={state}/>
      </Grid>
    </Grid>
  );
};

export default Showcase;
