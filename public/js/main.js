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
            document.getElementById("l_bar_up_rate").value = data.left_climb_rate;
            document.getElementById("l_bar_down_rate").value = data.left_drop_amount;
            document.getElementById("l_bar_penalty_rate").value = data.left_penalty_amount;
            document.getElementById("r_bar_up_rate").value = data.right_climb_rate;
            document.getElementById("r_bar_down_rate").value = data.right_drop_amount;
            document.getElementById("r_bar_penalty_rate").value = data.right_penalty_amount;

            // Load the data into Phaser.
            game.config.lClimbRate = data.left_climb_rate;
            game.config.lDropRate = data.left_drop_amount;
            game.config.lPenaltyRate = data.left_penalty_amount;
            game.config.rClimbRate = data.right_climb_rate;
            game.config.rDropRate = data.right_drop_amount;
            game.config.rPenaltyRate = data.right_penalty_amount;
        });
}