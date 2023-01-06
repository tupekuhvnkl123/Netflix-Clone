//// Packages
import { useState } from "react";
import Cookies from "js-cookie";
import { useMutation } from "react-query";
import { addToList } from "../constants/api";
import calcCookieExpires from "../constants/calcCookieExpires";

const useAddToList = (movieId) => {
  const [result, setResult] = useState(null);

  const addToListMutation = useMutation(() => addToList(movieId), {
    staleTime: Infinity,
    retry: false,
  });

  const addMovieToList = () => {
    addToListMutation.mutateAsync().then((data) => {
      const storedUser = Cookies.get("user");

      const newUserData = {
        ...JSON.parse(storedUser),
        list: data.list,
      };

      const cookieCreationDate = JSON.parse(storedUser).createdAt;
      const remainingTime = calcCookieExpires(cookieCreationDate);

      Cookies.set("user", JSON.stringify(newUserData), {
        expires: remainingTime,
      });

      setResult(data.added);
    });
  };

  return { addMovieToList, result };
};

export default useAddToList;
