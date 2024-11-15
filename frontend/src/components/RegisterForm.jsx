import { React, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { registerProfile } from "../data/fetch";
import { registerAdmin } from "../data/fetchAdmin"

function RegisterForm({ showForm, setShowForm }) {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    // stato per gestire i dati di registrazione
    const [registerFormData, setRegisterFormData] = useState({
        name: '',
        surname: '',
        email: '',
        password: '',
        birthday: '',
        country: '',
        avatar: '',  // nuovo campo avatar
        IBAN: '',
        TIN: '',
        company: '',  // aggiunto per associazione a Company
    });

    // stato per dati amministrativi separati
    const [adminData, setAdminData] = useState({
        name: '',
        description: ''
    });

    const [licenseKey, setLicenseKey] = useState('');
    const [licenseError, setLicenseError] = useState(false);

    // funzione per gestire le variazioni di stato su inserimento dati dell'utente
    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setRegisterFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // funzione per gestire i campi relativi all'amministratore
    const handleAdminChange = (event) => {
        const { name, value } = event.target;
        setAdminData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleLicenseChange = (event) => {
        setLicenseKey(event.target.value);
    };

    const showLoginForm = function () {
        setShowForm(false);
    };

    // funzione per creare il nuovo profilo e associarlo ad un eventuale ruolo amministrativo
    const createNewProfile = async function () {
        setErrorMessage('');
        setSuccessMessage('');

        if (!licenseKey || !registerFormData.email || !registerFormData.password || !registerFormData.name || !registerFormData.surname || !adminData.name) {
            setErrorMessage('Tutti i campi devono essere compilati per la registrazione.');
            return;
        }

        if (licenseKey !== "licenzaAndrea") {
            setLicenseError(true);
            setErrorMessage('Chiave di licenza non valida.');
            return;
        }
        
        try {
            // Creazione del profilo
            const createdProfile = await registerProfile(registerFormData);
            setSuccessMessage('Registrazione avvenuta con successo.');
            
            // Creazione del ruolo admin e associazione al profilo appena creato
            if (adminData.name) {
                await registerAdmin({
                    ...adminData,
                    profile: createdProfile._id  // assegna l'ID del profilo al campo profile
                });
            }

            showLoginForm();
        } catch (error) {
            setErrorMessage('Riprova più tardi.');
        }
    };

    return (
        <div className="bg-gradient bg-success-subtle bo-ra-register">
            <div className="font-register m-1">
                <h1>Register Form</h1>
                {errorMessage && (
                    <div className="alert alert-danger" role="alert">
                        {errorMessage}
                    </div>
                )}
                {successMessage && (
                    <div className="alert alert-success" role="alert">
                        {successMessage}
                    </div>
                )}
                <Form>
                    {/* Campi form */}
                    <Form.Group className="mb-3">
                        <Form.Label>Licenza Applicazione</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Inserisci licenza rilasciata per uso applicazione"
                            value={licenseKey}
                            onChange={handleLicenseChange}
                        />
                        {licenseError && <p className="text-danger">Chiave di licenza non valida</p>}
                    </Form.Group>

                    {/* Campi del profilo */}
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Indirizzo Email</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={registerFormData.email}
                            onChange={handleFormChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={registerFormData.password}
                            onChange={handleFormChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Nome</Form.Label>
                        <Form.Control
                            type="text"
                            name="name"
                            placeholder="Nome"
                            value={registerFormData.name}
                            onChange={handleFormChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Cognome</Form.Label>
                        <Form.Control
                            type="text"
                            name="surname"
                            placeholder="Cognome"
                            value={registerFormData.surname}
                            onChange={handleFormChange}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Avatar</Form.Label>
                        <Form.Control
                            type="text"
                            name="avatar"
                            placeholder="URL immagine profilo"
                            value={registerFormData.avatar}
                            onChange={handleFormChange}
                        />
                    </Form.Group>

                    {/* Campi per i dati amministrativi */}
                    <Form.Group className="mb-3">
                        <Form.Label>Ruolo</Form.Label>
                        <Form.Select
                            name="name"
                            value={adminData.name}
                            onChange={handleAdminChange}
                        >
                            <option value="">Seleziona il tuo ruolo</option>
                            <option value="Socio">Socio</option>
                            <option value="Amministratore Delegato">Amministratore Delegato</option>
                            <option value="Direttore Tecnico">Direttore Tecnico</option>
                            <option value="Direttore Finanziario">Direttore Finanziario</option>
                            <option value="Responsabile">Responsabile</option>
                            <option value="Direttore Operativo">Direttore Operativo</option>
                            <option value="Responsabile Risorse Umane">Responsabile Risorse Umane</option>
                            <option value="Responsabile Vendite">Responsabile Vendite</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Descrizione</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            placeholder="Descrizione della tua posizione"
                            value={adminData.description}
                            onChange={handleAdminChange}
                        />
                    </Form.Group>

                    <div className="d-flex justify-content-between flex-column flex-sm-row class-change">
                        <Button className="bg-white submit text-primary mb-2 ms-2" onClick={createNewProfile}>
                            <span className="font-submit">Submit</span>
                        </Button>
                        <Link variant="secondary" onClick={showLoginForm} as="Button">
                            Already have an account? Click Here!
                        </Link>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default RegisterForm;
