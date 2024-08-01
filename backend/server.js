
const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const cookieSession = require('cookie-session');
const cors = require('cors');
const bodyparser = require('body-parser');
const sql = require('mysql2');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

const fs = require('fs');
const Razorpay = require('razorpay');

const app = express();




const JWT_SECRET = 'your_jwt_secret';

app.use(cors({
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'] 
}));


app.use(bodyparser.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
const port = 3005;

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

var connection = sql.createConnection({
    host: "localhost",
    user: "root",
    password: "R1nkusahu",
    database: "hyslogin"
});



connection.connect((error) => {
    if (error) {
        console.log(error);
        return;
    } else {
        console.log("connected");
    }
});
const razorpay = new Razorpay({
    key_id: 'rzp_test_u7pnqOtOeC2KTz',
    key_secret: 'q2WpiMJO9xl1MnUcGh5f3ENm'
});



app.post('/signup', (req, res) => {
    const { username, email, password, firstname, lastname } = req.body;

    if (!email || !username || !password || !firstname || !lastname) {
        return res.status(400).send("All fields are required");
    }

    if (!validator.isEmail(email)) {
        return res.status(400).send("Please enter a valid email");
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            console.error('Error hashing password:', err);
            return res.status(500).send('Server error');
        }

        const query = 'INSERT INTO users (username, email, password, firstname, lastname) VALUES (?, ?, ?, ?, ?)';
        connection.query(query, [username, email, hashedPassword, firstname, lastname], (err, result) => {
            if (err) {
                console.error('Error inserting data into database:', err);
                return res.status(500).send('Error registering user');
            }
            res.status(200).send('User registered successfully');
        });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send("Email and password are required");
    }

    if (!validator.isEmail(email)) {
        return res.status(400).send("Please enter a valid email");
    }

    const findUser = "SELECT * FROM users WHERE email = ?";

    connection.query(findUser, [email], (error, results) => {
        if (error) {
            console.error("Database query failed:", error);
            return res.status(500).send("Database query failed");
        }

        if (results.length === 0) {
            return res.status(400).send("No user found with this email");
        }

        const user = results[0];

        bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) {
                console.error("Password comparison failed:", error);
                return res.status(500).send("Password comparison failed");
            }

            if (!isMatch) {
                return res.status(400).send("Invalid password");
            }

            const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

            res.send({
                message: "Login successful",
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    firstname: user.firstname,
                    lastname: user.lastname
                },
                token
            });
        });
    });
});

app.post('/changepassword',(req,res)=>{
    var{user_name,current_password,new_password}=req.body;
    console.log(user_name)
    console.log(current_password)
    var find_user="select password from user where user_name=?"
    var setnew_password="UPDATE user SET password=? WHERE user_name=?"
    connection.query(find_user,[user_name],(error,result)=>{
        if(error){
            console.log("error in fetching the password"+error)
            return;
        }
        if(result.length === 0) {
            res.send('wrong password');
            return;
        }
        var hash_password = result[0].password;
        console.log("current password is"+current_password);
        console.log("the hashed password is"+hash_password)
        bcrypt_password.compare(current_password,hash_password,(error,result)=>{
            if(error){
                console.log("password comparision error"+error)
            }
            else {
                if (result) {
                    var saltRounds=10;
                    bcrypt_password.hash(new_password,saltRounds,(error,hash)=>{
                        if(error){
                            res.send("error in hashing the new password in hash form")
                            return;
                        }
                       
                        else{
                            console.log("after hashing the new password is:"+hash);
                                
                            connection.query(setnew_password,[hash,email],(error,result)=>{
                                if(error){
                                   res.send("error in saving the new password in hash form")
                                }
                                else{
                                    res.send("password updated successfully")
                                }
                            })
                        }
                    })
                   
                } else {
                    console.log("Passwords do not match");
                    res.send("wrong password")
                }
            }
           })

    })

})



app.post('/events', upload.single('image'), (req, res) => {
    const { title, description, date, time, location, price } = req.body;
    const imagePath = req.file ? req.file.path : null;

    const query = 'INSERT INTO events (title, description, date, time, location, price, image) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [title, description, date, time, location, price, imagePath], (err, results) => {
        if (err) {
            console.error('Error inserting event:', err);
            return res.status(500).send('Internal server error');
        }

        res.send('Event created successfully');
    });
});



