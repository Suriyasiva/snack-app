import React, { useState, useContext, useEffect } from "react";
import Provider, { providerContext } from "../Providers/Provider";
function Home() {
  const contextValues = useContext(providerContext);
  useEffect(() => {
    contextValues.allOpenedTemplates();
  }, []);
  useEffect(() => {
    if (Object.keys(contextValues.OpenedTemplates).length) {
    }
  }, [contextValues.OpenedTemplates]);

  return (
    <>
      <div className="container mt-2">
        <div className="row">
          <div className="col-lg-12">
            {/*--- cards--- */}
            <div className="row mt-2">
              {contextValues.OpenedTemplates.length === 0 ? (
                <div className="col-lg-3 col-md-3 col-sm-3">
                  <div className="card active-menu-label">
                    <div className="card-body">
                      <p>
                        <b>Loading...</b>
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                contextValues.OpenedTemplates.map((data) => {
                  return (
                    <>
                      <div className="row mt-2">
                        <div className="col-lg-12">
                          <h4>
                            <i className="fa-solid fa-circle"></i>&nbsp;active
                            menu -
                            <span
                              style={{
                                textTransform: "lowercase",
                                color: "tomato",
                              }}
                            >
                              &nbsp;{data.name}
                            </span>
                          </h4>
                        </div>
                      </div>

                      {data.options.map((o) => {
                        return (
                          <div className="col-lg-3 col-md-3 col-sm-3">
                            <div className="card active-menu-label">
                              <div className="card-body">
                                <p className="p-0">{o.name}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </>
                  );
                })
              )}
            </div>
            {/*-- chart-- */}
          </div>
        </div>
      </div>
    </>
  );
}

let homeProvider = () => {
  return (
    <Provider>
      <Home />
    </Provider>
  );
};

export default homeProvider;
