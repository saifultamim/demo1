export const apiDelay = (params = 200) => {
  return new Promise((resolve) => {
    setTimeout(resolve, Math.random * 600 + `${params}`);
  });
};
