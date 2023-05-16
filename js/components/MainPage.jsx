// js/components/MainPage.jsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function MainPage() {
	const [records, setRecords] = useState([]);

	useEffect(() => {
		try {
			fetch('/api/records', {
				method: 'GET',
			})
				.then(response => response.json())
				.then(json => setRecords(json.data));
		}
		catch (e) {
			console.log(e);
		}
	}, []);

	const deleteRecord = async (e) => {
		e.preventDefault();

		console.log(e.target.id);
		const id = e.target.id;

		try {
			fetch(`/api/records?id=${id}`, {
				method: 'DELETE',
			})
				.then(response => response.json())
				.then(json => {
					setRecords(records.filter(record => record._id !== id));
				});
		}
		catch (e) {
			console.log(e);
		}
	}

	const router = useRouter();

	function handleClickFilter() {
		router.push('/filter');
	}

	function handleClickSearch() {
		router.push('/search');
	}

	function handleClickInsert() {
		router.push('/insert');
	}

	console.log(records);

	return (
		<section className={"bg-white"}>
			<div className={"container px-6 py-10 mx-auto"}>
				<h1 className={"w-[500px] mx-auto text-center text-6xl font-bold text-pink-500"}>Agenda mea de prajituri</h1>
				<div className={"grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3"}>
					{
						records.map(record => (
							<div key={record._id}
								className={"max-w-sm p-6 bg-white border border-black-200 rounded-lg shadow "}
							>
								<h3 className={"mb-2 text-xl font-bold text-pink-500"} style={{ textTransform: 'uppercase', textAlign: 'center' }}>{record.denumirePrajitura} </h3>
								<img src={"/candy-bar.jpg"} className={"w-full h-64 object-cover object-center"} />
								<p className={"font-bold "}>{record.categoriePrajitura}</p>
								<p className={"font-normal "}>{record.pretPrajitura}</p>

								<button type="button"
									onClick={deleteRecord}
									id={record._id}
									className="mt-4 text-gray-900 bg-gradient-to-r from-pink-200 via-pink-300 to-white-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
									Sterge prajitura din lista!
								</button>
							</div>
						))
					}
				</div>
				<div >
					<button type="button"
						onClick={handleClickFilter}
						className="mt-4 text-gray-900 bg-gradient-to-r from-blue-200 via-pink-300 to-grey-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
						Mergi la pagina de filtrare</button>

					<button type="button"
						onClick={handleClickSearch}
						className="mt-4 text-gray-900 bg-gradient-to-r from-blue-200 via-pink-300 to-grey-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
						Mergi la pagina de cautare</button>

					<button type="button"
						onClick={handleClickInsert}
						className="mt-4 text-gray-900 bg-gradient-to-r from-blue-200 via-pink-300 to-grey-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
						Mergi la pagina de inserare prajitura</button>
				</div>

			</div>
		</section>
	)
}