import * as React from "react";

export interface PageProps {
  close: () => void;
  header?: JSX.Element | string;
  buttons?: ReadonlyArray<JSX.Element>;
}

const Page: React.FC<PageProps> = props => {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="box">
            <h1 className="title has-text-centered">{props.header}</h1>
            <div className="columns">
              {props.buttons && props.buttons.map(button => <div className="column">{button}</div>)}
              <div className="column">
                <button className="button is-secondary is-fullwidth" onClick={props.close}>
                  Back
                </button>
              </div>
            </div>
            {props.children}
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
