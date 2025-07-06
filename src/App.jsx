// import viteLogo from '/vite.svg'
import './App.module.css';
import { Routes, Route, Link, Outlet } from 'react-router-dom';

const fetchProductList = () => [
	{ id: 1, name: 'Телевизор' },
	{ id: 2, name: 'Компьютер' },
	{ id: 3, name: 'Телефон' },
];

const MainPage = () => (
	<div>
		<h1>Главная страница контент</h1>
	</div>
);
const Catalog = () => (
	<div>
		<h3>Каталоги</h3>
		<ul>
			{fetchProductList().map(({ id, name }) => (
				<li key={id}>
					<Link to="product">{name}</Link>
				</li>
			))}
		</ul>
		<Outlet />
	</div>
);
const Product = () => (
	<div>
		<h2>Название продукта</h2>
		<p>Описание продукта</p>
	</div>
);
const Contacts = () => (
	<div>
		<h1>Наши контакты</h1>
	</div>
);

function App() {
	return (
		<>
			<div>
				<h3>Меню</h3>
				<ul>
					<li>
						<Link to="/">Главная</Link>
					</li>
					<li>
						<Link to="/catalog">Каталог</Link>
					</li>
					<li>
						<Link to="/contacts">Контакты</Link>
					</li>
				</ul>
			</div>
			<Routes>
				<Route path="/" element={<MainPage />} />
				<Route path="/catalog" element={<Catalog />}>
					<Route path="product" element={<Product />} />
				</Route>
				<Route path="/contacts" element={<Contacts />} />
			</Routes>
		</>
	);
}

export default App;
