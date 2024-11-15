import Profile from "../models/profileSchema.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import 'dotenv/config'

// login utente con user e pass (companyId)
export const loginUser = async function (req, res) {
    const { email, password, companyId } = req.body // estrai companyId dal corpo della richiesta

    try {
        // ricerco l'utente tramite la mail
        const profile = await Profile.findOne({ email }).select('+password')

        // se il profilo non esiste, ritorna errore di accesso non autorizzato
        if (!profile) {
            return res.status(400).json({ message: 'Unauthorized Access' })
        }

        // verifica la corrispondenza della password
        const isPasswordValid = await bcrypt.compare(password, profile.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Unauthorized Access' })
        }

        // verifica che companyId corrisponda a quello associato al profilo
        if (profile.company.toString() !== companyId) {
            return res.status(403).json({ message: 'Non fai parte di questa azienda. Riprova' })
        }

        // genera il token JWT se tutte le verifiche sono passate
        jwt.sign(
            { profileId: profile.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, jwtToken) => {
                if (err) return res.status(500).json({ message: 'Server error' });
                res.json({ token: jwtToken });
            }
        );
    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
} 

// get dei dati dell'utente
export const getUserData = async function (req, res) {
    // il middleware authentication aggiunge alla req la proprietà loggedProfile, che contiene i dati dell'utente individuato sul DB e corrispondente alle credenziali di login

    return res.send(req.loggedProfile);
}

    
    
