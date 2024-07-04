import { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Drag = () => {
  const defaultList = ['A', 'B', 'C', 'D', 'E'];
  const [itemList, setItemList] = useState(defaultList);

  // Function to update list on drop
  const handleDrop = (droppedItem) => {
    // Ignore drop outside droppable container
    if (!droppedItem.destination) return;
    const updatedList = [...itemList];
    // Remove dragged item
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    // Add dropped item
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    // Update State
    setItemList(updatedList);
  };

  return (
    <div className="App">
      <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId="list-container">
          {(provided) => (
            <div className="list-container" {...provided.droppableProps} ref={provided.innerRef}>
              {itemList.map((item, index) => (
                <Draggable key={item} draggableId={item} index={index}>
                  {(providedd) => (
                    <div
                      className="item-container"
                      ref={providedd.innerRef}
                      {...providedd.dragHandleProps}
                      {...providedd.draggableProps}
                    >
                      {item}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Drag;
