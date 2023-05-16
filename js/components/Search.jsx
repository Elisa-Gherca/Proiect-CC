// js/components/MainPage.jsx
import { useRouter } from "next/router";
import { React, useEffect, useState } from "react";

export default function MainPage() {
    const [records, setRecords] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        try {
            fetch('/api/records', {
                method: 'GET',
            })
                .then((response) => response.json())
                .then((json) => setRecords(json.data));
        } catch (e) {
            console.log(e);
        }
    }, []);

    const handleSearchTextChange = (event) => {
        setSearchText(event.target.value);
    };

    const filteredRecords = records.filter((record) =>
        record.denumirePrajitura.toLowerCase().includes(searchText.toLowerCase())
    );

    const router = useRouter();

    function handleClickFilter() {
        router.push('/');
    }

    return (
        <section className={"bg-white"}>
            <div className={"container px-6 py-10 mx-auto"}>
                <h1 className={"mx-auto text-center text-6xl font-bold text-pink-600"}>Aici poti cauta prajitura dorita dupa denumire</h1>
                <div className={"grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 sm:grid-cols-2 xl:grid-cols-4 lg:grid-cols-3 text-black"}>
                    <span style={{ fontWeight: "bold" }}>Denumirea prajiturii:</span> <br />
                </div>
                <div>
                </div>
            </div>
            <div className={"grid grid-cols-1 gap-4 mt-4 text-black"} style={{ paddingLeft: "15px" }}>
                <input type="text" value={searchText} onChange={handleSearchTextChange} style={{ border: "1px solid black" }} /> <ul>
                    {filteredRecords.map((record) => (
                        <li key={record.id}>{record.denumirePrajitura} -- {record.pretPrajitura} -- {record.categoriePrajitura}</li>
                    ))}
                </ul>
            </div>
            <div>
                <button type="button"
                    onClick={handleClickFilter}
                    className="mt-4 text-gray-900 bg-gradient-to-r from-blue-200 via-pink-300 to-grey-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2">
                    Mergi la pagina principala</button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '2vh' }}>
                <img src="/cakes.jpg" style={{ width: '200vw', height: '120vh', objectFit: 'cover', objectPosition: 'center' }} />
            </div>
        </section>
    )
}