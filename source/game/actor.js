/**
 * @file This file implements the game's characters (known as actors).
 * @author James Holtom
 */

import { GameObjects } from "phaser";

export let character = null;

export default class Actor extends GameObjects.Sprite {
  constructor(scene, config) {
    super(scene, config.x, config.y, config.texture, config.frame);

    this.depth = config.depth ?? 0;

    this.type = config.type;
    this.interactCallback = config.callback;

    if (this.type === "character") {
      character = this;
    }

    scene.add.existing(this);
  }
}