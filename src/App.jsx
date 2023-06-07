import { useForm } from "react-hook-form";
import './App.css'
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

function App() {
  const schema = yup.object().shape({
    fullName: yup.string().required("Full Name is a required field"),
    email: yup.string().email().matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'invalid email'
    ).required("Email is a required field"),
    age: yup.number().positive().integer().required("Age is a required field"),
    password: yup.string().matches( /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{4,}$/, 'invalid password').required("Password is a required field"),
    confirmPassword: yup.string().oneOf([yup.ref("password"), null], "Passwords must match").required("Confirm Password is a required field"),
  });
  const { register, handleSubmit, formState:{errors} } = useForm({resolver: yupResolver(schema)});
  const onSubmit = (data) => {
    console.log(data);};

  return (
    <>
      
      <form onSubmit={handleSubmit(onSubmit)} style={{display: "flex", flexDirection: "column", alignItems: "center", width: "50%", height: "100vh"} }>
      <div className="inputs">
      <input type="FullName" placeholder="Full Name" {...register("fullName")} />
      <p>{errors.fullName?.message}</p>
      <input type="Email" placeholder="Email" {...register("email")} />
      <p>{errors.email?.message}</p>
      <input type="Number" placeholder="age" {...register("age")}/>
      <p>{errors.age?.message}</p>
      <input type="Password" placeholder="Password" {...register("password")}/>
      <p>{errors.password?.message}</p>
      <input type="Password" placeholder="Confirm Password" {...register("confirmPassword")}/>
      <p>{errors.confirmPassword?.message}</p>
      <button type="Submit" className="btn">Submit</button>
      </div>
      </form>
     
      
    </>
  )
}

export default App
