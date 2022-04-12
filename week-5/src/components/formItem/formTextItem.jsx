import React from "react";

import { Field } from "formik";
import { useThemeContext } from "../../contexts/themeContext";

const FormTextItem = ({
    hasError,
    error,
    label,
    id,
    name,
    size,
    placeholder,
    required,
}) => {
    const { state } = useThemeContext();
    console.log(error);
    return (
        <div
            className={`formTextItem ${
                size === "small"
                    ? "formTextItem--small"
                    : "formTextItem--normal"
            }`}
        >
            <label
                className={`formTextItem__label ${
                    state === "light"
                        ? "formTextItem__label--light "
                        : "formTextItem__label--dark "
                } ${required ? "formTextItem__input--required" : "null"}`}
                htmlFor={name}
            >
                {label}
            </label>
            <Field
                className={`formTextItem__input ${
                    state === "light"
                        ? "formTextItem__input--light "
                        : "formTextItem__input--dark "
                } `}
                id={id}
                name={name}
                placeholder={placeholder}
            />
            {hasError && <span className="formTextItem__error">{error}</span>}
        </div>
    );
};

export default FormTextItem;
