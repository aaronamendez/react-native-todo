import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import {
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Keyboard,
	Touchable,
	ScrollView,
} from 'react-native';
import { Task } from './components/Task';

export default function App() {
	const [task, setTask] = useState();
	const [taskItems, setTaskItems] = useState([]);

	const addTask = () => {
		Keyboard.dismiss();
		setTaskItems([...taskItems, task]);
		setTask(null);
	};

	const completeTask = (index) => {
		let itemsCopy = [...taskItems];
		itemsCopy.splice(index, 1);
		setTaskItems(itemsCopy);
	};

	return (
		<View style={styles.container}>
			{/* Today's Tasks */}
			<View style={styles.tasksWrapper}>
				<Text style={styles.sectionTitle}>Today's Tasks</Text>
				<ScrollView style={styles.items}>
					{/* This is where the tasks will go! */}
					{taskItems.map((item, index) => {
						return (
							<TouchableOpacity
								key={index}
								onPress={() => completeTask(index)}
							>
								<Task text={item} />
							</TouchableOpacity>
						);
					})}
				</ScrollView>
			</View>
			{/* Write a Task */}
			<KeyboardAvoidingView
				behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
				style={styles.writeTaskWrapper}
			>
				<TextInput
					style={styles.input}
					placeholder={'Write a task'}
					onChangeText={(text) => setTask(text)}
					value={task}
				/>
				<TouchableOpacity onPress={() => addTask()}>
					<View style={styles.addWrapper}>
						<Text style={styles.addText}>+</Text>
					</View>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#E8EAED',
	},
	tasksWrapper: {
		paddingTop: 80,
		paddingHorizontal: 20,
		maxHeight: '80%',
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: 'bold',
	},
	items: {
		marginTop: 30,
	},
	writeTaskWrapper: {
		position: 'absolute',
		bottom: 60,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	input: {
		paddingVertical: 15,
		paddingHorizontal: 15,
		backgroundColor: '#FFF',
		borderRadius: 60,
		borderColor: '#C0C0C0',
		borderWidth: 1,
		width: 250,
	},
	addWrapper: {
		width: 60,
		height: 60,
		backgroundColor: '#22e07b',
		borderRadius: 60,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#C0C0C0',
		borderWidth: 1,
	},
	addText: {
		color: '#FFF',
	},
});
