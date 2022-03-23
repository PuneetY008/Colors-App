import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPallete from './MiniPallete';
import { withStyles } from '@mui/styles';
import styles from './styles/PalleteListStyles';
import {
    CSSTransition,
    TransitionGroup,
  } from 'react-transition-group';

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
                        <h1 className={classes.heading }>React Colors</h1>
                        <Link to='/pallete/new'>Create Pallete</Link>
                    </nav>
                        <TransitionGroup className={classes.palettes}>
                            {palletes.map(pallete => (
                            <CSSTransition key={pallete.id} classNames='fade' timeout={2500}>
                                <MiniPallete {...pallete} 
                                    handleClick={()=> this.goToPallete(pallete.id)} 
                                    handleDelete={this.props.deletePallete}
                                    key={pallete.id}
                                    id={pallete.id}
                                />
                            </CSSTransition>
                            ))}
                        </TransitionGroup>   
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(PalleteList);