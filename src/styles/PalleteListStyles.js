import Sizes from "./Sizes";

export default{
    root: {
      backgroundColor: "blue",
      height: "100vh",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center"
    },
    container: {
      width: "50%",
      display: "flex",
      alignItems: "flex-start",
      flexDirection: "column",
      flexWrap: "wrap",
      [Sizes.down("xl")]: {
        width: "80%"
      },
      [Sizes.down("xl")]: {
        width: "75%"
      }
    },
    nav: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      color: "white",
      alignItems: "center",
      "& a": {
        color: "white"
      }
    },
    palettes: {
      boxSizing: "border-box",
      width: "100%",
      display: "grid",
      gridTemplateColumns: "repeat(3, 30%)",
      gridGap: "1.5rem",
      [Sizes.down("md")]: {
        gridTemplateColumns: "repeat(2,50%)"
      },
      [Sizes.down("xs")]: {
        gridTemplateColumns: "repeat(1,100%)"
      }
    }
  };