import './JournalItem.css';

function JournalItem({name, date, text}) {
	const formatedDate = new Intl.DateTimeFormat('ru-Ru').format(date);


	return (
		<>
			<div className="journal-item__header">{name}</div>
			<div className="journal-item__body">
				<div className="journal-item__date">{formatedDate}</div>
				<div className="journal-item__text">{text}</div>
			</div>
		</>
	);
}

export default JournalItem;