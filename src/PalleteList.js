import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPallete from './MiniPallete';
import { withStyles } from '@mui/styles';
import styles from './styles/PalleteListStyles';

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
                        <Link to='/pallete/new'>Create Pallete</Link>
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