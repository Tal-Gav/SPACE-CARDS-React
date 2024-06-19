import React, { useEffect, useState } from "react";
import SweetAlert2 from "react-sweetalert2";
import "./Alert.css";

const StartAlert = (props) => {
  const [swalProps, setSwalProps] = useState({
    show: true, // Initially, don't show the alert
    title: "Space Cards",
    html: '<img src="./space/space-favicon.png" alt="Victory Image" style="max-width: 20%;" /><br/>The goal is to find all the pairs.<br/>Good Luck!',
    confirmButtonText: "Let's Go",
    customClass: {
      popup: "custom-popup-class", // Define a custom CSS class for the alert
    },
  });

  useEffect(() => {
    // When the component is rendered, set show to true to open the alert immediately
    setSwalProps({ ...swalProps, show: true });
  }, []);

  return (
    <SweetAlert2
      {...swalProps}
      onConfirm={(result) => {
        // run when clieked in confirm and promise is resolved...
      }}
    />
  );
};

export default StartAlert;
