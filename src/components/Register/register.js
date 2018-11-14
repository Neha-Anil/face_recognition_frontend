import React from 'react';

class Register extends React.Component{
	constructor(props){
		super();
		this.state={
			email:'',
			password:'',
			name:''
		}
	}
	onNameChange=(event)=>{
		this.setState({name:event.target.value})
	}

	onEmailChange=(event)=>{
		this.setState({email:event.target.value})
	}

	onPasswordChange=(event)=>{
		this.setState({password:event.target.value})
	}
	onSubmitSignIn=()=>{
		if(!this.state.email || !this.state.password|| !this.state.name){
			alert('Fields must not be empty')
		}
		else if(!(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/.test(this.state.email))){
			alert('Enter valid email')
		}
		else if(!(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,15}$/.test(this.state.password))){
			alert('Password must be minimum 8 characters with a number and a special character')
		}
		else{
		fetch('https://morning-oasis-57337.herokuapp.com/register',{
			method:'post',
			headers:{'Content-Type':'application/json'},
			body:JSON.stringify({
				email:this.state.email,
				password:this.state.password,
				name:this.state.name
			})
		})
		.then(response=>response.json())
		.then(user=>{
			if(user.id){
				this.props.loadUser(user);
				this.props.onRouteChange('home');
			}
		})
	}
		
	}
	render(){
		return (
		<article className="br2 ba dark-gray b--black-10 mv4 shadow-5 w-200 w-150-m w-25-l mw6 center">
		<main className="pa3 black-80">
	  <div className="measure center">
	    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
	      <legend className="f1 fw6 ph0 mh0">Register</legend>
	      <div className="mt3">
	        <label className="db fw6 lh-copy f4" htmlFor="name">Name</label>
	        <input 
	        onChange={this.onNameChange}
	        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name"/>
	      </div>
	      <div className="mt3">
	        <label className="db fw6 lh-copy f4" htmlFor="email-address">Email</label>
	        <input 
	        onChange={this.onEmailChange}
	        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
	      </div>
	      <div className="mv3">
	        <label className="db fw6 lh-copy f4" htmlFor="password">Password</label>
	        <div className="db fw6 lh-copy f6"><center>(of length 8 including a number and special character)</center></div> 
	        <input 
	        onChange={this.onPasswordChange}
	        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
	      </div>
	      
	    </fieldset>
	    <div className="">
	      <input 
           onClick={this.onSubmitSignIn}
	       className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
	       type="submit"
	       value="Register"/>
	    </div>
	   
	  </div>
</main>
</article>

	);
	}
	
}
export default Register;