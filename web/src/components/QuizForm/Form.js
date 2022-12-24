import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams, useLoaderData } from "react-router-dom";
import "./Form.scss";

import ContentInput from "./Content";
import BlankManager from "./BlankManager";
import BasicQuizInfo from "./BasicInfoInput";

import {INPUT_DELIM_SUFFIX, dirtyclone, genRandomId} from "../../helpers/utils";
import {mergeStrayTextFields, insertInputIntoContent, postQuiz} from "../../helpers/content-format";
import {encode as b64encode} from 'base-64';


function QuizForm(props) {
	const params = useParams();
	const navigate = useNavigate();
	const [init_form, init_inputs] = useLoaderData();
	const [form, setForm] = useState({});
	const [formError, setError] = useState(false);
	const [blanks, setBlanks] = useState(init_inputs || {});

	const addBlank = (e) => {
		e.preventDefault();
		setBlanks({...blanks, [genRandomId()] : {ans: -1, placed: false, options: [""], placeholder: ""}});
	}
	const removeBlank = (e,id) => {
		e.preventDefault();
		let new_blanks = structuredClone(blanks);
		delete new_blanks[id];
		setBlanks(new_blanks);
		setForm({...form ,
			content: mergeStrayTextFields(form.content.filter(elm => (elm.trim().substring(INPUT_DELIM_SUFFIX.length) !== id)))
		});
	}
	const updateBlank = (id, options, placeholder, ans) => {
		setBlanks({...blanks, [id]: {placed: blanks[id].placed, ans: ans, options: options, placeholder: placeholder }});
	}

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name] : [e.target.value]});
	}
	const handleSubmit = useCallback(async(e) => {
		e.preventDefault();

		Promise.resolve()
		.then(() => postQuiz(e.target, form.qid))
		.then(resp => resp.json())
		.then(data => {
			if (data.error) throw data.error;
			if (!form.qid) {navigate(`/${form.slug}/edit/${data.id}`); setForm({...form, qid: data.id})}
			setError(false);
		}).catch(e => {
			// console.error(e);
			setError(e);
		});
	}, [form, navigate]);
	const insertBlank = (id, offset_info) => {
		setForm({...form, content: insertInputIntoContent(id, offset_info, form.content)});
		setBlanks({...blanks, [id] : {...blanks[id], placed:true}})
	}
	const updateContent = (e,idx) => {
		let new_content = dirtyclone(form.content);
		new_content[idx] = e.target.value;
		setForm({...form, content: new_content});
	}

	useEffect(() => {
		if (!init_form) navigate("/");
		else setForm({...init_form, qid: params.qid || ""})
	}, [init_form, navigate, params]);

	return (!Object.keys(form).length ? "" :
		<form id="quiz" className="card" onSubmit={handleSubmit}>
			<BasicQuizInfo form={form} handleChange={handleChange} />
			<hr />
			<BlankManager blanks={blanks}
				addBlank={addBlank}
				removeBlank={removeBlank}
				updateBlank={updateBlank} />
			<hr />

			<ContentInput content={form.content} blanks={blanks}
				updateBlank={updateBlank}
				insertBlank={insertBlank}
				updateContent={updateContent}
				removeBlank={removeBlank} />

			<input type="hidden" name="inputs" value={b64encode(JSON.stringify(blanks))} />

			<div className="row reverse input-field last">
				<input type="submit" value="Save" className="col-2" />
				{formError ?
					<div className="text-error col is-vertical-align">
						{`Error in saving form. ${formError}`}
					</div>
					: <></>}
			</div>
		</form>
	);
}
export default QuizForm;
