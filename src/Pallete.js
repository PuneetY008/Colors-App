import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PalleteFooter from './PalleteFooter';
import { withStyles } from '@mui/styles';
import './Pallete.css';


const styles = {
    Pallete: {
      height: "100vh",
      display: "flex",
      flexDirection: "column"
    },
    colors: {
      height: "90%"
    }
  };

class Pallete extends Component{
    constructor(props){
        super(props);
        this.state = {level: 500, format: "hex"};
        this.changeLevel = this.changeLevel.bind(this);
        this.changeFormat = this.changeFormat.bind(this);
    }

    changeLevel(level){
        this.setState({level});
    }

    changeFormat(val){
        this.setState({format: val});
    }

    render(){
        const { colors,id } = this.props.pallete;
        const { classes } = this.props;
        const { level,format } = this.state;
        const palleteName = this.props.pallete.paletteName;
        let colorBoxes = this.props.pallete.colors[this.state.level].map(c=>
                <ColorBox background={c[format]} name={c.name} key={c.id} id={c.id} palleteId={id} showingFullPallete />
            );
            
        return(
            <div className={classes.Pallete}>
                {/***Navbar here */}
                <Navbar level={level} changeLevel = {this.changeLevel} handleChange= {this.changeFormat} showingAllColors />
                <div className={classes.colors}>
                    {/* Bunch of color boxes here */}
                    {colorBoxes}
                </div>
                {/***footer here */}
                <PalleteFooter palleteName={palleteName} emoji={this.props.pallete.emoji} />
                
            </div>
        );
    }
}

export default withStyles(styles)(Pallete);