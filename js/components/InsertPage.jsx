// js/components/MainPage.jsx
import { useRouter } from "next/router";

export default function InsertPage() {
	const insertRecord = async (e) => {
		e.preventDefault();

		const denumirePrajitura = document.getElementById('denumirePrajitura').value;
		const categoriePrajitura = document.getElementById('categoriePrajitura').value;
		const pretPrajitura = document.getElementById('pretPrajitura').value;
		const data = {
			denumirePrajitura: denumirePrajitura,
			categoriePrajitura: categoriePrajitura,
			pretPrajitura: pretPrajitura,
		};

		console.log(data);

		fetch("/api/records", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
			.then(() => {
				console.log("A records has been uploaded")
				document.getElementById('denumirePrajitura').value = '';
				document.getElementById('categoriePrajitura').value = '';
				document.getElementById('pretPrajitura').value = '';
			})
	}

	const router = useRouter();

	function handleClickFilter() {
		router.push('/');
	}

	return (
		<section className={"bg-white"}>
			<div className={"container px-6 py-10 mx-auto"}>
				<h1 className={"mx-auto text-center text-6xl font-bold text-pink-500"}>Adauga o noua prajitura in lista</h1>
				<p className={"w-[1000px] mx-auto text-center mt-4 text-3xl text-pink-500"}>~agenda cu cele mai gustoare prajituri~</p>

				<form>
					<div className="mb-6">
						<label htmlFor="denumirePrajitura" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Denumire: </label>
						<input type="text" id="denumirePrajitura"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500"
							placeholder="Denumirea prajiturii...:" style={{ fontStyle: 'italic' }} required />
					</div>

					<div className="mb-6">
						<label htmlFor="categoriePrajitura" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Categorie: </label>
						<input type="text" id="categoriePrajitura"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500"
							placeholder="Categoria prajiturii (prajituri clasice/de ocazie/speciale)...:" style={{ fontStyle: 'italic' }} required />
					</div>

					<div className="mb-6">
						<label htmlFor="pretPrajitura" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Pret: </label>
						<input type="text" id="pretPrajitura"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-pink-500 focus:border-pink-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-pink-500 dark:focus:border-pink-500"
							placeholder="Pretul prajiturii...:" style={{ fontStyle: 'italic' }} required />
					</div>

					<button type="Salveaza"
						onClick={insertRecord}
						className="mt-4 text-gray-900 bg-gradient-to-r from-blue-200 via-pink-300 to-grey-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">Salveaza
					</button>
					<div>
						<button type="button"
							onClick={handleClickFilter}
							className="mt-4 text-gray-900 bg-gradient-to-r from-blue-200 via-pink-300 to-grey-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
							Mergi la pagina principala</button>
					</div>

				</form>

			</div>
		</section>
	)
}