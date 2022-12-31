import {API_SERVER} from "../config";
import {parseContent} from "./content-format";
import {decode as b64decode} from 'base-64';

export function fetchQuiz(slug) {
	try {
		let data = get_quiz(slug);
		if (!data) throw new Error(404);
		data.content = parseContent(data.content);
		let input_str = data.inputs;
		delete data.inputs;
		return [data, JSON.parse(input_str)];
	} catch (e) {
		return [false, false];
	}
}
export function postQuiz(target, qid) {
	return qid ? update(new FormData(target)) : create(new FormData(target));
}
export async function slugIdMatch(slug, qid) {
	return check_slug_qid(qid, slug);
}

/* **************************************** */

function get_quiz(slug) {
	try {
		let data = JSON.parse(localStorage.getItem(slug));
		if ("inputs" in data) data.inputs = b64decode(data.inputs);
	    return data;
	} catch (e) {
	    return {error: e};
	}
}
function check_slug_qid(qid, slug) {
	try {
		let data = JSON.parse(localStorage.getItem(slug));
		return data.id === qid ? "1" : "0";
	} catch (e) {
		return "0";
	}
}
function update(form) {
	try {
	    let f = {};
	    for (let i of form.entries()) f[i[0] === "qid" ? "id" : i[0]] = i[1];
	    localStorage.setItem(f.slug, JSON.stringify(f));
	    return f;
	} catch (e) {
		return {error: e};
	}
}
function create(form) {
    let title = form.get('title');
    let slug = form.get('slug');
    let qid = [...Array(16)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

    form.set("id",qid);

    if (!title || title === "")
        return {error: "Title is required"};
    else if (!slug || slug === "")
        return {error: "Slug is required"};

    try {
	    update(form);
    } catch (e) {
    	return {error: e};
    }
    return {id: qid};
}
