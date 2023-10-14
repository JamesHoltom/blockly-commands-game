/**
 * @file This file contains code to run the user interface.
 * @author James Holtom
 */

import { Modal } from "bootstrap";
import { setLevelScene } from "./phaser";
import { GetCode, setToolbox } from "./blockly";
import { Play, Stop } from "./tester";
import levels from "../config/levels";
import { ResetActors } from "./level";

const $modal = new Modal("#modal_pane");
const $modalPrompt = document.getElementById("prompt_content");
const $modalResults = document.getElementById("results_content");
const $resultsTitle = document.getElementById("results_title");
const $resultsMessage = document.getElementById("results-message");
const $resultsConfirmBtn = document.getElementById("results_confirm");
const $startBtn = document.getElementById("start_test");
const $cancelBtn = document.getElementById("cancel_test");

let playing = false;

export function GoToLevel(level) {
  if (levels.hasOwnProperty(level)) {
    setToolbox(levels[level].toolbox);
    setLevelScene(level, levels[level])
  }
  else {
    console.warn(`No level "${level}" found!`);
  }
}

export function IsRunning() {
  return playing;
}

/**
 * Opens the modal for the introductory prompt.
 */
function ShowPrompt()
{
  $modalPrompt.classList.remove("hidden");
  $modalResults.classList.add("hidden");
  $modal.show();
}

/**
 * Opens the modal for reviewing the test results.
 */
export function ShowResults(result, msg)
{
  $modalPrompt.classList.add("hidden");
  $modalResults.classList.remove("hidden");
  $resultsMessage.textContent = msg;

  playing = false;

  // If any tests have failed, display the losing scenario...
  if (result === false)
  {
    $resultsTitle.textContent = "Try again!";
    $resultsConfirmBtn.classList.remove("btn-primary");
    $resultsConfirmBtn.classList.add("btn-danger");
    $resultsConfirmBtn.textContent = "Retry";
  }
  /// ... otherwise, display the winning scenario.
  else
  {
    $resultsTitle.textContent = "Congratulations!";
    $resultsConfirmBtn.classList.add("btn-primary");
    $resultsConfirmBtn.classList.remove("btn-danger");
    $resultsConfirmBtn.textContent = "Continue";
  }

  $modal.show();
}

$startBtn.addEventListener("click", () => {
  $startBtn.setAttribute("disabled", true);
  $cancelBtn.removeAttribute("disabled");

  playing = true;

  Play();
});

$cancelBtn.addEventListener("click", () => {
  $startBtn.removeAttribute("disabled");
  $cancelBtn.setAttribute("disabled", true);

  playing = false;

  ResetActors();
  Stop();
});

document.getElementById("show_code").addEventListener("click", () => {
  console.log(GetCode());
});

// Display the introductory prompt when the page loads.
ShowPrompt();

GoToLevel("level1");