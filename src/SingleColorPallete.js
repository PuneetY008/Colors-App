import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PalleteFooter from './PalleteFooter';
import { withStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import styles from './styles/PalleteStyles';




class SingleColorPallete extends Component{
    constructor(props){
        super(props);
        this._shades = this.gatherShades(this.props.pallete,this.props.colorId);
        this.state = {
            format: "hex"
        }
        this.changeFormat = this.changeFormat.bind(this);
    }

    gatherShades(pallete, colorToFilterBy){
        let shades = [];
        let allColors = pallete.colors;

        for(let key in allColors){
            shades = shades.concat(allColors[key].filter(color=> color.id === colorToFilterBy));

        }
        return shades.slice(1);
    }

    changeFormat(val){
        this.setState({format: val});
    }

    render(){
        const {format} = this.state;
        const { classes } = this.props;
        const {id} = this.props.pallete;
        const colorBoxes = this._shades.map(color=>(
            <ColorBox 
            key={color.name}
            name={color.name}
            background = {color[format]}
            showingFullPallete={false}
            />
        ));
        return(
            <div className= {classes.Palette}>
                <Navbar handleChange= {this.changeFormat} showingAllColors={false} />
                 
                 <div className={classes.colors}>
                    {colorBoxes}
                    <div className={classes.goBack}>
                        <Link to= {`/pallete/${id}`} className='back-button'>Go Back</Link>
                    </div>
                </div>
                 <PalleteFooter palleteName={this.props.pallete.paletteName} emoji={this.props.pallete.emoji} />
            </div>
        );
    }
}

export default withStyles(styles)(SingleColorPallete);