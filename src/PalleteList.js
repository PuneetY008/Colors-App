import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPallete from './MiniPallete';
import { withStyles } from '@mui/styles';

const styles = {
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
      flexWrap: "wrap"
    },
    nav: {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      color: "white"
    },
    palettes: {
      boxSizing: "border-box",
      width: "100%",
      display: "grid",
      gridTemplateColumns: "repeat(3, 30%)",
      gridGap: "5%"
    }
  };

class PalleteList extends Component{

    goToPallete(id){
        this.props.history.push(`/pallete/${id}`);
    }
    render(){
        const {palletes, classes} = this.props;
        return(
            <div className= {classes.root}>
                <div className={classes.container}>
                    <nav className={classes.nav}>
                        <h1>React Colors</h1>
                    </nav>
                    <div className={classes.palettes} >
                        {palletes.map(pallete => (
                            <MiniPallete {...pallete} handleClick={()=> this.goToPallete(pallete.id)} />     
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(PalleteList);