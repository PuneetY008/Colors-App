import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
import PalleteFooter from './PalleteFooter';
import './Pallete.css';


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
        const { level,format } = this.state;
        const palleteName = this.props.pallete.paletteName;
        let colorBoxes = this.props.pallete.colors[this.state.level].map(c=>
                <ColorBox background={c[format]} name={c.name} key={c.id} id={c.id} palleteId={id} showLink />
            );
            
        return(
            <div className='Pallete'>
                {/***Navbar here */}
                <Navbar level={level} changeLevel = {this.changeLevel} handleChange= {this.changeFormat} showingAllColors />
                <div className='Pallete-colors'>
                    {/* Bunch of color boxes here */}
                    {colorBoxes}
                </div>
                {/***footer here */}
                <PalleteFooter palleteName={palleteName} emoji={this.props.pallete.emoji} />
                
            </div>
        );
    }
}

export default Pallete;