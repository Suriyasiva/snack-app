import React, { useEffect, useContext } from "react";
import Provider, { providerContext } from "../Providers/Provider";
import Select from "react-select";
function User() {
  const contextValues = useContext(providerContext);
  useEffect(() => {
    contextValues.openedTemplate();
  }, []);
  let openedMenu = contextValues.isOpenedMenu;
  useEffect(() => {
    if (Object.keys(contextValues.isOpenedMenu).length) {
    }
  }, [contextValues.isOpenedMenu]);
  var selectOption =
    Object.keys(contextValues.isOpenedMenu).length === 0
      ? {
          value: "loading",
          label: "loading",
        }
      : contextValues.isOpenedMenu.options.map((opt) => {
          return {
            value: opt.id,
            label: opt.name,
          };
        });
  return (
    <div className="container">
      <div className="row">
        <h1>hello user</h1>
        <Select
          isMulti
          options={selectOption}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={(e) => {
            console.log(e);
          }}
        />
      </div>
    </div>
  );
}
let userProvider = () => {
  return (
    <Provider>
      <User />
    </Provider>
  );
};
export default userProvider;
