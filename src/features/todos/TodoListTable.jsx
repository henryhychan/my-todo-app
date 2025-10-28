import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useFetchTodoList } from "./useCrudTodoList";
import TodoListRow from "./TodoListRow";
import Spinner from "../../ui/Spinner.jsx";
import Empty from "../../ui/Empty.jsx";
import { useMediaQuery, MediaQuery } from "react-responsive";

function TodoListTable() {
  const isDesktopOrLaptop = useMediaQuery({query: '(min-width: 1224px)'});
  const {isLoading, todo_list, error} = useFetchTodoList();

  if (isLoading) return <Spinner />;
  if (error) return <Empty resourceName="Todo List"/>;

  let columnStyle = isDesktopOrLaptop? "0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem": "2fr"
  return (
    <Menus>
      <Table columns={columnStyle}>
        <Table.Header>
          <MediaQuery minWidth={1224}>
            <div>Id</div>
          </MediaQuery>
          <div>Name</div>
          <MediaQuery minWidth={1224}>
          <div>Description</div>
          <div>Created On</div>
          <div></div>
          <div></div>
          </MediaQuery>
        </Table.Header>

        <Table.Body
          data={todo_list}
          render={(todo) => (
         <TodoListRow key={todo.list_id} todo={todo} />
          )}
        />
      </Table>
    </Menus>
  );
}

export default TodoListTable;
