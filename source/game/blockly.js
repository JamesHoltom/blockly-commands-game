/**
 * @file This file contains all code relating to Blockly.
 * @author James Holtom
 * @see [Blockly](https://developers.google.com/blockly)
 */

import { inject, defineBlocksWithJsonArray } from "blockly";
import { Order, javascriptGenerator } from "blockly/javascript";

/**
 * Refers to the <div> containing the workspace.
 */
const $container = document.getElementById("blocks_workspace");

// Define the custom blocks for the game.
defineBlocksWithJsonArray([
  {
    "type": "custom_moveTo",
    "message0": "Move to %1",
    "args0": [
      {
        "name": "target",
        "type": "input_value",
        "check": [ "item", "task" ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_VARIABLES_DYNAMIC_HUE}",
    "tooltip": "Move to the target."
  },
  {
    "type": "custom_pickUp",
    "message0": "Pick up %1",
    "args0": [
      {
        "name": "target",
        "type": "input_value",
        "check": "item"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_VARIABLES_DYNAMIC_HUE}",
    "tooltip": "Picks up a nearby object."
  },
  {
    "type": "custom_drop",
    "message0": "Drop onto %1",
    "args0": [
      {
        "name": "target",
        "type": "input_value",
        "check": "task"
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_VARIABLES_DYNAMIC_HUE}",
    "tooltip": "Drops a held object."
  },
  {
    "type": "custom_item_box",
    "message0": "Item %1",
    "args0": [{
      "type": "field_image",
      "src": "assets/actors/box.png",
      "width": 32,
      "height": 32,
      "alt": "Box"
    }],
    "output": "item",
    "colour": 65,
    "tooltip": "Box item"
  },
  {
    "type": "custom_task_loading_area",
    "message0": "Task %1",
    "args0": [{
      "type": "field_image",
      "src": "assets/actors/loading_area.png",
      "width": 32,
      "height": 32,
      "alt": "Loading area"
    }],
    "output": "task",
    "colour": 45,
    "tooltip": "Loading area task"
  }
]);

/**
 * This block generates code to get the input variable.
 */
javascriptGenerator.forBlock["custom_moveTo"] = function(block, generator) {
  const value = generator.valueToCode(block, "target", Order.NONE) || "null";

  return `moveTo(${value});\n`;
};

javascriptGenerator.forBlock["custom_pickUp"] = function(block, generator) {
  const value = generator.valueToCode(block, "target", Order.NONE) || "null";

  return `pickUp(${value});\n`;
};

javascriptGenerator.forBlock["custom_drop"] = function(block, generator) {
  const value = generator.valueToCode(block, "target", Order.NONE) || "null";

  return `drop(${value});\n`;
};

javascriptGenerator.forBlock["custom_item_box"] = function() {
  return [ `findItem("box")`, Order.NONE ];
};

javascriptGenerator.forBlock["custom_task_loading_area"] = function() {
  return [ `findTask("loading_area")`, Order.NONE ];
};

/**
 * Creates the workspace and toolbox.
 */
const workspace = inject($container, {
  toolbox: {
    "kind": "flyoutToolbox",
    "contents": []
  }
});

export function setToolbox(config) {
  workspace.updateToolbox(config);
}

/**
 * Generates the JavaScript code based on the contents of the workspace.
 * 
 * @returns {string} The generated code.
 */
export function GetCode()
{
  return javascriptGenerator.workspaceToCode(workspace);
}
