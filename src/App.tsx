import "./App.css";
import { SegmentedToggle } from "./components/Toggle";
import {
	ColorSchemeProvider,
	MantineProvider,
	Paper,
	ColorScheme,
} from "@mantine/core";
import { useLocalStorage, useHotkeys } from "@mantine/hooks";
import Todo from "./components/Todo";

function App() {
	const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
		key: "mantine-color-scheme",
		defaultValue: "light",
	});
	const toggleColorScheme = (value?: ColorScheme) =>
		setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));
	useHotkeys([["mod+J", () => toggleColorScheme()]]);
	return (
		<div className="App">
			<ColorSchemeProvider
				colorScheme={colorScheme}
				toggleColorScheme={toggleColorScheme}
			>
				<MantineProvider
					theme={{ colorScheme }}
					withGlobalStyles
					withNormalizeCSS
				>
					<Paper radius={0} style={{ minHeight: "100vh", padding: "0" }}>
						<SegmentedToggle />
						<Todo />
					</Paper>
				</MantineProvider>
			</ColorSchemeProvider>
		</div>
	);
}

export default App;
