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
                    key={index}
                    className="col-BS-6 bor-dash px-3 pb-4 d-flex flex-column align-items-center justify-content-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 * index, duration: 0.6 }}
                    // onClick={() => }
                >
                    <motion.img
                        src={card.icon}
                        alt={card.title}
                        className="dashboard-icon"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 * index, duration: 1 }}
                    />
                    <h3>{card.title}</h3>
                </motion.div>
            ))}
        </Row>
    </Container>)
}

export default DashBSComp
