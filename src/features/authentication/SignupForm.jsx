import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { Link } from "react-router-dom";
import { useSignUp } from "./useUser";
import { createUser } from "../../services/apiUsers.js";


// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const {register, formState, getValues, handleSubmit, reset} = useForm();
  const { errors } = formState;
  const { signup, isSigningUp } = useSignUp();

  function onSubmit({fullName, email, password}) {
    signup({fullName, email, password}, {
        onSuccess: (data) => {
//            console.log("User signed up successfully:", data);
            createUser({user_id: data.user.id, email, fullName});
        },
        onSettled: () => reset(),
    });
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input type="text" id="fullName" disabled={isSigningUp}
        {...register("fullName", {required: "This field is required"})}/>
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input type="email" id="email" disabled={isSigningUp}
        {...register("email",
          {
            required: "This field is required",
            pattern: /\S+@\S+\.\S+/,
            message: "Please enter a valid email address"
        })}/>
      </FormRow>

      <FormRow label="Password (min 8 char.)" error={errors?.password?.message}>
        <>
          <Input type="password" id="password" disabled={isSigningUp}
          {...register("password",
            {
              required: "This field is required",
              minLength: {
                value: 8,
                message: "Password needs a minimum of 8 characters",
              }
          })}/>
          <div></div>
        </>
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input type="password" id="passwordConfirm" disabled={isSigningUp}
        {...register("passwordConfirm",
          {
            required: "This field is required",
            validate: (value) => value === getValues().password || 'Passwords need to match'
          })}/>
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" size="medium">
          Reset
        </Button>
        <Button size="medium" disabled={isSigningUp}>Sign Up</Button>
      </FormRow>
      <FormRow>
          <Link to={"/login"}>Login here</Link>
      </FormRow>

    </Form>
  );
}

export default SignupForm;
