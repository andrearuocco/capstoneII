import { useEffect, useState, useContext } from 'react'
import { Container, Row, Form, Button, Col, Modal, Alert } from 'react-bootstrap/'
import { fetchGetProfiles, login } from '../data/fetch'
import { ProfileContext } from './context/ProfileContextProvider'
import { useSearchParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import businessImage from './view/business-concept-with-team-close-up.jpg'
import brandImage from './view/brand.jpg'
/* import { ThemeContext } from './context/ThemeContextProvider' */
import ChooseCompany from './ChooseCompany'
import '../App.css'
import RegisterForm from './RegisterForm'


function Login() {
  const [errorMessage, setErrorMessage] = useState('')
  const [errorMessageCompany, setErrorMessageCompany] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [profile, setProfile] = useState([])
  const [showForm, setShowForm] = useState(false)
  let [searchParams, setSearchParams] = useSearchParams()
  const [formValue, setFormValue] = useState({ email: "", password: "" })
  const { token, setToken, userInfo, setUserInfo } = useContext(ProfileContext)
  const handleClose = () => setShowForm(false)
  const handleShow = () => setShowForm(true)
  /* const {theme} = useContext (ThemeContext) */
  const showRegisterForm = () => {
    setShowForm(!showForm)
  }
  useEffect(() => {
    console.log(searchParams.get('token'))
    if (searchParams.get('token')) {
      localStorage.setItem('token', searchParams.get('token'))
      setToken(searchParams.get('token'))// aggiorna il token nello stato del contesto
    }
    fetchGetProfiles().then(data => {
      const filteredProfiles = data.filter(p => p._id !== userInfo?._id);
      setProfile(filteredProfiles)
    })
  }, [userInfo])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const loginData = {
        ...formValue,
        companyId: selectedCompany?.value
      };

      const tokenObj = await login(loginData)

      if (tokenObj && tokenObj.token) {
        localStorage.setItem('token', tokenObj.token)
        setToken(tokenObj.token)
        setSuccessMessage('Login effettuato con successo.')
      } else if (tokenObj.message === 'Non fai parte di questa azienda. Riprova') {
        setErrorMessageCompany('Non fai parte di questa azienda. Riprova')
      } else {
        setErrorMessage('Credenziali errate.')
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('Riprova più tardi.')
    }
  }

  const handleChange = (event) => {
    setFormValue({
      ...formValue,
      [event.target.name]: event.target.value
    })
  }

  const [selectedCompany, setSelectedCompany] = useState(null)
  const handleCompanySelect = (company) => {
    setSelectedCompany(company)
    console.log(company)
  }

  return (
  <div className='bg-gradient bg-opacity-25 bg-success-subtle'>
    {!token && (
      <Container fluid>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 1 }}
          className="br-40"
          style={{
            backgroundImage: `url(${brandImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '50vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
          }}
        >
          <div className="d-flex flex-column text-black-50 mt-5">
            <h1 className="mt-5">Manage your business with our help</h1>
            <p>Manage your business operations with ease</p>
          </div>
        </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 2 }}
            style={{ paddingTop: '2rem' }}
          >
            <Container id="container-login">
              <Row className="justify-content-center align-items-center">
              {selectedCompany ? (
                <Col md={6}>
                  {errorMessage && (
                    <Alert variant="danger" onClose={() => setErrorMessage('')} dismissible>
                      {errorMessage}
                    </Alert>
                  )}
                  {errorMessageCompany && (
                    <Alert variant="danger" onClose={() => setErrorMessageCompany('')} dismissible>
                      {errorMessageCompany}
                    </Alert>
                  )}
                  {successMessage && (
                    <Alert variant="warning" onClose={() => setSuccessMessage('')} dismissible>
                      {successMessage}
                    </Alert>
                  )}
                  <Form onSubmit={handleLogin}>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Label>Email address</Form.Label>
                      <motion.div
                        className="input-border"
                        initial={{ borderColor: 'transparent' }}
                        whileFocus={{ borderColor: '#007bff' }}
                        transition={{ duration: 0.5 }}
                      >
                        <Form.Control
                          type="email"
                          name="email"
                          placeholder="Enter email"
                          onChange={handleChange}
                          required
                        />
                      </motion.div>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <motion.div
                        className="input-border"
                        initial={{ borderColor: 'transparent' }}
                        whileFocus={{ borderColor: '#007bff' }}
                        transition={{ duration: 0.5 }}
                      >
                        <Form.Control
                          type="password"
                          name="password"
                          placeholder="Password"
                          onChange={handleChange}
                          required
                        />
                      </motion.div>
                    </Form.Group>

                    <div className="d-flex flex-column flex-sm-row justify-content-sm-between">
                      <Button type="submit" className="my-2 button-nvm-true">
                        Accesso con credenziali
                      </Button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="my-2 btn btn-link"
                        onClick={handleShow}
                      >
                        Don't have an account? Register here!
                      </motion.button>

                    </div>
                  </Form>
                </Col> ) : (
                <Col md={6}><ChooseCompany onCompanySelect={handleCompanySelect} /></Col>    )}

                <Col md={6} className="d-flex justify-content-center">
                  <img src={businessImage} alt="Your business" style={{ width: '100%', height: '40vh' }} className="br-40" />
                </Col>
              </Row>
            </Container>
          </motion.div>

        <footer className="sticky-bottom footer br-40">
          <strong className="footer-text">Nuove soluzioni per la gestione e l'amministrazione della tua impresa.</strong>
        </footer>
      </Container>
    )}
    <Modal show={showForm} onHide={handleClose}>
        <Modal.Header closeButton>

        </Modal.Header>
        <Modal.Body>
          <RegisterForm showForm={showForm} setShowForm={setShowForm} />
        </Modal.Body>
    </Modal>
  </div>
  )
}

export default Login
