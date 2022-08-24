import { useState, useEffect } from 'react';
import './SignForm.css';
import icon from './icon.png';
import { Link } from "react-router-dom";

const SignUp = () => {

    const [firstName, setFirstName] = useState(() => {
        const saved = localStorage.getItem("firstName");
        const initialValue = JSON.parse(saved);
        return initialValue || ""
    });
    const [firstNameStyle, setFirstNameStyle] = useState(() => {
        const saved = localStorage.getItem("firstNameStyle");
        const initialValue = JSON.parse(saved);
        return initialValue
    });

    const [lastName, setLastName] = useState(() => {
        const saved = localStorage.getItem("lastName");
        const initialValue = JSON.parse(saved);
        return initialValue || ""
    });
    const [lastNameStyle, setLastNameStyle] = useState(() => {
        const saved = localStorage.getItem("lastNameStyle");
        const initialValue = JSON.parse(saved);
        return initialValue
    });

    const [emailReg, setEmailReg] = useState(() => {
        const saved = localStorage.getItem("emailReg");
        const initialValue = JSON.parse(saved);
        return initialValue || ""
    });
    const [emailStyle, setEmailStyle] = useState(() => {
        const saved = localStorage.getItem("emailStyle");
        const initialValue = JSON.parse(saved);
        return initialValue
    });
    const [password, setPassword] = useState('');
    const [passwordStyle, setPasswordStyle] = useState(() => {
        const saved = localStorage.getItem("passwordStyle");
        const initialValue = JSON.parse(saved);
        return initialValue
    });

    const user = {
        firstName: firstName,
        lastName: lastName,
        email: emailReg,
        password: password,
    }

    useEffect(() => {
        localStorage.setItem("firstName", JSON.stringify(firstName));
    }, [firstName]);
    useEffect(() => {
        localStorage.setItem("firstNameStyle", JSON.stringify(firstNameStyle));
    }, [firstNameStyle]);
    useEffect(() => {
        localStorage.setItem("lastName", JSON.stringify(lastName));
    }, [lastName]);
    useEffect(() => {
        localStorage.setItem("lastNameStyle", JSON.stringify(lastNameStyle));
    }, [lastNameStyle]);
    useEffect(() => {
        localStorage.setItem("emailReg", JSON.stringify(emailReg));
    }, [emailReg]);
    useEffect(() => {
        localStorage.setItem("emailStyle", JSON.stringify(emailStyle));
    }, [emailStyle]);

    const isName = (str) => /^[а-яА-ЯёЁїЇa-zA-Z]{3,20}$/.test(str)
    const isEmail = (str) => /^([a-z0-9_.-]{3,}@[\da-z.-]{2,}\.[a-z.]{2,})$/.test(str);
    const isPassword = (pas) => /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])([^\s]){8,16}$/gm.test(pas);

    const errorStyle = {
        border: "none",
        borderRadius: "5px",
        outline: "rgb(224, 83, 83) solid 2px"
    }
    const okStyle = {
        border: "none",
        borderRadius: "5px",
        outline: "rgb(112, 204, 99) solid 2px"
    }
    const emptyStyle = {
        border: "1px solid rgb(118, 118, 118)",
        borderRadius: "0px",
        outline: "none"
    }

    const onChangeName = (e) => {
        if (isName(e.target.value)) {
            e.target.id === 'firstName' ? setFirstNameStyle(okStyle) : setLastNameStyle(okStyle);
        } else if (e.target.value === '') {
            e.target.id === 'firstName' ? setFirstNameStyle(emptyStyle) : setLastNameStyle(emptyStyle);
        } else {
            e.target.id === 'firstName' ? setFirstNameStyle(errorStyle) : setLastNameStyle(errorStyle);
        }
        e.target.id === 'firstName' ? setFirstName(e.target.value) : setLastName(e.target.value);
    }

    const onChangeEmail = (e) => {
        if (isEmail(e.target.value)) {
            setEmailStyle(okStyle);
        } else if (e.target.value === '') {
            setEmailStyle(emptyStyle);
        } else {
            setEmailStyle(errorStyle);
        }
        setEmailReg(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
        if (isPassword(e.target.value)) {
            setPasswordStyle(okStyle);
        } else if (e.target.value === '') {
            setPasswordStyle(emptyStyle);
        } else {
            setPasswordStyle(errorStyle);
        }
    }

    const userAlreadyRegistered = () => {
        alert("This email is already registered")
        setEmailStyle(errorStyle);
        setPasswordStyle(emptyStyle);
        setPassword('');
    }

    const registerUser = (list) => {
        list.push(user);
        localStorage.setItem("users", JSON.stringify(list));
        setFirstName('');
        setFirstNameStyle(emptyStyle);
        setLastName('');
        setLastNameStyle(emptyStyle)
        setEmailReg('');
        setEmailStyle(emptyStyle);
        setPassword('');
        setPasswordStyle(emptyStyle);
        alert("Successfully registered!");
    }

    const onSubmitRegistration = () => {
        let usersList = JSON.parse(localStorage.getItem('users'));
        let registered = [];
        if (usersList != null) usersList.forEach(user => registered.push(user.email));
        if (usersList == null) usersList = [];
        if (isName(user.firstName) && isName(user.lastName) &&
            isEmail(user.email) && isPassword(user.password)) {
            registered.includes(user.email) ?
                userAlreadyRegistered() :
                registerUser(usersList)
        }
    }

    return (
        <form className='form signUp'>
            <div className="container">
                <div className="icon">
                    <img src={icon} alt='icon' />
                </div>
                <div className='label'>Sign Up</div>
                <div className='inputs'>
                    <div className="input-name">
                        <input type="text"
                            value={firstName}
                            placeholder="First Name*"
                            id='firstName'
                            name="first name"
                            onChange={onChangeName} required
                            style={firstNameStyle}
                        />
                        <input type="text"
                            value={lastName}
                            placeholder="Last Name*"
                            name="last name"
                            id='lastName'
                            onChange={onChangeName} required
                            style={lastNameStyle}
                        />
                    </div>
                    <input type="text" placeholder="Enter Email*"
                        value={emailReg} style={emailStyle}
                        id='emailReg' onChange={onChangeEmail}
                        name="emailReg" required />
                    <input type="password" placeholder="Enter Password*"
                        value={password}
                        style={passwordStyle}
                        id='password' onChange={onChangePassword}
                        name="password" required />
                </div>
                <div className='checked'>
                    <input type="checkbox" />
                    <div>I want to receive inspiration, marketing promotions and updates via email.</div>
                </div>
                <button type="submit" className='signBtn'
                    onClick={onSubmitRegistration}>
                    SIGN UP
                </button>
                <div className='footer signUpFooter'>
                    <Link to={'/26-homework/signIn'}>Already have an account? Sign in</Link>
                </div>
                <div className='copyRight'>CopyRight © Your Website 2020.</div>
            </div>
        </form>
    )
}

export default SignUp;