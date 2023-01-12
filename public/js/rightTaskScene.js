class RightTaskScene extends Phaser.Scene {
    constructor() {
        super('RightTaskScene');
        this.rightSideRect;
        this.letterTextArray = ["a", "b", "c"];
        this.currentLetter;
        this.barTimedEvent;
        this.MKey;
        this.COMMAKey;
        this.PERIODKey;
        this.gameOver;
        this.hasWon;
        this.gameOverAudio;
        this.gameOverAudioIteration = 0;
        this.winTimer;
        this.winText;
        this.loseText;
        this.rRiseRate;
        this.rDropRate;
        this.rPenaltyRate;
    }

    init(data) {
        this.rRiseRate = parseFloat(data.r_bar_up_rate);
        this.rDropRate = parseFloat(data.r_bar_down_rate);
        this.rPenaltyRate = parseFloat(data.r_bar_penalty_rate);

        this.gameOver = false;
        this.hasWon = false;
    }

    preload() {
        this.load.audio("lose", ["audio/glass-smash.wav"]);
    }
    create() {
        this.startTimedEvent = this.time.addEvent({ delay: 2000, callback: this.startEvent, callbackScope: this, loop: false });

        // Bar.
        this.rightSideRect = this.add.graphics();
        this.rightSideRect.fillStyle(0xFF0000);
        this.rightSideRect.fillRect(600, 400, 100, 600);

        // Keyboard Keys.
        this.MKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.COMMAKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.COMMA);
        this.PERIODKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PERIOD);

        // Lose State -----------------------------
        this.loseAudio = this.sound.add("lose");
        this.loseText = this.add.text(100, 100, "Sorry, you lost the game!", { fontFamily: "Arial", fontSize: "56px" });
        this.loseText.alpha = 0;

        // Win State------------------------------------        
        this.winText = this.add.text(100, 100, "Congratulations", { fontFamily: "Arial", fontSize: "80px" });
        this.winText.alpha = 0;

        // Play Again Button --------------------------------
        var roundedRect1 = this.add.graphics();
        roundedRect1.fillStyle(0x70ad47, 1);
        roundedRect1.fillRoundedRect(0, 0, 180, 60, 8);
        var text1 = this.add.text(20, 15, "Play Again", { fontFamily: "Arial", fontSize: "30px" });
        this.container1 = this.add.container(300, 500, [roundedRect1, text1]);
        this.container1.setInteractive(new Phaser.Geom.Rectangle(0, 0, 200, 100), Phaser.Geom.Rectangle.Contains);
        this.container1.alpha = 0;
        this.container1.disableInteractive()
        this.container1.on('pointerover', function () {
            roundedRect1.clear();
            roundedRect1.fillStyle(0x5d913a, 1);
            roundedRect1.fillRoundedRect(0, 0, 180, 60, 8);
        }, this);
        this.container1.on('pointerout', function () {
            roundedRect1.clear();
            roundedRect1.fillStyle(0x70ad47, 1);
            roundedRect1.fillRoundedRect(0, 0, 180, 60, 8);
        }, this);
        this.container1.on('pointerdown', function () {
            this.scene.start("MenuScene");
        }, this);
    }

    update() {
        // Test for Correct Key.
        if (this.hasWon == false && this.gameOver == false) {
            if (Phaser.Input.Keyboard.JustDown(this.MKey)) {
                if (this.currentLetter == "a") {
                    this.rightSideRect.y = this.rightSideRect.y + this.rDropRate;
                    this.changeLetterTimer = this.time.delayedCall(25, this.changeLetter, [], this);
                }
                else {
                    if (this.rightSideRect.y - this.rPenaltyRate > -400)
                        this.rightSideRect.y = this.rightSideRect.y - this.rPenaltyRate;
                    else
                        this.rightSideRect.y = -400
                }
            }
            else if (Phaser.Input.Keyboard.JustDown(this.COMMAKey)) {
                if (this.currentLetter == "b") {
                    this.rightSideRect.y = this.rightSideRect.y + this.rDropRate;
                    this.changeLetterTimer = this.time.delayedCall(25, this.changeLetter, [], this);
                }
                else {
                    if (this.rightSideRect.y - this.rPenaltyRate > -400)
                        this.rightSideRect.y = this.rightSideRect.y - this.rPenaltyRate;
                    else
                        this.rightSideRect.y = -400
                }
            }
            else if (Phaser.Input.Keyboard.JustDown(this.PERIODKey)) {
                if (this.currentLetter == "c") {
                    this.rightSideRect.y = this.rightSideRect.y + this.rDropRate;
                    this.changeLetterTimer = this.time.delayedCall(25, this.changeLetter, [], this);
                }
                else {
                    if (this.rightSideRect.y - this.rPenaltyRate > -400)
                        this.rightSideRect.y = this.rightSideRect.y - this.rPenaltyRate;
                    else
                        this.rightSideRect.y = -400
                }
            }
        }

        if (this.rightSideRect.y < -400) {
            this.rightSideRect.y = -400;
        }
    }

    changeLetter() {
        if (this.gameOver == false && this.hasWon == false) {
            var tempLetter = this.letterTextArray[Math.floor(Math.random() * this.letterTextArray.length)];
            if (this.currentLetter == tempLetter) {
                this.changeLetter();
            }
            else {
                this.letterText.text = tempLetter;
                this.currentLetter = tempLetter;
            }
        }
    }

    raiseBar() {
        // Bar rising.
        if (this.rightSideRect.y > -400 && this.hasWon == false && this.gameOver == false) {
            this.rightSideRect.y = this.rightSideRect.y - this.rRiseRate;
        }
        else if (this.hasWon == false) {
            if (this.gameOver == false) {
                this.gameOver = true;
                this.loseAudio.play();
                this.container1.alpha = 1;
                this.container1.setInteractive()
                this.loseText.alpha = 1;
            }
        }
    }

    gameOverManager() {
    }

    winEvent() {
        if (this.gameOver == false) {
            this.winText.alpha = 1;
            this.hasWon = true;

            this.container1.alpha = 1;
            this.container1.setInteractive();
        }
    }

    startEvent() {
        this.winTimer = this.time.delayedCall(40000, this.winEvent, [], this);
        this.barTimedEvent = this.time.addEvent({ delay: 50, callback: this.raiseBar, callbackScope: this, loop: true });

        this.letterText = this.add.text(350, 200, this.letterTextArray[Math.floor(Math.random() * this.letterTextArray.length)], { fontFamily: "Arial", fontSize: "168px" });
        this.currentLetter = this.letterText.text;
    }
}