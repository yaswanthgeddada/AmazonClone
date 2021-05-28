import React, { useRef, useState, useEffect } from "react";
import { useAuth } from "./../context/AuthContext";
import { useUser } from "./../context/UserContext";
import { useHistory } from "react-router-dom";

import { storage } from "../firebase/firebase";

import LinearProgress from "@material-ui/core/LinearProgress";

const Profile = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [progressValue, setProgressValue] = useState(0);

  const history = useHistory();
  const { currentUser } = useAuth();
  const { updateUserProfile, getCurrentUserProfile } = useUser();
  const [isloading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [userProfile, setUserProfile] = useState();

  const userName = useRef("");
  const address = useRef("");
  const role = useRef("");

  const getProfile = async () => {
    const profile = await getCurrentUserProfile(currentUser.uid);
    setUserProfile(profile[0]);
  };

  useEffect(() => {
    getProfile();
  }, [currentUser]);

  const updateProfilePic = (e) => {
    if (e.target.files[0]) {
      setIsLoading(true);
      console.log(e.target.files[0]);
      let image = e.target.files[0];

      const imageName = image.name + Date.now();

      const uploadTask = storage.ref(`profilePics/${imageName}`).put(image);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          setProgressValue((snapshot.bytesTransferred / image.size) * 100);
        },
        (error) => {
          console.log(error);
        },
        () => {
          storage
            .ref("profilePics")
            .child(imageName)
            .getDownloadURL()
            .then((url) => {
              setImageUrl(url);
              setIsLoading(false);
            });
        }
      );
    }
  };

  const ProfileInfoHandler = async () => {
    if (userName.current.value !== "" && address.current.value !== "") {
      let userRole;
      if (role.current.checked) {
        userRole = "Seller";
      } else {
        userRole = "customer";
      }

      setIsLoading(true);
      let userData = {
        id: currentUser.uid,
        userName: userName.current.value,
        address: address.current.value,
        email: currentUser.email,
        profilePic: imageUrl,
        role: userRole,
      };
      try {
        await updateUserProfile(userData);

        const resutl = await getCurrentUserProfile(userData.id);
        console.log(resutl);
        history.push("/");
      } catch (error) {
        setError(error.message);
      }

      setIsLoading(false);
    } else {
      setError("Invalid Fields");
    }
  };

  return (
    <div className="flex flex-col  ">
      <div className=" felx justify-center items-center border-2 border-yellow-600 w-4/6 mx-auto mt-10 ">
        <div className="flex flex-col justify-center items-center">
          <div className="mx-20s mt-5">
            <label htmlFor="photo" className="cursor-pointer">
              <img
                src={
                  imageUrl || userProfile?.profilePic || "/assets/nophoto.jpg"
                }
                className="h-40 w-40 rounded-full border-2 "
                alt=""
                htmlFor="photo"
              />
              <p className="text-center text-sm mb-5 text-blue-500 ">
                upload profile pic
              </p>
              {isloading && (
                <div className="my-2">
                  <LinearProgress variant="determinate" value={progressValue} />
                </div>
              )}
              <input
                type="file"
                accept="image/jpg , image/jpeg, image/png"
                hidden
                id="photo"
                onChange={updateProfilePic}
              />
            </label>
          </div>
          {error && (
            <div className="border-2 border-red-300 px-3 py-1 rounded-lg  text-red-400 my-3">
              {error}
            </div>
          )}
          <input
            type="text"
            placeholder="Email"
            className="rounded-lg w-2/5 bg-yellow-100"
            value={currentUser.email}
            disabled
          />
          <input
            type="text"
            placeholder="user name"
            className="rounded-lg w-2/5 mt-5"
            ref={userName}
          />
          <textarea
            type="text"
            placeholder="Address"
            className="rounded-lg w-2/5 mt-5"
            ref={address}
          />
          <div className="mx-auto">
            <label htmlFor="seller" className="text-sm">
              want to be a seller
            </label>

            <input
              type="checkbox"
              id="seller"
              name="role"
              className="m-2"
              value="seller"
              ref={role}
            />
          </div>
        </div>
        <button
          className="w-20 hover:bg-yellow-600 float-right mt-10 px-10 py-2 mx-4 rounded focus:outline-none text-semibold bg-yellow-300"
          onClick={ProfileInfoHandler}
          disabled={isloading}
        >
          save
        </button>
      </div>
    </div>
  );
};

export default Profile;
