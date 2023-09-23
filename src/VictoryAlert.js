import React, { useEffect, useState } from 'react';
import SweetAlert2 from 'react-sweetalert2';

const VictoryAlert = (props) => {
  const [swalProps, setSwalProps] = useState({
    show: false, // Initially, don't show the alert
    title: 'You Won!',
    text: 'Well played :)',
  });

  useEffect(() => {
    // When the component is rendered, set show to true to open the alert immediately
    setSwalProps({ ...swalProps, show: true });
  }, []);

  return (
    <SweetAlert2 {...swalProps} />
  );
}

export default VictoryAlert;
