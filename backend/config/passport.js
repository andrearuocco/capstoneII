/* 
import GoogleStrategy from 'passport-google-oauth20'
import jwt from 'jsonwebtoken'
import Profiles from '../models/profileSchema.js'

const googleStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: `${process.env.HOST}:${process.env.PORT}${process.env.GOOGLE_CALLBACK}`,
    passReqToCallback: true
}, 
async function (req, accessToken, refreshToken, profile, passportNext) {
    const { given_name: name, family_name: surname, email, sub: googleId, picture: avatar } = profile._json;
    const { companyId } = req.query;

    let myProfile = await Profiles.findOne({ googleId });

    if (!myProfile) {
        const newProfile = new Profiles({
            name,
            surname,
            email,
            googleId,
            avatar,
            company: companyId,
            IBAN: "000000000000000000000000000",
            TIN: "0000000000000000",
            country: "Italia"
        })
        myProfile = await newProfile.save()
        req.session.companyId = null
    }

    if (!myProfile || !myProfile.company || myProfile.company.toString() !== companyId) {
        return passportNext(null, false, { message: 'Non fai parte di questa azienda. Riprova' })
    }

    jwt.sign(
        { profileId: myProfile._id },
        process.env.JWT_SECRET,
        { expiresIn: '1h' },
        (error, jwtToken) => {
            if (error) return passportNext(error);
            return passportNext(null, { jwtToken });
        }
    )
})

export default googleStrategy 
*/