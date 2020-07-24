import React, { ReactNode, useRef, useEffect } from 'react'
import './styles.css'

const Modal = (props: {
    open: boolean,
    children: ReactNode,
    close: () => void,
    title: string
}) => {
    const fadeOut = () => {
        console.log('oi')
    }
    const modalRef = useRef<HTMLDivElement>(null)

    const escClicked = (event: KeyboardEvent) => {
        if (event.keyCode === 27) {
            handleClose()
        }
    }

    const mouseScreenClicked = (event: Event) => {
        if (event.target === modalRef.current) {
            handleClose()
        }
    }

    const handleClose = () => {
        document.removeEventListener("keydown", escClicked)
        document.removeEventListener("click", mouseScreenClicked)
        modalRef.current?.children[0].classList.add("close-modal")
        modalRef.current?.classList.add("fadeout")
        setTimeout(props.close, 300)
    }

    //TODO ON SUBMIT FECHAR O MODAL COM ANIMAÇÃO

    if (!props.open) {
        return null
    }
    document.addEventListener("keydown", escClicked)
    document.addEventListener("click", mouseScreenClicked)


    return (
        <div className="modal" ref={modalRef}>
            <div className="modal-content">
                <h3>{props.title}</h3>
                {props.children}
            </div>

        </div>
    )
}

export default Modal