import * as yup from "yup";

let schema = yup.object().shape({
    firstName: yup.string().max(16),
    lastName: yup.string().max(16),
    email: yup
        .string()
        .email("Geçerli bir e-mail girin")
        .required("Bu alanın doldurulması zorunludur"),
    userName: yup
        .string()
        .required("Bu alanın doldurulması zorunludur")
        .max(16, "Kullanıcı adınızın uzunluğu 12 karakterden uzun olamaz"),
    password: yup
        .string()
        .min(8, "Şifrenizin uzunluğu 8 karakterden uzun olmalıdır")
        .required("Bu alanın doldurulması zorunludur"),
    passwordConfirm: yup
        .string()
        .required("Bu alanın doldurulması zorunludur")
        .oneOf([yup.ref("password"), null], "Şifreniz eşleşmelidir"),
});

export default schema;
