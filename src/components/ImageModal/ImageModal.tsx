import Modal from "react-modal";

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',

    },
    overlay: { backgroundColor: "rgba(0,0,0, 0.7) " }
};

Modal.setAppElement('#root');

type ImageModalProps ={
    modalIsOpen: boolean,
    closeModal: () => void,
    src: string,
    alt: string,
 };

export default function ImageModal({ modalIsOpen, closeModal, src, alt }:ImageModalProps) {
    return (<Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}>
        <img src={src} alt={alt} />
    </Modal>)
}