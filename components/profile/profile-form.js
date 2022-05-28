import { useRef } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import { useSession } from 'next-auth/client';

import styles from './profile-form.module.css';

function ProfileForm(props) {
  const [session, loading] = useSession();
  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();

  function submitHandler(event) {
    event.preventDefault();

    const enteredOldPassword = oldPasswordRef.current.value;
    const enteredNewPassword = newPasswordRef.current.value;

    // optional: Add validation

    props.onChangePassword({
      oldPassword: enteredOldPassword,
      newPassword: enteredNewPassword
    });
  }

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <FloatingLabel
        controlId="floatingInput"
        label="Email address"
        className="mb-3"
      >
      <Form.Control type="email" className="text-center" placeholder="name@example.com" value={session.user.email} readOnly/>
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput"
        label="New Password"
        className="mb-3"
      >
      <Form.Control type="password" className="text-center" placeholder="New Password" id='new-password' ref={newPasswordRef} />
      </FloatingLabel>

      <FloatingLabel
        controlId="floatingInput"
        label="Old Password"
        className="mb-3"
      >
      <Form.Control type="password" className="text-center" placeholder="Old Password" id='old-password' ref={oldPasswordRef} />
      </FloatingLabel>

      <div className={styles.action}>
        <Button>Change Password</Button>
      </div>
    </form>
  );
}

export default ProfileForm;
