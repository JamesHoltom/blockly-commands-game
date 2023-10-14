# Task Manager Game

## Game Rules

The player must guide a character into completing a series of tasks, by creating a set of instructions with blocks from Blockly.

The game is split into 2 phases, which are:

- __Design__: Using _Blockly_, assemble the list of instructions to guide the character.
- __Play__: An animated sequence, where the character will attempt to follow the instructions and complete tasks.

In the testing sequence, the character will follow each instruction line-by-line, and attempt to complete tasks. If the character is given mis-matched instructions, the character will ignore them, or potentially wreak havoc. The player can opt to skip the animation and head straight to the results at any time.

After the sequence finishes, or if the player skips it, a results screen will open, showing the player how many tasks were completed, and how well their instructions guided the character.

## Building

Node.js and NPM are required to run the project, which uses _webpack-dev-server_ to run locally.

Clone the project with `git clone https://github.com/JamesHoltom/blockly-commands-game.git` and run `npm start` to build and serve the project at localhost:9000.
