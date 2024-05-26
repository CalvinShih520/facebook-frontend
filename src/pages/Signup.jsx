import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/auth.service';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            await authService.signup(email, password, username).then(
                (response) => {
                    navigate('/');
                    window.location.reload();
                },
                (error) => {
                    console.log(error);
                }
            );
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <section className='section'>
            <form className='form' onSubmit={handleSignup}>
                <h5>sign up</h5>
                <div className='form-row'>
                    <label htmlFor='email' className='form-label'>
                        email
                    </label>
                    <input
                        type='email'
                        className='form-input'
                        id='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className='form-row'>
                    <label htmlFor='username' className='form-label'>
                        username
                    </label>
                    <input
                        type='text'
                        className='form-input'
                        id='username'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className='form-row'>
                    <label htmlFor='password' className='form-label'>
                        password
                    </label>
                    <input
                        type='password'
                        className='form-input'
                        id='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <button type='submit' className='btn btn-block'>
                    Sign up
                </button>
            </form>
        </section>
    );
};

export default Signup;
