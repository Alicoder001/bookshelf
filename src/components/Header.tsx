import React, { ChangeEvent, useState } from "react";
import {
  AppBar,
  Typography,
  Box,
  Container,
  TextField,
  InputAdornment,
  IconButton,
  Avatar,
} from "@mui/material";
import { HighlightOff } from "@mui/icons-material";
import logo from "../assets/logo.svg";
import search from "../assets/search.svg";
import searchLight from "../assets/search-light.svg";

import bell from "../assets/bell.svg";
import { deepPurple } from "@mui/material/colors";
import { searchBook } from "../services/api";
// import { useDispatch } from "react-redux";

const Header: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  // const dispatch = useDispatch();

  const handleChange = async (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    try {
      const books = await searchBook(event.target.value);
      console.log(books);
      // dispatch(setBook(books.data));
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = () => {
    setInputValue("");
  };
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
        padding: "12px 0",
      }}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1440px!important",
          width: "100%",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            gap: "25px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
            }}
          >
            <img src={logo} alt="logo" />
            <Typography
              sx={{
                fontSize: "18px",
                fontWeight: "700",
                letterSpacing: "0.576px",
                lineHeight: 1.2,
                color: "#6200EE",
              }}
            >
              Book{" "}
              <Box component={"span"} sx={{ color: "white" }}>
                List
              </Box>
            </Typography>
          </Box>
          <TextField
            placeholder="Search for any training you want"
            value={inputValue}
            onChange={handleChange}
            sx={{
              maxWidth: "380px",
              width: "100%",
              backgroundColor: "transparent",
              borderRadius: "6px",
              fontSize: "16px",
              color: "white",
              lineHeight: "normal",

              "::placeholder": {
                color: "white",
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  border: "none",
                },
                "&:hover fieldset": {
                  border: "none",
                },
                "&.Mui-focused fieldset": {
                  border: "none",
                  "&.search-black": {
                    display: "block",
                  },
                },
                "&.Mui-focused": {
                  backgroundColor: "white",
                  color: "black",
                },
                "& .MuiInputBase-input::placeholder": {
                  color: "white",
                },
                "&.Mui-focused .MuiInputBase-input::placeholder": {
                  color: "black",
                },
                "&.Mui-focused .search-black": {
                  display: "block!important",
                },
                "&.Mui-focused .search-light": {
                  display: "none",
                },
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <img
                    className="search-black"
                    style={{
                      display: "none",
                    }}
                    src={search}
                    alt="search"
                  />
                  <img
                    className="search-light"
                    src={searchLight}
                    alt="search-light"
                  />
                </InputAdornment>
              ),
              endAdornment: inputValue ? (
                <InputAdornment position="end">
                  <IconButton onClick={handleClear}>
                    <HighlightOff />
                  </IconButton>
                </InputAdornment>
              ) : null,
            }}
          />
        </Box>
        <Box display={"flex"} gap={"22px"} alignItems={"center"}>
          <img src={bell} alt="" />
          <Avatar
            sx={{
              bgcolor: deepPurple[500],
              width: "32px",
              height: "32px",
              fontSize: "14px",
              backgroundColor: "gray",
              ":hover": {
                cursor: "pointer",
              },
            }}
          >
            OP
          </Avatar>
        </Box>
      </Container>
    </AppBar>
  );
};

export default Header;
