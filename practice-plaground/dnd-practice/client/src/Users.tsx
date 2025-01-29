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


const UsersList = ({users,setUsers}:{users:any[],setUsers:any}  )=>{

    // Sensors for detecting mouse and touch dragging
    const sensors = useSensors(
        useSensor(MouseSensor),
        useSensor(TouchSensor)
    );

    // Handle the end of a drag operation
    const handleDragEnd = (event:any) => {
        const { active, over } = event;
        if (active.id !== over.id) {
            setUsers((users:any) => {
                const ind = users.findIndex((user:any) => user.index === active.id)

                const oldIndex = users.findIndex((user:any) => user.index === active.id+1);
                const newIndex = users.findIndex((user:any) => user.index === over.id+1);

                const payload =   {
                    currentId: users[ind]._id,
                    oldIndex,
                    newIndex
                }

                console.log(payload)

                return arrayMove(users, oldIndex, newIndex);
            });
        }
    };

    return (
        <div>
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={users.map((tab) => tab.index)} strategy={verticalListSortingStrategy}>
                    {
                        users.map((user:any)=>{
                            return (
                                <SingleUser key={user.index} user={user}/>
                            )
                        })
                    }
                </SortableContext>
            </DndContext>

        </div>
    )
}

const SingleUser = ({user}:{user:any})=>{
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: user.index });
    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        padding: 16,
        margin: '0 0 8px 0',
        backgroundColor: '#f4f4f4',
        borderRadius: '4px',
        cursor:'grabbing'
    };

    return (
        <div className='user' ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <h4>{user.index} </h4>
            <h4>{user.name} </h4>
            <h4>{user.email}</h4>
        </div>
    )
}

export default UsersList