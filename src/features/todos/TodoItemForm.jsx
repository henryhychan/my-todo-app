import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";
import { useCreateTodoItem, useEditTodoItem } from "./useCrudTodoItems.js";
import { useFetchTodoList } from "./useCrudTodoList.js";
import Select from "../../ui/Select.jsx";
import Checkbox from "../../ui/Checkbox.jsx";
import { convertTags } from "../../utils/helpers.js";

function TodoItemForm({ todoItemToEdit = {}, onCloseModal }) {
    const { id: editId, ...editValues } = todoItemToEdit;
    const isEditSession = Boolean(editId);

    const {list_id} = useParams();
    // const currentListId = searchParams.get("todoList");

    // Fetch todo lists for the dropdown
    const { todo_list = [] } = useFetchTodoList();

    const { register, handleSubmit, reset, getValues, formState  } = useForm({
        defaultValues: isEditSession
            ? editValues
            : {
                list_id: list_id || todo_list[0]?.list_id,
                name: "",
                description: "",
                tags: [],
                url: "",
                checked: false,
            },
    });
    const { errors } = formState;

    // Use the hook factory hooks
    const { createTodoItem, isCreating } = useCreateTodoItem();
    const { editTodoItem, isEditing } = useEditTodoItem();

    const isWorking = isCreating || isEditing;



    function onSubmit(data) {
//        console.log("Form submitted with data:", data);
        data = {
//            id: data.id,
            list_id: data.list_id,
            checked: data.checked,
            name: data.name,
            description: data.description,
            url: data.url,
            tags: convertTags(data.tags)
        };

        if (isEditSession) {
            editTodoItem(
                { newTodoItem: data, id: editId },
                {
                    onSuccess: () => {
                        reset();
                        onCloseModal?.();
                    },
                }
            );
        } else {
            createTodoItem(data, {
                onSuccess: () => {
                    reset();
                    onCloseModal?.();
                },
            });
        }
    }

    return (
        <Form
            onSubmit={handleSubmit(onSubmit)}
            type={onCloseModal ? "modal" : "regular"}
        >
            <FormRow label="Todo List" error={errors?.list_id?.message}>
                <Select
                    id="list_id"
                    disabled={isEditSession || isWorking}
                    options={todo_list.map((l) => ({
                        value: l.list_id,
                        label: l.name,
                    }))}
                    value={list_id}
                    {...register("list_id", { required: "Please select a list" })}
                />
            </FormRow>

            <FormRow label="Todo Name" error={errors?.name?.message}>
                <Input
                    type="text"
                    id="name"
                    disabled={isWorking}
                    {...register("name", { required: "This field is required" })}
                />
            </FormRow>

            <FormRow label="Description" error={errors?.description?.message}>
                <Textarea
                    id="description"
                    disabled={isWorking}
                    {...register("description")}
                />
            </FormRow>

            <FormRow label="Tags" error={errors?.tags?.message}>
                <Input
                    type="text"
                    id="tags"
                    placeholder="work, personal, urgent..."
                    disabled={isWorking}
                    {...register("tags")}
                />
            </FormRow>

            <FormRow label="URL" error={errors?.url?.message}>
                <Input
                    type="url"
                    id="url"
                    placeholder="https://..."
                    disabled={isWorking}
                    {...register("url", {
                        pattern: {
                            value: /^https?:\/\/.+/,
                            message: "Please enter a valid URL",
                        },
                    })}
                />
            </FormRow>

            <FormRow label="Completed">
                {/*<Input*/}
                {/*    type="checkbox"*/}
                {/*    id="checked"*/}
                {/*    disabled={isWorking}*/}
                {/*    {...register("checked")}*/}
                {/*/>*/}
                <Checkbox
//                    type="checkbox"
                    id="checked"
                    disabled={isWorking}
                    {...register("checked")}
                />

            </FormRow>

            <FormRow>
                <Button
                    size="medium"
                    variation="secondary"
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        onCloseModal?.();
                    }}
                >
                    Cancel
                </Button>

                {!isEditSession && (
                    <Button size="medium"
                            variation="secondary"
                            type="reset"
                            onClick={() => reset()}>
                        Reset
                    </Button>
                )}

                <Button size="medium" variation="primary" disabled={isWorking}>
                    {isEditSession ? "Update Todo" : "Create Todo"}
                </Button>
            </FormRow>
        </Form>
    );
}

export default TodoItemForm;
