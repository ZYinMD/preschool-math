import { checkAnswer, sleep } from "../../../states/helper";
import { s } from "../../../states/states.svelte";

/* I need to make a button that can be both clicked and drag-and-dropped. I'm not using the native html drag-and-drop api because it doesn't work on touch screen. Instead I'm manually building it with touchstart/mousedown and touchmove/mousemove, etc. But I found that a simple click would also trigger touchstart/mousedown and ontouchend/mouseup etc, so I decide to not listen to the click event at all, and handle everything in the touchend/mouseup event, in which I need to differentiate if it had been a click or drag */

/* The code below is inspired by https://www.horuskol.net/blog/2020-08-15/drag-and-drop-elements-on-touch-devices/, but a lot of changes were made by me. The biggest difference is that he originally attached the move event handler on the element being moved, which is nice, but there's an issue where if you drag too fast, since the move event don't fire frequently enough, the mouse cursor will fly out of the boundary box of the element being dragged, and the event will stop firing, and the element will appear to be left behind the cursor and stuck in middle of a drag. So I use a document level listener to listen for mousemove, but the listener is only added after the drag start, and removed on drag end. */

let pickedUp: null | HTMLElement = null;

const DRAG_THRESHOLD = 5; // threshold in pixels to differentiate a drag from a click

// track initial position, and a flag too, used to differentiate a drag from a click
let startX = 0;
let startY = 0;
let hasMoved = false;

/**
 * This happens on the beginning of the drag. It changes the position of the element to "fixed", so its position on screen can be arbitrarily set.
 */
export function dragStart(event: MouseEvent | TouchEvent) {
  if (pickedUp) return;

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

    // start listening to mouse/tap move and mouse/tap release events
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("touchmove", handleMove);
    document.addEventListener("mouseup", handleDragEnd);
    document.addEventListener("touchend", handleTouchEnd);
  }
}

/**
 * This event happens continuously numerous times during the drag. It keeps updating the position of the element to the current mouse position.
 */
function handleMove(event: MouseEvent | TouchEvent) {
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

function handleTouchEnd(e: TouchEvent) {
  e.preventDefault(); // prevent touch device from generating simulated click event (a compatibility feature to support old websites built for mouse only) because we listen for mouse events too, which can lead to double handling the event
  handleDragEnd();
}

async function handleDragEnd() {
  if (!pickedUp) return;

  // move the listeners we added in the beginning of this drag
  document.removeEventListener("mousemove", handleMove);
  document.removeEventListener("touchmove", handleMove);
  document.removeEventListener("touchend", handleTouchEnd);
  document.removeEventListener("mouseup", handleDragEnd);

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
 * helper function: checks if two elements overlap. Used to determine if an element was dropped on the other element
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
 * to "pickup" an element means to give it position fixed, make it ready to be moved my arbitrarily setting "top" and "left"
 */
function pickUp(element: HTMLElement) {
  element.style.position = "fixed"; // note it won't immediately teleport the element to the top left corner until "top" and "left" are explicitly set. The element will remain in its previous visual position after this line.
  element.style.height = element.clientHeight + "px";
  element.style.width = element.clientWidth + "px";
}

/**
 * to "put down" an element means to remove position fixed, make it go back to its original position
 */
function putDown(element: HTMLElement) {
  element.style.left = "";
  element.style.top = "";
  element.style.height = "";
  element.style.width = "";
  element.style.position = "";
}
