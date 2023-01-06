const calcCookieExpires = (cookieCreationDate) => {
  //? 3 * 60 * 60 * 1000 its the auth cookie life time
  const remainingTimeMilliseconds =
    3 * 60 * 60 * 1000 - (Date.now() - cookieCreationDate);
  const remainingTime = new Date(
    new Date().getTime() + remainingTimeMilliseconds
  );

  return remainingTime;
};

export default calcCookieExpires;
