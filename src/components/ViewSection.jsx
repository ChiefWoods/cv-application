import { useState, useEffect } from "react";
import ViewSectionEntry from "./ViewSectionEntry";
import Button from "./Button";
import FormTab from "./FormTab";
import uniqid from "uniqid";

export default function ViewSection({
  FormControls,
  entries,
  setCurrentId,
  appendNewEntry,
}) {
  const [editing, setEditing] = useState(false);

  function handleDelete() {
    setEditing(false);
  }

  function handleSave() {
    setEditing(false);
  }

  function displayForm(id = null) {
    if (id) {
      setCurrentId(id);
    } else {
      const newId = uniqid();
      appendNewEntry(newId);
      setCurrentId(newId);
    }

    setEditing(true);
  }

  return editing ? (
    <>
      <FormControls />
      <FormTab
        onDelete={handleDelete}
        onCancel={() => setEditing(false)}
        onSave={handleSave}
      />
    </>
  ) : (
    <>
      {entries.map(({ id, name }) => (
        <ViewSectionEntry
          key={id}
          heading={name}
          onClick={() => displayForm(id)}
        />
      ))}
      <Button
        text="Add"
        path={`<path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />`}
        onClick={displayForm}
        btnStyle="btn bg-gray-300 hover:bg-gray-400"
        svgStyle="size-7 fill-white"
        textStyle="whitespace-nowrap text-xl font-medium text-white"
      />
    </>
  );
}
