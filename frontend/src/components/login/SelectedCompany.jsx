function selectedCompany() {
    const [companies, setCompanies] = useState([])
    const [selectedCompanyId, setSelectedCompanyId] = useState(null)
    const [adminFormState, setAdminFormState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        isAdmin: true,
        adminRole: 'Amministratore Delegato',
        companyId: formState._id,
        password: '',
    })
    const [showAdminModal, setShowAdminModal] = useState(false)
    const [alertMessage, setAlertMessage] = useState(null)
    const [alertVariant, setAlertVariant] = useState('success')

    const loadCompanies = async () => {
        const data = await fetchGetCompanies()
        if (data) {
            setCompanies(data.dati || [])
        }
    }
    useEffect(() => {
        loadCompanies()
    }, [])

    const handleCompanySelection = async () => {
        if (selectedCompanyId) {
            /* setShowLogin(true) */
            const selectedCompany = companies.find(company => company._id === selectedCompanyId)
            /* 
            if (!selectedCompany) {
                setAlertMessage('Select your company to login.')
                setAlertVariant('danger')
                return;
            } 
            */

            const hasAdmins = selectedCompany.admins && selectedCompany.admins.length > 0
            const hasEmployees = selectedCompany.employees && selectedCompany.employees.length > 0

            if (!hasAdmins && !hasEmployees) {
                setAdminFormState(prev => ({ ...prev, companyId: selectedCompanyId }))
                setShowAdminModal(true)
            } else {
                setShowLogin(true)
            }
        } else {
            setAlertMessage('Select your company to login.') //alert bootstrap per mess di mancata selezione di una nuova azienda 
            setAlertVariant('danger')
        }
    } //mostra il form di login per accedere come utente dell'azienda selezionata o il form di registrazione primo utente amministratore se l'azienda non ha utenze

    const handleNewCompanyRegistration = () => {
        setShowCompanyRegistration(true) //mostra form per registrazione nuova azienda 
    }

    return (<div>
        <div>
            <Form.Group controlId="companySelection">
                <Form.Label>Select your Company</Form.Label>
                <Form.Select
                    onChange={(e) => setSelectedCompanyId(e.target.value)}
                    value={selectedCompanyId || ''}
                >
                    <option value="">-- Select your Company --</option>
                    {companies.map((company) => (
                        <option key={company._id} value={company._id}>
                            {company.companyName}
                        </option>
                    ))}
                </Form.Select>
            </Form.Group>
            <Button onClick={handleCompanySelection} variant="primary">
                Here to Login
            </Button>
            <Button onClick={handleNewCompanyRegistration} variant="secondary">
                Register a new Company
            </Button>
        </div>

        {
            showLogin && (
                <div className="mt-4">
                    <h3>Login in your Company and use gestionaleaziendale</h3>
                    <Form onSubmit={handleLoginSubmit}>

                        <Form.Group controlId="formBasicEmail" className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Insert email" />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword" className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Type password" />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Login
                        </Button>

                    </Form>
                </div>
            )
        }
    </div>)
}