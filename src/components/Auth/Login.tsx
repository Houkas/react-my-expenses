import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./Auth";
import Notification from "../UI/Notification/Notification";
import useStoreNotif from "../store/store-notification";
import { AnimatePresence } from "framer-motion";

export function Login() {
  const notification = useStoreNotif((state) => state.notification);

  const emailRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const passwordRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  // Get signUp function from the auth context
  const { signIn } = useAuth();

  const navigate = useNavigate();

  async function handleSubmit(e: any) {
    e.preventDefault();

    // Get email and password input values
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    // Calls `signIn` function from the context
    const { error } = await signIn({ email, password });

    if (error) {
      alert("error signing in");
    } else {
      // Redirect user to Dashboard
      navigate("/");
    }
  }

  return (
    <>
      {notification.isDisplayed === true && (
        <AnimatePresence mode="wait">
          <Notification
            type={notification.isDisplayed}
            message={notification.message}
          ></Notification>
        </AnimatePresence>
      )}
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

            <br />

            <div className="flex justify-center my-4 ">
              <button
                type="submit"
                className="bg-color-green py-2 px-5 color-dgreen font-bold text-base"
              >
                S'identifier
              </button>
            </div>
          </form>
          <br />

          <p className="text-center">
            Vous n'avez pas de compte ?{" "}
            <Link to="/signup" className="color-green">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
