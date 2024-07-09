import { Box, Button } from "@mui/material";
import notFound from "../assets/notFound.png";
import { useNavigate } from "react-router-dom";
const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      display={"flex"}
      height={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
        <img
          style={{
            marginBottom: "72px",
            width: "100%",
          }}
          src={notFound}
          alt="not found"
        />
        <Box
          display={"flex"}
          sx={{
            flexDirection: {
              xs: "column",
              sm: "row",
            },
            width: {
              xs: "90%",
              sm: "492px",
            },
          }}
          gap={"12px"}
        >
          <Button
            onClick={() => {
              navigate("/");
            }}
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#6200EE",
              ":hover": {
                backgroundColor: "#8133F1",
              },
            }}
          >
            Go Home Page
          </Button>
          <Button
            onClick={() => {
              window.location.reload();
            }}
            fullWidth
            variant="outlined"
            sx={{
              borderColor: "#6200EE",
              color: "#6200EE",
              ":hover": {
                borderColor: "#8133F1",
              },
            }}
          >
            Reload Page
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NotFound;
