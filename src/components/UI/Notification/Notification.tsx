import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import useStoreNotif from "../../store/store-notification";
import "./Notification.scss";

export default function Notification(props: any) {
  const setNotification = useStoreNotif((state) => state.setNotification);
  const notification = useStoreNotif((state) => state.notification);

  const [isMounted, setIsMounted] = useState(false);
  const [isInit, setIsInit] = useState(true);

  useEffect(() => {
    if (isInit === true) {
      setIsMounted(notification.isDisplayed);
      setIsInit(false);
      // Notification killed after 10s
      setInterval(killNotification, 10000);
    } else {
      if (isMounted === false) {
        setNotification(false, "", "");
      }
    }
  }, [isMounted]);

  let backgroundColor: string;
  if (props.type === "success") {
    backgroundColor = "#87FF73";
  } else if (props.type === "warning") {
    backgroundColor = "#FFB673";
  } else if (props.type === "error") {
    backgroundColor = "#FF7373";
  } else {
    backgroundColor = "#E4E8E3";
  }
  function killNotification() {
    setIsMounted(false);
  }

  const dropIn = {
    hidden: {
      y: "-30vh",
      opacity: 0,
    },
    visible: {
      y: "0px",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 30,
        stiffness: 400,
      },
    },
    exit: {
      y: "30vh",
      opacity: 0,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 30,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.div
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="absolute top-[70px] notification"
    >
      {isMounted === true && (
        <div
          className={
            " mx-auto  right-[20px] max-w-full text-sm pointer-events-auto bg-clip-padding mb-3"
          }
          style={{
            opacity: isMounted === true ? 1 : 0,
            transition: "opacity 1s ease, transform 1s ease",
          }}
        >
          <div
            style={{ backgroundColor: backgroundColor }}
            className={
              " flex justify-between items-center py-2 px-3 bg-clip-padding"
            }
          >
            <div
              style={{ backgroundColor: backgroundColor }}
              className={"p-3 break-words text-[#1C221C] font-semibold"}
            >
              {props.message !== undefined ? props.message : "Notifcation"}
            </div>
            <div className="flex items-center">
              <button
                onClick={() => killNotification()}
                type="button"
                className="btn-close btn-close-white box-content ml-2 text-[#1C221C] border-none rounded-none focus:shadow-none focus:outline-none focus:opacity-100 hover:text-white hover:opacity-75 hover:no-underline"
              >
                <img src={"./close_dark.svg"} alt="" width="35px" />
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
