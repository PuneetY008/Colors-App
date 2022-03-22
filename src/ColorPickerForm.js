import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ChromePicker } from "react-color";
import { withStyles } from "@material-ui/core";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

import styles from "./styles/ColorPickerFormStyles";
class ColorPickerForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentColor: "teal",
            newColorName: ""
        };
        this.updateCurrentColor = this.updateCurrentColor.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        ValidatorForm.addValidationRule('isColorNameUnique', (value) => 
          this.props.colors.every(
           ({name}) => name.toLowerCase() !== value.toLowerCase()
          )
      );
      ValidatorForm.addValidationRule('isColorUnique', (value) => 
          this.props.colors.every(
           ({color}) => color!== this.state.currentColor)
      );
      
    }

    updateCurrentColor(newColor){
        this.setState({
          currentColor: newColor.hex
        });
      }

    handleChange(evt){
        this.setState({
            [evt.target.name]: evt.target.value
        });
    }

    handleSubmit(){
        const newColor = {color: this.state.currentColor,name: this.state.newColorName};
        this.props.addNewColor(newColor);
        this.setState({newColorName: ""})
    }

    render(){
        const{palleteIsFull, classes} = this.props;
        return (
            <div className={classes.root}>
                <ChromePicker
                    color={this.state.currentColor}
                    onChangeComplete={this.updateCurrentColor}
                    className={classes.picker}
                />
                <ValidatorForm onSubmit={this.handleSubmit} >
                    <TextValidator value={this.state.newColorName} 
                        name='newColorName'
                        onChange={this.handleChange}
                        variant="filled"
                        margin="normal"
                        placeholder="Color Name"
                        className={classes.colorNameInput}
                        validators={['required', 'isColorNameUnique','isColorUnique']}
                        errorMessages={['this field is required', 'Color name should be unique', 'Color already used']}
                    />
                    <Button 
                            variant='contained' 
                            type="submit"
                            color='primary' 
                            className={classes.addColor}
                            style={{backgroundColor: palleteIsFull? "grey" : this.state.currentColor}} 
                            disabled= {palleteIsFull}
                        >
                        {palleteIsFull? "Pallete Full" : "Add Color"}
                    </Button>
                </ValidatorForm>
            </div>
        );
    }
}

export default withStyles(styles)(ColorPickerForm);