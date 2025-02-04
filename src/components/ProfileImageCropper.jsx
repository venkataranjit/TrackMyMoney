import React, { useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import Cropper from "react-easy-crop";
import Modal from "react-modal";
import { editProfilePic } from "../features/auth/userProfilePicSlice";
import { updateUser } from "../features/auth/authSlice";
Modal.setAppElement("#root");
const ProfileImageCropper = ({ onSave, userId }) => {
  const userDetails = useSelector((state) => state.auth);
  const [image, setImage] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const fileInputRef = useRef(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const dispatch = useDispatch();

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        setModalIsOpen(true);
      };
      reader.readAsDataURL(file);
      event.target.value = null;
    }
  };

  const getCroppedImage = async () => {
    if (!image || !croppedAreaPixels) return;

    const croppedImageBase64 = await cropImage(image, croppedAreaPixels);
    onSave(croppedImageBase64); // Save Base64 string
    await dispatch(
      editProfilePic({
        id: userId,
        profilePic: croppedImageBase64,
      })
    );

    await dispatch(
      updateUser({
        ...userDetails.user, // Retain existing user data
        profilePic: croppedImageBase64, // Add or update profilePic
      })
    );
    setModalIsOpen(false);
  };

  return (
    <>
      <div>
        <input
          type="file"
          className="profileUpload"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
          content: {
            width: "400px",
            margin: "auto",
            padding: "20px",
            borderRadius: "10px",
          },
        }}
      >
        {image && (
          <>
            <div
              style={{
                width: "100%",
                height: "400px",
                position: "relative",
                marginBottom: "20px",
              }}
            >
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={1} // Square aspect ratio
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            <button
              onClick={getCroppedImage}
              className="btn btn-info w-100 mb-3"
            >
              Save
            </button>
          </>
        )}
        <button
          onClick={() => setModalIsOpen(false)}
          className="btn btn-info modalClose"
        >
          <span className="material-icons-round align-middle p-0">close</span>
        </button>
      </Modal>
    </>
  );
};

const cropImage = async (imageSrc, croppedAreaPixels) => {
  const image = new Image();
  image.src = imageSrc;
  await new Promise((resolve) => (image.onload = resolve));

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  // Set the target size for the cropped image (160px)
  const finalSize = 160;

  // Resize the canvas to the desired final size (160px x 160px)
  canvas.width = finalSize;
  canvas.height = finalSize;

  // Scale the cropped image to fit the 160px square
  ctx.drawImage(
    image,
    croppedAreaPixels.x,
    croppedAreaPixels.y,
    croppedAreaPixels.width,
    croppedAreaPixels.height,
    0,
    0,
    finalSize,
    finalSize
  );

  // Return the cropped and resized image in Base64 format
  return canvas.toDataURL("image/jpeg", 0.5);
};

export default ProfileImageCropper;
