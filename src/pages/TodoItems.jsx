import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Select from "../ui/Select";
import Spinner from "../ui/Spinner";
import Empty from "../ui/Empty";
import TodoItemTable from "../features/todos/TodoItemTable";
import { useUser } from "../features/authentication/useUser.js";
import { useFetchTodoList } from "../features/todos/useCrudTodoList.js";
import { useFetchTodoShare } from "../features/todos/useCrudTodoShare.js";
import { useFetchTodoItems, useCreateTodoItem, useFetchTodoShareItems } from "../features/todos/useCrudTodoItems.js";
import { useSearchParams, useParams } from "react-router";
import { useState, useMemo } from "react";
import TodoItemTableOperations from "../features/todos/TodoItemTableOperations.jsx";
import { TODO_MODE_NO_ACCESS, TODO_MODE_ALL } from "../utils/constants.js";
import {toast} from "react-hot-toast";

function TodoItems() {
    const { list_id } = useParams();
    const { user } = useUser();
    const [ searchParams ] = useSearchParams();
    // const { isLoading, todo_list = [], error} = useFetchTodoList(list_id);
    const { isLoading: isLoadingItems, todos_items } = useFetchTodoItems();
    const { isLoading, todo_list = [], error} = useFetchTodoList(list_id);

    const { todo_share } = useFetchTodoShare(list_id);
//    const { isLoading: isLoadingItems, todos_items } = useFetchTodoShareItems();
    const [ itemInput, setItemInput ] = useState("");
    const checked = searchParams.get("checked");

    const { createTodoItem } = useCreateTodoItem();

    function inTags(tag, value) {
        return tag.toLowerCase().startsWith(value);
    }

    // derive filtered list from source (todos_items) and inputs
    const itemsAfterCheckedFilter = useMemo(() => {
        if (!Array.isArray(todos_items)) return [];
        if (checked === null || checked === "all") return todos_items;
        if (checked === "true") return todos_items.filter(i => i.checked === true);
        if (checked === "false") return todos_items.filter(i => i.checked === null || i.checked === false);
        return todos_items;
    }, [todos_items, checked]);

    const filteredTodos = useMemo(() => {
        if (!itemInput || itemInput.trim() === "") return itemsAfterCheckedFilter;
        let q = itemInput.trim().toLowerCase();

        if (itemInput.startsWith("#") && itemInput.length > 2) {
            q = q.slice(1);
            return itemsAfterCheckedFilter.filter(todo => todo?.tags ? (todo.tags.some((tag) => tag.toLowerCase().includes(q))): false);
        }

        return itemsAfterCheckedFilter.filter(todo => (todo.name || "").toLowerCase().startsWith(q));
    }, [itemsAfterCheckedFilter, itemInput]);

    if (isLoading || isLoadingItems) return (<Spinner/>);

    if (!todo_list || todo_list.length === 0) return (
        <>
            <Empty resourceName="Todo List"/>
            <p>Create a new ToDo List</p>
        </>
    );
    // console.log(todo_list);
    // console.log(todo_list?.at(0)?.id);

     function handleInputChange(e) {
         e.preventDefault();
         const inputValue = e.target.value;
         setItemInput(inputValue);
     }

     function checkAccess() {
//        console.log(JSON.stringify(todo_list));
//        console.log(JSON.stringify(todo_share));
        if (todo_list.at(0).list_owner === user?.user.id) return TODO_MODE_ALL;
        if (!todo_share || todo_share.at(0).share_level > TODO_MODE_NO_ACCESS) return todo_share.at(0).share_level;

        return TODO_MODE_NO_ACCESS;
     }

     function handleAdd(e) {
         e.preventDefault();
//         console.log("Add button clicked");
//         console.log(`Input Changed: ${itemInput}`);
         // console.log(`Filtered Items: ${JSON.stringify(todo_items_filtered)}`);
         if (!itemInput || itemInput.trim() === "") {
             return;
         }

         if (filteredTodos.length > 0 &&
             (filteredTodos.filter((t) => t.name.trim() === itemInput.trim()).length > 0)) {
             toast.error("Item already exists.");
             return;
         }

         createTodoItem({
             name: itemInput,
             list_id: todo_list.at(0).list_id,
         });
         setItemInput(""); // clear input after creating
     }

     const access_level = checkAccess();


     return (
         <>
             <Row type="horizontal">
                 <Heading as="h1">{todo_list.at(0).name}</Heading>
             </Row>
             { access_level > TODO_MODE_NO_ACCESS ? (
             <>

                 <TodoItemTableOperations handleInputChange={handleInputChange} handleAdd={handleAdd} itemInput={itemInput} accessLevel={access_level}/>
                 <TodoItemTable todoItems={filteredTodos} accessLevel={access_level}/>
             </>
             ) : (
                 <Empty resourceName={`privilege on "${todo_list.at(0).name}"`}></Empty>
             )}
         </>
     );
 }

 export default TodoItems;
