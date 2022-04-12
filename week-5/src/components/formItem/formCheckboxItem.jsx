import React from "react";

import { Field } from "formik";

const FormCheckboxItem = ({ name, text }) => (
    <div className="formTextItem             ">
        <label>
            <Field type="checkbox" name={name} />
            {text}
        </label>
    </div>
);

export default FormCheckboxItem;
