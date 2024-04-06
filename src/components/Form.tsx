import { useForm, SubmitHandler } from "react-hook-form";
import { LOGIN, SIGNUP } from "../constants/AppConstants";
import { useLogin } from "../hooks/useLogin";
import { useSignup } from "../hooks/useSignup";

interface FormInput {
  username: string;
  email: string;
  password: string;
}

const Form = ({ formType }: { formType: string }) => {
  const { login } = useLogin();
  const { signup } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>();

  const onRegister: SubmitHandler<FormInput> = (data: FormInput) => {
    console.log("Register", data);
    signup(data.username, data.email, data.password);
  };
  const onLogin: SubmitHandler<FormInput> = (data: FormInput) => {
    console.log("Login", data);
    login(data.email, data.password);
  };

  return (
    <form
      onSubmit={
        formType === LOGIN ? handleSubmit(onLogin) : handleSubmit(onRegister)
      }
    >
      {formType === SIGNUP && (
        <>
          <input
            placeholder="Username"
            {...register("username", {
              required: "Username is required",
              maxLength: 20,
            })}
          />
          <br />
          {formType === SIGNUP && errors.username && (
            <span>{errors.username.message}</span>
          )}
        </>
      )}
      <br />
      <input
        placeholder="email"
        {...register("email", {
          required: "Email is required",
          pattern: {
            value:
              /^[\w-]+(\.[\w-]+)*@[A-Za-z0-9-]+(\.[A-Za-z0-9]+)*(\.[A-Za-z]{2,})$/i,
            message: "Invalid email address",
          },
        })}
      />
      <br />
      {errors.email && <span>{errors.email.message}</span>}
      <br />
      <input
        placeholder="Password"
        {...register("password", {
          required: "Password is required",
        })}
      />
      <br />
      {errors.password && <span>{errors.password.message}</span>}
      <br />
      <input type="submit" value={formType === SIGNUP ? "Signup" : "Login"} />
    </form>
  );
};

export default Form;
