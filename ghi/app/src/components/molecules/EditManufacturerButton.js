import { useState } from "react";
import { createPortal } from "react-dom";
import FormInput from "../atoms/FormInput";
import Button from "../atoms/Button";
import EditManufacturerForm from "../atoms/EditManufacturerForm";

export default function EditManufacturerButton(id) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button text="Edit" onClick={() => setShowModal(true)} />
      {showModal &&
        createPortal(
          <EditManufacturerForm id={id} onClose={() => setShowModal(false)} />,
          document.body
        )}
    </>
  );
}
