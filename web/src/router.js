import QuizForm from "./components/QuizForm/Form";
import QuizView from "./components/QuizView/View";
import {fetchQuiz} from "./helpers/content-format";
import {API_SERVER} from "./config";
import {createBrowserRouter,redirect} from "react-router-dom";

function redirect_to_index() {
	redirect("/");
	return [false, false];
}

async function form_edit_loader({ params }) {
	if (params.slug && params.qid) {
		const SERVER_URL = `${API_SERVER}/check-slug-qid?${new URLSearchParams({
			qid: params.qid, slug: params.slug
		})}`;
		return fetch(SERVER_URL).then(resp => resp.text())
			.then(qid_slug_match => {
				// check editing "perms"
				if (qid_slug_match !== "1") throw new Error("no permission to edit");
				return fetchQuiz(params.slug);
			}).catch(e => redirect_to_index());
	}
	return redirect_to_index();
}

function form_new_loader() {
	return [{title: "", slug: "", qid: "", content: [""]}, {}]
}
async function quiz_view_loader({ params }) {
	return fetchQuiz(params.slug);
}


export const router = createBrowserRouter([
	{
		path: "/",
		element: <QuizForm />,
		loader: form_new_loader
	}, {
		path: ":slug/edit/:qid",
		element: <QuizForm />,
		loader: form_edit_loader
	}, {
		path: ":slug",
		element: <QuizView />,
		loader: quiz_view_loader
	}
]);
