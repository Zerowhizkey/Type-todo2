import { useState, useEffect } from "react";
import {
	Title,
	Paper,
	TextInput,
	ActionIcon,
	useMantineTheme,
} from "@mantine/core";
import {
	IconArrowRight,
	IconArrowLeft,
	IconTrash,
	IconFileCheck,
} from "@tabler/icons";
import { v4 as uuidv4 } from "uuid";
type Todo = {
	id: string;
	task: string;
	completed: boolean;
};

const Todo = () => {
	const theme = useMantineTheme();
	const [todos, setTodos] = useState<Todo[]>(() => {
		const json = localStorage.getItem("todos");
		if (!json) return [];
		return JSON.parse(json);
	});
	const [task, setTask] = useState("");

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	const handleAdd = () => {
		setTodos((prev) => {
			return [
				...prev,
				{
					id: uuidv4(),
					task: task,
					completed: false,
				},
			];
		});
		setTask("");
	};

	const handleToggle = (id: string) => {
		const newTodos = todos.map((todo) => {
			if (todo.id === id) {
				return {
					...todo,
					completed: !todo.completed,
				};
			}
			return todo;
		});
		setTodos(newTodos);
	};

	const handleDelete = (id: string) => {
		const updatedTodo = todos.filter((todo) => todo.id !== id);
		setTodos(updatedTodo);
	};
	console.log(todos);
	return (
		<Paper className="container">
			<Title>Todos</Title>
			<TextInput
				value={task}
				onChange={(e) => setTask(e.target.value)}
				radius="xl"
				size="md"
				rightSection={
					<ActionIcon
						onClick={handleAdd}
						size={32}
						radius="xl"
						color={theme.primaryColor}
						variant="filled"
					>
						{theme.dir === "ltr" ? (
							<IconArrowRight size={18} stroke={1.5} />
						) : (
							<IconArrowLeft size={18} stroke={1.5} />
						)}
					</ActionIcon>
				}
				placeholder="add a task"
				rightSectionWidth={42}
			/>
			{todos.map((todo) => {
				return (
					<Paper className="todo-container">
						<div
							className="todo-item"
							key={todo.id}
							style={{
								textDecoration: todo.completed ? "line-through" : undefined,
								cursor: "pointer",
							}}
						>
							{todo.task}
							<div className="todo-inside">
								<IconFileCheck
									onClick={() => handleToggle(todo.id)}
									style={{
										fill: todo.completed ? "green" : undefined,
									}}
								/>
								<IconTrash onClick={() => handleDelete(todo.id)} />
							</div>
						</div>
					</Paper>
				);
			})}
		</Paper>
	);
};

export default Todo;
