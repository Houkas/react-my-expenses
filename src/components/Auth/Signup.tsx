import { RefObject, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import useStoreNotif from '../store/store-notification'

export function Signup() {

  const setNotification = useStoreNotif((state) => state.setNotification);

  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isPasswordConfirmVisible, setPasswordConfirmVisible] = useState(false);

  const emailRef = useRef() as RefObject<HTMLInputElement>;
  const passwordRef = useRef() as RefObject<HTMLInputElement>;
  const passwordConfirmRef = useRef() as RefObject<HTMLInputElement>;

  // Get signUp function from the auth context
  const { signUp } = useAuth();

  let navigate = useNavigate();

  async function handleSubmit(e: any) {
    e.preventDefault();

    // Get email and password input values
    const email = emailRef.current!.value;
    const password = passwordRef.current!.value;
    const passwordConfirm = passwordConfirmRef.current!.value;

    if (password !== passwordConfirm) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    // Calls `signUp` function from the context
    const { error } = await signUp({ email, password });

    if (error) {
      alert("error signing in");
    } else {
      // Redirect user to Dashboard
      navigate("/");
      setNotification(true, 'success', 'Votre compte a été créé avec succès, un email de confirmation a été envoyé.');
    }
  }

  return (
    <>
      <div className="flex justify-center">
        <div className=" flex flex-col justify-center h-screen mx-5 max-w-[576px]">
          <img src={"./logo.svg"} className="mx-auto my-4"></img>
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="input-email"
              className="font-normal text-base color-lgrey"
            >
              Email
            </label>
            <input
              id="input-email"
              type="email"
              ref={emailRef}
              className="border-lgrey border-[1px] bg-transparent min-h-[48px] px-2"
            />

            <label
              htmlFor="input-password"
              className="font-normal text-base color-lgrey"
            >
              Mot de passe
            </label>
            <div className="flex flex-row border-lgrey border-[1px]">
              <input
                id="input-password"
                type={isPasswordVisible ? "text" : "password"}
                ref={passwordRef}
                className="border-lgrey bg-transparent px-2"
              />
              <img
                onClick={() => {
                  setPasswordVisible(!isPasswordVisible);
                }}
                src={
                  isPasswordVisible
                    ? "./visible_eye.svg"
                    : "./invisible_eye.svg"
                }
              />
            </div>

            <label
              htmlFor="input-password"
              className="font-normal text-base color-lgrey"
            >
              Confirmer Mot de passe
            </label>
            <div className="flex flex-row border-lgrey border-[1px]">
              <input
                id="input-password"
                type={isPasswordConfirmVisible ? "text" : "password"}
                ref={passwordConfirmRef}
                className="border-lgrey bg-transparent"
              />
              <img
                onClick={() => {
                  setPasswordConfirmVisible(!isPasswordConfirmVisible);
                }}
                src={
                  isPasswordConfirmVisible
                    ? "./visible_eye.svg"
                    : "./invisible_eye.svg"
                }
              />
            </div>

            <br />
            <div className="flex justify-center my-4 ">
              <button
                type="submit"
                className="bg-color-green py-2 px-5 color-dgreen font-bold text-base"
              >
                S'inscrire
              </button>
            </div>
          </form>
          <br />
          <p className="text-center">
            Vous avez déjà un compte ?{" "}
            <Link to="/login" className="color-green">
              S'identifier
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
