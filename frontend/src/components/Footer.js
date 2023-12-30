import React from "react";

const Footer = () => {
  return (
    <footer>
      <div
        className=" bg-dark p-2"
        style={{ width: "100%", position: "absolute" }}
      >
        <p
          className="text-light mt-2"
          style={{
            textAlign: "center",
          }}
        >
          &copy; 2022 developed by Aditya Basude
        </p>
      </div>
    </footer>
  );
};

export default Footer;
