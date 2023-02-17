class AudioInputTest extends Phaser.Scene {
    constructor() {
        super('AudioInputTest');
        this.leftSideRect;
        this.toneArray;
        this.currentTone;
        this.barTimedEvent;
        this.WKey;
        this.SKey;
        this.XKey;
        this.gameOver;
        this.hasWon;
        this.gameOverAudio;
        this.gameOverAudioIteration = 0;
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
        this.isDelay;
    }

    init() {
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
        this.isDelay = false;
    }

    preload() {
        this.load.audio("tone800hz", ["audio/high.wav"]);
        this.load.audio("tone500hz", ["audio/medium.wav"]);
        this.load.audio("tone200hz", ["audio/low.wav"]);
        this.load.audio("lose", ["audio/glass-smash.wav"]);
    }

    create() {

        // Speech recognition --------------
        // new instance of speech recognition
        var recognition = new webkitSpeechRecognition();

        // set params
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.start();

        recognition.onresult = function (event) {

            // delve into words detected results & get the latest
            // total results detected
            var resultsLength = event.results.length - 1;
            // get length of latest results
            var ArrayLength = event.results[resultsLength].length - 1;
            // get last word detected
            var saidWord = event.results[resultsLength][ArrayLength].transcript;

            // loop through links and match to word spoken
            // for (i = 0; i < allLinks.length; i++) {

            //     // get the word associated with the link
            //     var dataWord = allLinks[i].dataset.word;

            //     // if word matches chenge the colour of the link
            //     if (saidWord.indexOf(dataWord) != -1) {
            //         allLinks[i].style.color = 'red';
            //     }
            // }

            // append the last word to the bottom sentence
            // strongEl.innerHTML = saidWord;

            console.log(saidWord);

            // speech error handling
            recognition.onerror = function (event) {
                console.log('error?');
                console.log(event);
            }
        }


        // ----------------------------


        this.startTimedEvent = this.time.addEvent({ delay: 2000, callback: this.startEvent, callbackScope: this, loop: false });

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

        // Audio Test Button --------------------------------
        var roundedRect2 = this.add.graphics();
        roundedRect2.fillStyle(0x70ad47, 1);
        roundedRect2.fillRoundedRect(0, 0, 180, 60, 8);
        var text2 = this.add.text(20, 15, "Speak", { fontFamily: "Arial", fontSize: "30px" });
        this.container2 = this.add.container(300, 500, [roundedRect2, text2]);
        this.container2.setInteractive(new Phaser.Geom.Rectangle(0, 0, 200, 100), Phaser.Geom.Rectangle.Contains);
        this.container2.on('pointerover', function () {
            roundedRect2.clear();
            roundedRect2.fillStyle(0x5d913a, 1);
            roundedRect2.fillRoundedRect(0, 0, 180, 60, 8);
        }, this);
        this.container2.on('pointerout', function () {
            roundedRect2.clear();
            roundedRect2.fillStyle(0x70ad47, 1);
            roundedRect2.fillRoundedRect(0, 0, 180, 60, 8);
        }, this);
        this.container2.on('pointerdown', function () {

        }, this);
    }

    update() {
        // Test for Correct Key.    
        if (this.hasWon == false && this.gameOver == false && this.isDelay == false) {
            if (Phaser.Input.Keyboard.JustDown(this.WKey)) {
                if (this.currentTone == this.toneArray[0]) {
                    this.leftSideRect.y = this.leftSideRect.y + this.lDropRate;
                    this.isDelay = true;
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
                    this.isDelay = true;
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
                    this.isDelay = true;
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

        if (this.leftSideRect.y < -400) {
            this.leftSideRect.y = -400;
        }
    }

    changeTone() {
        if (this.gameOver == false && this.hasWon == false) {
            this.currentTone = this.toneArray[Math.floor(Math.random() * this.toneArray.length)];
            this.currentTone.play();

            this.isDelay = false;
        }
    }

    raiseBar() {
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

    gameOverManager() {
    }

    winEvent() {
        if (this.gameOver == false) {
            this.winText.alpha = 1;
            this.hasWon = true;

            this.container1.alpha = 1;
            this.container1.setInteractive()

            // Save game data.
            this.saveGameData(true);
        }
    }

    startEvent() {
        this.winTimer = this.time.delayedCall(40000, this.winEvent, [], this);

        // Left Side.
        this.barTimedEvent = this.time.addEvent({ delay: 50, callback: this.raiseBar, callbackScope: this, loop: true });
        this.currentTone = this.toneArray[Math.floor(Math.random() * this.toneArray.length)];
        this.currentTone.play();
    }

    saveGameData(didWin) {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(
                {
                    task: "left",
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