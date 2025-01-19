import Company from '../models/companySchema.js' 

export const registerCompany = async (req, res) => {
    // crea nuova istanza del modello company con i dati definiti nel corpo della richiesta 
  
    const company = new Company({
        ...req.body
    })
    let newCompany
    try {
        newCompany = await company.save() // salva i dati nel DB
        // mando in risposta la nuova azienda salvata 
        return res.send(newCompany) // mando in risposta la nuova azienda salvata
    } catch (error) {
        return res.status(400).send(error)
    }
}

export const getAllCompanies = async (req,res) => {
    try {
        const page = req.query.page || 1; // definisce la pagina, se non specificata nella richiesta utente si va a pagina 1
        let perPage = req.query.perPage || 8; // definisce quanti elementi devono stare nella pagina 
        perPage = perPage > 20 ? 8 : perPage // se l'utente richiede più di 24 companies su una pagina saranno mostrati 8 companies come di default

        const company = await Company.find(req.query.title ? {title: {$regex: req.query.title, $options: 'i'}} : {}) // cerca tra le companies secondo il titolo 
            .collation({locale: 'it'}) // ignora le maiuscole nell'ordinamento secondo il sort 
            .sort({ companyName: 1 }) // ordino gli oggetti JSON in ordine crescente secondo il nome 
            .skip((page - 1) * perPage) // salto documenti pagina precedente 
            .limit(perPage) // indico gli elementi da mostrare per pagina
            /*  .populate('user')
            .populate('job')
            .populate('material')
            .populate('transaction') */;

        const totalResults = await Company.countDocuments();
        const totalPages = Math.ceil(totalResults / perPage);

        res.send({
            dati: company,
            totalPages,
            totalResults,
            page,
        })
    } catch(err) {
        res.status(404).send({ error: "Errore, aziende non trovate.", details: err.message })
    }
}

export const getCompanyById = async (req,res) => {
    // cerco una specifica istanza del modello companies recuperando l'id dalla richiesta 
    const {id} = req.params
    try { 
        const company = await Company.findById(id)/* .populate('user').populate('job').populate('material').populate('transaction') */;
        res.send(company)
    } catch(error) {
        res.status(404).send({message: 'Errore, azienda non trovata.'})
    }
}

export const updateCompany = async (req, res) => {
    const { id } = req.params
    try {
        const company = await Company.findByIdAndUpdate(id, req.body, { new: true }) // trova l'azienda specificata nella richiesta e la modifica, new: true consente di rispondere con l'oggetto successivo al salvataggio
        await company.save() // salvo l'istanza modificata nel DB
        res.send(company)
    } catch (error) {
        res.status(400).send({ message: `Azienda ${id} non modificata.` })
    }
}

export const deleteCompany = async (req, res) => {
    const { id } = req.params
    try {
        const company = await Company.findByIdAndDelete(id)
        res.send(`Azienda ${id} cancellata dal nostro gestionale.`)
    } catch(error) {
        res.status(404).send({message: `Azienda ${id} non trovata.`})
    }
}

export const patchCompanyLogo = async (req, res) => {
    // la patch serve per modificare una risorsa nel DB che esiste già
    const { id } = req.params // recupero l'id dalla richiesta
    try {
        const profile = await Company.findByIdAndUpdate(id, { logo: req.file.path }, { new: true }) // trovo company attraverso il proprio id esplicitato nella richiesta e lo modifica secondo il corpo di quest'ultima

        res.status(200).send(profile)
    } catch(error) {
        res.status(400).send(error)
    }
}