class ParametersScene extends Phaser.Scene {
    constructor() {
        super('ParametersScene');
        this.lClimbRate;
        this.lDropRate;
        this.lPenaltyRate;
        this.lDelayAmount;
        this.rClimbRate;
        this.rDropRate;
        this.rPenaltyRate;
        this.rDelayAmount;
    }

    init() { }

    preload() { }

    create() {
        this.formUtil = new FormUtil({
            scene: this,
            rows: 11,
            cols: 11
        });

        // Text
        var lTitle = this.add.text(220, 25, "Left Side", { fontFamily: "Arial", fontSize: "48px", color: '#FFFFFF' });
        var rTitle = this.add.text(500, 25, "Right Side", { fontFamily: "Arial", fontSize: "48px", color: '#FFFFFF' });

        var rTitle = this.add.text(280, 400,
            "You can change these parameters and see how it affects the game.\n\nBut you cannot SAVE parameters as default without the code.",
            { fontFamily: "Arial", fontSize: "16px", color: '#FFFFFF' });

        //Form
        var text1 = this.add.text(20, 120, "climb rate", { fontFamily: "Arial", fontSize: "30px" });
        this.formUtil.showElement("r_bar_up_rate");
        this.formUtil.scaleToGameW("r_bar_up_rate", .1);
        this.formUtil.placeElementAt(30, 'r_bar_up_rate', true);

        var text2 = this.add.text(20, 175, "drop amount", { fontFamily: "Arial", fontSize: "30px" });
        this.formUtil.showElement("r_bar_down_rate");
        this.formUtil.scaleToGameW("r_bar_down_rate", .1);
        this.formUtil.placeElementAt(41, 'r_bar_down_rate', true);

        var text3 = this.add.text(20, 230, "penalty", { fontFamily: "Arial", fontSize: "30px" });
        this.formUtil.showElement("r_bar_penalty_rate");
        this.formUtil.scaleToGameW("r_bar_penalty_rate", .1);
        this.formUtil.placeElementAt(52, 'r_bar_penalty_rate', true);

        var text4 = this.add.text(20, 285, "delay (ms)", { fontFamily: "Arial", fontSize: "30px" });
        this.formUtil.showElement("r_bar_delay_amount");
        this.formUtil.scaleToGameW("r_bar_delay_amount", .1);
        this.formUtil.placeElementAt(63, 'r_bar_delay_amount', true);

        this.formUtil.showElement("l_bar_up_rate");
        this.formUtil.scaleToGameW("l_bar_up_rate", .1);
        this.formUtil.placeElementAt(26, 'l_bar_up_rate', true);

        this.formUtil.showElement("l_bar_down_rate");
        this.formUtil.scaleToGameW("l_bar_down_rate", .1);
        this.formUtil.placeElementAt(37, 'l_bar_down_rate', true);

        this.formUtil.showElement("l_bar_penalty_rate");
        this.formUtil.scaleToGameW("l_bar_penalty_rate", .1);
        this.formUtil.placeElementAt(48, 'l_bar_penalty_rate', true);

        this.formUtil.showElement("l_bar_delay_amount");
        this.formUtil.scaleToGameW("l_bar_delay_amount", .1);
        this.formUtil.placeElementAt(59, 'l_bar_delay_amount', true);

        this.formUtil.showElement("admin_code");
        this.formUtil.scaleToGameW("admin_code", .1);
        this.formUtil.placeElementAt(107, 'admin_code', true);


        // Save button
        var roundedRect1 = this.add.graphics();
        roundedRect1.fillStyle(0x198754, 1);
        roundedRect1.fillRoundedRect(0, 0, 200, 60, 8);
        var text1 = this.add.text(20, 15, "Save", { fontFamily: "Arial", fontSize: "30px" });
        this.container1 = this.add.container(20, 400, [roundedRect1, text1]);
        this.container1.setInteractive(new Phaser.Geom.Rectangle(0, 0, 200, 100), Phaser.Geom.Rectangle.Contains);
        this.container1.on('pointerover', function () {
            roundedRect1.clear();
            roundedRect1.fillStyle(0x157347, 1);
            roundedRect1.fillRoundedRect(0, 0, 200, 60, 8);
        }, this);
        this.container1.on('pointerout', function () {
            roundedRect1.clear();
            roundedRect1.fillStyle(0x198754, 1);
            roundedRect1.fillRoundedRect(0, 0, 200, 60, 8);
        }, this);
        this.container1.on('pointerdown', function () {
            this.saveValues();
        }, this);


        // Menu button
        var roundedRect2 = this.add.graphics();
        roundedRect2.fillStyle(0x198754, 1);
        roundedRect2.fillRoundedRect(0, 0, 200, 60, 8);
        var text2 = this.add.text(20, 15, "Return", { fontFamily: "Arial", fontSize: "30px" });
        this.container2 = this.add.container(20, 500, [roundedRect2, text2]);
        this.container2.setInteractive(new Phaser.Geom.Rectangle(0, 0, 200, 100), Phaser.Geom.Rectangle.Contains);
        this.container2.on('pointerover', function () {
            roundedRect2.clear();
            roundedRect2.fillStyle(0x157347, 1);
            roundedRect2.fillRoundedRect(0, 0, 200, 60, 8);
        }, this);
        this.container2.on('pointerout', function () {
            roundedRect2.clear();
            roundedRect2.fillStyle(0x198754, 1);
            roundedRect2.fillRoundedRect(0, 0, 200, 60, 8);
        }, this);
        this.container2.on('pointerdown', function () {
            this.scene.start("MenuScene", { l_bar_up_rate: this.lClimbRate, l_bar_down_rate: this.lDropRate, l_bar_penalty_rate: this.lPenaltyRate, r_bar_up_rate: this.rClimbRate, r_bar_down_rate: this.rDropRate, r_bar_penalty_rate: this.rPenaltyRate });
        }, this);

    }

