import React from 'react';
import NewTask from './NewTask';

const Tasks = ({ tasks, onAdd, onDelete, selectedProjectId }) => {
	return (
		<section>
			<h2 className='text-2xl font-bold text-stone-700 mb-4'>Tasks</h2>
			<NewTask onAdd={onAdd} />
			{!tasks.find((task) => task.projectId === selectedProjectId) && (
				<p className='text-stone-800 my-4'>
					This project does not have any tasks yet.
				</p>
			)}
			{tasks.find((task) => task.projectId === selectedProjectId) && (
				<ul className='p-4 mt-8 rounded-md bg-stone-100'>
					{tasks.map((task) => {
						if (task.projectId === selectedProjectId) {
							return (
								<li className='flex justify-between my-4' key={task.id}>
									<span>{task.text}</span>
									<button
										onClick={() => onDelete(task.id)}
										className='text-stone-700 hover:text-red-500'>
										Clear
									</button>
								</li>
							);
						}
					})}
				</ul>
			)}
		</section>
	);
};

export default Tasks;
