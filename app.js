var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql');

//var indexRouter = require('./routes/index');
//var parametersRouter = require('./routes/parameters');

// For SSL cert (HTTPS), required for microphone.
var https = require('https');
var http = require('http');
const fs = require('fs')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/*------------------------------------------
--------------------------------------------
Database Connection
--------------------------------------------
--------------------------------------------*/
const conn = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'C0gn1t1v3Psych0l0gy',
	password: 'password',
	database: 'visual_kalsbeek'
});


// Shows MariaDB Connect.
conn.connect((err) => {
	if (err) throw err;
	console.log('MariaDB connected...');
});


// Routes.
// Home page ------------
app.get('/', (req, res) => {
	res.render('index');
})

/* Parameters. ---------------------------------------------------*/
/* GET parameters. */
app.get('/parameters', function (req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	let sqlQuery = "SELECT * FROM parameters";
	let query = conn.query(sqlQuery, (err, results) => {
		if (err) throw err;
		res.json(results[0]);
	});
});

/* UPDATE parameters. */
app.put('/parameters', function (req, res, next) {
	let sqlQuery = `
	UPDATE parameters 
	SET left_climb_rate = '` + parseInt(req.body.left_climb_rate) + `',
	right_climb_rate = '` + parseInt(req.body.right_climb_rate) + `',
	left_drop_amount = '` + parseInt(req.body.left_drop_amount) + `',
	right_drop_amount = '` + parseInt(req.body.right_drop_amount) + `',
	left_delay_amount = '` + parseInt(req.body.left_delay_amount) + `',
	right_delay_amount = '` + parseInt(req.body.right_delay_amount) + `',
	left_penalty_amount = '` + parseInt(req.body.left_penalty_amount) + `',
	right_penalty_amount = '` + parseInt(req.body.right_penalty_amount) + `'; `;

	let query = conn.query(sqlQuery, (err, results) => {
		if (err) throw err;
		res.json(results);
	});
});

/* Instructions. ---------------------------------------------------*/
/* GET instructions. */
app.get('/instructions-1', function (req, res, next) {
	res.render('instructions-1');
});

app.get('/instructions-2', function (req, res, next) {
	res.render('instructions-2');
});

app.get('/instructions-3', function (req, res, next) {
	res.render('instructions-3');
});

app.get('/instructions-1/show', function (req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	let sqlQuery = "SELECT left_task FROM instructions";
	let query = conn.query(sqlQuery, (err, results) => {
		if (err) throw err;
		res.json(results[0]);
	});
});

app.get('/instructions-2/show', function (req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	let sqlQuery = "SELECT right_task FROM instructions";
	let query = conn.query(sqlQuery, (err, results) => {
		if (err) throw err;
		res.json(results[0]);
	});
});

app.get('/instructions-3/show', function (req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	let sqlQuery = "SELECT both_tasks FROM instructions";
	let query = conn.query(sqlQuery, (err, results) => {
		if (err) throw err;
		res.json(results[0]);
	});
});

app.get('/instructions-1/edit', function (req, res, next) {
	res.render('edit-instructions-1');
});

app.get('/instructions-2/edit', function (req, res, next) {
	res.render('edit-instructions-2');
});

app.get('/instructions-3/edit', function (req, res, next) {
	res.render('edit-instructions-3');
});

app.put('/instructions-1/edit', function (req, res, next) {
	// Deal with single quotes
	var escapedResult = req.body.editordata.replace(/'/g, "\\'");

	let sqlQuery = "UPDATE instructions SET left_task='" + escapedResult + "'";
	let query = conn.query(sqlQuery, (err, results) => {
		if (err) throw err;
		res.end();
	});
});

app.put('/instructions-2/edit', function (req, res, next) {
	// Deal with single quotes
	var escapedResult = req.body.editordata.replace(/'/g, "\\'");

	let sqlQuery = "UPDATE instructions SET right_task='" + escapedResult + "'";
	let query = conn.query(sqlQuery, (err, results) => {
		if (err) throw err;
		res.end();
	});
});

app.put('/instructions-3/edit', function (req, res, next) {
	// Deal with single quotes
	var escapedResult = req.body.editordata.replace(/'/g, "\\'");

	let sqlQuery = "UPDATE instructions SET both_tasks='" + escapedResult + "'";
	let query = conn.query(sqlQuery, (err, results) => {
		if (err) throw err;
		res.end();
	});
});

// Save game data.
app.post('/saveGameData', (req, res) => {
	console.log("test")

	let sqlQuery = "INSERT INTO games SET ?";

	let data = {
		date: new Date(),
		task: req.body.task,
		did_win: req.body.did_win,
		left_climb_rate: req.body.left_climb_rate,
		right_climb_rate: req.body.right_climb_rate,
		left_drop_amount: req.body.left_drop_amount,
		right_drop_amount: req.body.right_drop_amount,
		left_delay_amount: req.body.left_delay_amount,
		right_delay_amount: req.body.right_delay_amount,
		left_penalty_amount: req.body.left_penalty_amount,
		right_penalty_amount: req.body.right_penalty_amount
	};

	let query = conn.query(sqlQuery, data, (err, results) => {
		if (err) throw err;
		res.json(results);
	});

});



// Not used currently
/* Login. ---------------------------------------------------*/
app.get('/login', (req, res) => {
	res.render('login');
})

app.post('/login-attempt', (req, res) => {
	res.setHeader('Content-Type', 'application/json');

	// Execute SQL query that'll select the account from the database based on the specified username and password.
	let sqlQuery = "SELECT * FROM visual_kalsbeek.users WHERE visual_kalsbeek.users.username = '" + req.body.username + "' AND skill_tree.users.password = '" + req.body.password + "';";

	let query = conn.query(sqlQuery, (err, results) => {
		if (err) throw err;

		if (results.length > 0) {
			res.redirect('/');
		} else {
			res.redirect('/login');
		}
		res.end();
	});
});


// Uncomment when Hal says he wants this available again
/* FAQ. ---------------------------------------------------*/
// app.get('/faq', (req, res) => {
// 	res.render('faq');
// })

//app.use('/', indexRouter);
//app.use('/parameters', parametersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;


/**
 * API Response
 *
 * @return response()
 */
function apiResponse(results) {
	return JSON.stringify({ "status": 200, "error": null, "response": results });
}


/*------------------------------------------
--------------------------------------------
Server listening
--------------------------------------------
--------------------------------------------*/
http.createServer(app).listen(80);
https.createServer({
	key: fs.readFileSync('server.key'),
	cert: fs.readFileSync('server.cert')
}, app).listen(443);

// app.listen(80, () => {
// 	console.log('Server started on port 80...');
// });
