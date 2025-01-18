import User from "../models/userSchema.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export const loginUser = async function (req, res) {

    try {
        const profile = await User.findOne({ email: req.body.email }).select('+password +company').populate('company')

        if (!profile) return res.status(400).send('Unauthorized Access. Register')

        if (!(await bcrypt.compare(req.body.password, profile.password))) {
            // ricerca della mail riuscita ma controllo la corrispondenza della password
            return res.status(401).send('Unauthorized Access')
        }

        /* console.log('Profile:', profile)
        console.log('Profile company:', profile.company)
        console.log('Requested company ID:', req.body.company) */

        console.log('Company ID from profile:', profile.company._id.toString())
        console.log('Company ID from request:', req.body.company)
        // controllo se l'utente appartiene all'azienda selezionata
        if (profile.company._id.toString() !== req.body.company) {
            return res.status(403).send('Access denied: user does not belong to the selected company')
        }

        // se tutto è corretto, genera il token JWT
        jwt.sign(
            // payload
            { profileId: profile.id },
            // secret per firmare il token
            process.env.JWT_SECRET,
            // opzioni (durata del token)
            { expiresIn: '1h' },
            // callback
            (err, jwtToken) => {
                if (err) return res.status(500).send('Server error')
                res.send({ token: jwtToken });
            }
        );
    } catch (error) {
        res.status(500).send('Server error')
    }

}

// get dei dati dell'utente
export const getUserData = async function (req, res) {
    // il middleware authentication aggiunge alla req la proprietà loggedProfile, che contiene i dati dell'utente individuato sul DB e corrispondente alle credenziali di login

    return res.send(req.loggedProfile);
}

export const callbackGoogle = async (req, res) => {
    // passport ci crea nella richiesta un oggetto user, a cui noi possiamo poi aggiungere per esempio la proprietà token

    // effettuo il redirect alla home
    res.redirect(`http://localhost:3000?token=${req.user.jwtToken}`) // da inserire indirizzo di caricamento front-end
}