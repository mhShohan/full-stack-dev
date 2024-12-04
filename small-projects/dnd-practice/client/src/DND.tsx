import  { useState } from 'react';
import {
    DndContext,
    closestCenter,
    useSensor,
    useSensors,
    MouseSensor,
    TouchSensor,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const StartFromScratchTabs = () => {
    const [tabs, setTabs] = useState([
        { index: 0, name: 'Introduction', tab_type: 'introduction', isSelected: true, desc: 'Set the stage for your project...' },
        { index: 1, name: 'Survey', tab_type: 'quantitative', isSelected: true, desc: 'Share details such as project objectives...' },
        { index: 2, name: 'Interview', tab_type: 'quantitative', isSelected: true, desc: 'Set the stage for your project...' },
        { index: 3, name: 'Personas', tab_type: 'persona', isSelected: true, desc: 'Project objectives, methodology...' },
        { index: 4, name: 'Strategy & Recommendations', tab_type: 'action_plan', isSelected: true, desc: 'Key takeaways and insights...' },
    ]);

    // Sensors for detecting mouse and touch dragging
    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor)
    );

    // Handle the end of a drag operation
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setTabs((items) => {
                const oldIndex = items.findIndex((tab) => tab.index === active.id);
                const newIndex = items.findIndex((tab) => tab.index === over.id);
                return arrayMove(items, oldIndex, newIndex);
            });
        }
    };

    return (
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={tabs.map((tab) => tab.index)} strategy={verticalListSortingStrategy}>
                <div>
                    {tabs.map((tab) => (
                        <SortableTab key={tab.index} tab={tab} />
                    ))}
                </div>
            </SortableContext>
        </DndContext>
    );
};

// SortableTab Component
const SortableTab = ({ tab }) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: tab.index });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: 16,
        margin: '0 0 8px 0',
        backgroundColor: '#f4f4f4',
        borderRadius: '4px',
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <h4>{tab.name}</h4>
            <p>{tab.desc}</p>
        </div>
    );
};

export default StartFromScratchTabs;
