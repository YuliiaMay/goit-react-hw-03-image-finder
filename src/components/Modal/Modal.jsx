import React, { Component } from "react";
import { Overlay, ModalContainer, ModalImg } from "./Modal.styled";

class Modal extends Component {
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            return this.props.onClose();
        }
    };

    render() {
        const { bigImgUrl } = this.props;

        return (
            <Overlay>
                <ModalContainer>
                    <ModalImg src={bigImgUrl} alt="" />
                </ModalContainer>
            </Overlay>
        )
    }
}

export default Modal;