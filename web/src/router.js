import QuizForm from "./components/QuizForm/Form";
import QuizView from "./components/QuizView/View";
import {fetchQuiz,slugIdMatch} from "./helpers/fetch-data";
import {createHashRouter,redirect} from "react-router-dom";
// import {BASENAME} from "./config";

function setSampleData() {
	// initial data
	if (!localStorage.getItem("fox"))
		localStorage.setItem("fox", "{\"title\":\"fox\",\"slug\":\"fox\",\"id\":\"f26df5b7d9363b8c\",\"KVtjXGuu3vvUZ0Oa\":\"0\",\"content\":\"the<[{{{[KVtjXGuu3vvUZ0Oa<[{brown fox<[{{{[3KBD5NPRFiHYyCxv<[{over the<[{{{[BWhuOBWL44ZSFUNu<[{dogs. \",\"inputs\":\"eyJLVnRqWEd1dTN2dlVaME9hIjp7InBsYWNlZCI6dHJ1ZSwiYW5zIjowLCJvcHRpb25zIjpbInF1aWNrIiwic2xvdyIsImRyeSIsInRpcmVkIl0sInBsYWNlaG9sZGVyIjoidHlwZT8ifSwiM0tCRDVOUFJGaUhZeUN4diI6eyJwbGFjZWQiOnRydWUsImFucyI6MCwib3B0aW9ucyI6WyJqdW1wZWQiLCJsZWFwZWQiLCJyYW4iLCJjbG93bmVkIl0sInBsYWNlaG9sZGVyIjoiLS0tLSJ9LCJCV2h1T0JXTDQ0WlNGVU51Ijp7InBsYWNlZCI6dHJ1ZSwiYW5zIjoyLCJvcHRpb25zIjpbInRpcmVkIiwiY2lyY3VzIiwibGF6eSJdLCJwbGFjZWhvbGRlciI6Ii0tLS0ifX0=\"}");
}

function redirect_to_index() {
	return redirect("/");
	// return [false, false];
}

async function form_edit_loader({ params }) {
	setSampleData();
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
	setSampleData();
	return fetchQuiz(params.slug);
}


export const router = createHashRouter([
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
]);
