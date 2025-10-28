import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Select from "../../ui/Select.jsx";
import Table from "../../ui/Table.jsx";
import Row from "../../ui/Row.jsx";
import {useAddTodoShare, useFetchTodoShare} from "./useCrudTodoShare.js";
import TodoShareRow from "./TodoShareRow.jsx";
import TodoShareTableOperations from "./TodoShareTableOperations.jsx";
import {useState} from "react";

function TodoShareForm({ list_id, onCloseModal }) {
    const [ emailInput, setEmailInput ] = useState();
    const { todo_share } = useFetchTodoShare(list_id);
    const { createTodoShare, isCreating } = useAddTodoShare(list_id);

    function handleAdd(e) {
        e.preventDefault();
        console.log(`${emailInput}`)

      try {
        createTodoShare({ email: emailInput }); // or createTodoShare(email)
        // success handled by onSuccess toast; optionally close modal
      } catch (err) {
        // error handled by onError toast, but you can handle extra logic here
        console.error(err);
      }
    }

     function handleInputChange(e) {
         e.preventDefault();
         const inputValue = e.target.value;
         setEmailInput(inputValue);
     }


    return (
        <Form type="modal">
            <TodoShareTableOperations emailInput={emailInput} handleAdd={handleAdd} handleInputChange={handleInputChange}/>
            <Table  columns="2.0fr 2.0fr 0.3fr">
                <Table.Header>
                    <div>Share To</div>
                    <div>Access</div>
                    <div></div>
                </Table.Header>
                    <Table.Body
                        data={todo_share}
                        render={(share) => <TodoShareRow key={share.id} share={share}/>}
                    />
            </Table>
        </Form>
    );
}

export default TodoShareForm;
