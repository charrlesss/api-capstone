import { useState, useEffect } from "react";

const calculateTimeLeft = () => {
  let stoptimer = false;
  window.localStorage.setItem("starter", "30");
  const getStart = parseInt(window.localStorage.getItem("starter") as string);
  const currentTime = parseInt(
    window.localStorage.getItem("currentTime") as string
  );
  const timerStart = currentTime ? currentTime : getStart;
  const cleartimeout: any = setTimeout(calculateTimeLeft, 1000);
  if (currentTime < 1) {
    stoptimer = true;
    window.localStorage.setItem("currentTime", "30");
    clearTimeout(cleartimeout);

    return {
      cleartimeout,
      timerStart: 0,
      stoptimer: true,
    };
  }
  return {
    cleartimeout,
    timerStart,
    stoptimer,
  };
};

export const useTimer = () => {
  const [timeLeft, setTimeLeft] = useState<number>(
    calculateTimeLeft().timerStart
  );

  const [timeStop, setTimeStop] = useState<boolean>(false);

  useEffect(() => {
    const clearinterval = setInterval(() => {
      setTimeLeft((number) => {
        window.localStorage.setItem("currentTime", `${number}`);
        return number - 1;
      });
    }, 1000);

    window.onbeforeunload = function () {
      const currentTime =
        parseInt(window.localStorage.getItem("currentTime") as string) - 1;
      window.localStorage.setItem("currentTime", `${currentTime}`);
    };
    if (timeLeft < 1) {
        setTimeStop(true)
        window.localStorage.setItem("currentTime", "30");
        setTimeLeft(0)
        clearInterval(clearinterval);
        clearTimeout(calculateTimeLeft().cleartimeout);
        window.onbeforeunload = null;
    }

    return () => {
      clearInterval(clearinterval);
      clearTimeout(calculateTimeLeft().cleartimeout);
      window.onbeforeunload = null;
    };
  }, [timeLeft]);
  return {
    timeLeft,
    timeStop
  };
};
