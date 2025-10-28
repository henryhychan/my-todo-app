import Heading from "../ui/Heading";
import Row from "../ui/Row";
import TodoListTable from "../features/todos/TodoListTable";
import TodoListTableOperations from "../features/todos/TodoListTableOperations";
import { useState } from "react";
import { useCreateTodoList } from "../features/todos/useCrudTodoList.js";
import { useUser } from "../features/authentication/useUser.js";

function TodoList() {

    const [ listInput, setListInput] = useState("");
    const { createTodoList } = useCreateTodoList();
    const { user } = useUser();


//    console.log(`Data User ID: ${user}`);

    function handleChange(e) {
        e.preventDefault();
        const inputValue = e.target.value;
        setListInput(inputValue);
    }

    function handleAdd(e) {
        e.preventDefault();
//        console.log("Add button clicked");
//        console.log(`Input Changed: ${listInput}`);
        // console.log(`Filtered Items: ${JSON.stringify(todo_items_filtered)}`);
        if (!listInput || listInput.trim() === "") {
            return;
        }
        createTodoList({
            name: listInput.trim(),
            description: "",
            user_id: user.user.id,
        });
        setListInput(""); // clear input after creating
    }

    return (
        <>
            <Row type="horizontal">
                <Heading as="h1">All TodoList</Heading>
            </Row>
            <TodoListTableOperations listInput={listInput} handleAdd={handleAdd} handleChange={handleChange}/>
            <TodoListTable />

        </>
    );
}

export default TodoList;
