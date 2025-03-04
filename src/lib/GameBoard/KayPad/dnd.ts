/* this code is inspired by https://www.horuskol.net/blog/2020-08-15/drag-and-drop-elements-on-touch-devices/ */

import { checkAnswer, sleep } from "../../../states/helper";
import { s } from "../../../states/states.svelte";

let pickedUp: null | HTMLElement = null;

/**
 * This happens on the beginning of the drag. It changes the position of the element to "fixed", so it the position on screen can be arbitrarily set.
 */
export function dragStart(event: MouseEvent | TouchEvent) {
  pickedUp = event.target as HTMLElement;
  if (pickedUp) pickUp(pickedUp);
}

/**
 * This event happens continuously numerous times during the drag. It basically keeps updating the position of the element to the current mouse position.
 */
export function move(event: MouseEvent | TouchEvent) {
  if (pickedUp) {
    if ("clientX" in event) {
      // mousemove
      pickedUp.style.left = event.clientX - pickedUp.clientWidth / 2 + "px";
      pickedUp.style.top = event.clientY - pickedUp.clientHeight / 2 + "px";
    } else {
      // touchmove - assuming a single touch point
      pickedUp.style.left =
        event.changedTouches[0].clientX - pickedUp.clientWidth / 2 + "px";
      pickedUp.style.top =
        event.changedTouches[0].clientY - pickedUp.clientHeight / 2 + "px";
    }
  }
}

export async function dragEnd() {
  if (!pickedUp) return;
  await handleDropAfterDrag(pickedUp);
  pickedUp = null;
  await checkAnswer();
}

/**
 * Call this if the number has been really dragged and dropped
 */
async function handleDropAfterDrag(pickedUp: HTMLElement) {
  const number = Number((pickedUp as HTMLElement).dataset.number);
  if (!number) return;

  if (isOverlapping(pickedUp, document.getElementById("cloze-a")!)) {
    s.currentAnswer.a = number;
  }
  if (isOverlapping(pickedUp, document.getElementById("cloze-b")!)) {
    s.currentAnswer.b = number;
  }
  if (isOverlapping(pickedUp, document.getElementById("cloze-c")!)) {
    s.currentAnswer.c = number;
  }

  // make the dropped button not visible (it'll happen gradually because the button has transition set in its css)
  pickedUp.style.scale = "0";
  pickedUp.style.opacity = "0";
  await sleep(30);
  putDown(pickedUp);
  await sleep(30);
  // make the button visible again
  pickedUp.style.scale = "1";
  pickedUp.style.opacity = "1";
}

function handleClick() {}
/**
 * helper function: checks if two elements overlap.
 */
function isOverlapping(element1: HTMLElement, element2: HTMLElement) {
  const rectangle1 = element1.getBoundingClientRect();
  const rectangle2 = element2.getBoundingClientRect();
  return !(
    (
      rectangle1.right < rectangle2.left || // element1 is completely left of element2
      rectangle1.left > rectangle2.right || // element1 is completely right of element2
      rectangle1.bottom < rectangle2.top || // element1 is completely above element2
      rectangle1.top > rectangle2.bottom
    ) // element1 is completely below element2
  );
}

/**
 * to "pickup" an element means to give it position fixed, make it ready to move
 */
function pickUp(element: HTMLElement) {
  element.style.position = "fixed"; // note it won't immediately teleport the element to the top left corner until "top" and "left" are explicitly set. The element will remain in its previous visual position after this line.
  element.style.height = element.clientHeight + "px";
  element.style.width = element.clientWidth + "px";
}

/**
 * to "put down" an element means to remove the position fixed, make it go back to its original position
 */
function putDown(element: HTMLElement) {
  element.style.left = "";
  element.style.top = "";
  element.style.height = "";
  element.style.width = "";
  element.style.position = "";
}
