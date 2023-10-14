export default {
  "level1": {
    "actors": [
      {
        "type": "character",
        "x": 296,
        "y": 216,
        "depth": 20,
        "texture": "character",
        "frame": 0
      },
      {
        "type": "item",
        "x": 80,
        "y": 80,
        "depth": 5,
        "texture": "box",
        "frame": 0
      },
      {
        "type": "task",
        "x": 544,
        "y": 384,
        "texture": "loading_area",
        "frame": 0
      }
    ],
    "toolbox": {
      "kind": "flyoutToolbox",
      "contents": [
        {
          "kind": "block",
          "type": "custom_moveTo"
        },
        {
          "kind": "block",
          "type": "custom_pickUp"
        },
        {
          "kind": "block",
          "type": "custom_drop"
        },
        {
          "kind": "block",
          "type": "custom_item_box"
        },
        {
          "kind": "block",
          "type": "custom_task_loading_area"
        }
      ]
    }
  }
};
