import React, { Component } from 'react';
import { withStyles } from '@mui/styles';
import { width } from '@mui/system';
import styles from "./styles/MiniPalleteStyles";
import DeleteIcon from '@mui/icons-material/Delete';




class MiniPallete extends Component{
    constructor(props){
        super(props);
        this.deletePallete = this.deletePallete.bind(this);
    }

    deletePallete(e){
        e.stopPropagation();
        this.props.openDialog(this.props.id);
    }

    render(){

    const {classes, paletteName, emoji, colors} = this.props;
    //console.log(colors);
    const miniColorBoxes = colors.map(c=>(
        <div className={classes.miniColor} style={{backgroundColor: c.color}} key={c.name} ></div> 
    ));
    //console.log(miniColorBoxes);

    return(
        <div className={classes.root} onClick={this.props.handleClick}>
            
                <DeleteIcon 
                className={classes.deleteIcon} 
                style={{transition: "all 0.3s ease-in-out"}}
                onClick={this.deletePallete}
                 />

            <div className={classes.colors}>{miniColorBoxes}</div>
            <h5 className={classes.title}>
                {paletteName} <span className={classes.emoji}>{emoji}</span>
            </h5>
        </div>
    );
    }
}

export default withStyles(styles)(MiniPallete);