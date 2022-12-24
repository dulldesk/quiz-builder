import React, { useEffect, useState } from 'react';
import { useNavigate, useLoaderData } from "react-router-dom";
import {INPUT_DELIM_SUFFIX} from "../../helpers/utils";
import "./View.scss";

import BlankInput from "../BlankInput/BlankInput";

export default function View() {
	const navigate = useNavigate();
	const [quiz, inputs] = useLoaderData();
	const [wrongInputs, setWrong] = useState([null]);
	const [hasAttempted, setAttempted] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setAttempted(true);
		const data = new FormData(e.target);

		let wrong = [];
		for (const id of Object.keys(inputs).filter(i => inputs[i].placed)) {
			if (inputs[id].placed && inputs[id].ans != data.get(id)) wrong.push(id);
		}
		setWrong(wrong);
	}

	useEffect(() => {
		if (!quiz) navigate("/");
	}, [navigate, quiz]);

	return (
		<div className={`card ${hasAttempted ? (wrongInputs.length === 0 ? "ac" : "wa") : ""}`}>
		{!Object.keys(quiz).length ? "" : <>
			<h1>{quiz.title}</h1>
			<hr />
			<form className="quiz" onSubmit={handleSubmit}>
				{quiz.content.map((elm, idx) => (elm.trim().startsWith(INPUT_DELIM_SUFFIX)
					? <BlankInput id={elm.trim().substring(INPUT_DELIM_SUFFIX.length)}
							key={`con_${idx}`} more_classes={!hasAttempted ? "" : (wrongInputs.includes(elm.trim().substring(INPUT_DELIM_SUFFIX.length)) ? "wa" : "ac")}
							{...inputs[elm.trim().substring(INPUT_DELIM_SUFFIX.length)]} />
					: <span key={`con_${idx}`}>{elm}</span>
					))}
				<div className="mt-2 right">
					<input type="submit" value="Submit quiz" className="small-btn" />
				</div>
			</form>
		</> }
		</div>
	);
}
