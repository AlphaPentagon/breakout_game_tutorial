# Breakout Game using Vanilla JS & Canvas

[Tutorial Source](https://developer.mozilla.org/en-US/docs/Games/Tutorials/2D_Breakout_game_pure_JavaScript)

[Play Game](https://alphapentagon.github.io/breakout_game_tutorial/)

### 21/08/22

I'm using the above tutorial to learn more about the Canvas API in vanilla JS, and also to solidify my understanding of general programming logic and game logic.

At each step of the tutorial I am adding new features e.g. changing the ball colour each time it hits a surface, increasing the score amount depending on the amount of bricks destoryed.

I have also substitued arrow functions for the regular functions, to make my code neater, and where appropriate changed variable names and formats so that they are more readable.

Once the tutorial is complete, I hope to add in a few extra features such as background music and sound effects, and possibly changing canvas backgrounds.

### 29/08/22

I have now finsihed the tutorial!

I have learnt:
- how to use the Canvas API to create a canvas and draw shapes and text to the canvas.  
- how to reload the canvas after a set time using setInterval() and clearInterval(), and then how to allow the canvas to control the rerendering by using requestAnimationFrame()
- how to implement simple collision detection based on co-ordinates of two items
- how to implement win and lose conditions


As a bonus, I have also learnt:
- how to implement dynamic game logic e.g. changing the speed of the ball each time it is hit by the paddle, increasing the score amount every time 5 blocks have been destoryed, how to change the ball colour each time it hits a surface
- how to implement simple sound effects and background music into the game
- how to set up CD using GitHub pages

Known issues:
  - bug where the SFX associated with winning the game doesn't play - possibly linked to alert box blocking the sound, or that the sound itself needs to be modified to start immediately.
  
My next steps are:
- add a start and restart button
- remove the alert boxes and use dynamic text instead
- fix any known issues
- Look into converting the game from vanilla JS into a frame works e.g Phaser, or React, or both!
