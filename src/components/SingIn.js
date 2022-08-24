import { useState, useEffect } from 'react';
import './SignForm.css';
import icon from './icon.png';
import { Link } from "react-router-dom";

const SignIn = () => {

    const [checked, setChecked] = useState(() => {
        const saved = localStorage.getItem("checked");
        const initialValue = JSON.parse(saved);
        return initialValue;
    });

    const [email, setEmail] = useState(() => {
        const saved = localStorage.getItem("email");
        const initialValue = JSON.parse(saved);
        return initialValue || ""
    });
    const [password, setPassword] = useState(() => {
        const saved = localStorage.getItem("password");
        const initialValue = JSON.parse(saved);
        return initialValue || ""
    });

    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleChangeChecked = () => {
        setChecked(!checked)
    }

    useEffect(() => {
        localStorage.setItem("checked", JSON.stringify(checked));
    }, [checked]);
    useEffect(() => {
        localStorage.setItem("email", JSON.stringify(email));
    }, [email]);
    useEffect(() => {
        localStorage.setItem("password", JSON.stringify(password));
    }, [password]);

    const successfullyLogin = () => {
        alert("Successfully logged in!")
        if (!checked) {
            setEmail('');
            setPassword('');
        }
    }

    const errorLogin = () => {
        alert("Login or password is incorrect");
        setPassword('');
    }

    const checkUser = (regArr) => {
        let checkUser = regArr.filter(user => user.email === email && user.password === password);
        return checkUser
    }

    const onSubmitLogin = () => {
        let usersList = JSON.parse(localStorage.getItem('users'));
        if (usersList == null) usersList = [];
        let registered = [];
        if (usersList != null) {
            usersList.forEach(
                user => registered.push(
                    { email: user.email, password: user.password }))
        };
        if (checkUser(registered).length === 0) {
            errorLogin()
        } else {
            successfullyLogin()
        }
    }

    return (
        <form className='form signIn'>
            <div className="container">
                <div className="icon">
                    <img src={icon} alt='icon' />
                </div>
                <div className='label'>Sign In</div>
                <div className='inputs'>
                    <input
                        type="text" placeholder="Enter Email*"
                        name="email" required
                        onChange={onChangeEmail}
                        value={email}
                    />
                    <input
                        type="password" placeholder="Enter Password*"
                        onChange={onChangePassword}
                        name="password" required
                        value={password}
                    />
                </div>
                <div className='checked'>
                    <input type="checkbox"
                        onChange={handleChangeChecked}
                        checked={checked} />
                    <div>Remember me</div>
                </div>
                <button type="button" className='signBtn' onClick={onSubmitLogin}>SIGN IN</button>
                <div className='footer signInFooter'>
                    <Link to={"/26-homework/notActiveLink"}>Forgot  password? </Link>
                    <Link to={'/26-homework/signUp'}>Don't have an account? Sign Up</Link>
                </div>
                <div className='copyRight'>CopyRight © Your Website 2020.</div>
            </div>
        </form>
    )
}

export default SignIn;
