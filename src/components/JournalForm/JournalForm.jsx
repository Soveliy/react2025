import './JournalForm.css';
import Button from '../Button/Button';

function JournalForm() {

	return (
		<form className='journal-form'>
			<input type='text'/>
			<input type='date' />
			<input type='text' />
			<textarea name="post" id="" cols="30" rows="10"></textarea>
			<button>Сохр</button>
		</form>
	);
}

export default JournalForm;