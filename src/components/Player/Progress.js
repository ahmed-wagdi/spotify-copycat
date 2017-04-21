import React from 'react';

const Progress = props => {
	let progress = Math.floor(props.played * props.duration);
	function seek(e){
		const offset = e.target.getBoundingClientRect().left,
			clickPosition = e.pageX, 
			seekPos = clickPosition - offset,
			width = e.target.offsetParent.clientWidth;

			const pos = seekPos / width;
			console.log(pos);
			props.seekTrack(pos)
	}
	return (
	<div className="progress">
		<div className="progress__time progress__time--current">{progress ? progress : 0}</div>
		<div className="progress__time progress__time--total">{props.duration}</div>
		<div className="progress__bar" onClick={seek}>
			<div style={{width: props.played * 100 + "%"}} className="progress__bar-completed"></div>
		</div>
	</div>
	)
}

export default Progress;