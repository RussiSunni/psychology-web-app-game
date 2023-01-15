var game;
window.onload = function () {
    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'phaser-game',
        backgroundColor: '#000000',

        scene: [MenuScene, ParametersScene, LeftTaskScene, RightTaskScene, BothTasksScene]
    };
    game = new Phaser.Game(config);

    // Get parameters stored in the database.
    fetch('/parameters')
        .then(function (response) {
            return response.json();
        }).then(function (data) {

            // Load existing data onto the form on the Parameters page.
            document.getElementById("l_bar_up_rate").value = data[0].parameter;
            document.getElementById("l_bar_down_rate").value = data[1].parameter;
            document.getElementById("l_bar_penalty_rate").value = data[2].parameter;
            document.getElementById("r_bar_up_rate").value = data[3].parameter;
            document.getElementById("r_bar_down_rate").value = data[4].parameter;
            document.getElementById("r_bar_penalty_rate").value = data[5].parameter;

            // Load the data into Phaser.
            game.config.lClimbRate = data[0].parameter;
            game.config.lDropRate = data[1].parameter;
            game.config.lPenaltyRate = data[2].parameter;
            game.config.rClimbRate = data[3].parameter;
            game.config.rDropRate = data[4].parameter;
            game.config.rPenaltyRate = data[5].parameter;
        });
}