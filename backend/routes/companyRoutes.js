import express from 'express'
import { registerCompany, getAllCompanies, getCompanyById, updateCompany, deleteCompany, patchCompanyLogo } from '../controllers/company.controller.js'
import uploadCloudinary from '../middleware/uploadCloudinary.js'

const companyRouter = express.Router()

companyRouter.post('/', registerCompany) //registrazione di un'azienda sul sito        
companyRouter.get('/', getAllCompanies) //aziende che utilizzano il sito nella pagina login       
companyRouter.get('/:id', getCompanyById) //azienda specifica alla quale si sta provando ad accedere come utente    
companyRouter.put('/:id', updateCompany) //possibilità per gli amministratori di poter gestire i dati aziendali 
companyRouter.delete('/:id', deleteCompany) //eliminare propria azienda dal sito se si è amministratori _FRONTEND: attraverso typing del nome     
companyRouter.patch('/:id/logo', uploadCloudinary.single('logo'), patchCompanyLogo) //aggiungi logo azienda 

export default companyRouter 