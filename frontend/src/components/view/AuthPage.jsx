import React, { useState, useEffect, useContext } from 'react'
import { fetchGetCompanies } from '../../data/fetchCompany'
import { login } from '../../data/fetchAuth'
import { useNavigate } from 'react-router-dom'
import { ProfileContext } from '../context/ProfileContextProvider'
import CompanyRegistrationForm from '../login/CompanyRegistrationForm'
import LoginForm from '../login/LoginForm'
import CompanySelection from '../login/CompanySelection'

function AuthPage() {
    const [companies, setCompanies] = useState([])
    const [selectedCompanyId, setSelectedCompanyId] = useState(null)
    const [showLogin, setShowLogin] = useState(false)
    const [showCompanyRegistration, setShowCompanyRegistration] = useState(false)
    const { setToken } = useContext(ProfileContext)
    const navigate = useNavigate()

    useEffect(() => {
        const loadCompanies = async () => {
            const data = await fetchGetCompanies()
            setCompanies(data.dati || [])
        }
        loadCompanies()
    }, [])

    const handleSelectCompany = (companyId) => {
        setSelectedCompanyId(companyId)
        setShowLogin(true)
    };

    const handleRegisterCompany = () => {
        setShowCompanyRegistration(true)
        setShowLogin(false)
    }

    const handleLogin = async (email, password, companyId) => {
        const data = await login({ email, password, company: companyId })
        if (data?.token) {
            localStorage.setItem('token', data.token)
            setToken(data.token)
            navigate('/dashboard')
            return { success: true }
        }
        return { success: false, message: data?.message || 'Login fallito' }
    }

    return (
        <div className="container mt-5">
            {!showCompanyRegistration ? (
                <CompanySelection
                    companies={companies}
                    onSelectCompany={handleSelectCompany}
                    onRegisterCompany={handleRegisterCompany}
                />
            ) : (
                <CompanyRegistrationForm setShowCompanyRegistration={setShowCompanyRegistration} />
            )}
            {showLogin && <LoginForm companyId={selectedCompanyId} onLogin={handleLogin} />}
        </div>
    )
}

export default AuthPage
