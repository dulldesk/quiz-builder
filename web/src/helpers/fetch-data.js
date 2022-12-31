import {API_SERVER} from "../config";
import {parseContent} from "./content-format";

export function fetchQuiz(slug) {
	return fetch(`${API_SERVER}/get/${slug}`).then(resp => resp.json())
	.then(data => {
		if (data.error) throw new Error(404);
		let d = data[0];
		d.content = parseContent(data[0].content);
		let input_str = data[0].inputs;
		delete d.inputs;
		return [d, JSON.parse(input_str)];
	}).catch(e => [false, false]);
}
export function postQuiz(target, qid) {
	const SERVER_URL = `${API_SERVER}/${qid ? "update" : "create"}`;
	return fetch(SERVER_URL, {
		method: "POST",
		body: new FormData(target),
	}).then(resp => resp.json());
}
export async function slugIdMatch(slug, qid) {
	const SERVER_URL = `${API_SERVER}/check-slug-qid?${new URLSearchParams({
		qid: qid, slug: slug
	})}`;
	return await fetch(SERVER_URL).then(resp => resp.text()).catch(e => "0");
}
