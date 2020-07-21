import React from 'react'
import './styles.css'
import Call from '../../components/Call'

const Calls = () => {
    return (
        <>
            <h1>Chamados</h1>
            <Call
                call_id={1}
                call_title="Teste de chamados"
                call_creator_name="Guilherme Sartori"
                functionality_name="Login"
                call_description="A tela ainda está quebrando na base de contatos (?) uehuheu" />
        </>
    )
}

export default Calls