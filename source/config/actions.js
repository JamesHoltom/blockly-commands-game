import { Math as PMath } from "phaser";
import { character } from "../game/actor";
import { SetResultMessage, actors, getHeldItem, setHeldItem } from "../game/level";

export default {
  "moveTo": function(name) {
    const target = actors.find((actor) => actor.name === name);

    if (target === undefined) {
      SetResultMessage("Target not found.");

      return false;
    }

    if (PMath.Distance.Between(character.x, character.y, target.actor.x, target.actor.y) <= 32) {
      return true;
    }
    else {
      const angle = PMath.Angle.Between(character.x, character.y, target.actor.x, target.actor.y);
      character.x += Math.cos(angle) * 2.5;
      character.y += Math.sin(angle) * 2.5;

      return null;
    }
  },
  "pickUp": function(name) {
    const target = actors.find((actor) => actor.name === name);

    if (target === undefined) {
      SetResultMessage("Target not found.");
      
      return false;
    }

    if (PMath.Distance.Between(character.x, character.y, target.actor.x, target.actor.y) <= 32) {
      setHeldItem(target.name);
      target.actor.visible = false;

      return true;
    }
    else {
      SetResultMessage("Target not in range.");
      
      return false;
    }
  },
  "drop": function(name) {
    const target = actors.find((actor) => actor.name === name);
    const held = getHeldItem();

    if (target === undefined) {
      SetResultMessage("Target not found.");
      
      return false;
    }
    else if (held === undefined) {
      SetResultMessage("No item being held.");
      
      return false;
    }
    else if (PMath.Distance.Between(character.x, character.y, target.actor.x, target.actor.y) <= 32) {
      held.actor.x = target.actor.x;
      held.actor.y = target.actor.y;
      held.actor.visible = true;

      setHeldItem(null);

      return true;
    }
    else {
      SetResultMessage("Target in range.");
      
      return false;
    }
  }
};
