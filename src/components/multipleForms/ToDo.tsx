import React from "react";
import { useDataManager } from "../../hooks/use-data-manager";
import { generateId } from "../../utils/id";

interface IToDo {
  id: string;
  name: string;
}

export const ToDo = () => {
  const { state, onAddItem, onRemove, setPosition, handleChange } =
    useDataManager<IToDo>({
      initialState: [],
      defaultItem: { name: "", id: generateId() },
    });

  return (
    <div>
      <h1>ToDo</h1>
      <div>
        {state.map((item, index) => (
          <div key={item.id}>
            <input
              type="text"
              value={item.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
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
