import React from 'react';
import './facerecog.css';
const FaceRecognition= ({imageUrl,box})=>{
	return (
		<div style={{display:'flex',justifyContent:'center',marginRight:'400px'}}>
		<div className='center ma'>
		<div  className='absolute mt2'>
		<img id='inputimage' alt='' src={imageUrl} width='400px' height='auto'/>
		<div className='bounding-box' style={{top:box.topRow,right:box.rightCol,bottom:box.bottomRow,left:box.leftCol}}></div>
		</div>
		</div>
		</div>
		);
}
export default FaceRecognition;