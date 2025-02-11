/* this code is inspired by https://www.horuskol.net/blog/2020-08-15/drag-and-drop-elements-on-touch-devices/ */

import { s, submitAnswer } from "../../states/states.svelte";

let moving: null | HTMLElement = null;

export function pickup(event: MouseEvent | TouchEvent) {
  console.log(event);
  const number = (event.target as HTMLElement).dataset.number;
  console.log("number", number);
  moving = event.target as HTMLElement;
  if (moving) {
    (moving as HTMLElement).style.position = "fixed";
    moving.style.position = "fixed";
    moving.style.zIndex = "1000";
    moving.style.height = moving.clientHeight + "px";
    moving.style.width = moving.clientWidth + "px";
  }
}

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

export function drop() {
  if (!moving) return;
  const number = Number((moving as HTMLElement).dataset.number);
  if (!number) return;

  if (isOverlapping(moving, document.getElementById("cloze-a")!)) {
    s.currentAnswer.values.a = number;
  }
  if (isOverlapping(moving, document.getElementById("cloze-b")!)) {
    s.currentAnswer.values.b = number;
  }
  if (isOverlapping(moving, document.getElementById("cloze-c")!)) {
    s.currentAnswer.values.c = number;
  }
  const allFilled =
    s.currentAnswer.values.a &&
    s.currentAnswer.values.b &&
    s.currentAnswer.values.c;
  if (allFilled) submitAnswer();

  moving.style.left = "";
  moving.style.top = "";
  moving.style.height = "";
  moving.style.width = "";
  moving.style.position = "";

  moving = null;
}

/**
 * Checks if two elements overlap.
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
