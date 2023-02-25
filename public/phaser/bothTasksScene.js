class BothTasksScene extends Phaser.Scene {
    constructor() {
        super('BothTasksScene');
        this.leftSideRect;
        this.rightSideRect;
        this.toneArray;
        this.currentTone;
        this.letterTextArray = ["a", "b", "c"];
        this.currentLetter;
        this.leftBarTimedEvent;
        this.rightBarTimedEvent;
        this.WKey;
        this.SKey;
        this.XKey;
        this.MKey;
        this.COMMAKey;
        this.PERIODKey;
        this.gameOver;
        this.hasWon;
        this.winTimer;
        this.winText;
        this.loseText;
        this.lRiseRate;
        this.lDropRate;
        this.lPenaltyRate;
        this.rRiseRate;
        this.rDropRate;
        this.rPenaltyRate;
        this.lDelayAmount;
        this.rDelayAmount;
        this.isLeftDelay;
        this.isRightDelay;
    }

    init(data) {
        this.lRiseRate = Number(game.config.lClimbRate);
        this.lDropRate = Number(game.config.lDropRate);
        this.lPenaltyRate = Number(game.config.lPenaltyRate);
        this.lDelayAmount = Number(game.config.lDelayAmount);
        this.rRiseRate = Number(game.config.rClimbRate);
        this.rDropRate = Number(game.config.rDropRate);
        this.rPenaltyRate = Number(game.config.rPenaltyRate);
        this.rDelayAmount = Number(game.config.rDelayAmount);

        this.gameOver = false;
        this.hasWon = false;
        this.isLeftDelay = false;
        this.isRightDelay = false;
    }

    preload() {
        this.load.audio("tone800hz", ["audio/high.wav"]);
        this.load.audio("tone500hz", ["audio/medium.wav"]);
        this.load.audio("tone200hz", ["audio/low.wav"]);
        this.load.audio("lose", ["audio/glass-smash.wav"]);
    }
    create() {
        this.startTimedEvent = this.time.addEvent({ delay: 2000, callback: this.startEvent, callbackScope: this, loop: false });

        // Left Side Task.
        // Bar.
        this.leftSideRect = this.add.graphics();
        this.leftSideRect.fillStyle(0x0000FF);
        this.leftSideRect.fillRect(100, 400, 100, 600);

        // Tones -----------------------.        
        this.tone800hzAudio = this.sound.add("tone800hz");
        this.tone500hzAudio = this.sound.add("tone500hz");
        this.tone200hzAudio = this.sound.add("tone200hz");
        this.toneArray = [this.tone800hzAudio, this.tone500hzAudio, this.tone200hzAudio];

        // Keyboard Keys.
        this.WKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.SKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.XKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);

        // Right Side Task.
        // Bar.
        this.rightSideRect = this.add.graphics();
        this.rightSideRect.fillStyle(0xFF0000);
        this.rightSideRect.fillRect(600, 400, 100, 600);

        // Keyboard Keys.
        this.MKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.COMMAKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.COMMA);
        this.PERIODKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PERIOD);

        // Both Tasks.
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

            if (this.isLeftDelay == false) {
                if (Phaser.Input.Keyboard.JustDown(this.WKey)) {
                    if (this.currentTone == this.toneArray[0]) {
                        this.leftSideRect.y = this.leftSideRect.y + this.lDropRate;
                        this.isLeftDelay = true;
                        this.changeToneTimer = this.time.delayedCall(this.lDelayAmount, this.changeTone, [], this);
                    }
                    else {
                        if (this.leftSideRect.y - this.lPenaltyRate > -400)
                            this.leftSideRect.y = this.leftSideRect.y - this.lPenaltyRate;
                        else
                            this.leftSideRect.y = -400
                    }
                }
                else if (Phaser.Input.Keyboard.JustDown(this.SKey)) {
                    if (this.currentTone == this.toneArray[1]) {
                        this.leftSideRect.y = this.leftSideRect.y + this.lDropRate;
                        this.isLeftDelay = true;
                        this.changeToneTimer = this.time.delayedCall(this.lDelayAmount, this.changeTone, [], this);
                    }
                    else {
                        if (this.leftSideRect.y - this.lPenaltyRate > -400)
                            this.leftSideRect.y = this.leftSideRect.y - this.lPenaltyRate;
                        else
                            this.leftSideRect.y = -400
                    }
                }
                else if (Phaser.Input.Keyboard.JustDown(this.XKey)) {
                    if (this.currentTone == this.toneArray[2]) {
                        this.leftSideRect.y = this.leftSideRect.y + this.lDropRate;
                        this.isLeftDelay = true;
                        this.changeToneTimer = this.time.delayedCall(this.lDelayAmount, this.changeTone, [], this);
                    }
                    else {
                        if (this.leftSideRect.y - this.lPenaltyRate > -400)
                            this.leftSideRect.y = this.leftSideRect.y - this.lPenaltyRate;
                        else
                            this.leftSideRect.y = -400
                    }
                }
            }

            if (this.isRightDelay == false) {

                if (Phaser.Input.Keyboard.JustDown(this.MKey)) {
                    if (this.currentLetter == "a") {
                        this.rightSideRect.y = this.rightSideRect.y + this.rDropRate;
                        this.isRightDelay = true;
                        this.letterText.text = "";
                        this.changeLetterTimer = this.time.delayedCall(this.rDelayAmount, this.changeLetter, [], this);
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
                        this.isRightDelay = true;
                        this.letterText.text = "";
                        this.changeLetterTimer = this.time.delayedCall(this.rDelayAmount, this.changeLetter, [], this);
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
                        this.isRightDelay = true;
                        this.letterText.text = "";
                        this.changeLetterTimer = this.time.delayedCall(this.rDelayAmount, this.changeLetter, [], this);
                    }
                    else {
                        if (this.rightSideRect.y - this.rPenaltyRate > -400)
                            this.rightSideRect.y = this.rightSideRect.y - this.rPenaltyRate;
                        else
                            this.rightSideRect.y = -400
                    }
                }
            }
        }

        if (this.leftSideRect.y < -400) {
            this.leftSideRect.y = -400;
        }
        if (this.rightSideRect.y < -400) {
            this.rightSideRect.y = -400;
        }
    }

    changeTone() {
        if (this.gameOver == false && this.hasWon == false) {
            this.currentTone = this.toneArray[Math.floor(Math.random() * this.toneArray.length)];
            this.currentTone.play();

            this.isLeftDelay = false;
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

            this.isRightDelay = false;
        }
    }

    raiseLeftBar() {
        // Bar rising.
        if (this.leftSideRect.y > -400 && this.hasWon == false && this.gameOver == false) {
            this.leftSideRect.y = this.leftSideRect.y - this.lRiseRate;
        }
        else if (this.hasWon == false) {
            if (this.gameOver == false) {
                this.gameOver = true;
                this.loseAudio.play();
                this.container1.alpha = 1;
                this.container1.setInteractive()
                this.loseText.alpha = 1;

                // Save game data.
                this.saveGameData(false);
            }
        }
    }

    raiseRightBar() {
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

                // Save game data.
                this.saveGameData(false);
            }
        }
    }

    winEvent() {
        if (this.gameOver == false) {
            this.winText.alpha = 1;
            this.hasWon = true;

            this.container1.alpha = 1;
            this.container1.setInteractive()
        }

        // Save game data.
        this.saveGameData(true);
    }

    startEvent() {
        this.winTimer = this.time.delayedCall(40000, this.winEvent, [], this);

        // Left Side.
        this.leftBarTimedEvent = this.time.addEvent({ delay: 50, callback: this.raiseLeftBar, callbackScope: this, loop: true });
        this.currentTone = this.toneArray[Math.floor(Math.random() * this.toneArray.length)];
        this.currentTone.play();

        // Right Side
        this.rightBarTimedEvent = this.time.addEvent({ delay: 50, callback: this.raiseRightBar, callbackScope: this, loop: true });
        this.letterText = this.add.text(350, 200, this.letterTextArray[Math.floor(Math.random() * this.letterTextArray.length)], { fontFamily: "Arial", fontSize: "168px" });
        this.currentLetter = this.letterText.text;
    }

    saveGameData(didWin) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                {
                    task: "both",
                    did_win: didWin,
                    left_climb_rate: this.lRiseRate,
                    left_drop_amount: this.lDropRate,
                    left_penalty_amount: this.lPenaltyRate,
                    left_delay_amount: this.lDelayAmount,
                    right_climb_rate: this.rRiseRate,
                    right_drop_amount: this.rDropRate,
                    right_penalty_amount: this.rPenaltyRate,
                    right_delay_amount: this.rDelayAmount
                })
        };


        fetch('/saveGameData', requestOptions)
            .then(() => {

            });
    }
}