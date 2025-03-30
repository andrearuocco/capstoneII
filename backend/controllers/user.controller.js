import User from '../models/userSchema.js'
import bcrypt from 'bcrypt'
import Company from '../models/companySchema.js'

export const createUser = async (req, res) => {
    const { firstName, lastName, email, phone, isAdmin, adminRole, position, companyId, password, IBAN } = req.body

    try {
        
        const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined

        const newUser = new User({
            firstName,
            lastName,
            email,
            phone,
            IBAN,
            isAdmin,
            adminRole: isAdmin ? adminRole : undefined,
            position: !isAdmin ? position : undefined,
            company: companyId,
            password: hashedPassword,
        })

        await newUser.save()

        const company = await Company.findById(companyId) //trova l'azienda e aggiorna l'array `admins` o `employees`
        if (!company) {
            return res.status(404).send({ message: 'Not Found' })
        }
        if (isAdmin) {
            company.admins.push(newUser._id)
        } else {
            company.employees.push(newUser._id)
        }
        await company.save()

        return res.status(201).send({
            message: isAdmin
                ? 'Welcome, you are a new admin'
                : 'Welcome, you are a new employee',
            user: newUser,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Error, there is not a new user', error })
    }
}

/* 
export const getUsers = async (req, res) => {
    const { companyId } = req.user

    try {
        const users = await User.find({ company: companyId })
        res.status(200).send(users)
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'Here, there are not users.', error })
    }
} 
*/

export const updateUser = async (req, res) => {
    const { id } = req.params
    const updates = req.body

    try {
        
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).send({ message: 'There are not users with this id.' })
        }

        const userAllowedFields = ['firstName', 'lastName', 'email', 'birthday', 'country', 'avatar', 'phone', 'TIN'] //campi che possono essere modificati sia da utente corrente sia dagli amministratori
    
        const adminOnlyFields = ['isAdmin', 'adminRole', 'position', 'compensations', 'payrolls', 'annualLeave', 'paidLeave', 'unpaidLeave', 'leaveCertificates', 'notifications'] //campi che posso essere modificati solo dagli amministratori

        //separo i campi aggiornabili secondo l'utenza che sarà loggata nel gestionale 
        const userUpdates = {}
        const adminUpdates = {}

        for (const key in updates) {
            if (userAllowedFields.includes(key)) {
                userUpdates[key] = updates[key]
            } else if (adminOnlyFields.includes(key)) {
                adminUpdates[key] = updates[key]
            } else {
                return res.status(400).send({ message: `'${key}' wrong.` })
            }
        }

        /* if (!req.user.isAdmin && Object.keys(adminUpdates).length > 0) {
            return res.status(403).send({ message: 'Only admins can edit this field.' })
        } */

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { ...userUpdates, ...adminUpdates },
            { new: true, runValidators: true }
        )

        res.status(200).send({ message: 'A user was editing !!', user: updatedUser })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'Error, try again.', error })
    }
}

export const deleteUser = async (req, res) => {
    const { id } = req.params

    try {
        
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).send({ message: 'Not Found' })
        }

        const company = await Company.findById(user.company) //trova l'azienda a cui appartiene l'utente da eliminare 
        if (!company) {
            return res.status(404).send({ message: 'Not Found' })
        }

        //rimuovi l'utente corrispondente secondo la propria posizione aziendale
        if (user.isAdmin) {
            company.admins = company.admins.filter(adminId => adminId.toString() !== id)
        } else {
            company.employees = company.employees.filter(employeeId => employeeId.toString() !== id)
        }

        await company.save() //salva le modifiche apportate nel modello company corrispondente

        await user.deleteOne() //elimina istanza user dalla collection

        res.status(200).send({ message: 'User deleted.', user })
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error, wait and try again.', error })
    }
}

export const searchUsers = async (req, res) => {
    const { id, firstName, lastName } = req.query

    try {
        let users

        if (id) {
            users = await User.findById(id)
            if (!users) {
                return res.status(404).send({ message: 'There are not users with this id.' })
            }
            return res.status(200).send({ message: `${firstName}  ${lastName}`, user: users })
        }

        if (firstName || lastName) {
            const query = {}
            if (firstName) query.firstName = new RegExp(firstName, 'i') //cerca in base al nome ignorando maiuscole e minuscole 
            if (lastName) query.lastName = new RegExp(lastName, 'i') //cerca in base al cognome ignornaod maiuscole e minuscole 

            users = await User.find(query)

            if (users.length === 0) {
                return res.status(404).send({ message: 'There are not users with this Name.' })
            }
            return res.status(200).send({ message: `${query.firstName}  ${query.lastName}`, users })
        }

        return res.status(400).send({ message: 'Insert id, firstName or lastName to search.' })
    } catch (error) {
        console.error(error)
        res.status(500).send({ message: 'Error, try again.', error })
    }
}


