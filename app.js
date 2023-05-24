var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mysql = require('mysql');

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
	database: 'visible_bottleneck'
});


// Shows MariaDB Connect.
conn.connect((err) => {
	try {
		if (err) {
			throw err;
		}
		console.log('MariaDB connected...');
	} catch (err) {
		console.log('DB connection problem.');
	}
});


// Routes.
// Home page ------------
app.get('/', (req, res) => {
	res.render('index');
})

app.get('/game', (req, res) => {
	res.render('game');
})


/* Comments. ---------------------------------------------------*/
app.get('/comments', (req, res) => {
	res.render('comments');
})

app.get('/api/comments', (req, res, next) => {
	res.setHeader('Content-Type', 'application/json');
	let sqlQuery = "SELECT * FROM comments;";
	let query = conn.query(sqlQuery, (err, results) => {
		try {
			if (err) {
				throw err;
			}
			// Remove time from date time.
			for (let i = 0; i < results.length; i++) {
				var dateTime = results[i].date.toString();
				var date = dateTime.substr(4, 11);
				results[i].date = date;
			}

			res.json(results);
		} catch (err) {
			next(err)
		}
	});
})

app.get('/comments/add', (req, res) => {
	res.render('add-comment');
})

app.post('/api/comments/add', (req, res) => {
	let data = { author: req.body.authorName, date: req.body.date, content: req.body.editordata };
	let sqlQuery = "INSERT INTO comments SET ?";
	let query = conn.query(sqlQuery, data, (err, results) => {
		try {
			if (err) {
				throw err;
			}
			else {
				res.end();
			}
		} catch (err) {
			next(err)
		}
	});
})

app.put('/api/comments/votes/:id/edit', (req, res, next) => {
	let sqlQuery = `
		UPDATE comments 
        SET votes = ` + req.body.votes + `
		WHERE id = ` + req.params.id + `;       
        `
	let query = conn.query(sqlQuery, (err, results) => {
		try {
			if (err) {
				throw err;
			}
			res.end();
		} catch (err) {
			next(err)
		}
	});
});

/* Parameters. ---------------------------------------------------*/
/* GET parameters. */
app.get('/parameters', function (req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	let sqlQuery = "SELECT * FROM parameters";
	let query = conn.query(sqlQuery, (err, results) => {
		try {
			if (err) {
				throw err;
			}
			res.json(results[0]);
		} catch (err) {
			next(err)
		}
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
		try {
			if (err) {
				throw err;
			}
			res.json(results);
		} catch {
			next(err)
		}
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
		try {
			if (err) {
				throw err;
			}
			res.json(results[0]);
		} catch (err) {
			next(err)
		}
	});
});

app.get('/instructions-2/show', function (req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	let sqlQuery = "SELECT right_task FROM instructions";
	let query = conn.query(sqlQuery, (err, results) => {
		try {
			if (err) {
				throw err;
			}
			res.json(results[0]);
		} catch (err) {
			next(err)
		}
	});
});

app.get('/instructions-3/show', function (req, res, next) {
	res.setHeader('Content-Type', 'application/json');
	let sqlQuery = "SELECT both_tasks FROM instructions";
	let query = conn.query(sqlQuery, (err, results) => {
		try {
			if (err) {
				throw err;
			}
			res.json(results[0]);
		} catch (err) {
			next(err)
		}
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
		try {
			if (err) {
				throw err;
			}
			res.end();
		} catch {
			next(err)
		}
	});
});

app.put('/instructions-2/edit', function (req, res, next) {
	// Deal with single quotes
	var escapedResult = req.body.editordata.replace(/'/g, "\\'");

	let sqlQuery = "UPDATE instructions SET right_task='" + escapedResult + "'";
	let query = conn.query(sqlQuery, (err, results) => {
		try {
			if (err) {
				throw err;
			}
			res.end();
		} catch (err) {
			next(err)
		}
	});
});

app.put('/instructions-3/edit', function (req, res, next) {
	// Deal with single quotes
	var escapedResult = req.body.editordata.replace(/'/g, "\\'");

	let sqlQuery = "UPDATE instructions SET both_tasks='" + escapedResult + "'";
	let query = conn.query(sqlQuery, (err, results) => {
		try {
			if (err) {
				throw err;
			}
			res.end();
		} catch {
			next(err)
		}
	});
});

// Save game data.
// app.post('/saveGameData', (req, res) => {
// 	console.log("test")

// 	let sqlQuery = "INSERT INTO games SET ?";

// 	let data = {
// 		date: new Date(),
// 		task: req.body.task,
// 		did_win: req.body.did_win,
// 		left_climb_rate: req.body.left_climb_rate,
// 		right_climb_rate: req.body.right_climb_rate,
// 		left_drop_amount: req.body.left_drop_amount,
// 		right_drop_amount: req.body.right_drop_amount,
// 		left_delay_amount: req.body.left_delay_amount,
// 		right_delay_amount: req.body.right_delay_amount,
// 		left_penalty_amount: req.body.left_penalty_amount,
// 		right_penalty_amount: req.body.right_penalty_amount
// 	};

// 	let query = conn.query(sqlQuery, data, (err, results) => {
// 		if (err) throw err;
// 		res.json(results);
// 	});

// });


/* FAQ. ---------------------------------------------------*/
app.get('/faq', (req, res) => {
	res.render('faq');
})

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
app.listen(80, () => {
	console.log('Server started on port 80...');
});
