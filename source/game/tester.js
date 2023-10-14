/**
 * @file This file contains the code to run the player's blocks.
 * @author James Holtom
 */

import { GetCode } from "./blockly";
import actions from "../config/actions";

let interpreter = null;
let isExecuting = false;
let commands = [];

function initInterpreter(interpreter, globalObject) {
  interpreter.setProperty(globalObject, "findItem", interpreter.createNativeFunction((name) => {
    return name;
  }));
  interpreter.setProperty(globalObject, "findTask", interpreter.createNativeFunction((name) => {
    return name;
  }));
  interpreter.setProperty(globalObject, "moveTo", interpreter.createNativeFunction((target) => {
    if (target !== undefined) {
      commands.push({ command: "moveTo", target });
    }
    else {
      console.error("Could not find target to move!");
    }
  }));
  interpreter.setProperty(globalObject, "pickUp", interpreter.createNativeFunction((target) => {
    if (target !== undefined) {
      commands.push({ command: "pickUp", target });
    }
    else {
      console.error("Could not find target to pick up!");
    }
  }));
  interpreter.setProperty(globalObject, "drop", interpreter.createNativeFunction((target) => {
    if (target !== undefined) {
      commands.push({ command: "drop", target });
    }
    else {
      console.error("Could not find target to drop item on!");
    }
  }));
}

function SetupInterpreter() {
  const code = GetCode();
  interpreter = new Interpreter(code, initInterpreter);
}

export function Play() {
  if (!isExecuting) {
    SetupInterpreter();
  }

  if (interpreter !== null) {
    interpreter.run();
    isExecuting = false;
  }
}

export function Stop() {
  isExecuting = false;
  commands = [];
}

export function HasCommands() {
  return commands.length > 0;
}

export function HasCommandsLeft() {
  return isExecuting;
}

export function RunCommand() {
  if (HasCommands()) {
    const command = commands[0].command;
    switch (command) {
      case "moveTo":
      case "pickUp":
      case "drop":
        return actions[command](commands[0].target);
      default:
        console.error(`Invalid command "${command}" given!`);

        return false;
    }
  }
  else {
    return true;
  }
}

export function NextCommand() {
  commands.shift();
}