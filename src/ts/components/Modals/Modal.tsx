import * as React from "react";

export interface ModalProps {
  close: () => void;
  header?: JSX.Element | string;
  footer?: JSX.Element | string;
}

const Modal: React.FC<ModalProps> = props => {
  React.useEffect(() => {
    document.documentElement.classList.add("is-clipped");
    return () => {
      document.documentElement.classList.remove("is-clipped");
    };
  }, []);
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={props.close} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{props.header}</p>
          <button className="delete" onClick={props.close} />
        </header>
        <section className="modal-card-body">{props.children}</section>
        <footer className="modal-card-foot">{props.footer}</footer>
      </div>
    </div>
  );
};

export default Modal;
