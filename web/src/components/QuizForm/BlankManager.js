import BlankBuilder from "../BlankInput/Builder";

export default function BlankManager(props) {
	const blanks = props.blanks;

	return (
		<section id="blank-setup">
			<p className="mb-0">Manage inputs:</p>
			<div className="row" id="blank-mgr">
				<button onClick={props.addBlank} className="small-btn mt-1" title="Add a dropdown input">+</button>
				{Object.keys(blanks).filter(b => blanks[b] && !blanks[b].placed)
					.map(b => <BlankBuilder key={"mgr" + b}
									id={b}
									blank={blanks[b]}
									removeBlank={props.removeBlank} updateBlank={props.updateBlank} />)}
			</div>
		</section>
	)
}
