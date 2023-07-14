# Welcome to the Simple Game Engine
### An easy to use simple game engine created by Zeb.

## Getting Started

### Project setup

In your text editor create an ```index.html``` file and open it in VSCode (or any other text editor). In VSCode you can type "!" then press tab to autofill the HTML boilerplate. If you are not using VSCode you will have to write out the boilerplate HTML.

Inclue these two script tags inbetween the body tags of you HTML.

```
<script type="module" src="https://www.unpkg.com/browse/simple-game-engine@latest/dist/index.umd.min.js"></script>
<script type="module" src="main.js"></script>
```

Create the ```main.js``` file in the same directory as your index.html file.

You're all set and ready to start!

### Starting the game

Navigate to your ```main.js``` file. The frist thing that always needs to be done is to create the game. To do so add the following code to ```main.js```.

```
const game = new engine.Game({
  s: {
    w: 500,
    h: 500,
  }
});
```

This uses the Simple Game Engine to create a new game. The ```s``` is short for size and the ```w``` and ```h``` are short for width and height. The width and height can be any numbers you would like.
