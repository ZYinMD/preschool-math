/* this code is inspired by https://www.horuskol.net/blog/2020-08-15/drag-and-drop-elements-on-touch-devices/ */

import { checkAnswer, sleep } from "../../../states/helper";
import { s } from "../../../states/states.svelte";

let moving: null | HTMLElement = null;

/**
 * This happens on the beginning of the drag. It changes the position of the element to "fixed", so it the position on screen can be arbitrarily set.
 */
export function pickup(event: MouseEvent | TouchEvent) {
  moving = event.target as HTMLElement;
  if (moving) {
    (moving as HTMLElement).style.position = "fixed";
    moving.style.position = "fixed";
    moving.style.height = moving.clientHeight + "px";
    moving.style.width = moving.clientWidth + "px";
  }
}

/**
 * This event happens continuously numerous times every second during the drag. It basically keeps updating the position of the element to the current mouse position.
 */
export function move(event: MouseEvent | TouchEvent) {
  if (moving) {
    if ("clientX" in event) {
      // mousemove
      moving.style.left = event.clientX - moving.clientWidth / 2 + "px";
      moving.style.top = event.clientY - moving.clientHeight / 2 + "px";
    } else {
      // touchmove - assuming a single touch point
      moving.style.left =
        event.changedTouches[0].clientX - moving.clientWidth / 2 + "px";
      moving.style.top =
        event.changedTouches[0].clientY - moving.clientHeight / 2 + "px";
    }
  }
}

export async function drop() {
  if (!moving) return;
  const number = Number((moving as HTMLElement).dataset.number);
  if (!number) return;

  if (isOverlapping(moving, document.getElementById("cloze-a")!)) {
    s.currentAnswer.a = number;
  }
  if (isOverlapping(moving, document.getElementById("cloze-b")!)) {
    s.currentAnswer.b = number;
  }
  if (isOverlapping(moving, document.getElementById("cloze-c")!)) {
    s.currentAnswer.c = number;
  }

  // make the dropped button not visible (it'll happen gradually because the button has transition set in its css)
  moving.style.scale = "0";
  moving.style.opacity = "0";
  await sleep(30);
  // return the button to its original position
  moving.style.left = "";
  moving.style.top = "";
  moving.style.height = "";
  moving.style.width = "";
  moving.style.position = "";
  await sleep(30);
  // make the button visible again
  moving.style.scale = "1";
  moving.style.opacity = "1";

  moving = null;

  await checkAnswer();
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
