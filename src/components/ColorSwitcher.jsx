import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { themeSwitcher } from "../features/auth/authSlice";

const ColorSwitcher = () => {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [color, setColor] = useState("#27b397");
  useEffect(() => {
    if (user.user?.theme) {
      setColor(user.user?.theme);
      document.documentElement.style.setProperty("--bs-info", user.user.theme);
    }
  }, [user.user?.theme]);

  const handleColorChange = (event) => {
    const newColor = event.target.value;
    setColor(newColor);
    document.documentElement.style.setProperty("--bs-info", newColor);
    console.log(newColor);
    dispatch(themeSwitcher(newColor));
  };
  return (
    <>
      <div className="color-switcher">
        <span
          className="material-icons-round"
          onClick={() => document.getElementById("colorInput").click()}
        >
          colorize
        </span>
        <input
          type="color"
          value={color}
          id="colorInput"
          onChange={handleColorChange}
        />
      </div>
    </>
  );
};

export default ColorSwitcher;
