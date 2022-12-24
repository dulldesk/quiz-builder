import {Link} from "react-router-dom";

export default function BasicQuizInfo(props) {
	const slug = props.form.slug;
	const qid = props.form.qid;

	return (
		<section>
			<div className="input-field">
				<input type="text" value={props.form.title} placeholder="Quiz Title..." name="title"
					onChange={props.handleChange} className="fs-4" />
			</div>
			{!qid
				?
					<div className="input-field inline">
						<label htmlFor="slug"><>Link: </><i className="text-dark">{window.location.origin +"/"}</i></label>
						<input type="text" value={slug} placeholder="Slug (alphanumeric)" name="slug" id="slug" onChange={props.handleChange} maxLength="50" />
						<span>(this can only be set once!)</span>
					</div>
				:
					<>
					<input type="hidden" value={slug} name="slug" />
					<table className="minimal">
					<tbody>
						<tr>
							<td>View Quiz:</td>
							<td><i className="text-dark"><Link to={`/${slug}`}>{`${window.location.origin}/${slug}`}</Link></i></td>
						</tr>
						<tr>
							<td>Edit Link:</td>
							<td><i className="text-dark"><Link to={`/${slug}/edit/${qid}`}>{`${window.location.origin}/${slug}/edit/${qid}`}</Link></i></td>
						</tr>
					</tbody>
					</table>
					</>
				}
			<input type="hidden" value={props.form.qid} name="qid" />
		</section>
	)
}
