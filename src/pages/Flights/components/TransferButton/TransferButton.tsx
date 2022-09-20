import React from "react"
import styles from "./TransferButton.module.scss"
import { SearchField, useDropdown } from "react-lib"
import { Transition } from "react-transition-group"
import gsap from "gsap"
import TransferButtonList from "@pages/Flights/components/TransferButton/TransferButtonList/TransferButtonList"
import ChangeButtonList from "./ChangeButtonList"
import TransferFromModal from "./TransferFromModal"

interface TransferButtonProps {
    submitButton?: "Добавить" | "Выбрать"
    position: "bottom left" | "bottom right"
    triggerElement: React.ReactNode
    isChange?: boolean
    isFromModal?: boolean
    flight?: any
}

const TransferButton: React.FC<TransferButtonProps> = ({
    submitButton,
    position,
    triggerElement,
    isChange,
    isFromModal,
    flight
}) => {
    const trigger = React.useRef<any>()

    const { Dropdown, isOpen, open, close } = useDropdown({
        ref: trigger,
        position: position,
        closeOnClickOutside: false,
    })

    const renderContent = () => {
        if (isChange)
            return (
                <div>
                    <ChangeButtonList
                        handleClose={close}
                        submitButton={submitButton}
                    />
                </div>
            )

        if (isFromModal)
            return (
                <div>
                    <TransferFromModal
                        close={close}
                    />
                </div>
            )
        else
            return (
                <div>
                    <TransferButtonList
                        close={close}
                        submitButton={submitButton}
                        flight={flight}
                    />
                </div>
            )
    }

    return (
        <div>
            <div ref={trigger} onClick={open}>
                {triggerElement}
            </div>
            <Transition
                in={isOpen}
                timeout={200}
                mountOnEnter
                unmountOnExit
                addEndListener={(node, done) => {
                    gsap.to(node, 200 / 1000, {
                        autoAlpha: isOpen ? 1 : 0,
                        y: isOpen ? 6 : 0,
                        onComplete: done,
                    })
                }}
            >
                <Dropdown
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        width: 478,
                        padding: 0,
                        borderRadius: 4,
                        zIndex: 1000,
                        backgroundColor: "#fff",
                        boxShadow:
                            "0 0 14.7754px rgba(17, 82, 99, 0.075), 0 0 7.84712px rgba(17, 82, 99, 0.0605839), 0 0 3.26536px rgba(17, 82, 99, 0.0421718)",
                    }}
                >
                    {renderContent()}
                </Dropdown>
            </Transition>
        </div>
    )
}

export default TransferButton
