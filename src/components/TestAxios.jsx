import React, { useEffect, useState } from "react";
import axios from "axios";

function RandomDog() {
  const [isLoading, setIsLoading] = useState(true);
  const [dogImage, setDogImage] = useState("");

  const getDog = async () => {
    setIsLoading(true);
    await axios
      .get("https://dog.ceo/api/breeds/image/random")
      .then((res) => {
        setDogImage(res.data.message);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getDog();
  }, []);

  return (
    <>
      {isLoading ? (
        <div>loading</div>
      ) : (
        <div data-testid="title">
          <button onClick={getDog}> reload </button> <br />
          <img src={dogImage} alt="dog" />
        </div>
      )}
    </>
  );
}

export default RandomDog;
