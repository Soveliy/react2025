import './JournalForm.css';
import Button from '../Button/Button';
import { useState } from 'react';

function JournalForm({onSubmit}) {
	const [inputData, setInputData] = useState('');
	
	const printInfo = (e) => {
		console.log(e);
		setInputData(e.target.value);
	}

	const addJournalItem = (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);
		const formProps = Object.fromEntries(formData);
		onSubmit(formProps);

	}
	

	return (
		<form className='journal-form' onSubmit={addJournalItem}>
			{/* <input value={inputData} onChange={printInfo} type='text'/> */}
			<input name='title' type='text' />
			<input name='date' type='date' />
			{/* <input type='text' /> */}
			<textarea name="text" id="" cols="30" rows="10"></textarea>
			<button>Сохр</button>
		</form>
	);
}

export default JournalForm;