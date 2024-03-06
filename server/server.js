const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const EmployeeModel = require("./models/Employee.js");
const AlumnoRoute = require("./routes/AlumnoRoute.js");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/proyecto_individual_final', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Conectado al servidor.'));

app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await EmployeeModel.findOne({ email: email });

        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado." });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error del servidor." });
    }
});

app.post('/register', async (req, res) => {
    try {
        const createdEmployee = await EmployeeModel.create(req.body);

        const token = jwt.sign({ userId: createdEmployee._id }, 'your_secret_key', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error del servidor." });
    }
});

app.use(AlumnoRoute);

app.listen(5000, () => console.log('\nEl servidor esta ejecutandose correctamente.'));
