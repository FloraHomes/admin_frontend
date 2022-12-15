import * as yup from "yup";
const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
// min 6 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
export const signupSchema = yup.object().shape({
  firstName: yup.string().required("Your first name is required"),
  lastName: yup.string().required("Your last name is required"),
  phone: yup
    .string()
    .required("Your Phone Number is required"),
  email: yup.string().email("Please enter a valid email").required("Your Email is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 6 characters long")
    .matches(passwordRules, { message: "Password must have at least: 1 uppercase and 1 digit" })
    .required("You must enter password"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm password"),
});

export const updateProfileSchema = yup.object().shape({
  firstName: yup.string()
        .required("Your firstname is required"),
  lastName: yup.string()
        .required("Your lastname is required"),
  phone: yup
          .string()
          .required("Your Phone Number is required")
          .matches(/^[0-9]+$/, "Must be only digits"),
  email: yup.string().email("Please enter a valid email").required("Your Email is required"),

});

export const goalSchema = yup.object().shape({
  goalUnits: yup
          .number()
          .required("Total units is required")
          .moreThan(161, "Can't be less than 162sqm"),
  goalDuration: yup
          .string()
          .required("Goal duration is required")
          .matches(/^[0-9]+$/, "Must be only digits"), 
  firstPurchase: yup
          .number()
          .required("Enter First Purchase Unit")
          .moreThan(9, "Can't be less than 10sqm"),
  subsequentPurchase: yup
          .string()
          .required("Enter subsequent purchase unit"),
                

});

export const corporateSignupSchema = yup.object().shape({
  name: yup.string().min(5, "Name must be at least 5 characters long").required("Company's name is required"),
  phoneNo: yup
    .string()
    .required("Phone Number is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(11, "Must be exactly 11 digits")
    .max(11, "Must be exactly 11 digits"),
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  cacRegNo: yup.string().required("Enter CAC Registration Number"),
  website: yup
  .string()
  .matches(
    /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
    "Enter valid url!"
  )
  .required("Please enter website"),
  stateId: yup.string().required("Select state"),
  address: yup.string().min(10, "Address must be at least 10 characters long").required("Company's address is required"),
  industryType: yup.string().required("Select Industry Type"),
});

export const passwordValidationSchema = yup.object().shape({
  password: yup
  .string()
  .min(5, "Password must be at least 6 characters long")
  .matches(passwordRules, { message: "Password must have at least: 1 uppercase and 1 digit" })
  .required("You must enter password"),
confirmPassword: yup
  .string()
  .oneOf([yup.ref("password"), null], "Passwords must match")
  .required("Please confirm password")
})

export const signinSchema = yup.object().shape({
  email: yup.string().email("Please enter a valid email").required("Your Email is required"),
  password: yup.string().required("You Password is required"),
});

export const advancedSchema = yup.object().shape({
  username: yup.string().min(3, "Username must be at least 3 characters long").required("Required"),
  jobType: yup.string().oneOf(["designer", "developer", "manager", "other"], "Invalid Job Type").required("Required"),
  acceptedTos: yup.boolean().oneOf([true], "Please accept the terms of service"),
});

export const enlistDetailSchema = yup.object().shape({
  propertyType: yup.string().required("Select Property Type"),
  propertyCondition: yup.string().required("Select Property Condition"),
  toilets: yup.string().required("Select No of bathroom/toilet"),
  propertyName: yup.string().required("Write a short title"),
  description: yup.string().required("Write a detail description of the apartment"),
  furnishedStatus: yup.string().required("Select an Option"),
  propertyAmount: yup
    .string()
    .required("Rent Fee is required")
    .matches(/^[0-9]+$/, "Must be only digits"),

});

export const enlistLocationSchema = yup.object().shape({
  stateId: yup.string().required("Select an option"),
  locationId: yup.string().required("Select an option"),
  address: yup.string().required("Property Address is required"),
  contactPersonName: yup.string().required("Contact person name is required"),
  contactPersonPhoneNo: yup
  .string()
  .required("Your Phone Number is required")
  .matches(/^[0-9]+$/, "Must be only digits")
  .min(11, "Must be exactly 11 digits")
  .max(11, "Must be exactly 11 digits"),
  contactPersonEmail: yup.string().email("Please enter a valid email"),
});

export const fullPayValidationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phoneNo: yup
    .string()
    .required("Phone Number is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(11, "Must be exactly 11 digits")
    .max(11, "Must be exactly 11 digits"),
  email: yup.string().email("Please enter a valid email").required("Email is required"),
});

export const flexiblePayValidationSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phoneNo: yup
    .string()
    .required("Phone Number is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(11, "Must be exactly 11 digits")
    .max(11, "Must be exactly 11 digits"),
  email: yup.string().email("Please enter a valid email").required("Email is required"),
  bvnNumber: yup
    .string()
    .required("BVN Number is required")
    .matches(/^[0-9]+$/, "Must be only digits")
    .min(11, "Must be exactly 11 digits")
    .max(11, "Must be exactly 11 digits"),
    initialPayment: yup.string().required("Enter Initial payment"),
});
