import React from "react";

import { Formik, Form } from "formik";
import { FormTextItem } from "../index";
import { useThemeContext } from "../../contexts/themeContext";
import FormCheckboxItem from "../formItem/formCheckboxItem";
import schema from "../../utils/schema";

const FormComponent = () => {
    const { state } = useThemeContext();
    return (
        <div className="formComponent">
            <h2
                className={`formGrid__title ${
                    state === "light"
                        ? "text--black formGrid__title--light"
                        : "text--white formGrid__title--dark"
                }`}
            >
                Kayıt
            </h2>
            <Formik
                initialValues={{
                    checkbox: false,
                    firstName: "",
                    lastName: "",
                    email: "",
                }}
                validationSchema={schema}
                onSubmit={async (values) => {
                    await new Promise((r) => setTimeout(r, 500));
                    alert(JSON.stringify(values, null, 2));
                }}
            >
                {({ errors, touched }) => (
                    <Form className="formComponent__form">
                        <div className="formComponent__form--smallGrid">
                            <FormTextItem
                                label="İSİM"
                                id="firstName"
                                name="firstName"
                                placeholder="İsmini gir"
                                size="small"
                                hasError={
                                    errors?.firstName && touched?.firstName
                                }
                                error={errors?.firstName}
                            />
                            <FormTextItem
                                label="SOYİSİM"
                                id="lastName"
                                name="lastName"
                                placeholder="Soyismini gir"
                                size="small"
                                hasError={errors.lastName && touched.lastName}
                                error={errors?.lastName}
                            />
                        </div>
                        <FormTextItem
                            label="E-POSTA"
                            id="email"
                            name="email"
                            placeholder="E-posta adresini gir"
                            size="normal"
                            required
                            hasError={errors?.email && touched?.email}
                            error={errors?.email}
                        />
                        <FormTextItem
                            label="KULLANICI ADI"
                            id="userName"
                            name="userName"
                            placeholder="Kullanıcı adını gir"
                            size="normal"
                            required
                            hasError={errors?.userName && touched?.userName}
                            error={errors?.userName}
                        />
                        <FormTextItem
                            label="ŞİFRE"
                            id="password"
                            name="password"
                            placeholder="Şifreni gir"
                            size="normal"
                            required
                            hasError={errors?.password && touched?.password}
                            error={errors?.password}
                        />
                        <FormTextItem
                            label="ŞİFRENİ TEKRAR GİR"
                            id="passwordConfirm"
                            name="passwordConfirm"
                            placeholder="Şifreni doğrula"
                            size="normal"
                            required
                            hasError={
                                errors?.passwordConfirm &&
                                touched?.passwordConfirm
                            }
                            error={errors?.passwordConfirm}
                        />
                        <FormCheckboxItem
                            name="checkbox"
                            text="Sözleşmeyi kabul ediyorum"
                        />
                        <button
                            className={`formComponent__button ${
                                state === "light"
                                    ? "formComponent__button--light"
                                    : "formComponent__button--dark"
                            } `}
                            type="submit"
                        >
                            KAYIT OL
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default FormComponent;
