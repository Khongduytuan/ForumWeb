import { useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import "./login.css"

// Lưu thông tin người dùng nếu đăng nhập thành công



// giá trị khởi tạo cho state mấy ô input nhập thông tin
const initUserValue = {
    username: "",
    password: "",
};
const isEmptyValueLogin = (value) =>{
    return !value || value.trim().length < 1;
};
function Login() {
    const [formValueLogin, setFormValueLogin] = useState(initUserValue);
    const [formErrorLogin, setFormErrorLogin] = useState({});
    const navigate = useNavigate();
    

    const handleChangeLogin = (event) =>{
        const {value, name} = event.target;
        setFormValueLogin({
            ...formValueLogin,
            [name]:value,
        });
    }

    const validateFormLogin = () => {
        const error = {};
        if(isEmptyValueLogin(formValueLogin.username)){
            error["username"] = "Username is required"
        }
        if(isEmptyValueLogin(formValueLogin.password)){
            error["password"] = "Password is required"
        }
        setFormErrorLogin(error);  
        return Object.keys(error).length === 0;
    };

    const handleSubmitLogin = async (envent) =>{
        envent.preventDefault();
        if(validateFormLogin()){
            try {
                
                const response = await axios.post('/users/login', formValueLogin);
                console.log("User login successfully!");
                console.log(response.data); // Nếu bạn muốn in ra dữ liệu trả về từ API
                // Reset form after successful registration if needed
            
                if (response.data) {
                    // Lưu đối tượng người dùng vào localStorage
                    localStorage.setItem('user', JSON.stringify(response.data));
                    
                    navigate('/'); // Điều hướng sang trang Home
                }
                setFormValueLogin(initUserValue);
            } catch (error) {
                console.error("Error registering user:", error);
            }
        }else{
            console.log("form invalidate");
        }
    };

    console.log("Form Error Login", formErrorLogin);

  return (
    <div className="login-page">
            <div className="login-form-container">
                <h1 className="title-login">Login account</h1>
                <form onSubmit={handleSubmitLogin}>
                    <div className="mb-2">
                        <label htmlFor="username" className="form-label">
                            Username
                        </label>
                        <input 
                            id="username"
                            className="form-control"
                            type="text"
                            name="username"
                            value={formValueLogin.username}
                            onChange={handleChangeLogin}
                        />
                        {formErrorLogin.username && (
                            <div className="error-feedback">{formErrorLogin.username}</div>
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
                            value={formValueLogin.password}
                            onChange={handleChangeLogin}
                        />
                        {formErrorLogin.password && (
                            <div className="error-feedback">{formErrorLogin.password}</div>
                        )}
                       
                    </div>
                    
                    <button type="submit" className="submit-btn">
                        Login
                    </button>

                    <div className="register-link">
                        Bạn chưa có tài khoản? 
                        <Link to="/register">Đăng ký</Link>
                    </div>
                </form>

            </div>

        </div>
  );
}

export default Login;
