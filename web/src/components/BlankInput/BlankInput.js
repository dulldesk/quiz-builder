import "./BlankInput.scss";

export default function BlankInput(props) {
	// const Component = props.component;

	return (
		<select defaultValue="placeholder" name={props.id} className={props.more_classes}>
			{props.placeholder ? <option disabled value="placeholder">{props.placeholder}</option> : ""}
			{props.options.map((opt, idx) => <option key={`${props.id}_${idx}_display`} value={idx}>{opt}</option>)}
		</select>
	)
}
