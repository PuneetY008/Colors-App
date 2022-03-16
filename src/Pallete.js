import React, { Component } from 'react';
import ColorBox from './ColorBox';
import Navbar from './Navbar';
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
        const { colors } = this.props.pallete;
        const { level,format } = this.state;
        let colorBoxes = this.props.pallete.colors[this.state.level].map(c=>
                <ColorBox background={c[format]} name={c.name} />
            );
            
        return(
            <div className='Pallete'>
                {/***Navbar here */}
                <Navbar level={level} changeLevel = {this.changeLevel} handleChange= {this.changeFormat} />
                <div className='Pallete-colors'>
                    {/* Bunch of color boxes here */}
                    {colorBoxes}
                </div>
                {/***footer here */}
            </div>
        );
    }
}

export default Pallete;