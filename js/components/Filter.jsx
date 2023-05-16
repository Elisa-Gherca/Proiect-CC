// js/components/MainPage.jsx
import { useRouter } from "next/router";
import { React, useEffect, useState } from "react";

export default function MainPage() {
    const [records, setRecords] = useState([]);
    const [filterType, setFilterType] = useState('');

    const handleFilterChange = (event) => {
        setFilterType(event.target.value);
    };

    useEffect(() => {
        try {
            fetch('/api/records', {
                method: 'GET',
            })
                .then(response => response.json())
                .then(json => //setRecords(json.data));
                {
                    if (filterType) {
                        setRecords(json.data.filter(record => record.categoriePrajitura === filterType));
                    } else {
                        setRecords(json.data);
                    }
                });
        }
        catch (e) {
            console.log(e);
        }
    }, [filterType]);

    const router = useRouter();

    function handleClickFilter() {
        router.push('/');
    }

    return (
        <section className={"bg-white margin-auto"}>
            <div className={"container px-6 py-10 mx-auto"}>
                <h1 className={"w-[1000px] mx-auto text-center text-6xl font-bold text-pink-600"}>Filtreaza prajituri in functie de categorie</h1>
                <div className={"grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 text-black"}>
                    <span style={{ fontWeight: "bold" }}>Selecteaza tipul de prajituri:</span><br />
                </div>

                <div>
                </div>
            </div>
            <div className={"grid grid-cols-1 gap-4 mt-4 text-black"} style={{ width: "30%"}}>
                <select value={filterType} onChange={handleFilterChange}>
                    <option value="">All</option>
                    <option value="Prajituri clasice">Prajituri clasice</option>
                    <option value="Prajituri de ocazie">Prajituri de ocazie</option>
                    <option value="Prajituri speciale">Prajituri speciale</option>
                </select>
                
                <ul>
                    {records.map(record => (
                        <li key={record.id}>{record.denumirePrajitura} - {record.pretPrajitura} - {record.categoriePrajitura}</li>
                    ))}
                </ul>

                <div>
                    <button type="button"
                        onClick={handleClickFilter}
                        className="mt-4 text-gray-900 bg-gradient-to-r from-blue-200 via-pink-300 to-grey-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                        Mergi la pagina principala</button>
                </div>

            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <img src="/candyBar.jpg" style={{ width: '200vw', height: '100vh', objectFit: 'cover', objectPosition: 'center' }} />
            </div>
        </section>
    )
}