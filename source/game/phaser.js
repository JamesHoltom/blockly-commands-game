/**
 * @file This file contains all code relating to Phaser.
 * @author James Holtom
 * @see [Phaser](https://phaser.io/)
 */

import { Game, AUTO, Scale } from "phaser";
import Level from "./level";

// Set up Phaser with our game scene.
const game = new Game({
  type: AUTO,
  parent: document.getElementById("game_window"),
  backgroundColor: 0x333333,
  width: 640,
  height: 480,
  scale: {
    mode: Scale.FIT
  },
  scene: []
});

export function setLevelScene(level, config) {
  game.scene.add(level, Level, true, config);
}