import React, { useState, useEffect } from 'react'
import Select from 'react-select'
import { Button } from 'react-bootstrap'
import { fetchGetCompanies } from '../../data/fetchCompany_refactored'

function CompanySelection({ onSelectCompany, onRegisterCompany }) {
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

    return (
        <div>
            <Select
                value={selectedOption}
                onChange={handleChange}
                options={companies}
                placeholder="Select your company"
                isClearable
                isSearchable
            />
            <div className="mt-3">
                <Button variant="primary" className="me-2" onClick={() => onSelectCompany(selectedOption ? selectedOption.value : null)}>
                    Login
                </Button>
                <Button variant="secondary" onClick={onRegisterCompany}>
                    Register Company
                </Button>
            </div>
        </div>
    )
}

export default CompanySelection
