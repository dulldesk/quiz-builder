import {LINE_DELIM, INPUT_DELIM_SUFFIX} from "./utils";
export function parseContent(s) {
	return s.split(LINE_DELIM);
}
export function stringifyContent(content) {
	return content.join(LINE_DELIM);
}
export function mergeStrayTextFields(con) {
	let new_content = [];
	let previous_is_str = false;
	let cnt = 0;
	for (let i in con) {
		let elm = con[i];
		let curr_is_str = !elm.startsWith(INPUT_DELIM_SUFFIX);
		if (previous_is_str && curr_is_str) {
			new_content[cnt-1] += " " + elm;
		} else new_content.push(elm);

		previous_is_str = curr_is_str;
		cnt++;
	}
	return new_content;
}
export function insertInputIntoContent(input_id, offset_info, content) {
	let offsetnode_idx = parseInt(offset_info[1].dataset.index);
	let offset = offset_info[2];
	let new_content = [];

	let inserted = false;

	for (let i in content) {
		let elm = content[i];
		if (elm.startsWith(INPUT_DELIM_SUFFIX)) {
			if (elm.substring(INPUT_DELIM_SUFFIX.length).trim() !== input_id)
				new_content.push(elm);
		} else if (`${i}` === `${offsetnode_idx}` && !inserted) {
			let before = elm.substring(0, offset).trim();
			if (before !== "") new_content.push(before);

			new_content.push(`${INPUT_DELIM_SUFFIX}${input_id}`);
			inserted = true;

			let after = elm.substring(offset).trim();
			if (after !== "") new_content.push(after);
		} else {
			new_content.push(elm);
		}
	}
	if (!inserted) new_content.push(`${INPUT_DELIM_SUFFIX}${input_id}`);
	if (!new_content.some(c => !c.startsWith(INPUT_DELIM_SUFFIX))) new_content.push("")
	// if (new_content.filter(c => !c.startsWith(INPUT_DELIM_SUFFIX)).length === 0) new_content.push("")
	return new_content;
}
