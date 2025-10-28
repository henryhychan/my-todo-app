import TableOperations from "../../ui/TableOperations.jsx";
import Filter from "../../ui/Filter.jsx";
import SortBy from "../../ui/SortBy.jsx";
import Input from "../../ui/Input.jsx";
import Button from "../../ui/Button.jsx";
import { TODO_MODE_VIEW } from "../../utils/constants.js";

function TodoItemTableOperations({itemInput, handleAdd, handleInputChange, accessLevel}) {
    return (
        <TableOperations>
            <Input type="text" placeholder="Filter or Add" value={itemInput} onChange={handleInputChange}/>
            { accessLevel > TODO_MODE_VIEW && (
                <Button variation="primary" size="small" onClick={handleAdd}>Quick Add</Button>
            )}

            <Filter
                filteredField="checked"
                options={[
                    { value: null, label: "All" },
                    { value: false, label: "Incomplete" },
                    { value: true, label: "Done" },
                ]}
            />

            {/* <SortBy
                options={[
                    { value: "startDate-desc", label: "Sort by date (recent first)" },
                    { value: "startDate-asc", label: "Sort by date (earlier first)" },
                    {
                        value: "totalPrice-desc",
                        label: "Price (High to Low)",
                    },
                    { value: "totalPrice-asc", label: "Price (Low to High)" },
                ]}
            /> */}
        </TableOperations>
    );
}

export default TodoItemTableOperations;