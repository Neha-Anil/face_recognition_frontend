import React from 'react';
import './imagelink.css';
const ImageLinkForm= ({onInputChange ,onButtonSubmit})=>{
	return (
		
		<div style={{marginTop:'0px'}}>
			<p className='f3' style={{color:'rgb(0, 57, 230)'}}>
			{'This Magic Brain will detect faces in your pictures.Give it a try by pasting the image address in the box!'}
		</p>
		<div style={{display:'flex',justifyContent:'center'}}>
		<div style={{display:'flex',justifyContent:'center',padding:'15px'}} className='shadow-5 pat'>
		
			<div style={{display:'flex'}}>
			<input className='f4 pa2 w-70 center' type='text' onChange={onInputChange}/>
			<button style={{display:'flex'}} className=' w-30 grow f4 link ph3 pv2 dib white pointer bg-light-purple' onClick={onButtonSubmit}>Detect</button>
			</div>
		</div>
		</div>
		</div>
		
	);
}
export default ImageLinkForm;