var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql');

//var indexRouter = require('./routes/index');
//var parametersRouter = require('./routes/parameters');

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
	left_penalty_amount = '` + parseInt(req.body.left_penalty_amount) + `',
	right_penalty_amount = '` + parseInt(req.body.right_penalty_amount) + `';`;

	let query = conn.query(sqlQuery, (err, results) => {
		if (err) throw err;
		res.json(results);
	});
});

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
