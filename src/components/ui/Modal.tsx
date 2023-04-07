import ReactModal, { Props as ReactModalProps } from 'react-modal';

{ process.env.NODE_ENV !== 'test' ? ReactModal.setAppElement("#__next") : ReactModal.setAppElement("body") }

export const Modal: React.FC<Omit<ReactModalProps, "ariaHideApp" | "overlayClassName" | "className">> = (reactModalProps) => {
    return (
        <ReactModal
            {...reactModalProps}
            ariaHideApp={process.env.NODE_ENV !== "test"}
            overlayClassName="fixed inset-0 z-20 bg-transparent/75 flex justify-center items-center"
            className="z-40 rounded-md bg-white p-4"
        >
            {reactModalProps.children}
        </ReactModal>
    );
}