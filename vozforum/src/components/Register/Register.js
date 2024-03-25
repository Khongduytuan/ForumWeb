import { useState } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { unstable_HistoryRouter } from "react-router-dom";
import "./Register.css"

const initFormValue = {
    name: "",
    birth: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",

};

const isEmptyValue = (value) =>{
    return !value || value.trim().length < 1;
};

const isEmailValid = (email) =>{
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
};
function RegisterPage(){
    const [formValue, setFormValue] = useState(initFormValue);
    const [formError, setFormError] = useState({});
    const history = useHistory();

    const handleChange = (event) =>{
        const {value, name} = event.target;
        setFormValue({
            ...formValue,
            [name]:value,
        });
    }

    const validateForm = () => {
        const error = {};
        if(isEmptyValue(formValue.name)){
            error["name"] = "Name is required"
        }
        if(isEmptyValue(formValue.birth)){
            error["birth"] = "Birth is required"
        }
        if(isEmptyValue(formValue.email)){
            error["email"] = "Email is required"
        }else{
            if(!isEmailValid(formValue.email)){
                error["email"] = "Email is valid"
            }
        }
        
        if(isEmptyValue(formValue.password)){
            error["password"] = "Password is required"
        }
        if(isEmptyValue(formValue.confirmPassword)){
            error["confirmPassword"] = "Confirm Password is required"
        } else if(formValue.password !== formValue.confirmPassword){
            error["confirmPassword"] = "Confirm Password not match"

        }

        setFormError(error);  
        return Object.keys(error).length === 0;
    };

    const handleSubmit = async (envent) =>{
        envent.preventDefault();
        if(validateForm()){
            try {
                const response = await axios.post('/users/register', formValue);
                console.log("User registered successfully!");
                console.log(response.data); // Nếu bạn muốn in ra dữ liệu trả về từ API
                // Reset form after successful registration if needed
                setFormValue(initFormValue);
                history.push('/');
            } catch (error) {
                console.error("Error registering user:", error);
            }
        }else{
            console.log("form invalidate");
        }
    };

    console.log("Form Error", formError);


    return(
        <div className="register-page">
            <div className="register-form-container">
                <h1 className="title">Register account</h1>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="form-label">
                            Name
                        </label>
                        <input 
                            id="name"
                            className="form-control"
                            type="text"
                            name="name"
                            value={formValue.name}
                            onChange={handleChange}
                        />
                        {formError.name && (
                            <div className="error-feedback">{formError.name}</div>
                        )}
                       
                    </div>

                    <div className="mb-2">
                        <label htmlFor="birth" className="form-label">
                            Birth
                        </label>
                        <input 
                            id="birth"
                            className="form-control"
                            type="text"
                            name="birth"
                            value={formValue.birth}
                            onChange={handleChange}
                        />
                        {formError.birth && (
                            <div className="error-feedback">{formError.birth}</div>
                        )}
                       
                    </div>

                    <div className="mb-2">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input 
                            id="email"
                            className="form-control"
                            type="text"
                            name="email"
                            value={formValue.email}
                            onChange={handleChange}
                        />
                        {formError.email && (
                            <div className="error-feedback">{formError.email}</div>
                        )}
                       
                    </div>

                    <div className="mb-2">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input 
                            id="username"
                            className="form-control"
                            type="text"
                            name="username"
                            value={formValue.username}
                            onChange={handleChange}
                        />
                        {formError.username && (
                            <div className="error-feedback">{formError.username}</div>
                        )}
                       
                    </div>

                    <div className="mb-2">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input 
                            id="password"
                            className="form-control"
                            type="password"
                            name="password"
                            value={formValue.password}
                            onChange={handleChange}
                        />
                        {formError.password && (
                            <div className="error-feedback">{formError.password}</div>
                        )}
                       
                    </div>

                    <div className="mb-2">
                        <label htmlFor="confirmPassword" className="form-label">
                            Confirm Password
                        </label>
                        <input 
                            id="confirmPassword"
                            className="form-control"
                            type="password"
                            name="confirmPassword"
                            value={formValue.confirmPassword}
                            onChange={handleChange}
                        />
                        {formError.confirmPassword && (
                            <div className="error-feedback">{formError.confirmPassword}</div>
                        )}
                       
                    </div>

                    <button type="submit" className="submit-btn">
                        Register
                    </button>

                    <div className="login-link">
                        Bạn đã có tài khoản? 
                        <Link to="/">Đăng nhập</Link>
                    </div>
                </form>

            </div>

        </div>
    )
    
}
export default RegisterPage