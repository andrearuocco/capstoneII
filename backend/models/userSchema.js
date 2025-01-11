import { Schema, model } from 'mongoose';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String, 
        required: [true, "Please enter an email"],
        lowercase: true, //converte in minuscolo
        trim: true,
        unique: true
    },
    phone: { type: String, required: true },
    isAdmin: { type: Boolean, required: true }, //indica se l'utente è un amministratore in modo da poter gestire il ruolo di questi in modo stringente grazie ad enum
    adminRole: { 
        type: String, 
        enum: ["Socio", "Amministratore Delegato", "Direttore Tecnico", "Consigliere", "Direttore", "Geometra", "Responsabile Risorse Umane", "Responsabile"], //ruoli predefiniti per gli amministratori
        required: function () {
            return this.isAdmin //questo campo in questo modo è richiesto solo se l'utente è amministratore
        },
    },
    position: { 
        type: String, 
        required: function () {
            return !this.isAdmin
        },
    },
    company: { type: Schema.Types.ObjectId, 
        ref: 'Company', required: true }, 
    googleId: { type: String }, 
    licenseKey: { type: String }, //utilizzare per protezione dell'applicazione e da inviare all'indirizzo dell'azienda selezionata o appena registata
    compensations: { 
        type: Number,
        required: function () {
            return this.isAdmin //quando è un'amministratore allora avrà una voce compenso
        },
    },
    payrolls: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Payroll', //quando è un dipendente allora avra una voce bustapaga
    }],
    password: { type: String }, 
    /* employees */
    annualLeave: { type: Number, default: 20, required: function () { return !this.isAdmin } }, //ferie
    paidLeave: { type: Number, default: 0, required: function () { return !this.isAdmin } }, 
    unpaidLeave: { type: Number, default: 0, required: function () { return !this.isAdmin } }, 
    leaveCertificates: [{ 
        fileUrl: String, //percorso del file caricato
        date: { type: Date, default: Date.now }, //data di caricamento
        required: function () { return !this.isAdmin }
    }],
    /* employees */
    notifications: [{ 
        message: String, //notifiche necessarie per la gestione dei permessi pagati, non pagati e delle ferie
        read: { type: Boolean, default: false }, //indica se la notifica è stata letta oppure no
        date: { type: Date, default: Date.now }, //registra momento della creazione della notifica
    }],
    createdAt: { type: Date, default: Date.now },
});

export default model('User', userSchema)