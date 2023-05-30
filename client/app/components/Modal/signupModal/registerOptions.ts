import validator from "validator";

const registerOptions = {
  firstName: {
    required: "First name is required",
    minLength: {
      value: 2,
      message: "First name must be at least 2 characters",
    },
    maxLength: {
      value: 20,
      message: "First name must be at most 20 characters",
    },
  },
  lastName: {
    required: "Last name is required",
    minLength: {
      value: 2,
      message: "Last name must be at least 2 characters",
    },
    maxLength: {
      value: 20,
      message: "Last name must be at most 20 characters",
    },
  },
  email: {
    required: "Email is required",
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: "Please enter a valid email address.",
    },
    validate: {
      checkEmail: async (value: string) => {
        const res = await fetch(
          "http://localhost:3005/api/v1/auth/customer/checkData/email",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: value }),
          }
        )
          .then((res) => res.json())
          .catch((err) => err.json());

        return res.success || res.message;
      },
    },
  },
  password: {
    required: "The password can not be empty",
    minLength: {
      value: 8,
      message: "Your password must be at least 8 characters",
    },
    maxLength: {
      value: 64,
      message: "Your password must be at most 64 characters",
    },
    validate: {
      isPassword: (value: string) =>
        validator.isStrongPassword(value) ||
        "Your password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
    },
  },
  passwordConfirm: {
    required: "The password confirmation can't be empty",
    validate: {
      isPairedPassword: () => {
        const password = (
          document.querySelector("#password") as HTMLInputElement
        ).value;
        const passwordConfirm = (
          document.querySelector("#passwordConfirm") as HTMLInputElement
        ).value;
        return password === passwordConfirm || "Passwords do not match";
      },
    },
  },
};

export default registerOptions;
