'use client'
import { deleteCar, findCars, saveAllCars } from '@/api/cars';
import { getLocal, translateColor } from '@/lib/fn';
import { Car } from "@/types/Car";
import { FC, useState } from "react";

interface AdminPanelProps {
	allCars: Car[];
}

const AdminPanel: FC<AdminPanelProps> = ({ allCars = [] }) => {


	const [cars, setCars] = useState<Car[]>(allCars);
	const [url, setUrl] = useState<string>('')
	const [btnText, setBtnText] = useState<string>('')
	const [token] = useState<string>(() => getLocal("token") || "");

	const [loading, setLoading] = useState(false);

	const extractCarIds = (htmlString: string): string[] => {
		const parser = new DOMParser();
		const doc = parser.parseFromString(htmlString, "text/html");

		console.log(doc);
		const carRows = doc.querySelectorAll("tr[data-impression]");

		return Array.from(carRows)
			.map(row => row.getAttribute("data-impression")?.split("|")[0] || "") // Заменяем undefined на ""
			.filter(id => id); // Фильтруем пустые строки
	};

	const handleSave = async () => {

		setLoading(true)
		try {

			const ids = extractCarIds(url);
			console.log(ids);


			const data = await saveAllCars(ids, token)
			// const data = await res.json();
			console.log(data);

			setUrl('')

		} catch (error) {
			alert(error)
		} finally {

			setLoading(false)
		}


	};
	const handleDelete = async (id: string) => {
		if (!token) {
			alert("Необходимо авторизоваться");
			return;
		}

		if (!confirm("Вы уверены, что хотите удалить?")) {
			return;
		}

		setLoading(true);
		try {
			await deleteCar(id, token);

			setCars((prevCars) => prevCars.filter((car) => car.id !== Number(id))); // Обновляем список после удаления
		} catch (error) {
			alert(error);
		} finally {
			setLoading(false);
		}
	};


	const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" }>({
		key: "year",
		direction: "asc",
	});

	const sortCars = (key: "year" | "price" | 'color') => {
		setSortConfig((prevConfig) => {
			const newDirection = prevConfig.key === key && prevConfig.direction === "asc" ? "desc" : "asc";

			setCars((prevCars) => {
				const sortedCars = [...prevCars].sort((a, b) => {
					const aValue = key === 'year' || key === 'price' ? a[key] : a[key].color;
					const bValue = key === 'year' || key === 'price' ? b[key] : b[key].color;
					return newDirection === "asc" ? Number(aValue) - Number(bValue) : Number(bValue) - Number(aValue);
				});

				return sortedCars;
			});

			return { key, direction: newDirection };
		});
	};

	const findNewCars = async () => {

		if (!token) {
			alert("Необходимо авторизоваться");
			return;
		}

		if (!confirm("Вы уверены, что хотите найти новые авто?")) {
			return;
		}

		setLoading(true);
		try {
			const res = await findCars(token);

			setBtnText('Найдено ' + res.length)
		} catch (error) {
			alert(error);
		} finally {
			setLoading(false);
		}
	}


	return (
		<>
			<section className="container-fluid p-3 overflow-hidden admin_panel">
				<div className=" d-flex align-items-center justify-content-between gap-3 mb-3">
					<button
						onClick={findNewCars}
						disabled={loading}
						className=' w-25 mx-auto'
					>
						{btnText ? btnText : 'Найти новые авто'}
					</button>
				</div>
				<div className=" d-flex align-items-center justify-content-between gap-3 mb-3">
					<input
						type='text'
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						// onKeyDown={handleEnterPress}
						disabled={loading}
						className=' w-75'
					/>
					<button
						onClick={handleSave}
						disabled={loading}
						className=' w-25'
					>
						Добавить URL
					</button>
				</div>
				<div className="table-responsive admin_panel overflow-y-auto">
					<table className="table position-relative table-striped">
						<thead className="table-dark admin_panel_header_table">
							<tr>
								<th scope="col">#</th>
								<th
									scope="col"
									onClick={() => sortCars("year")}
									style={{ cursor: 'pointer' }}
								>
									Год {sortConfig.key === "year" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
								</th>
								<th
									scope="col"
									onClick={() => sortCars("price")}
									style={{ cursor: 'pointer' }}
								>
									Цена {sortConfig.key === "price" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}
								</th>
								<th
									scope="col"
									onClick={() => sortCars("color")}
									style={{ cursor: 'pointer' }}
								>
									Цвет {sortConfig.key === "color" ? (sortConfig.direction === "asc" ? "↑" : "↓") : ""}</th>
								<th scope="col">Encar ID</th>
								<th scope="col">Марка</th>
								<th scope="col">Модель</th>
								<th scope="col">Поколение</th>
								<th scope="col">Фото</th>
								<th scope="col">Действия</th>
							</tr>
						</thead>
						<tbody className=' overflow-y-auto'>

							{cars.sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map((el, index) => (
								<tr key={el.id}>
									<th scope="row">{index + 1}</th>
									<td>{el.year}</td>
									<td>{el.price.toLocaleString('ru-RU')}</td>
									<td>{translateColor(el.color.color)}</td>
									<td>{el.encarId}</td>
									<td>{el.brand.brand}</td>
									<td>{el.model.model}</td>
									<td>{el.edition.edition}</td>
									<td>{el.photos.length}</td>
									<td
										onClick={() => handleDelete(`${el.id}`)}
										style={{ cursor: 'pointer' }}
										className='text-accent'
									>
										Удалить
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>
		</>
	);
};


export default AdminPanel;
