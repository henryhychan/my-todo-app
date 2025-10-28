import styled from "styled-components";
import { useState } from "react";
import { format } from "date-fns";
import { HiPencil, HiTrash, HiSquare2Stack, HiMiniEye, HiMiniEyeSlash } from "react-icons/hi2";
import Table from "../../ui/Table";
import Row from "../../ui/Row";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import Tag from "../../ui/Tag";
import ConfirmDelete from "../../ui/ConfirmDelete";
import TodoItemForm from "./TodoItemForm";
import { useDeleteTodoItem, useEditTodoItem } from "./useCrudTodoItems";
import Checkbox from "../../ui/Checkbox.jsx";
import ButtonIcon from "../../ui/ButtonIcon.jsx";
import ViewDetail from "../../ui/ViewDetail.jsx";
import {TODO_MODE_ALL, TODO_MODE_VIEW} from "../../utils/constants.js";

const TodoItem = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";

`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

function TodoItemRow({ todo, tagColoursMap, accessLevel }) {
//    const [ show, setShow ] = useState(false);
    const { deleteTodoItem, isDeleting } = useDeleteTodoItem();
    const { editTodoItem, isEditing } = useEditTodoItem();

//    console.log(`Todo Item Row: ${JSON.stringify(todo)}`);
    const {
        id,
        created_at,
        name,
        description,
        tags,
        url,
        list_id,
        checked = false,
    } = todo;
    // Convert null/undefined/empty to false, only true is true
    const isChecked = checked === true;
    // console.log(`ToDo: ${id} ${name}=${checked}`);
    // console.log(`TagColourMap: ${JSON.stringify(tagColoursMap)}`);

//    function toggleView() {
//        setShow(()=> !show);
//    }

    function handleCheck() {
        // console.log(`ToDo: ${todo}`);
        editTodoItem({
            newTodoItem: {id: todo.id,
                name: todo.name,
                description: todo.description,
                url: todo.url,
                tags: todo.tags,
                list_id: todo.list_id,
                checked: !checked},
            id: id,
        });
    }

    function getTagColourClass(tag) {
        return tagColoursMap[tag.toUpperCase()] || "tag1";
    }

    return (
        <Table.Row>
            <div>
            <TodoItem>
                <Checkbox id={id} checked={isChecked} onChange={handleCheck} disabled={accessLevel <= TODO_MODE_VIEW}/>
            </TodoItem>
            </div>
            <div>
                <Row>
                    <TodoItem>
                        <div style={(isChecked ? {textDecoration: 'line-through', textDecorationStyle: 'double', color: 'grey'}: {})}>
                            <span>{name}</span>
                        </div>
                    </TodoItem>
                </Row>
                <Row>
                    <ViewDetail>
                        <span>{description}</span>
                    </ViewDetail>
                    <div>{(tags || []).map((t) => (
                        <Tag key={t} type={getTagColourClass(t.toUpperCase())}>{t}</Tag>)) }
                    </div>

                    <ViewDetail>
                        <span>
                            {url ? (
                                <a href={url} target="_blank" rel="noopener noreferrer">
                                    Link
                                </a>): ""}
                        </span>
                    </ViewDetail>

                    <ViewDetail>
                        <span>{format(new Date(created_at), "MMM dd yyyy")}</span>
                    </ViewDetail>
                </Row>

            </div>
            <div>
                <Modal>
                    {/*<ButtonIcon><HiMiniEye/></ButtonIcon>*/}
                    {accessLevel > TODO_MODE_VIEW && (
                        <>
                            <ButtonIcon>
                                <Modal.Open opens="edit-todo-item"><HiPencil/></Modal.Open>
                            </ButtonIcon>
                            {accessLevel >= TODO_MODE_ALL && (
                                <ButtonIcon>
                                    <Modal.Open opens="delete-todo-item"><HiTrash/></Modal.Open>
                                </ButtonIcon>
                            )}
                        </>
                    )}
                    <Modal.Window name="edit-todo-item">
                        <TodoItemForm todoItemToEdit={todo} />
                    </Modal.Window>

                    <Modal.Window name="delete-todo-item">
                        <ConfirmDelete
                            resourceName="todo item"
                            disabled={isDeleting}
                            onConfirm={() => deleteTodoItem(id)}
                        />
                    </Modal.Window>
                </Modal>
            </div>
        </Table.Row>
    );
}

export default TodoItemRow;