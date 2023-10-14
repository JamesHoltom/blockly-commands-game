/**
 * @file This file implements the game's held item.
 * @author James Holtom
 */

import { GameObjects } from "phaser";

export default class HeldItem extends GameObjects.Sprite {
  constructor(scene, config) {
    super(scene, config.x, config.y);

    this.displayOriginX = 0;
    this.displayOriginY = 0;
    this.depth = 20;

    scene.add.existing(this);
  }

  setItem(name) {
    this.texture = name;
    this.visible = name !== null;
  }
}