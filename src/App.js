import { Component } from 'react';
import Pallete from './Pallete';
import PalleteList from './PalleteList';
import seedColors from './seedColors';
import SingleColorPallete from './SingleColorPallete';
import { generatePalette } from "./colorHelpers";
import NewPalleteForm from './NewPalleteForm';
import {Route, Switch} from 'react-router-dom';
import {CSSTransition,TransitionGroup,} from 'react-transition-group';
import Page from './Page';
import './App.css';


class App extends Component  {
  //console.log(generatePalette(seedColors[4]));
  constructor(props) {
    super(props);
    const savedPalletes = JSON.parse(window.localStorage.getItem("palletes"));
    this.state = { palletes: savedPalletes || seedColors };
    this.savePallete = this.savePallete.bind(this);
    this.findPallete = this.findPallete.bind(this);
    this.deletePallete = this.deletePallete.bind(this);
  }

  findPallete(id){
    return this.state.palletes.find(function(pallete){
      return pallete.id === id;
    });
  }
  savePallete(newPallete){
    this.setState({palletes: [...this.state.palletes, newPallete]},this.syncLocalStorage);
    
  }
  deletePallete(id){
    this.setState(
      st=> ({palletes: st.palletes.filter(pallete => pallete.id !== id) }),
      this.syncLocalStorage
    )
  }
  syncLocalStorage(){
    window.localStorage.setItem("palletes", JSON.stringify(this.state.palletes));
  }
  render(){
    return (
      <Route render={({location})=> (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames='page' timeout={500} >
        <Switch location={location}>
          <Route 
            exact 
            path='/pallete/new' 
            render={(routeProps)=>
              
              <Page>
               <NewPalleteForm 
            savePallete={this.savePallete} 
            palletes= {this.state.palletes}
            {...routeProps} />
            </Page>
            }/>
          <Route exact path='/' render={(routeProps)=> 
          <Page>
          <PalleteList 
          palletes= {this.state.palletes} 
          deletePallete={this.deletePallete} {...routeProps} />
          </Page>
          } ></Route>
          <Route exact path='/pallete/:id' render={(routeProps)=>(
            <Page>
            <Pallete 
            pallete= {generatePalette(this.findPallete(routeProps.match.params.id))} />
            </Page>
          )} />
          <Route exact path='/pallete/:palleteId/:colorId' render={(routeProps)=>
          <Page>
            <SingleColorPallete
              colorId = {routeProps.match.params.colorId}
              pallete = {generatePalette(this.findPallete(routeProps.match.params.palleteId))}
          />
          </Page>
        }/>
          {/* preventing from wrong urls */}
          <Route render={(routeProps)=> 
          <Page>
          <PalleteList 
          palletes= {this.state.palletes} 
          deletePallete={this.deletePallete} {...routeProps} />
          </Page>
          } ></Route>

        </Switch>
        </CSSTransition>
        </TransitionGroup>
      )} />
      /* shifted to new route for implementing transition */ 
  
      // <div className="">
      //   <Pallete pallete ={generatePalette(seedColors[0])} />
      // </div>
    );
  }
}

export default App;
