import React from "react";
import { withStyles } from "@mui/styles";
import DeleteIcon from '@mui/icons-material/Delete';
import { SortableElement } from "react-sortable-hoc";

const styles = {
  root: {
    width: "20%",
    height: "25%",
    margin: "0 auto",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    "&:hover svg": {
      color: "white",
      transform: "scale(1.5)",
      transition: "all 0.5s ease-in-out"
    }
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    color: "rgba(0, 0, 0, 0.5)",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between"
  }

};

const DraggableColorBox = SortableElement((props)=> {
  const {classes,handleClick,color,name} = props;
  return (
    <div
      className={classes.root}
      style={{ backgroundColor: color }}
    >
      <div className={classes.boxContent}> 
        <span>{name}</span>
        <DeleteIcon className={classes.deleteIcon} onClick={handleClick} />
      </div>
      
    </div>
  );
});

export default withStyles(styles)(DraggableColorBox);