import React from "react";
import { Button, TextInput } from "flowbite-react";

function Features({ selected = [], onChange }) {
  const handleFeatureChange = (index, value) => {
    const newFeatures = [...selected];
    newFeatures[index] = value;
    onChange(newFeatures);
  };

  const addFeature = () => {
    if (selected[selected.length - 1] !== "") {
      onChange([...selected, ""]);
    }
  };

  const removeFeature = (index) => {
    const newFeatures = [...selected];
    newFeatures.splice(index, 1);
    onChange(newFeatures);
  };


  return (
    <div>
      {selected.map((feature, index) => (
        <div key={index}>
          <TextInput
            type="text"
            value={feature}
            onChange={(e) => handleFeatureChange(index, e.target.value)}
            required
            className="my-3"
          />
          <button
            className="w-auto flex gap-1 py-2 px-4 bg-red-500 hover:bg-red-700"
            onClick={() => removeFeature(index)}
            type="button"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
            Delete
          </button>
        </div>
      ))}
      <button
        className="w-auto flex gap-1 py-2 px-4 bg-primary hover:bg-teal-500 my-4"
        onClick={addFeature}
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Add Feature
      </button>
      {/* <button
        className="w-auto flex gap-1 py-2 px-4 bg-primary hover:bg-teal-500 my-4"
        onClick={showFeatures}
        type="button"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
        Show
      </button> */}
    </div>
  );
}

export default Features;
