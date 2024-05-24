import { Box, Button } from "@mui/material";
import { v4 } from "uuid";
import { FC, useEffect, useState } from "react";
import issuer1BG from "@/public/issuer1.png";

const Issuer1Page: FC = () => {
  const useDeepLink = () => {
    const url = "https://dummy.com"; // issuer 1 backend
    const uuid = v4();
    window.open("wwwallet://issue?url=" + url + "&randomString=" + uuid);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        justifyContent: "start",
        alignItems: "center",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        overflow: "auto",
        backgroundImage: 'url("/issuer1.png")',
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          padding: "16px",
          alignSelf: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ fontSize: 28 }}>Issuer 1 Main Page</Box>
        <Box sx={{ flex: 1 }}>
          <Button onClick={useDeepLink}>{"졸업 증명서 발급받기"}</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Issuer1Page;
