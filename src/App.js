import React, { Component } from 'react';
import Particles from 'react-particles-js';
import FaceRecognition from './components/FaceRecognition/facerecog.js';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLinkForm from './components/ImageLinkForm/imagelinkform';
import Rank from './components/rank/rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/register';
import './App.css';



const initialState={
      input:'',
      imageUrl:'',
      box:[],
      route:'signin',
      isSignedIn:false,
      user:{
        id:'',
        name:'',
        email:'',
        entries:0,
        joined:''
      }
    }
class App extends Component {
  constructor(){
    super();
    this.state=initialState;
    }
  
  loadUser=(data)=>{
    this.setState({user:{
      id:data.id,
        name:data.name,
        email:data.email,
        entries:data.entries,
        joined:data.joined
    }})
  }
  /*componentDidMount(){
    fetch('http://localhost:3000/')
    .then(response=>response.json())
    .then(console.log);
  }*/
  onInputChange=(event)=>{
    this.setState({input:event.target.value});
  }
  calculateFaceLocation=(data)=>{
   
    const image=document.getElementById('inputimage');
    const width=Number(image.width);
    const height=Number(image.height);
     return data.outputs[0].data.regions.map(face => {
      const clarifaiFace = face.region_info.bounding_box;
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - (clarifaiFace.right_col * width),
        bottomRow: height - (clarifaiFace.bottom_row * height)
      }
    });

  }

  displayFaceBox=(box)=>{
    console.log(box);
    this.setState(Object.assign(this.state.box,{box:box}));

  }

  onButtonSubmit=()=>{
    this.setState({imageUrl:this.state.input});
       fetch('https://morning-oasis-57337.herokuapp.com/imageurl',{
            method:'post',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
            input:this.state.input
            })
        })
       .then(response=>response.json())
      .then(response=>{
        //console.log(response)
        if(response.outputs[0].data.regions){
          fetch('https://morning-oasis-57337.herokuapp.com/image',{
            method:'put',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
            id:this.state.user.id
            })
        })
          .then(response=>response.json())
          .then(count=>{
            this.setState(Object.assign(this.state.user,{entries:count}))
        })
          .catch(console.log)
          //for(let i=0;i<response.outputs[0].data.regions.length;i++)
          this.displayFaceBox(this.calculateFaceLocation(response))
          alert(response.outputs[0].data.regions.length+' faces detected')
          //console.log('faces detected')
        }
      })
      .catch(err=>console.log(err));
      this.setState({box:[]})
  }

onRouteChange=(route)=>{
  if(route==='signout'){
    this.setState(initialState);
  }else if (route==='home'){
    this.setState({isSignedIn:true});
  }
  this.setState({route:route});
}  
  render() {
    return (
      <div className="App">
        <Particles className='part'
              params={{
                particles: {
                  interactivity:{
                    detect_on:'canvas',
                    
                  },
                  number:{
                    value:80,
                    density:{
                      enable:true,
                      value_area:800
                    }
                  }

                    }
                  }
                }
              
            />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
        {
         this.state.route=== 'home' ?
             <div>
            <Logo />
            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
           <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl}/> 
           </div>
            : (this.state.route==='register'?
              <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              :
              <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
              )
      }
      </div>
    );
  }
}

export default App;
