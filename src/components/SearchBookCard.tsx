import { Typography, Grid, Skeleton } from "@mui/material";
import { SearchBook } from "../types";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

const SearchBookCard: React.FC<{ book: SearchBook }> = ({ book }) => {
  const { searchLoading } = useSelector((state: RootState) => state.book);

  if (searchLoading) {
    return (
      <Grid
        sx={{
          padding: "32px",
          borderRadius: "12px",
          backgroundColor: "#FEFEFE",
          border: "1px solid #EBEBEB",
          width: "100%",
          boxShadow: "0px 4px 24px 0px rgba(51, 51, 51, 0.08)",
          position: "relative",
        }}
      >
        <Skeleton variant="text" width="60%" height={30} />
        <Skeleton variant="text" width="40%" height={20} />
        <Skeleton variant="text" width="40%" height={20} />
        <Skeleton variant="text" width="40%" height={20} />
        <Skeleton variant="text" width="80%" height={20} />
      </Grid>
    );
  }

  return (
    <Grid
      sx={{
        padding: "32px",
        borderRadius: "12px",
        backgroundColor: "#FEFEFE",
        border: "1px solid #EBEBEB",
        width: "100%",
        boxShadow: "0px 4px 24px 0px rgba(51, 51, 51, 0.08)",
        position: "relative",
        ":hover .edit-delete": {
          display: "flex !important",
        },
      }}
    >
      <Typography
        variant="h5"
        fontSize={"16px"}
        lineHeight={"normal"}
        color={"#151515"}
        fontWeight={600}
        fontFamily={'"Montserrat","Arial",sans-serif'}
        marginBottom={"6px"}
      >
        {book.title || "N/A"}
      </Typography>
      <Typography variant="body2">
        Cover:{" "}
        <a style={{ textDecoration: "none" }} href={book.cover || "#"}>
          {(book.cover || "").slice(0, 30) + "..."}
        </a>
      </Typography>
      <Typography variant="body2">Pages: {book.pages || "N/A"}</Typography>
      <Typography variant="body2">
        Published: {book.published || "N/A"}
      </Typography>
      <Typography variant="body2" marginBottom={"20px"}>
        ISBN: {book.isbn || "N/A"}
      </Typography>
    </Grid>
  );
};

export default SearchBookCard;
