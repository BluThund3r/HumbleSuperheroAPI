import React, { useState } from "react";
import "../styles/TopBar.css";
import { Button, Modal } from "@mui/material";
import AddHeroModal from "./AddHeroModal";

function TopBar({ refreshHeroes }) {
  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  return (
    <div className="top-bar">
      <h1>Humble Heroes</h1>
      <Button
        variant="contained"
        style={{ backgroundColor: "#41a818" }}
        onClick={handleOpen}
      >
        Add Hero
      </Button>
      <Modal
        open={modalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddHeroModal
          closeModal={handleClose}
          refreshHeroes={refreshHeroes}
        ></AddHeroModal>
      </Modal>
    </div>
  );
}

export default TopBar;
