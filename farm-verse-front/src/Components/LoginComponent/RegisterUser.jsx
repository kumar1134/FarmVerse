import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerNewUser } from "../../Services/LoginService";
import "../../DisplayView.css";
import { FaUser, FaLock, FaEnvelope, FaIdCard } from "react-icons/fa";


const RegisterUser = () => {


  const navigate = useNavigate();


  const [errors, setErrors] = useState({});


  const [farmUser, setFarmUser] = useState({

    username: "",
    password: "",
    personalName: "",
    email: ""

  });


  const [flag, setFlag] = useState(false);


  const [confirmPassword, setConfirmPassword] = useState("");



  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;




  useEffect(() => {

    setFlag(false);

  }, []);







  const createNewUser = (event) => {


    event.preventDefault();


    if (farmUser.password === confirmPassword) {


      registerNewUser(farmUser)

        .then(() => {


          setFlag(true);


        });


    }


  };









  const onChangeHandler = (event) => {


    event.persist();


    setFlag(false);


    const name = event.target.name;

    const value = event.target.value;



    setFarmUser(values => ({

      ...values,

      [name]: value

    }));


  };









  const handleValidation = (event) => {


    event.preventDefault();


    let tempErrors = {};

    let isValid = true;





    if (!farmUser.username.trim()) {


      tempErrors.username = "User Name is required";

      isValid = false;


    }





    if (!farmUser.personalName.trim()) {


      tempErrors.personalName = "Personal Name is required";

      isValid = false;


    }





    if (!farmUser.email.trim()) {


      tempErrors.email = "Email is required";

      isValid = false;


    }

    else if (!emailPattern.test(farmUser.email)) {


      tempErrors.email = "Invalid Email Format";

      isValid = false;


    }







    if (!farmUser.password.trim()) {


      tempErrors.password = "Password is required";

      isValid = false;


    }

    else if (farmUser.password.length < 5 || farmUser.password.length > 10) {


      tempErrors.password = "Password must be 5-10 characters long";

      isValid = false;


    }

    else if (farmUser.password !== confirmPassword) {


      tempErrors.password = "Both passwords are not matched";

      isValid = false;


    }







    if (!confirmPassword.trim()) {


      tempErrors.confirmPassword = "Confirm Password is required";

      isValid = false;


    }





    setErrors(tempErrors);





    if (isValid) {


      createNewUser(event);


    }


  };








  const returnBack = () => {


    navigate("/");


  };









  return (


    <div className="auth-page">






      {/* BRAND SECTION */}


      <div className="auth-left">



        <h1>

          🌱 FarmVerse

        </h1>




        <h3>

          Smart Agriculture Platform

        </h3>





        <p>

          Empowering farmers with smart digital solutions

        </p>



      </div>









      {/* REGISTER BOX */}


      <div className="auth-box register-page">






        <h2>

          Create Account ✨

        </h2>









        <form>






          <div className="form-group">


            <label>

              <FaUser /> User Name

            </label>



            <input

              type="text"

              placeholder="Enter username"

              name="username"

              className="form-control"

              value={farmUser.username}

              onChange={onChangeHandler}

            />



            {errors.username && (

              <p className="error-text">

                {errors.username}

              </p>

            )}



          </div>









          <div className="form-group">


            <label>

              <FaIdCard /> Personal Name

            </label>



            <input

              type="text"

              placeholder="Enter personal name"

              name="personalName"

              className="form-control"

              value={farmUser.personalName}

              onChange={onChangeHandler}

            />



            {errors.personalName && (

              <p className="error-text">

                {errors.personalName}

              </p>

            )}



          </div>









          <div className="form-group">


            <label>

              <FaEnvelope /> Email

            </label>




            <input

              type="email"

              placeholder="Enter email"

              name="email"

              className="form-control"

              value={farmUser.email}

              onChange={onChangeHandler}

            />



            {errors.email && (

              <p className="error-text">

                {errors.email}

              </p>

            )}



          </div>









          <div className="form-group">


            <label>

              <FaLock /> Password

            </label>



            <input

              type="password"

              placeholder="Enter password"

              name="password"

              className="form-control"

              value={farmUser.password}

              onChange={onChangeHandler}

            />



            {errors.password && (

              <p className="error-text">

                {errors.password}

              </p>

            )}



          </div>









          <div className="form-group">


            <label>

              <FaLock /> Confirm Password

            </label>




            <input

              type="password"

              placeholder="Confirm password"

              className="form-control"

              value={confirmPassword}

              onChange={(event) =>

                setConfirmPassword(event.target.value)

              }

            />



            {errors.confirmPassword && (

              <p className="error-text">

                {errors.confirmPassword}

              </p>

            )}



          </div>









          <button

            className=" login-btn"

            onClick={handleValidation}

          >

            Create Account

          </button>








        </form>









        {flag && (


          <div className="success-message">


            <p>

              New User Created Successfully

            </p>



            <button

              className=" register-btn"

              onClick={returnBack}

            >

              Go To Login

            </button>



          </div>


        )}









        <div className="register-section">

  <h5>
    Already have an account?
  </h5>

  <button
    type="button"
    className="register-btn"
    onClick={returnBack}
>
    Login
</button>

</div>






      </div>







    </div>


  );


};



export default RegisterUser;