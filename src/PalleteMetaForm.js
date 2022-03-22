import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import {Picker} from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';

class PalleteMetaForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            stage: "form",
            newPalleteName: ""
        }
        this.handleChange = this.handleChange.bind(this);
        this.showEmojiPicker = this.showEmojiPicker.bind(this);
        this.savePallete = this.savePallete.bind(this);
    }

    componentDidMount(){
        ValidatorForm.addValidationRule('isPalleteNameUnique', (value) => 
          this.props.palletes.every(
           ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase())
      );
    }

    handleChange(evt){
        this.setState({
          [evt.target.name]: evt.target.value
        });
      }

    handleClickOpen = () => {
        this.setState({open: true});
      };
    
    handleClose = () => {
        this.setState({open: false});
      };

      showEmojiPicker(){
          this.setState({stage: 'emoji'});
      }
      
      savePallete(emoji){
          const newPallete = {
              paletteName: this.state.newPalleteName,
              emoji: emoji.native
          };
        this.props.handleSubmit(newPallete);
      }

  render() {

    const {newPalleteName} = this.state;

    return (
        <div>
        <Dialog open={this.state.stage === "emoji"} onClose={this.props.hideForm} >
        <DialogTitle id="form-dialog-title">Choose a Pallete Emoji</DialogTitle>
            <Picker onSelect={this.savePallete} title="Pick a Pallete Emoji" />
        </Dialog>
        
        <Dialog open={this.state.stage === "form"} onClose={this.props.hideForm} aria-labelledby="form-dialog-title" >
          <DialogTitle id="form-dialog-title">Choose a Pallete Name</DialogTitle>
            <ValidatorForm onSubmit={this.showEmojiPicker}>
                <DialogContent>
                    <DialogContentText>
                    Please enter a Name for your new beautiful Pallete 
                    Make Sure it's unique
                    </DialogContentText>
                    

                    <TextValidator 
                    label='Pallete Name'
                    value={this.state.newPalleteName}
                    fullWidth
                    margin="normal"
                    variant="filled"
                    name="newPalleteName"
                    onChange={this.handleChange}
                    validators={["required", "isPalleteNameUnique"]}
                    errorMessages={["Enter Pallete Name", "Name already used"]}
                    />    
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.props.hideForm} color="primary">
                    Cancel
                    </Button>
                    <Button
                        variant='contained'
                        color='primary'
                        type="submit">
                            Save Palette
                    </Button>
                </DialogActions>
            </ValidatorForm>
        </Dialog>
        </div>
    );
  }
}

export default PalleteMetaForm;