app.post('/events', upload.single('image'), (req, res) => {
    const { title, description, date, time, location, price } = req.body;
    const imagePath = req.file ? req.file.path : null;
    console.log('Image Path:', imagePath); 

    const query = 'INSERT INTO events (title, description, date, time, location, price, image) VALUES (?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [title, description, date, time, location, price, imagePath], (err, results) => {
        if (err) {
            console.error('Error inserting event:', err);
            return res.status(500).send('Internal server error');
        }

        res.send('Event created successfully');
    });
});

app.get('/events', (req, res) => {
    const query = 'SELECT * FROM events';
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching events:', err);
            return res.status(500).send('Internal server error');
        }

        res.json(results);
    });
});

app.delete('/events/:id', (req, res) => {
    const eventId = req.params.id;
    const query = 'DELETE FROM events WHERE id = ?';

    connection.query(query, [eventId], (err, result) => {
        if (err) {
            console.error('Error deleting event:', err);
            res.status(500).send('Error deleting event');
        } else {
            res.send('Event deleted successfully');
        }
    });
});

app.put('/events/:id', (req, res) => {
    const eventId = req.params.id;
    const { title, description, date, time, location, price } = req.body;
    const query = 'UPDATE events SET title = ?, description = ?, date = ?, time = ?, location = ?, price = ? WHERE id = ?';

    connection.query(query, [title, description, date, time, location, price, eventId], (err, result) => {
        if (err) {
            console.error('Error updating event:', err);
            res.status(500).send('Error updating event');
        } else {
            res.send('Event updated successfully');
        }
    });
});

app.get('/events/:eventId', (req, res) => {
    const { eventId } = req.params;

    const query = 'SELECT * FROM events WHERE id = ?';
    connection.query(query, [eventId], (err, results) => {
        if (err) {
            console.error('Error fetching event details:', err);
            return res.status(500).send('Error fetching event details');
        }

        if (results.length === 0) {
            return res.status(404).send('Event not found');
        }

        res.status(200).json(results[0]);
    });
});


const saltRounds = 10;

app.post('/admin/register', async (req, res) => {
    const { username, email, password, firstname, lastname } = req.body;

    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const query = 'INSERT INTO admins (username, email, password, firstname, lastname) VALUES (?, ?, ?, ?, ?)';
        connection.query(query, [username, email, hashedPassword, firstname, lastname], (err, results) => {
            if (err) {
                console.error('Error inserting admin:', err);
                return res.status(500).send('Internal server error');
            }
            res.send('Admin registered successfully');
        });
    } catch (error) {
        console.error('Error hashing password:', error);
        res.status(500).send('Internal server error');
    }
});



app.post('/admin/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }

    const findAdminQuery = 'SELECT * FROM admins WHERE email = ?';
    connection.query(findAdminQuery, [email], (err, results) => {
        if (err) {
            console.error('Error finding admin:', err);
            return res.status(500).send('Internal server error');
        }

        if (results.length === 0) {
            return res.status(401).send('Invalid email or password');
        }

        const admin = results[0];
        bcrypt.compare(password, admin.password, (error, isMatch) => {
            if (error) {
                console.error('Error comparing passwords:', error);
                return res.status(500).send('Internal server error');
            }

            if (!isMatch) {
                return res.status(401).send('Invalid email or password');
            }


            res.send('Admin logged in successfully');
        });
    });
});

app.get('/user/:id', (req, res) => {
    const userId = req.params.id;

    const findUserQuery = 'SELECT * FROM users WHERE id = ?';
    connection.query(findUserQuery, [userId], (err, results) => {
        if (err) {
            console.error('Error finding user:', err);
            return res.status(500).send('Internal server error');
        }

        if (results.length === 0) {
            return res.status(404).send('User not found');
        }

        const user = results[0];
        res.json(user);
    });
});


app.post('/adminregister',(req,res)=>{
    const {username,password}=req.body
    console.log(username)
    console.log(password)
    var admin_register="INSERT INTO admin(username,password) VALUES (?,?)"
    connection.query(admin_register,[username,password],(error,result)=>{
        if(error){
            console.log("error in inserting data into admin table"+error);
            res.json({ message:"Enter correct username and password"})


        }
        else{
            res.send("data inserted succesfully into admin table");
            res.json({ message:"signup successfull"})

        }
    })

})

