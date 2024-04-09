import { useForm, SubmitHandler } from "react-hook-form";
import { LOGIN, SIGNUP } from "../constants/AppConstants";
import { useLogin } from "../hooks/useLogin";
import { useSignup } from "../hooks/useSignup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
interface FormInput {
  username: string;
  email: string;
  password: string;
}

const Form = ({ formType }: { formType: string }) => {
  const navigate = useNavigate();
  const { login, isLoading, error, isSuccess } = useLogin();
  const {
    signup,
    isLoading: isPending,
    error: err,
    isSuccess: success,
  } = useSignup();
  console.log("SUCCESS", success);
  console.log("SUCCESS", isSuccess);

  useEffect(() => {
    if (isLoading || isPending) {
      toast.loading("Loading...");
    } else if (error || err) {
      toast.dismiss();
      toast.error(error || err);
    } else {
      toast.dismiss(); 
      if (success || isSuccess) {
        toast.success("Welcome to YourLink!");
      }
    }
  }, [isLoading, isPending, isSuccess, success, error, err]);
  console.log(isPending);
  console.log(err);
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
    <>
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
        <input
          type="submit"
          disabled={isLoading || isPending}
          value={formType === SIGNUP ? "Signup" : "Login"}
        />
      </form>
    </>
  );
};

export default Form;
