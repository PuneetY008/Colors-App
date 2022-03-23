import React, { Component } from "react";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { Menu } from "@mui/icons-material";
import { ChevronLeft } from "@mui/icons-material";
import Button from "@material-ui/core/Button";
import { ChromePicker } from "react-color";
import { colors } from "@material-ui/core";
import DraggableColorBox from "./DraggableColorBox";
import DraggableColorList from "./DraggableColorList";
import { Link } from "react-router-dom";
import { arrayMove } from "react-sortable-hoc";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import PalleteFormNav from "./PalleteFormNav";
import ColorPickerForm from "./ColorPickerForm";
import seedColors from "./seedColors";

import styles from "./styles/NewPalleteFormStyles";


class NewPalleteForm extends Component {

  static defaultProps = {
    maxColors: 20
  }

  constructor(props){
    super(props);
    this.state = {
      open: false,
      currentColor: "purple",
      newColorName: "",
      colors: seedColors[0].colors
    }
    this.addNewColor = this.addNewColor.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.removeColor = this.removeColor.bind(this);
    this.clearColors = this.clearColors.bind(this);
    this.addRandomColor = this.addRandomColor.bind(this);
  }

    
    
      handleDrawerOpen = () => {
        this.setState({ open: true });
      };
    
      handleDrawerClose = () => {
        this.setState({ open: false });
      };
    
      

      addNewColor(newColor){
        this.setState({colors: [...this.state.colors, newColor], newColorName: ""});
      }

      handleChange(evt){
        this.setState({
          [evt.target.name]: evt.target.value
        });
      }

      handleSubmit(newPallete) {
        newPallete.id = newPallete.paletteName.toLowerCase().replace(/ /g, "-");
        newPallete.colors = this.state.colors;
        this.props.savePallete(newPallete);
        this.props.history.push("/");
      }

      removeColor(colorName){
        this.setState({
          colors: this.state.colors.filter(color=> color.name !== colorName)
        });
      }

      onSortEnd = ({ oldIndex, newIndex }) => {
        this.setState(({ colors }) => ({
          colors: arrayMove(colors, oldIndex, newIndex)
        }));
      };

      clearColors(){
        this.setState({
          colors: []
        })
      }

      addRandomColor(){
        //pick random from existing all
        const allColors = this.props.palletes.map(p => p.colors).flat();
        var rand = Math.floor(Math.random()* allColors.length);
        let randomColor = allColors[rand];
        this.setState({colors: [...this.state.colors, randomColor]});
      }

  render() {
    const { classes, maxColors, palletes } = this.props;
    const { open, colors } = this.state;
    const palleteIsFull = colors.length >= maxColors;
    return (
        <div>

        //nav bar exported
        <PalleteFormNav 
          open={open} 
          palletes = {palletes} 
          handleDrawerOpen={this.handleDrawerOpen}
          handleSubmit={this.handleSubmit} />

        <Drawer
          className={classes.drawer}
          variant='persistent'
          anchor='left'
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeft />
            </IconButton>
          </div>
          <Divider />


          <div className={classes.container}>
            <Typography variant='h4' gutterBottom>Design Your Palette</Typography>

            <div className={classes.buttons}>
              <Button variant='contained' color='secondary' onClick={this.clearColors} className={classes.button}>
                Clear Palette
              </Button>

              <Button variant='contained' color='primary' onClick={this.addRandomColor} className={classes.button} disabled={palleteIsFull}>
                Random Color
              </Button>
            </div>

            {/* color picker exported      */}
              <ColorPickerForm palleteIsFull={palleteIsFull} addNewColor={this.addNewColor} colors={colors} />
          </div>

        </Drawer>
        <main
          className={classNames(classes.content, {
            [classes.contentShift]: open
          })}
        >
          <div className={classes.drawerHeader} />

          {/* {this.state.colors.map(color => (
            <DraggableColorBox 
            key={color.name}
            color={color.color} 
            name={color.name} 
            handleClick={()=> this.removeColor(color.name)} />
          ))} */}

          <DraggableColorList 
          colors={this.state.colors}
          removeColor={this.removeColor}
          axis='xy'
          distance={20}
          onSortEnd={this.onSortEnd}
          />
          
        </main>
      </div>
    );
  }
}

export default withStyles(styles, { withTheme: true })(NewPalleteForm);