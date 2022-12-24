// import React from 'react';
// import React, { useEffect, useState } from 'react';
import {dragover_handler, drop_handler} from "../helpers/dragndrop";
import BlankBuilder from "../BlankInput/Builder";

import {INPUT_DELIM_SUFFIX} from "../helpers/utils";
import {stringifyContent} from "../helpers/content-format";


export default function ContentInput(props) {
	const drop = (id, offset) => {
		props.insertBlank(id, offset);
	}

	return (
		<section onDragOver={dragover_handler} onDrop={e => drop_handler(e, drop)}>
			<p>Edit content:</p>
			<fieldset id="content-input" className="input-field pb-2" placeholder="the Quiz..." name="content">
				{props.content.map((elm, idx) =>
					<div key={`content_div_${idx}`}>
					{(elm.trim().startsWith(INPUT_DELIM_SUFFIX)
						? <BlankBuilder id={elm.substring(INPUT_DELIM_SUFFIX.length)}
								key={elm.substring(INPUT_DELIM_SUFFIX.length) + "inp"}
								blank={props.blanks[elm.trim().substring(INPUT_DELIM_SUFFIX.length)]}
								removeBlank={props.removeBlank}
								updateBlank={props.updateBlank} />
						: <input onChange={e => props.updateContent(e,idx)}
								value={elm} key={`content_inp_${idx}`}
								className="node" placeholder="some text..."
								data-index={idx} />
						)}
					</div>
				)}
			</fieldset>
			<input type="hidden" value={stringifyContent(props.content)} name="content" />
		</section>
	)
}
