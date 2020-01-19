import * as React from "react";

export interface PageProps {
  close: () => void;
  header?: JSX.Element | string;
  buttons?: ReadonlyArray<JSX.Element>;
  isFull?: boolean;
}

const Modal: React.FC<PageProps> = props => {
  React.useEffect(() => {
    document.documentElement.classList.add("is-clipped");
    return () => document.documentElement.classList.remove("is-clipped");
  }, [props]);
  return (
    <div className="modal is-active">
      <div className="modal-background" onClick={props.close}></div>
      <div className={"modal-card" + (props.isFull ? " is-full" : "")}>
        <header className="modal-card-head">
          <div className="modal-card-title">{props.header}</div>
          <button className="delete" aria-label="close" onClick={props.close}></button>
        </header>
        <section className="modal-card-body">{props.children}</section>
        <footer className="modal-card-foot">
          <div className="columns">
            {props.buttons &&
              props.buttons.map((button, i) => (
                <div className="column" key={i}>
                  {button}
                </div>
              ))}
            <div className="column">
              <button className="button is-secondary is-fullwidth" onClick={props.close}>
                Back
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
