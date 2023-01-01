import React, { useEffect, useState } from 'react';
import "./BlankInput.scss";

import OptionsBuilder from "./OptionsBuilder";
import BlankInput from "./BlankInput";

import gear_icon from "./svg/settings.svg";
import move_icon from "./svg/move.svg";
import {dirtyclone} from "../../helpers/utils";
import {dragstart_handler} from "../../helpers/dragndrop";


export default function BlankBuilder(props) {
	// const Component = props.component;
	const [ans, setAns] = useState(props.blank.ans === undefined ? -1 : props.blank.ans);
	const [placeholder, setPlaceholder] = useState(props.blank.placeholder || "----");
	const [options, setOptions] = useState(props.blank.options || [""]);
	const [builder_opened, setOpenBuilder] = useState(false);
	const id = props.id;
	const updateBlank = props.updateBlank;
	// console.log("blb", props.blank);
	// console.log(id);

	const toggleBuilder = (e, force_close=false) => {
		e.preventDefault();
		setOpenBuilder(!builder_opened && !force_close);
	}
	const updatePlaceholder = e => {
		e.preventDefault();
		setPlaceholder(e.target.value);
	}
	const updateOptions = (e, idx) => {
		e.preventDefault();
		let new_options = dirtyclone(options);
		new_options[idx] = e.target.value;
		setOptions(new_options);
	};
	const addOption = (e) => {
		e.preventDefault();
		setOptions([...options, ""]);
	}
	const deleteOption = (e, idx) => {
		e.preventDefault();

		let new_options = dirtyclone(options);
		new_options.splice(idx,1);
		setOptions(new_options);

		if (ans > idx) setAns(ans-1);
		else if (ans === idx) setAns(-1);
	}
	const updateAns = (e, idx) => {
		e.preventDefault();
		setAns(idx);
	}

	useEffect(() => {
		updateBlank(id, options, placeholder, ans);
		// eslint-disable-next-line
	}, [options, placeholder, ans, id]);

	return (
		<>
			<div className="custom-input dropdown mt-1" draggable onDragStart={dragstart_handler}  data-id={id}>
				<div className="config-bar row"  draggable="false">
					<img src={move_icon} alt="move" className="icon move" data-id={id}
						data-options={options}
						onDragStart={dragstart_handler} draggable="false" />
					<img src={gear_icon} alt="settings" className="icon" onClick={toggleBuilder}  draggable="false" />
				</div>
				<BlankInput id={id} placeholder={placeholder} options={options} />
			</div>
			{builder_opened ?
				<OptionsBuilder key="optbuild"
								options={options}
								placeholder={placeholder}
								id={id}
								updateOptions={updateOptions}
								addOption={addOption}
								deleteOption={deleteOption}
								ans={ans}
								updateAns={updateAns}
								toggleBuilder={toggleBuilder}
								removeBlank={props.removeBlank}
								updatePlaceholder={updatePlaceholder} />
				: ""}
		</>
	)
}
