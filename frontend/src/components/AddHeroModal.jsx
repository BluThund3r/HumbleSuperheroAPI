import React, { useState } from "react";
import "../styles/AddHeroModal.css";
import { TextField, Button } from "@mui/material";
import { createHero } from "../services/heroService.js";
import toast from "react-hot-toast";

function AddHeroModal({ refreshHeroes, closeModal }) {
  const [name, setName] = useState("");
  const [superpower, setSuperpower] = useState("");
  const [humility, setHumility] = useState(0);

  const handleSubmit = async () => {
    console.log("Tried to submit with values", {
      name: name,
      superpower: superpower,
      humility: humility,
    });

    if (!name || !superpower) {
      toast.error("All fields are required");
      return;
    }

    if (name.length > 50) {
      toast.error("Name can't be longer than 50 characters");
      return;
    }

    if (superpower.length > 50) {
      toast.error("Superpower can't be longer than 50 characters");
      return;
    }

    if (humility < 1 || humility > 10) {
      toast.error("Humility must be a number from 1 through 10");
    }

    const response = await createHero(name, superpower, humility);
    if (response.status === 201) {
      toast.success("Hero added");
      closeModal();
      refreshHeroes();
    } else if (response.status === 500) {
      toast.error("Internal server error");
    }
  };

  return (
    <div className="add-hero-modal">
      <h2 style={{ fontSize: 30 }}>Add New Hero</h2>
      <div className="add-hero-form">
        <TextField
          required
          id="name"
          label="Name"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Superhero Name"
          color="white"
        />
        <TextField
          required
          id="superpower"
          label="Superpower"
          defaultValue={superpower}
          onChange={(e) => setSuperpower(e.target.value)}
          placeholder="Superpower"
        />
        <TextField
          required
          id="humility"
          label="Humility"
          defaultValue={humility}
          onChange={(e) => setHumility(parseInt(e.target.value))}
          type="number"
        />
      </div>
      <Button
        variant="contained"
        style={{ backgroundColor: "#41a818" }}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
}

export default AddHeroModal;
