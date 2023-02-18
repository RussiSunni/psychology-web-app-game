class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }
    init() {

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
            this.scene.start("LeftTaskScene");
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
            this.scene.start("RightTaskScene");
        }, this);


        // Both Tasks button
        var roundedRect4 = this.add.graphics();
        roundedRect4.fillStyle(0x70ad47, 1);
        roundedRect4.fillRoundedRect(0, 0, 200, 60, 8);
        var text4 = this.add.text(20, 15, "Both Tasks", { fontFamily: "Arial", fontSize: "30px" });
        this.container4 = this.add.container(100, 250, [roundedRect4, text4]);
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
            this.scene.start("BothTasksScene");
        }, this);


        // Audio button
        var roundedRect5 = this.add.graphics();
        roundedRect5.fillStyle(0x70ad47, 1);
        roundedRect5.fillRoundedRect(0, 0, 200, 60, 8);
        var text5 = this.add.text(20, 15, "Audio Input Test", { fontFamily: "Arial", fontSize: "24px" });
        this.container5 = this.add.container(500, 250, [roundedRect5, text5]);
        this.container5.setInteractive(new Phaser.Geom.Rectangle(0, 0, 200, 100), Phaser.Geom.Rectangle.Contains);
        this.container5.on('pointerover', function () {
            roundedRect5.clear();
            roundedRect5.fillStyle(0x5d913a, 1);
            roundedRect5.fillRoundedRect(0, 0, 200, 60, 8);
        }, this);
        this.container5.on('pointerout', function () {
            roundedRect5.clear();
            roundedRect5.fillStyle(0x70ad47, 1);
            roundedRect5.fillRoundedRect(0, 0, 200, 60, 8);
        }, this);
        this.container5.on('pointerdown', function () {
            this.scene.start("AudioInputTest");
        }, this);



        this.formUtil = new FormUtil({
            scene: this,
            rows: 11,
            cols: 11
        });
        this.formUtil.hideElement("l_bar_up_rate");
        this.formUtil.hideElement("l_bar_down_rate");
        this.formUtil.hideElement("l_bar_penalty_rate");
        this.formUtil.hideElement("l_bar_delay_amount");
        this.formUtil.hideElement("r_bar_up_rate");
        this.formUtil.hideElement("r_bar_down_rate");
        this.formUtil.hideElement("r_bar_penalty_rate");
        this.formUtil.hideElement("r_bar_delay_amount");
        this.formUtil.hideElement("admin_code");
    }
}