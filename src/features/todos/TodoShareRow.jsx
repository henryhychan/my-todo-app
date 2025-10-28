import styled from "styled-components";
import Select from "../../ui/Select";
import Table from "../../ui/Table";
import {HiTrash} from "react-icons/hi2";
import ButtonIcon from "../../ui/ButtonIcon.jsx";
import {useDeleteTodoShare, useUpdateTodoShare} from "./useCrudTodoShare.js";


function TodoShareRow({share}) {
    const { updateTodoShare, isUpdating } = useUpdateTodoShare();
    const { deleteTodoShare } = useDeleteTodoShare();

    function handleChangeAccess(e) {
        e.preventDefault();
//        console.log(`Change access for ${share.id}: ${Number(e.target.value)}`);
        const data = {id: share.id, share_level: Number(e.target.value)};
//        console.log(`Update share access for ${JSON.stringify(data)}`)
        updateTodoShare(data);
    }

    function handleDeleteAccess() {
        console.log(`Delete access for ${share.id}`);
        deleteTodoShare(share.id);
    }

    return (<Table.Row>
        <div><p>{share.share_to_user}</p>
            <span>({share.share_to_email})</span></div>
        <div><Select options={[
                             {value: 0, label: "No Access"},
                             {value: 1, label: "View Only"},
                             {value: 2, label: "Edit"},
                             {value: 3, label: "All (Include Delete)"},]
                     }
                     value={share.share_level} onChange={handleChangeAccess}/></div>
        <div>
            <ButtonIcon onClick={handleDeleteAccess}>
                <HiTrash/>
            </ButtonIcon>
        </div>
        </Table.Row>
    );
}

export default TodoShareRow;
