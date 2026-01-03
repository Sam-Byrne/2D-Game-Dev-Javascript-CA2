import Game from "../engine/game.js";
import GameObject from "../engine/gameobject.js";
import UI from "../engine/ui.js";
import Input from "../engine/input.js";

// Define the different game states
const GameState = {
    INTRO: "intro",
    DROP: "drop",
    COVER: "cover",
    HOLD: "hold",
    SUCCESS: "success"
};

export default class Level extends Game {

    constructor(canvasId) {
        super(canvasId);

        // Current state of the game
        this.state = GameState.INTRO;

        // Timer to track how long in a state
        this.timer = 0;

        // Current background image
        this.backgroundImage = null;

        // Create a GameObject for the text on screen
        this.txtObj = new GameObject(200, 200);

        // Create UI component to show text
        this.txtUI = new UI("Get Ready!!", 200, 200, "48px Arial", "black");
        this.txtObj.addComponent(this.txtUI);

        // Create input handler
        this.inObj = new GameObject();
        this.input = new Input();

        // Add input to object
        this.inObj.addComp(this.input);

        // Add objects to the game
        this.addGameObject(this.txtObj);
        this.addGameObject(this.inObj);
    }

    update() {
        // Update the parent game class
        super.update();

        // Update the timer
        this.timer = this.timer + this.deltaTime;

        // Move from INTRO to DROP after 2 seconds
        if (this.state == GameState.INTRO && this.timer > 2) {
            this.setState(GameState.DROP, "DROP!!");
        }

        // If in DROP state and player presses Space
        if (this.state == GameState.DROP && this.input.isKeyDown("Space")) {
            this.setState(GameState.COVER, "COVER!!");
        }

        // If in COVER state and player presses ArrowDown
        if (this.state == GameState.COVER && this.input.isKeyDown("ArrowDown")) {
            this.setState(GameState.HOLD, "HOLD ON!!");
        }

        // If in HOLD state and player presses H
        if (this.state == GameState.HOLD && this.input.isKeyDown("KeyH")) {
            this.setState(GameState.SUCCESS, "YOU DID IT!!");
        }

        // 
        if (this.backgroundImage) 
        {
            const ctx = this.ctx;
            ctx.drawImage(this.backgroundImage, 0, 0, this.canvas.width, this.canvas.height);
        }
    }

    // Change game state and update text
    setState(newState, text) 
    {
        this.state = newState;
        this.timer = 0;

        // Update the text UI
        this.txtUI.setText(text);

        // Set a corresponding image for each state
        const img = new Image();
        if (newState === GameState.DROP) 
        {
            img.src = "resources/images/DROP.png";
        } else if (newState === GameState.COVER) 
        {
            img.src = "resources/images/COVER.png";
        } else if (newState === GameState.HOLD) 
        {
            img.src = "resources/images/HOLDON.png";
        } else 
        {
            img.src = null; // no image for the other states
        }
        this.backgroundImage = img;
    }
}
