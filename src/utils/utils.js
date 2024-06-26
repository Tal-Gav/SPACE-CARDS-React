export const restartGame = () => {
  window.location.reload(false);
};

export const isScreenPortrait = () => {
  const screenOrientation = window.screen.orientation.type;

  if (screenOrientation === "portrait-primary") return true;
  return false;
};
