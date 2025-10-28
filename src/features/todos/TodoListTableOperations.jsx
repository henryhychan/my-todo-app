import TableOperations from "../../ui/TableOperations.jsx";
import Filter from "../../ui/Filter.jsx";
import SortBy from "../../ui/SortBy.jsx";
import Input from "../../ui/Input.jsx";
import Button from "../../ui/Button.jsx";

function TodoListTableOperations({listInput, handleAdd, handleChange}) {
    return (
        <TableOperations>
            <Input type="text" placeholder="Filter or Add" value={listInput} onChange={handleChange}/>
            <Button variation="primary" size="small" onClick={handleAdd}>Quick Add</Button>

        </TableOperations>
    );
}

export default TodoListTableOperations;