import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import { useFetchTodoItems, useFetchTodoItemTags } from "./useCrudTodoItems";
import TodoItemRow from "./TodoItemRow";
import TodoItemForm from "./TodoItemForm";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import {TODO_MODE_VIEW} from "../../utils/constants.js";

function TodoItemTable({todoItems, accessLevel}) {
    // const { isLoading, todos_items, error } = useFetchTodoItems();
    const { tags = [] } = useFetchTodoItemTags();
    const tagsColourMap = {};

    tags.forEach((tagObj, index) => {
        const colourIndex = index % 10; // Assuming 5 different colours
        tagsColourMap[tagObj.toUpperCase()] = `tag${colourIndex + 1}`;
    });

    // console.log(`Tags Colour Map: ${JSON.stringify(tagsColourMap)}`);

    // if (isLoading) return <Spinner />;
    // if (error) return <p>Error loading todo items: {error.message}</p>;
    if (!todoItems || todoItems.length === 0) {
        return <Empty resourceName="Todo Items" />;
    }

    return (
        <>
            <Menus>
                <Table columns="0.3fr 4.2fr 3.2rem">
                    <Table.Header>
                        <div>#</div>
                        <div>Task/Item</div>
                        <div></div>
                    </Table.Header>

                    <Table.Body
                        data={todoItems}
                        render={(todo) => <TodoItemRow key={todo.id} todo={todo} tagColoursMap={tagsColourMap} accessLevel={accessLevel}/>}
                    />
                </Table>
            </Menus>

            {/* Add button for creating new todo items */}
            <Modal>
                { accessLevel > TODO_MODE_VIEW && (
                    <Modal.Open opens="todo-item-form">
                        <Button variation="primary">Add New Todo Item</Button>
                    </Modal.Open>
                )}
                <Modal.Window name="todo-item-form">
                    <TodoItemForm />
                </Modal.Window>
            </Modal>
        </>
    );
}

export default TodoItemTable;