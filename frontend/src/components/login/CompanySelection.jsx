import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { Button } from 'react-bootstrap'
import { fetchGetCompanies } from '../../data/fetchCompany'
import './CompanySelection.css'
import reactSelectStyles from '../context/ReactSelectStyles'
import { motion } from 'framer-motion'

function CompanySelection({ onSelectCompany, onRegisterCompany, showLoginForm }) {
    const [companies, setCompanies] = useState([])
    const [selectedOption, setSelectedOption] = useState(null)

    const loadCompanies = async () => {
        try {
            const data = await fetchGetCompanies()
            
            const companyOptions = data.data.dati.map(c => ({
                value: c._id,
                label: c.companyName
            }))
            setCompanies(companyOptions)
        } catch (error) {
            console.error("Error loading companies:", error)
        }
    }
    useEffect(() => {

        loadCompanies()
    }, [])

    const handleChange = (selected) => {
        setSelectedOption(selected)
        onSelectCompany(selected ? selected.value : null)
    }

    return /* MODIFICHE 04.04 */(<>
        <h3 className="title-welcome">Welcome EasyToHandle</h3>
        <p className="subtitle-welcome">Handle your company with us</p>{/* MODIFICHE 04.04 */}
        <motion.div 
            className='d-flex flex-column gap-2 company-select-wrapper justify-content-center align-items-center'
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="w-100 d-flex flex-column">
                {!showLoginForm && 
                    <img src="/business-login.svg" alt="Welcome Illustration" style={{ width: '20vh', maxWidth: '300px' }} className="mb-3 align-self-center" />
                }                
                <Select
                    value={selectedOption}
                    onChange={handleChange}
                    options={companies}
                    placeholder="Select your company"
                    isClearable
                    isSearchable
                    styles={reactSelectStyles}
                />
            </div>
            
            <Button className="button-nvm-po" onClick={onRegisterCompany}>
                Register Company
            </Button>
            
        </motion.div>{/* MODIFICHE 04.04 */}
    </>)/* MODIFICHE 04.04 */
}

export default CompanySelection
