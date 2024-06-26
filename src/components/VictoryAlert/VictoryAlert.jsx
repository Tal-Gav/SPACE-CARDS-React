import React, { useEffect, useState } from "react";
import SweetAlert2 from "react-sweetalert2";

const VictoryAlert = (props) => {
  const { restartGame } = props;
  const [swalProps, setSwalProps] = useState({
    show: false, // Initially, don't show the alert
    title: "You Won!",
    html: '<img src="./medal.png" alt="Victory Image" style="max-width: 20%;" />',
    confirmButtonText: "New Game",
    customClass: {
      popup: "swal-custom-style", // Define a custom CSS class for the alert
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
        restartGame();
      }}
    />
  );
};

export default VictoryAlert;
