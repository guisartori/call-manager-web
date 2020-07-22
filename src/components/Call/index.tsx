import React, { ChangeEvent } from 'react'
import './styles.css'
import CallInterface from '../../models/CallInterface'
import CommitInterface from '../../models/CommitInterface'
import api from '../../service'



const Call = (props: { call: CallInterface, refreshCalls: () => void }) => {

    const lastStatus = props.call.commits[0]
        ? props.call.commits[0].toStatus
        : "CREATED"


    const callHistory = (commits: CommitInterface[]) => {
        if (commits.length > 0) {
            return (
                <div className="call-history">
                    <h3>
                        Histórico
                </h3>
                    <ul>
                        {
                            props.call.commits.map((commit, index) => {
                                return (
                                    <li key={index}>
                                        <h4>{`${commit.fromStatus} to ${commit.toStatus}`}</h4>
                                    Guilherme Sartori says: <span>{`"${commit.comment}"`}</span>
                                    </li>
                                )
                            })
                        }

                    </ul>
                </div>
            )
        }
    }

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const comment = prompt("Escreva aqui o comentário")
        const data = {
            comment,
            callId: props.call.call_id,
            fromStatus: lastStatus,
            toStatus: event.target.value
        }

        api.post("/commit", data)
            .then(response => alert('Novo commit adcionado'))
            .then(props.refreshCalls)
            .catch(err => console.log(err))
    }

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
                    <select name="statusBtn" defaultValue={lastStatus} id="statusBtn" onChange={handleSelectChange}>
                        <option value="NEW">New</option>
                        <option value="DOING">Doing</option>
                        <option value="DONE">Done</option>
                        <option value="PAUSED">Paused</option>
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

            {callHistory(props.call.commits)}
        </div>
    )
}

export default Call