import React, { Component } from 'react';
import ColorBox from './ColorBox';


class SingleColorPallete extends Component{
    constructor(props){
        super(props);
        this._shades = this.gatherShades(this.props.pallete,this.props.colorId);
    }

    gatherShades(pallete, colorToFilterBy){
        let shades = [];
        let allColors = pallete.colors;

        for(let key in allColors){
            shades = shades.concat(allColors[key].filter(color=> color.id === colorToFilterBy));

        }
        return shades.slice(1);
    }
    render(){
        const colorBoxes = this._shades.map(color=>(
            <ColorBox 
            key={color.id}
            name={color.name}
            background = {color.hex}
            showLink={false}
            />
        ));
        return(
            <div className='Pallete'>
                 <h1>Single Color Pallete</h1>
                 <div className='Pallete-colors'>{colorBoxes}</div>
            </div>
        );
    }
}

export default SingleColorPallete;