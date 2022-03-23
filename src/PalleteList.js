import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import MiniPallete from './MiniPallete';
import { withStyles } from '@mui/styles';
import styles from './styles/PalleteListStyles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import {CSSTransition,TransitionGroup,} from 'react-transition-group';
  import { blue } from '@mui/material/colors';
  import {red} from '@mui/material/colors';


class PalleteList extends Component{
    constructor(props){
        super(props);
        this.state = {
            openDeleteDialog: false,
            deletingId: ""
        };
        this.openDialog = this.openDialog.bind(this);
        this.closeDialog  = this.closeDialog.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.goToPallete = this.goToPallete.bind(this);
    }

    openDialog(id){
        this.setState({openDeleteDialog: true, deletingId: id});
    }
    closeDialog(){
        this.setState({openDeleteDialog: false, deletingId: ""});
    }

    handleDelete(){
        this.props.deletePallete(this.state.deletingId);
        this.closeDialog();
    }

    goToPallete(id){
        this.props.history.push(`/pallete/${id}`);
    }
    render(){
        const {palletes, classes} = this.props;
        const{ openDeleteDialog,deletingId} = this.state;
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
                                    goToPallete={this.goToPallete} 
                                    // handleDelete={this.props.deletePallete}
                                    openDialog={this.openDialog}
                                    key={pallete.id}
                                    id={pallete.id}
                                />
                            </CSSTransition>
                            ))}
                        </TransitionGroup>   
                </div>
                <Dialog open={openDeleteDialog} aria-labelledby="delete-dialog-title" onClose={this.closeDialog}>
                        <DialogTitle id='delete-dialog-title'>Delete This Pallete?</DialogTitle>
                        <List>
                            <ListItem button onClick={this.handleDelete}>
                                <ListItemAvatar>
                                    <Avatar style={{backgroundColor: blue[100], color: blue[600]}}>
                                        <CheckIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary='Delete' />
                            </ListItem>
                            <ListItem button onClick={this.closeDialog}>
                                <ListItemAvatar>
                                    <Avatar style={{backgroundColor: red[100], color: red[600]}}>
                                        <CloseIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary='Cancel' />
                            </ListItem>
                        </List>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(PalleteList);