app.post('/adminlogin',(req,res)=>{
    var {username,password}=req.body
    console.log(username)
    console.log(password)
    var adminlogin_sql="SELECT * FROM admin WHERE username=? AND password=? ";
    connection.query(adminlogin_sql,[username,password],(error,result)=>{
        if(error){
           res.send("error in admin login"+error)
           console.log(error)
           return;
        }
        if(result.length==0){
            res.json({ message:"Enter correct username and password"})

        }
        else{
            res.json({ message:"success"})
            console.log(result)
        }
    
    })
})

app.post('/adminpasswordchange',(req,res)=>{
    const{username,currentpassword,newpassword}=req.body;
    const checkadmin_sql="SELECT * FROM admin where  username=? and password=?"
    const changepass_sql="UPDATE admin SET password=? where username=?"
  
    connection.query(checkadmin_sql,[username,currentpassword],(error,result)=>{
        if(error){
            res.status(404).json({message:"user not found"})
            return;
        }
         else if(result.length==0){
            res.status(500).json({message:"wrong password"})
        }
        else{
            connection.query(changepass_sql,[newpassword,username],(error,result)=>{
                if(error){
                    res.status(500).send("error in change password");
                }
                else{
                    res.send("password changed successfully")
                }
            })
        }
    })
})


app.post('/create-order', (req, res) => {
    const { eventId } = req.body;

    const query = 'SELECT price FROM events WHERE id = ?';
    connection.query(query, [eventId], (err, results) => {
        if (err) {
            console.error('Error fetching event price:', err);
            return res.status(500).send('Error fetching event price');
        }

        if (results.length === 0) {
            return res.status(404).send('Event not found');
        }

        const eventPrice = results[0].price * 100; 
        const minimumAmount = 100; 
        if (eventPrice < minimumAmount) {
            return res.status(400).send(`Event price must be at least ₹${minimumAmount / 100}`);
        }

        const options = {
            amount: eventPrice,
            currency: 'INR',
            receipt: `receipt_${eventId}`,
        };

        razorpay.orders.create(options, (err, order) => {
            if (err) {
                console.error('Error creating Razorpay order:', err);
                return res.status(500).send('Error creating Razorpay order');
            }
            res.json(order);
        });
    });
});

app.post('/booked-customers', (req, res) => {
    const { eventId, userId, userName, userEmail, userContact, paymentId } = req.body;
    const query = 'INSERT INTO booked_customers (event_id, user_id, user_name, user_email, user_contact, payment_id) VALUES (?, ?, ?, ?, ?, ?)';

    connection.query(query, [eventId, userId, userName, userEmail, userContact, paymentId], (err, result) => {
        if (err) {
            console.error('Error saving booked customer data:', err);
            return res.status(500).send('Error saving booked customer data');
        }
        res.send('Booked customer data saved successfully');
    });
});

app.get('/booked-customers', (req, res) => {
    const query = 'SELECT * FROM booked_customers';

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching booked customers:', err);
            return res.status(500).send('Error fetching booked customers');
        }

        res.json(results);
    });
});

passport.use(new GoogleStrategy({
    clientID: '560949330833-l6nju2s3lc27j0o1ucejgb3htjkpcb4o.apps.googleusercontent.com',
    clientSct: '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',
    callbackURL: 'http://localhost:3005/auth/google/callback'
  },
  (accessToken, refreshToken, profile, cb) => {
    return cb(null, profile);
  }
));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',
  passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plus.login', 'email'] })
);

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/user');
  }
);

app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

app.get('/profile', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).send('Unauthorized');
  }
});



let events = [];

app.post('/submit-event', (req, res) => {
    const newEvent = { id: uuidv4(), ...req.body };
    events.push(newEvent);
    res.status(201).send(newEvent);
});

app.get('/events', (req, res) => {
    res.send(events);
});
app.post('/submit-contact', (req, res) => {
    const { name, email, message } = req.body;
    const sql = 'INSERT INTO contactuser (name, email, message) VALUES (?, ?, ?)';
    connection.query(sql, [name, email, message], (err, result) => {
        if (err) throw err;
        res.status(201).send({ id: result.insertId, ...req.body });
    });
});

app.get('/contacts', (req, res) => {
    const sql = 'SELECT * FROM contactuser';
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
});


app.listen(port,()=>{
    console.log("server running at http://localhost:3005")
})
