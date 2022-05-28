import { useState, useRef } from 'react';
import { signIn } from 'next-auth/client';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';

import styles from './auth-form.module.css';
import { Button, Form } from 'react-bootstrap';

// async function createUser(email, password) {
//   const response = await fetch('/api/auth/signup', {
//     method: 'POST',
//     body: JSON.stringify({ email, password }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   });

//   const data = await response.json();

//   if (response.ok) {
//     if (data.email == '') {
//       toast(data.error, { type: "error" });
//       throw new Error(data.message || 'Something went wrong!');
//     }
//   }
//   else {
//     throw new Error(data.message || 'Something went wrong!');
//   }

//   return data;
// }

function AuthForm() {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  // function switchAuthModeHandler() {
  //   setIsLogin((prevState) => !prevState);
  // }

  async function submitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // optional: Add validation

    if (isLogin) {
      const result = await signIn('credentials', {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      }).then(({ ok, error }) => {
        if (!error) {
            router.replace('/profile');
        } else {
            console.log(error)
            toast(error, { type: "error" });
        }
      })
    } else {
      const result = await createUser(enteredEmail, enteredPassword)
      .then(({ ok, error }) => {
        if (!ok) {
          console.log(error)
          toast(error, { type: "error" });
        }
      })
    }
  }

  return (
    <section className={styles.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <Form>
        <Form.Group>
          <Form.Label for='email'>Your Email</Form.Label>
          <Form.Control type='email' id='email' required ref={emailInputRef} />
        </Form.Group>
        <Form.Group>
          <Form.Label for='password'>Your Password</Form.Label>
          <Form.Control 
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </Form.Group>
        <Button type="submit" onClick={submitHandler} >{isLogin ? 'Login' : 'Create Account'}</Button>
      </Form>
    </section>
  );
}

export default AuthForm;
