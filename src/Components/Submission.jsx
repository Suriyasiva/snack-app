import React, { useEffect, useContext } from "react";
import Provider, { providerContext } from "../Providers/Provider";
function Submission() {
  const contextValues = useContext(providerContext);
  useEffect(() => {
    contextValues.submissions();
  }, []);
  console.log(contextValues.submissionData, "submissionData");
  var loaders = <div class="card_load_extreme_title"></div>;
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div class="bd-example mt-3">
              <table class="table table-hover">
                <thead>
                  <tr className="font-weight-bold">
                    <th scope="col">#</th>
                    <th scope="col">User Name</th>
                    <th scope="col">User ID</th>
                    <th scope="col">Template ID</th>
                    <th scope="col">Selected Menu</th>
                  </tr>
                </thead>
                <tbody>
                  {contextValues.submissionData.length === 0 ? (
                    <tr>
                      <th scope="row">{loaders}</th>
                      <td>{loaders}</td>
                      <td>{loaders}</td>
                      <td>{loaders}</td>
                      <td>{loaders}</td>
                    </tr>
                  ) : (
                    contextValues.submissionData.map((data) => {
                      return (
                        <tr>
                          <th scope="row">{data.id}</th>
                          <td>{data.userName}</td>
                          <td>{data.userId}</td>
                          <td>{data.templateId}</td>
                          <td className="font-weight-bold">
                            {data.selected[0]}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
let SubmissionProvider = () => {
  return (
    <Provider>
      <Submission />
    </Provider>
  );
};
export default SubmissionProvider;
