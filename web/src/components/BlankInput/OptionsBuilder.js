import React, { useEffect, useState, useRef } from 'react';

import "./OptionsBuilder.scss";

import trash_icon from "./svg/trash.svg";
import circle_icon from "./svg/circle.svg";
import checked_circle_icon from "./svg/check-circle.svg";

function preventEnter(e) {
	if (e.key === 'Enter') e.preventDefault();
}

export default function OptionsBuilder(props) {
	const options = props.options;
	const id = props.id;
	const newestOptionRef = useRef(null);
	const [shiftFocusToNewest, setShiftFocusToNewest] = useState(false);

	const addOnEnter = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			props.addOption(e);
			setShiftFocusToNewest(true);
		}
	}

	useEffect(() => {
		if (shiftFocusToNewest) {
			newestOptionRef.current.focus();
			setShiftFocusToNewest(false);
		}
	}, [shiftFocusToNewest])

	const genKey = (idx, suffix="") => `${id}_${idx}_${suffix}`;

	return (
		<aside className="options-builder card">
			<button className="close" onClick={props.toggleBuilder.bind(true)}>&times;</button>
			<div>
				<label htmlFor="placeholder">Placeholder text:</label>
				<input type="text" name={`placeholder_${id}`} placeholder="placeholder"
					value={props.placeholder}
					onKeyPress={preventEnter}
					onChange={props.updatePlaceholder} />
			</div>
			<br />
			<label>Options:</label>
			{options.map((opt, idx) =>
				<div className="row" key={`foo_optb_${idx}`}>
					<input key={genKey(idx)} value={opt}
							className="col"
							placeholder="option..."
							ref={idx === options.length - 1 ? newestOptionRef : null}
							onKeyPress={addOnEnter}
							onChange={(e) => props.updateOptions(e,idx)} />
					<div className="row col-4 btns">
					<button key={genKey(idx,"choose")}
							className="small-btn"
							title={`${idx === props.ans ? "un" : ""}select this option as the answer`}
							onClick={(e) => props.updateAns(e,idx)}>
						<span className="icon" style={{backgroundImage: `url(${idx === props.ans ? checked_circle_icon : circle_icon})`}}></span>
					</button>
					<button key={genKey(idx,"trash")}
							className="small-btn"
							title="delete this option"
							onClick={(e) => props.deleteOption(e,idx)}>
						<span className="icon" style={{backgroundImage: `url(${trash_icon})`}}></span>
					</button>
					</div>
				</div>)}
			<div className="row m-0" style={{justifyContent: "space-between"}}>
				<button onClick={props.addOption} className="small-btn" id="add-option">+</button>
				<button onClick={e => props.removeBlank(e, id)} className="small-btn" id="delete-input">DELETE</button>
			</div>
		</aside>
	)
}
