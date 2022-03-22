import React, { Component } from 'react';
import classNames from "classnames";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { Menu } from "@mui/icons-material";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import PalleteMetaForm from './PalleteMetaForm';

const drawerWidth = 400;

const styles = theme =>({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    height: "64px"
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20
  },
  navBtns: {
    marginRight: "1rem",
    "& a": {
      textDecoration: "none"
    }
  },
  button:{
    margin: "0 0.5rem",
    "&a":{
      textDecoration: "none"
    }
  }
});

class PalleteFormNav extends Component{
    constructor(props){
        super(props);
        this.state = {
            newPalleteName: "",
            formShowing: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.showForm = this.showForm.bind(this);
        this.hideForm = this.hideForm.bind(this);
    }

    handleChange(evt){
        this.setState({
          [evt.target.name]: evt.target.value
        });
      }

    showForm(){
      this.setState({formShowing: true});
    }
    hideForm(){
      this.setState({formShowing: false});
    }

    render(){

        const {classes, open,palletes, handleSubmit} = this.props;
        const {newPalleteName} = this.state;

        return(
        <div className={classes.root}>
          <CssBaseline />
          <AppBar
            position='fixed'
            color="default"
            className={classNames(classes.appBar, {
              [classes.appBarShift]: open
            })}
          >
            <Toolbar disableGutters={!open}>
              <IconButton
                color='inherit'
                aria-label='Open drawer'
                onClick={this.props.handleDrawerOpen}
                className={classNames(classes.menuButton, open && classes.hide)}
              >
              <Menu />
              </IconButton>
              <Typography variant='h6' color='inherit' noWrap>
                Create a Pallete
              </Typography>
            </Toolbar>

                {/* div after toolbar */}
            <div className={classes.navBtns}> 
              <Link to='/'>
                <Button variant="contained" color="secondary" className={classes.button}>
                  Go Back
                </Button>
              </Link>
              <Button variant="contained" color="primary" className={classes.button} onClick={this.showForm}>
              Save
              </Button>
            </div>
          </AppBar>

          {this.state.formShowing && (
          <PalleteMetaForm 
          palletes={palletes} 
          handleSubmit = {handleSubmit}
          hideForm = {this.hideForm}
          />)}

      </div>            
        );
    }
}

export default withStyles(styles, { withTheme: true })(PalleteFormNav);