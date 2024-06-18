import { useState } from "react";
import ViewSectionItem from "./ViewSectionItem";
import Button from "./Button";
import uniqid from "uniqid";

export default function ViewSection({
  entries,
  setCurrentId,
  setFormData,
  list,
  listFormat,
  isEditing,
  setIsEditing,
  children,
}) {
  function displayForm(list, id) {
    setIsEditing(true);
    setCurrentId(id);
    setFormData(() => {
      const item = list.find((item) => item.id === id);

      if (item) {
        return item;
      } else {
        return {
          ...listFormat,
          id,
        };
      }
    });
  }

  return isEditing ? (
    <>{children}</>
  ) : (
    <>
      {entries.map(({ id, name }) => (
        <ViewSectionItem
          key={id}
          heading={name}
          onClick={() => displayForm(list, id)}
        />
      ))}
      <Button
        text="Add"
        path={<path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />}
        onClick={() => displayForm(list, uniqid())}
        btnStyle="btn bg-gray-300 hover:bg-gray-400"
        svgStyle="size-7 fill-white"
        textStyle="whitespace-nowrap text-xl font-medium text-white"
      />
    </>
  );
}
