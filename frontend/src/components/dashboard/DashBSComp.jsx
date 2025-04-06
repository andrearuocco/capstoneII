import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import './DashBSComp.css'
import { Container, Row } from 'react-bootstrap'

const cardDataAdmin = [
    { title: "COMMESSE", route: "/jobs", icon: "/construction-dump-dumper-svgrepo-com.svg" },
    { title: "MAGAZZINO", route: "/materials", icon: "/warehouse-storage-unit-storehouse-svgrepo-com.svg" },
    { title: "FINANZE", route: "/transactions", icon: "/money-business-and-finance-svgrepo-com.svg" },
    { title: "HR", route: "/employees", icon: "/guide-human-svgrepo-com.svg" }
]

const cardDataEmployee = [
    { title: "DAILY TASK", route: "/dailytask", icon: "/tasks-svgrepo-com.svg" },
    { title: "MAGAZZINO", route: "/materials", icon: "/warehouse-storage-unit-storehouse-svgrepo-com.svg" },
    { title: "BUSTE PAGA", route: "/payrolls", icon: "/pay-svgrepo-com.svg" },
    { title: "CERTIFICATI", route: "/leavecertificates", icon: "/certificate-svgrepo-com.svg" }
]

function DashBSComp ({ user }) {
    // const navigate = useNavigate()
    const cards = user?.isAdmin ? cardDataAdmin : cardDataEmployee

    return (<Container>
        <Row className='p-3 row-padd'>
            {cards.map((card, index) => (
                <motion.div
                    className="col-BS-6 bor-dash px-3 pb-4 d-flex flex-column align-items-center justify-content-center dash-card"
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 * index, duration: 0.6 }}
                >
                    <motion.div
                        className="dash-icon-wrapper"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                            delay: 0.3 * index + 0.6, 
                            duration: 1.6,
                            ease: "easeInOut"
                        }}
                    >
                        <motion.img
                            src={card.icon}
                            alt={card.title}
                            className="dashboard-icon"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{
                                delay: 0.3 * index + 0.8, 
                                duration: 1.6,
                                ease: "easeInOut"
                            }}
                        />
                    </motion.div>

                    <h3 className="dash-card-title">{card.title}</h3>
                </motion.div>            
            ))}
        </Row>
    </Container>)
}

export default DashBSComp
