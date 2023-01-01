import QuizForm from "./components/QuizForm/Form";
import QuizView from "./components/QuizView/View";
import {fetchQuiz,slugIdMatch} from "./helpers/fetch-data";
import {createBrowserRouter,redirect} from "react-router-dom";
import {BASENAME} from "./config";

function redirect_to_index() {
	return redirect("/");
	// return [false, false];
}

async function form_edit_loader({ params }) {
	if (params.slug && params.qid) {
		try {
			let qid_slug_match = await slugIdMatch(params.slug, params.qid);
			if (qid_slug_match !== "1") throw new Error("no permission to edit");
			return fetchQuiz(params.slug);
		} catch (e) {return redirect_to_index()}
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
	}, {
		path: "*",
		element: <QuizView />,
		loader: redirect_to_index
	}
], {
	basename: `/${BASENAME}`
});
