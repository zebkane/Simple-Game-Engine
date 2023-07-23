# Welcome to the Simple Game Engine
### An easy to use simple game engine created by Zeb.

## Getting Started

### Project setup

Open up your code editor of choice (VSCode, Sublime Text, Notepad++, etc.) and create a new project folder. Now create an ```index.html``` file and a ```main.js``` file. Copy and paste the code below into the ```index.html``` file and save it.

```
<!DOCTYPE html>
<html lang="en">
  <body>
    <script type="module" src="./node_modules/simple-game-engine/dist/index.umd.min.js"></script>
    <script type="module" src="main.js"></script>
  </body>
</html>

```

This code is mostly the HTML boilerplate code, however, there are two things to note in it. If you look between the ```<body>``` tags you will notice two ```<script>``` tags that bring in two diffent JavaScript files. The first we will create in the next steps and the second is the ```main.js``` file you just created. They are both now linked together!

Ensure you have Node.js downloaded, here is the download link if you do not (https://nodejs.org/en/download/current).

Open up terminal or command line either in the code editor or on your computer. Navigate to your project folder and run the following commands. 

```npm init -y```

This will initialize a new Node.js project.

```npm i simple-game-engine serve```

This will install two packages to a folder called ```node_modules```. The first is the Simple Game Engine and the second is a server to serve your game files.

Lastly run the following command to start the game server.

```serve .```

This will start a local host server in the current directory. You can then go to a web browser and paste the address into the seach box to access your game.

You're all set and ready to start!
***
### Starting the game

Navigate to your ```main.js``` file. The frist thing that always needs to be done is to create the game. To do so add the following code to ```main.js```.

```
const game = new engine.Game({
  loop: loop,
});
```

This uses the Simple Game Engine to create a new game. The ```loop: loop``` is specifying the main game loop function that will run for every frame of the game. The code put inside the loop function will run every frame. So lets create that now!

Add the following to the bottom of your ```main.js``` file.

```
function loop() {

}

game.begin();
```

This code does two things. The first is that we have created a funtion called ```loop```. This is the funciton that we passed to the game when we said ```loop: loop```. The second thing this code does is start the game with ```game.begin()```.

Your game is now all set up so go ahead and start creating!
***
## Docs

This is a listing of the ways the engine classes and function can be used.
***
### Common properties

Simple Game Engine uses a consistaint method for passing properties to objects. Lets take the ```Game``` class for example. To pass properties to it you will use curly brackets ```{}```. Inside these curly brackets will be the property name followed by the value. For example.

```
engine.Game({
  name: "A New Game",
});
```

Here the ```name``` property is given a value of the string ```"A New Game"```. These custom properties can be chained together to add more.

When using the engine and createing class instances for your game you will see many property names repeat. These names will be defined below and will always remain the same no matter the class instance.

The ```pos``` property, representing the position, takes an object that contains the properties ```x``` and ```y``` representing the x and y position of the item.

```
pos: {
  x: 100,
  y: 50,
}
```

The ```s``` property, representing size, takes an object that contains the properties ```w``` and ```h``` representing the width and height of the item.

```
s: {
  w: 50,
  h: 50,
}
```

The ```name``` property takes a string and will set the items name to the given value.

```
name: "This is the name",
```

The ```color``` property takes a string representing a valid CSS color name, HEX code, or RGB value, and will set the items color to the given value.

```
color: "cyan",
```

The ```img``` property takes a string representing an image path or a URL to an image. It will set the items image to the given value.

```
img: "../player.png",
```

***
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
  bg: "green",
});
```

The ```name``` property defaults to ```"Simple Game Engine"```. In this case acts a bit differnt. It will set the browser title to the given value and if an html tag is present with the id of ```engine-game-name``` it will set that text to be the same. If no value is given it defaults to ```"Simple Game Engine"```

The ```loop``` is a reqired property that takes a function that will be run at the target frames per second (60). Code placed inside of the given loop function will be run as a part of the game loop. 

The ```Game``` class gives you access to many different methods inside of it.

The ```begin()``` method starts the game loop running. Creating the instance of the game object without specifying the loop funtion will cause an error. If this method is not called it will result in your game not showing up.

```
game.begin();
```

The ```end()``` method will end the game.

```
game.end();
```

The ```key()``` method retuns a boolean representing if the given key is pressed. It takes a string of a JS key name as a parameter.

```
game.key({
  key: "a",
}); // returns true if A key is pressed
```

The ```add()``` method will add a custom property to the game. It requires a name and a value. The value can be any data type or a function.

```
game.add({
  name: "score",
  value: 0,
}); // Can now be accessed with game.score
```

The ```setFps()``` method will set a target FPS for your game. By default the game will target 60 FPS.

```
game.setFps({
  fps: 50,
});
```

***
## ```engine.Object```

The ```engine.Object``` class is used to create a new object in your game. The following is an instance of an object that is created will all of the possible custom properties.

```
const player = new engine.Object({
  name: "player",
  pos: {
    x: 50,
    y: 50,
  },
  s: {
    w: 50,
    h: 50
  },
  color: "black",
  img: "./player.jpg"
});
```

The ```Object``` class gives you access to many different methods inside of it.

The ```add()``` method will add a custom property to the object. It requires a name and a value. The value can be any data type or a function.

```
player.add({
  name: "speed",
  value: 5,
}); // Can now be accessed with player.speed
```

The ```move()``` method will move the object the given amount. 

```
player.move({
  x: 10,
  y: 10,
});
```

If you only want to move the object on one axix, X for example, you could competly remove the ```y``` propery and leave only the ```x``` propery.

The ```update()``` method will draw and update the object. This should almost always be called in the loop function.

```
player.update();
```

***
# ```engine.Ui```

The ```engine.Ui``` class will manage all of the HTML canvas user interface elements. It takes no propertys when created. 

```
const ui = new engine.Ui();
```

The ```Ui``` class gives you access to many different methods inside of it.

The ```bar()``` function will create a new UI bar element. This will have a border with a cirtain amound inside filled in, somthing like a classic health bar. Here is an example with all of the possible properties.

```
let healthBar = ui.bar({
  name: "Health Bar",
  pos: {
    x: 50,
    y: 50,
  },
  s = {
    w: 200,
    h: 20
  },
  color: "pink",
  min: 0,
  max: 100,
  from: player.health,
});
```

The ```from``` property specifies the variable of type number that the bar should be based off of. In the example a player object would have a custom property called ```health```. 

The ```min``` property specifies the minimum value the ```from``` variable could be. 

The ```max``` property specifies the maximum value the ```from``` variable could be.