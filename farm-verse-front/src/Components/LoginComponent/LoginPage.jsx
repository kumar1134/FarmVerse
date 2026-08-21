import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../../Services/LoginService";
import "../../DisplayView.css";
import { FaUser, FaLock } from "react-icons/fa";


const LoginPage = () => {


  const navigate = useNavigate();


  const [errors, setErrors] = useState({});


  const [loginData, setLoginData] = useState({
    username: "",
    password: ""
  });


  const [flag, setFlag] = useState(true);




  const validateLogin = (e) => {

    e.preventDefault();


    validateUser(loginData.username, loginData.password)

      .then((response) => {


        let reply = String(response.data);


        if (reply === "True" || reply === "true") {


          navigate("/farmer-menu");


        } else {


          setFlag(false);


        }


      })

      .catch(() => {

        setFlag(false);

      });


  };







  const onChangeHandler = (event) => {


    event.persist();


    setFlag(true);


    const name = event.target.name;

    const value = event.target.value;



    setLoginData(values => ({

      ...values,

      [name]: value

    }));


  };







  const handleValidation = (event) => {


    event.preventDefault();



    let tempErrors = {};

    let isValid = true;




    if (!loginData.username.trim()) {


      tempErrors.username = "User Name is required";

      isValid = false;


    }





    if (!loginData.password.trim()) {


      tempErrors.password = "Password is required";

      isValid = false;


    }





    setErrors(tempErrors);





    if (isValid) {


      validateLogin(event);


    }



  };







  const registerNewUser = () => {


    navigate("/register");


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









      {/* LOGIN SECTION */}


      <div className="login-box auth-box login-page">





        <h2>

          Welcome Back 👋

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


              value={loginData.username}


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

              <FaLock /> Password

            </label>






            <input



              type="password"



              placeholder="Enter password"



              name="password"



              className="form-control"



              value={loginData.password}



              onChange={onChangeHandler}



            />







            {errors.password && (


              <p className="error-text">


                {errors.password}


              </p>


            )}




          </div>









          <button


            className=" login-btn"


            onClick={handleValidation}



          >



            Login



          </button>







        </form>









        {!flag && (



          <p className="error-text invalid">



            Invalid User Id or Password



          </p>



        )}









        <div className="register-section">





          <h5>



            Don't have an account?



          </h5>







          <button



            className=" register-btn"



            onClick={registerNewUser}



          >



            Create New Account



          </button>







        </div>







      </div>







    </div>



  );


};



export default LoginPage;