    saveValues() {
        this.lClimbRate = this.formUtil.getTextAreaValue("l_bar_up_rate");
        this.lDropRate = this.formUtil.getTextAreaValue("l_bar_down_rate");
        this.lPenaltyRate = this.formUtil.getTextAreaValue("l_bar_penalty_rate");
        this.lDelayAmount = this.formUtil.getTextAreaValue("l_bar_delay_amount");
        this.rClimbRate = this.formUtil.getTextAreaValue("r_bar_up_rate");
        this.rDropRate = this.formUtil.getTextAreaValue("r_bar_down_rate");
        this.rPenaltyRate = this.formUtil.getTextAreaValue("r_bar_penalty_rate");
        this.rDelayAmount = this.formUtil.getTextAreaValue("r_bar_delay_amount");

        //Load the data into Phaser.
        game.config.lClimbRate = this.lClimbRate;
        game.config.lDropRate = this.lDropRate;
        game.config.lPenaltyRate = this.lPenaltyRate;
        game.config.lDelayAmount = this.lDelayAmount;
        game.config.rClimbRate = this.rClimbRate;
        game.config.rDropRate = this.rDropRate;
        game.config.rPenaltyRate = this.rPenaltyRate;
        game.config.rDelayAmount = this.rDelayAmount;

        if (this.formUtil.getTextAreaValue("admin_code") == "1967") {

            // Save the parameters to the database.          
            const requestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(
                    {
                        left_climb_rate: this.lClimbRate,
                        left_drop_amount: this.lDropRate,
                        left_penalty_amount: this.lPenaltyRate,
                        left_delay_amount: this.lDelayAmount,
                        right_climb_rate: this.rClimbRate,
                        right_drop_amount: this.rDropRate,
                        right_penalty_amount: this.rPenaltyRate,
                        right_delay_amount: this.rDelayAmount
                    })
            };

            fetch('/parameters', requestOptions)
                .then(() => {

                });
        }
    }
}