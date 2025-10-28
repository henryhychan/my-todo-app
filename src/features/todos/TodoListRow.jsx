import styled from "styled-components";
import Table from "../../ui/Table";
import Modal from "../../ui/Modal";
import ButtonIcon from "../../ui/ButtonIcon";
import { useMediaQuery, MediaQuery } from 'react-responsive';
import {NavLink} from "react-router-dom";
import { HiMiniUsers } from "react-icons/hi2";

import TodoShareForm from "./TodoShareForm";
import { useUser } from "../authentication/useUser.js";

const TodoList = styled.div`
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

const Amount = styled.div`
    font-family: "Sono";
    font-weight: 500;
`;

function TodoListRow({todo: {
                         list_id: id,
                         created_at,
                         name,
                         description,
                         list_owner,
                     },
                     }) {
      const { user } = useUser();


    return (
        <Table.Row>

            <MediaQuery minWidth={1224}>
                <TodoList>{id}</TodoList>
            </MediaQuery>
            <div><NavLink to={`/todo-list/${id}`}>{name}</NavLink></div>
            <MediaQuery minWidth={1224}>
            <div>{description}</div>
            </MediaQuery>
            {
                (user?.user.id === list_owner) && (
                <Modal>
                    <div><ButtonIcon>
                        <Modal.Open opens="edit-todo-share"><HiMiniUsers/></Modal.Open>
                    </ButtonIcon></div>

                    <Modal.Window name="edit-todo-share">
                        <TodoShareForm list_id={id} />
                    </Modal.Window>
                </Modal>
                )
            }
        </Table.Row>
    );
}

export default TodoListRow;
