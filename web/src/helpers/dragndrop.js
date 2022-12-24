const DROP_EFFECT = "move";

export function dragstart_handler(e) {
	e.dataTransfer.setData("text/plain", e.target.dataset.id);
	e.dataTransfer.effectAllowed = DROP_EFFECT;
}
export function dragover_handler(e) {
	e.preventDefault();
	e.dataTransfer.dropEffect = DROP_EFFECT;
	// console.log(getCaretPosition(e))
}
export function drop_handler(e, handler) {
	e.preventDefault();
	handler(e.dataTransfer.getData("text/plain"), getCaretPosition(e));
}

// source: https://developer.mozilla.org/en-US/docs/Web/API/document/caretPositionFromPoint#javascript
function getCaretPosition(e) {
  let range;
  let textNode;
  let offset;

  if (document.caretPositionFromPoint) {
    range = document.caretPositionFromPoint(e.clientX, e.clientY);
    textNode = range.offsetNode;
    offset = range.offset;
  } else if (document.caretRangeFromPoint) {
    // Use WebKit-proprietary fallback method
    range = document.caretRangeFromPoint(e.clientX, e.clientY);
    textNode = range.startContainer;
    offset = range.startOffset;
  } else {
    // Neither method is supported, do nothing
    return [undefined, undefined, undefined];
  }
  return [range, textNode, offset];
}
