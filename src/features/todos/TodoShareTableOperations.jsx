import TableOperations from "../../ui/TableOperations.jsx";
import Filter from "../../ui/Filter.jsx";
import SortBy from "../../ui/SortBy.jsx";
import Input from "../../ui/Input.jsx";
import Button from "../../ui/Button.jsx";
import { TODO_MODE_VIEW } from "../../utils/constants.js";

function TodoShareTableOperations({emailInput, handleAdd, handleInputChange}) {
    return (
        <TableOperations>
            <Input type="text" placeholder="Input Email to Share" value={emailInput} onChange={handleInputChange}/>
            <Button variation="primary" size="small" onClick={handleAdd}>Quick Add</Button>
        </TableOperations>
    );
}

export default TodoShareTableOperations;