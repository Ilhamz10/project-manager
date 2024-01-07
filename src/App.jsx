import NewProject from './components/NewProject';
import ProjectsSidebar from './components/ProjectsSidebar';
import NoProjectSelected from './components/NoProjectSelected';
import { useState } from 'react';
import SelectedProject from './components/SelectedProject';

function App() {
	const [projectsState, setProjectsState] = useState({
		selectedProjectId: undefined,
		projects: [],
		tasks: [],
	});

	function handleAddTask(text) {
		setProjectsState((prev) => {
			const taskId = Date.now();
			const newTask = {
				id: taskId,
				text: text,
				projectId: prev.selectedProjectId,
			};

			return {
				...prev,
				tasks: [newTask, ...prev.tasks],
			};
		});
	}

	function handleDeleteTask(id) {
		setProjectsState((prev) => {
			return {
				...prev,
				tasks: prev.tasks.filter((task) => task.id !== id),
			};
		});
	}

	function handleSelectProject(id) {
		setProjectsState((prev) => {
			return {
				...prev,
				selectedProjectId: id,
			};
		});
	}

	function handleStartAddProject() {
		setProjectsState((prev) => {
			return {
				...prev,
				selectedProjectId: null,
			};
		});
	}

	function handleCancelAddProject() {
		setProjectsState((prev) => {
			return {
				...prev,
				selectedProjectId: undefined,
			};
		});
	}

	function handleAddProject(projectData) {
		setProjectsState((prev) => {
			const projectId = Date.now();
			const newProject = {
				...projectData,
				id: projectId,
			};

			return {
				...prev,
				selectedProjectId: undefined,
				projects: [...prev.projects, newProject],
			};
		});
	}

	function handleDeleteProject() {
		setProjectsState((prev) => {
			return {
				...prev,
				selectedProjectId: undefined,
				projects: prev.projects.filter(
					(project) => project.id !== prev.selectedProjectId
				),
			};
		});
	}

	const selectedProject = projectsState.projects.find(
		(project) => project.id === projectsState.selectedProjectId
	);

	let content = (
		<SelectedProject
			project={selectedProject}
			onDelete={handleDeleteProject}
			onAddTask={handleAddTask}
			onDeleteTask={handleDeleteTask}
			tasks={projectsState.tasks}
			selectedProjectId={projectsState.selectedProjectId}
		/>
	);

	if (projectsState.selectedProjectId === null) {
		content = (
			<NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
		);
	} else if (projectsState.selectedProjectId === undefined) {
		content = <NoProjectSelected onStartAddProject={handleStartAddProject} />;
	}

	return (
		<main className='h-screen my-8 flex gap-8'>
			<ProjectsSidebar
				onStartAddProject={handleStartAddProject}
				projects={projectsState.projects}
				onSelectProject={handleSelectProject}
				selectedProjectId={projectsState.selectedProjectId}
			/>
			{content}
		</main>
	);
}

export default App;
