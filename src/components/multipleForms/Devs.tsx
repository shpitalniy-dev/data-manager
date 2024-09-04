import React from "react";
import { useDataManager } from "../../hooks/use-data-manager";
import { generateId } from "../../utils/id";

interface IDev {
  id: string;
  name: string;
  seniority: string;
}

export const Devs = () => {
  const { state, onAddItem, onRemove, setPosition, handleChange } =
    useDataManager<IDev>({
      initialState: [],
      defaultItem: { name: "", seniority: "", id: generateId() },
    });

  return (
    <div>
      <h1>Devs</h1>
      <div>
        {state.map((item, index) => (
          <div key={item.id}>
            <div>
              <label>Name</label>
              <input
                type="text"
                value={item.name}
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
            </div>
            <div>
              <label>Seniority</label>
              <input
                type="text"
                value={item.seniority}
                onChange={(e) => handleChange(index, "seniority", e.target.value)}
              />
            </div>
            <div>
              <button onClick={() => setPosition(index, index - 1)}>
                Move up
              </button>
              <button onClick={() => setPosition(index, index + 1)}>
                Move down
              </button>
              <button onClick={() => onRemove(index)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <button onClick={onAddItem}>Add</button>
      </div>
    </div>
  );
};
