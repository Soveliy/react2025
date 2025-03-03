import { useState } from 'react';
import './App.css';
import Button from './components/Button/Button';
import CardButton from './components/CardButton/CardButton';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalItem from './components/JournalItem/JournalItem';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';


function App() {

	const INITIAL_DATA = [
		// {
		// 	title: "Подготовка к обновлению курсов",
		// 	text:'Тестовое описание',
		// 	date: new Date(),
		// 	id:1,
		// },
		// {
		// 	title: "Тест 2",
		// 	text:'ещё одно описание',
		// 	date: new Date(),
		// 	id:2,
		// },

	];
	const [items, setItems] = useState(INITIAL_DATA);
	const addItem = (item) => {
		setItems(oldItems =>
			[...oldItems, {
				title:item.title,
				text:item.text,
				date: new Date(item.date),
				id: Math.max(...oldItems.map(i => i.id)) + 1
			}]
		)

	}
	const sortByDate = (a,b) => {
		if (a.date < b.date){
			return 1;
		} else {
			return -1;
		}
	}
	let list = <p>Добавьте элемент</p>

	if (items.length > 0){
		list = items.sort(sortByDate).map(el => (
			<CardButton key={el.id}>
				<JournalItem name={el.title} date={el.date} text={el.text}/>
			</CardButton>
		))
	}

	return (
		<div className='app'>
			<LeftPanel>
				<Header/>
				<JournalAddButton/>
				<JournalList>
					{/* {
						items.length === 0 ? <p>Добавьте элемент</p> : items.sort(sortByDate).map(el => (
							<CardButton key={el.id}>
								<JournalItem name={el.title} date={el.date} text={el.text}/>
							</CardButton>
						))
					} */}
					{list}

				</JournalList>
			</LeftPanel>
			<Body>
				<JournalForm onSubmit={addItem}/>
			</Body>
		</div>
	);
}

export default App;
