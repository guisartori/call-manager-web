import React from 'react'
import './styles.css'
import CallInterface from '../../models/CallInterface'



const Call = (props: { call: CallInterface }) => {
    return (
        <div className="call">
            <div className="call-title">
                <h2>{`#${props.call.call_id} - ${props.call.call_title}`}</h2>
                <span>{props.call.call_creator_name}</span>
            </div>
            <div className="call-info">
                <svg>
                    <line x1="70%" x2="70%" y1={0} y2={77} />
                    <line x1="70%" x2="95%" y1={27} y2={27} />
                    <line x1="70%" x2="95%" y1={77} y2={77} />
                </svg>
                <div className="status-button">
                    <select name="statusBtn" id="statusBtn">
                        <option value="1">New</option>
                        <option value="2">Doing</option>
                        <option value="3">Done</option>
                        <option value="4">Paused</option>
                    </select>
                </div>
                <ul>
                    <li>
                        {props.call.functionality_name}
                    </li>
                    <li>
                        {props.call.call_description}
                    </li>
                </ul>
            </div>
            {/* <div className="call-history">
                <h3>
                    Histórico
                </h3>
                <ul>
                    <li>
                        <h4>Doing to Done</h4>
                        Guilherme Sartori says: <span>"Finalizando o trabalho e enviando o commit ao server."</span>
                    </li>
                    <li>
                        <h4>Paused to Doing</h4>
                        Guilherme Sartori says: <span>"Retomando o trabalho."</span>
                    </li>
                    <li>
                        <h4>Doing to Paused</h4>
                        Guilherme Sartori says: <span>"Pausa para jogar gears 5 e F1."</span>
                    </li>
                    <li>
                        <h4>New to Doing</h4>
                        Guilherme Sartori says: <span>"Iniciando o chamado."</span>
                    </li>
                </ul>
            </div> */}
        </div>
    )
}

export default Call