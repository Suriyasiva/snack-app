import React from "react";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function DummyPage() {
  return (
    <Backdrop
      sx={{
        color: "#03045e",
        backgroundColor: "#fff",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={"false"}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
export default DummyPage;
