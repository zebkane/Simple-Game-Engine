# Welcome to the Simple Game Engine
### An easy to use simple game engine created by Zeb.

## Getting Started

### Project setup

The first thing you will need to do is download VSCode (https://code.visualstudio.com/download) and install it. Open it up and navigate to the extentions tab in the sidebar and search for Live Server by Ritwick Dey. Click install and navigate back to the explorer tab. 

Now click File -> Open Folder and create a new folder on you computer and open it up. 

Now create an ```index.html``` file and double click to open it. In VSCode you can type "!" then press tab to autofill the HTML boilerplate. If you are not using VSCode you will have to write out the boilerplate HTML.

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>

  </body>
</html>

```

Inclue these two script tags inbetween the body tags of you HTML.

```
<script type="module" src="https://www.unpkg.com/simple-game-engine@latest/dist/index.umd.js"></script>
<script type="module" src="main.js"></script>
```

Create the ```main.js``` file in the same directory as your index.html file.

Now with your ```index.html``` file selected click Go Live in the bottom right corner. This will serve your ```index.html``` file on a port.

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

## Docs

Simple Game Engine uses a consistaint method for passing properties to objects. Lets take the ```Game``` class for example. To pass properties to it you will use curly brackets ```{}```. Inside these curly brackets will be the property name followed by the value. For example.

``
`engine.Game({
  title: "A New Game",
});
```

Here the title property is given a value of ```"A New Game"```. These custom properties can be chained together to add more.

### ```engine.Game```

The ```engine.Game``` class is used to create a new game. This is a required step when setting up a project. The following is a new instance of the game class with all possible custom properties.

```
const game = new engine.Game({
  s: {
    w: 500,
    h: 500,
  },
  loop: loop,
  name: "Simple Game Engine",
});
```

The ```s``` property, representing size, takes and object that contains the properties ```w``` and ```h``` representing the width and height of the game canvas. If no value is given it defaults to ```{ w: 500, h: 500 }```.

The ```loop``` is a reqired property that takes a function that will be run at the target frames per second (60). Code placed inside of the given loop function will be run as a part of the game loop. 

The ```name``` property takes a string and will set the browser title to the given value. If no value is given it defaults to ```"Simple Game Engine"```.

## ```engine.Object```
