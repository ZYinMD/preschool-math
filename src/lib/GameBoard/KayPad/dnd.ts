import { checkAnswer, sleep } from "../../../states/helper";
import { s } from "../../../states/states.svelte";

/* The code below is inspired by https://www.horuskol.net/blog/2020-08-15/drag-and-drop-elements-on-touch-devices/ */

/* I need to make a button that can be both clicked and drag-and-dropped. I'm not using the native html drag-and-drop api because it doesn't work on touch screen. Instead I'm manually building it with outouchstart/onmousedown and ontouchmove/onmousemove, etc. But I found that a simple click would also trigger outouchstart/onmousedown and ontouchend/mouseup etc, so I decide to not use the click event at all, and handle everything in the ontouchend/mouseup event, in which a lot of code is needed just to differentiate if it had been a click or drag */

let pickedUp: null | HTMLElement = null;

const DRAG_THRESHOLD = 5; // threshold in pixels to differentiate a drag from a click

// track initial position and whether movement occurred
let startX = 0;
let startY = 0;
let hasMoved = false;

/**
 * This happens on the beginning of the drag. It changes the position of the element to "fixed", so it the position on screen can be arbitrarily set.
 */
export function dragStart(event: MouseEvent | TouchEvent) {
  pickedUp = event.target as HTMLElement;
  hasMoved = false;

  // Record the starting position
  if (pickedUp) {
    if ("clientX" in event) {
      // mouse action
      startX = event.clientX;
      startY = event.clientY;
    } else {
      // touch screen - assuming a single touch point
      startX = event.changedTouches[0].clientX;
      startY = event.changedTouches[0].clientY;
    }
    pickUp(pickedUp);
  }
}

/**
 * This event happens continuously numerous times during the drag. It basically keeps updating the position of the element to the current mouse position.
 */
export function move(event: MouseEvent | TouchEvent) {
  if (pickedUp) {
    let currentX: number;
    let currentY: number;

    if ("clientX" in event) {
      // mousemove
      currentX = event.clientX;
      currentY = event.clientY;
    } else {
      // touchmove - assuming a single touch point
      currentX = event.changedTouches[0].clientX;
      currentY = event.changedTouches[0].clientY;
    }

    // update the position of the element to match current mouse / finger
    pickedUp.style.left = currentX - pickedUp.clientWidth / 2 + "px";
    pickedUp.style.top = currentY - pickedUp.clientHeight / 2 + "px";

    // Check if the movement is greater than the threshold
    const deltaX = Math.abs(currentX - startX);
    const deltaY = Math.abs(currentY - startY);
    if (deltaX > DRAG_THRESHOLD || deltaY > DRAG_THRESHOLD) {
      hasMoved = true;
    }
  }
}

export async function dragEnd() {
  if (!pickedUp) return;

  if (hasMoved) await handleDropAfterDrag(pickedUp); // it was a drag
  else handleClick(pickedUp); // it was a click

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

  // make the dropped button "disappear" (it'll happen gradually because the button has transition set in its css)
  pickedUp.style.scale = "0";
  pickedUp.style.opacity = "0";
  await sleep(30);
  putDown(pickedUp);
  await sleep(30);
  // make the button re-appear at its original location (it'll happen gradually because the button has transition set in its css)
  pickedUp.style.scale = "1";
  pickedUp.style.opacity = "1";
  hasMoved = false;
}

/**
 * Call this if the number is clicked, not dragged.
 */
function handleClick(element: HTMLElement) {
  const number = Number(element.dataset.number);
  if (!number) return;

  if (s.currentAnswer.a === 0) {
    s.currentAnswer.a = number;
  } else if (s.currentAnswer.b === 0) {
    s.currentAnswer.b = number;
  } else if (s.currentAnswer.c === 0) {
    s.currentAnswer.c = number;
  }

  putDown(element);
}

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
