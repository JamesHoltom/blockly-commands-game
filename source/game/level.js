/**
 * @file This file implements the levels of the game.
 * @author James Holtom
 */

import { GameObjects, Scene } from "phaser";
import Actor from "./actor";
import HeldItem from "./heldItem";
import { IsRunning, ShowResults } from "./core";
import assets from "../config/assets";
import { HasCommands, HasCommandsLeft, NextCommand, RunCommand, Stop } from "./tester";

export let actors = [];
let heldItemObj = null;
let heldItem = null;
let resultMsg = "";

export function getHeldItem() {
  return actors.find((actor) => actor.name === heldItem);
}

export function setHeldItem(item) {
  heldItem = item;
  heldItemObj.setItem(item);
}

export function SetResultMessage(msg) {
  resultMsg = msg;
}

export function ResetActors () {
  for (let actor of actors) {
    actor.actor.x = actor.defaults.x;
    actor.actor.y = actor.defaults.y;
    actor.actor.visible = true;
  }

  setHeldItem(null);
  resultMsg = "";
}

export default class Level extends Scene {
  constructor() {
    super();
  }

  preload() {
    for (const [ key, asset ] of Object.entries(assets)) {
      switch (asset.type) {
        case "image":
          this.load.image(key, asset.file);
          break;
        case "spritesheet":
          this.load.spritesheet(key, asset.file, asset.params);
          break;
      }
    }
  }

  create() {
    const roomImg = new GameObjects.Image(this, 0, 0, "room");
    roomImg.displayOriginX = 0;
    roomImg.displayOriginY = 0;
    this.add.existing(roomImg, true);

    actors = [];

    for (const actor of this.scene.settings.data.actors) {
      actors.push({
        name: actor.texture,
        actor: new Actor(this, actor),
        defaults: {
          x: actor.x,
          y: actor.y
        }
      });
    }

    heldItemObj = new HeldItem(this, {
      x: 16,
      y: 432
    })
  }

  update() {
    if (IsRunning()) {
      if (HasCommands()) {
        const result = RunCommand();

        if (result === true) {
          NextCommand();
        }
        else if (result === false) {
          Stop();
          ShowResults(false, resultMsg);
        }
      }
      else if (!HasCommandsLeft()) {
        Stop();
        ShowResults(true, "You win!");
      }
    }
  }
};
