class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
        this.lRiseRate = 8;
        this.lDropRate = 12;
        this.lPenaltyRate = 20;
        this.rRiseRate = 8;
        this.rDropRate = 12;
        this.rPenaltyRate = 20;
    }
    init(data) {
        if (data
            && Object.keys(data).length === 0
            && Object.getPrototypeOf(data) === Object.prototype) {
        }
        else {
            this.lRiseRate = data.l_bar_up_rate;
            this.lDropRate = data.l_bar_down_rate;
            this.lPenaltyRate = data.l_bar_penalty_rate;
            this.rRiseRate = data.r_bar_up_rate;
            this.rDropRate = data.r_bar_down_rate;
            this.rPenaltyRate = data.r_bar_penalty_rate;
        }
    }

    preload() {

    }
    create() {
        // Menu button
        var roundedRect1 = this.add.graphics();
        roundedRect1.fillStyle(0x70ad47, 1);
        roundedRect1.fillRoundedRect(0, 0, 200, 60, 8);
        var text1 = this.add.text(20, 15, "Parameters", { fontFamily: "Arial", fontSize: "30px" });
        this.container1 = this.add.container(300, 500, [roundedRect1, text1]);
        this.container1.setInteractive(new Phaser.Geom.Rectangle(0, 0, 200, 100), Phaser.Geom.Rectangle.Contains);
        this.container1.on('pointerover', function () {
            roundedRect1.clear();
            roundedRect1.fillStyle(0x5d913a, 1);
            roundedRect1.fillRoundedRect(0, 0, 200, 60, 8);
        }, this);
        this.container1.on('pointerout', function () {
            roundedRect1.clear();
            roundedRect1.fillStyle(0x70ad47, 1);
            roundedRect1.fillRoundedRect(0, 0, 200, 60, 8);
        }, this);
        this.container1.on('pointerdown', function () {
            this.scene.start("ParametersScene");
        }, this);

        // Left Task button
        var roundedRect2 = this.add.graphics();
        roundedRect2.fillStyle(0x70ad47, 1);
        roundedRect2.fillRoundedRect(0, 0, 200, 60, 8);
        var text2 = this.add.text(20, 15, "Left Task", { fontFamily: "Arial", fontSize: "30px" });
        this.container2 = this.add.container(100, 100, [roundedRect2, text2]);
        this.container2.setInteractive(new Phaser.Geom.Rectangle(0, 0, 200, 100), Phaser.Geom.Rectangle.Contains);
        this.container2.on('pointerover', function () {
            roundedRect2.clear();
            roundedRect2.fillStyle(0x5d913a, 1);
            roundedRect2.fillRoundedRect(0, 0, 200, 60, 8);
        }, this);
        this.container2.on('pointerout', function () {
            roundedRect2.clear();
            roundedRect2.fillStyle(0x70ad47, 1);
            roundedRect2.fillRoundedRect(0, 0, 200, 60, 8);
        }, this);
        this.container2.on('pointerdown', function () {
            this.scene.start("LeftTaskScene", { l_bar_up_rate: this.lRiseRate, l_bar_down_rate: this.lDropRate, l_bar_penalty_rate: this.lPenaltyRate });
        }, this);


        // Right Task button
        var roundedRect3 = this.add.graphics();
        roundedRect3.fillStyle(0x70ad47, 1);
        roundedRect3.fillRoundedRect(0, 0, 200, 60, 8);
        var text3 = this.add.text(20, 15, "Right Task", { fontFamily: "Arial", fontSize: "30px" });
        this.container3 = this.add.container(500, 100, [roundedRect3, text3]);
        this.container3.setInteractive(new Phaser.Geom.Rectangle(0, 0, 200, 100), Phaser.Geom.Rectangle.Contains);
        this.container3.on('pointerover', function () {
            roundedRect3.clear();
            roundedRect3.fillStyle(0x5d913a, 1);
            roundedRect3.fillRoundedRect(0, 0, 200, 60, 8);
        }, this);
        this.container3.on('pointerout', function () {
            roundedRect3.clear();
            roundedRect3.fillStyle(0x70ad47, 1);
            roundedRect3.fillRoundedRect(0, 0, 200, 60, 8);
        }, this);
        this.container3.on('pointerdown', function () {
            this.scene.start("RightTaskScene", { r_bar_up_rate: this.rRiseRate, r_bar_down_rate: this.rDropRate, r_bar_penalty_rate: this.rPenaltyRate });
        }, this);


        // Both Tasks button
        var roundedRect4 = this.add.graphics();
        roundedRect4.fillStyle(0x70ad47, 1);
        roundedRect4.fillRoundedRect(0, 0, 200, 60, 8);
        var text4 = this.add.text(20, 15, "Both Tasks", { fontFamily: "Arial", fontSize: "30px" });
        this.container4 = this.add.container(300, 250, [roundedRect4, text4]);
        this.container4.setInteractive(new Phaser.Geom.Rectangle(0, 0, 200, 100), Phaser.Geom.Rectangle.Contains);
        this.container4.on('pointerover', function () {
            roundedRect4.clear();
            roundedRect4.fillStyle(0x5d913a, 1);
            roundedRect4.fillRoundedRect(0, 0, 200, 60, 8);
        }, this);
        this.container4.on('pointerout', function () {
            roundedRect4.clear();
            roundedRect4.fillStyle(0x70ad47, 1);
            roundedRect4.fillRoundedRect(0, 0, 200, 60, 8);
        }, this);
        this.container4.on('pointerdown', function () {
            this.scene.start("BothTasksScene", { l_bar_up_rate: this.lRiseRate, l_bar_down_rate: this.lDropRate, l_bar_penalty_rate: this.lPenaltyRate, r_bar_up_rate: this.rRiseRate, r_bar_down_rate: this.rDropRate, r_bar_penalty_rate: this.rPenaltyRate });
        }, this);



        this.formUtil = new FormUtil({
            scene: this,
            rows: 11,
            cols: 11
        });
        this.formUtil.hideElement("l_bar_up_rate");
        this.formUtil.hideElement("l_bar_down_rate");
        this.formUtil.hideElement("l_bar_penalty_rate");
        this.formUtil.hideElement("r_bar_up_rate");
        this.formUtil.hideElement("r_bar_down_rate");
        this.formUtil.hideElement("r_bar_penalty_rate");
    }
}