import React from "react";
import { connect } from "react-redux";
import { createThing } from "./store";
import { faker } from "@faker-js/faker";

const ThingForm = ({ createThing }) => {
  return (
    <div>
      <button onClick={createThing}>+</button>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createThing: () => {
      dispatch(createThing({ name: faker.commerce.product() }));
    },
  };
};

export default connect(null, mapDispatchToProps)(ThingForm);
