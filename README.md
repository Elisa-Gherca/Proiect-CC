# Agenda mea de prajituri

## Introducere
Odată cu dezvoltarea Cloud Computing-ului, aplicațiile pentru gestiunea datelor au devenit din ce în ce mai populare. Aceste aplicații permit utilizatorilor să stocheze date într-un server online, ceea ce face ca accesul la aceste date să fie mult mai ușor și mai flexibil. Utilizatorii pot accesa datele de oriunde, în orice moment, și pot colabora cu alți utilizatori, indiferent de locația lor. De asemenea, utilizatorii pot fi siguri că datele lor sunt stocate într-un mediu sigur și protejat, fiind astfel mai puțin vulnerabile la pierdere sau deteriorare.


## Descrierea aplicației
,,Agenda mea de prajituri” este o aplicatie web care permite organizarea si gestionarea colectiei de prajituri preferate. Cu ajutorul acestei aplicatii se pot adauga noi prajituri, se pot filtra in functie de categoria din care acestea fac parte, se pot cauta dupa denumire sau se pot sterge prajiturile din lista deja existenta, in functie de preferinte.

Aplicatia are o interfata simpla si intuitiva, cu optiuni usor de utilizat, care permit adaugarea de informatii despre prajituri, cum ar fi denumirea, categoria si pretul care poate fi per kilogram sau per bucata. 

Aplicatia ruleaza pe link-ul: 
https://gherca-elisa-proiect-cc-j36f-6ox2rhug0-elisa-gherca.vercel.app/


## Descriere API

Pentru implementarea aplicatiei am utilizat urmatoarele API-uri:
<br/>
* MongoDB Atlas este un serviciu cloud de baze de date administrat oferit de compania MongoDB. Acesta oferă o platformă scalabilă și ușor de utilizat pentru a depozita și gestiona datele, permițând dezvoltatorilor să se concentreze pe crearea de aplicații, fără a fi nevoie să se preocupe de gestionarea infrastructurii de baze de date. 
API-ul MongoDB Atlas permite dezvoltatorilor să creeze și să configureze baze de date și colecții, să adauge sau să șteargă utilizatori, să configureze politici de securitate, să gestioneze backup-urile și să monitorizeze performanța sistemului. Este posibilă accesarea API-ului prin intermediul unor biblioteci de limbaj de programare precum Node.js, Java, Python, Ruby, Go, și multe altele. 
 De asemenea, MongoDB Atlas oferă funcții avansate de securitate și de disponibilitate, asigurându-se că datele sunt protejate și accesibile oricând și oriunde. Aceste funcții includ criptarea datelor, autentificare cu factori multipli, monitorizare continuă a sistemului și întreținere preventivă a hardware-ului. 

* Vercel este o platformă cloud de dezvoltare și hosting care oferă suport pentru crearea și publicarea de aplicații web și mobile. API-ul Vercel oferă o interfață de programare a aplicațiilor (API) care permite utilizatorilor să acceseze și să gestioneze diferite aspecte ale proiectelor lor Vercel. 
API-ul Vercel poate fi folosit pentru a efectua operațiuni precum crearea și actualizarea de proiecte, setarea de variabile de mediu, gestionarea de deploiamente, adăugarea de colaboratori la proiecte, obținerea de informații despre domenii personalizate și multe altele. 
De asemenea, Vercel oferă și integrări cu alte servicii și instrumente populare de dezvoltare, cum ar fi GitHub, GitLab, Slack și Notion. Prin intermediul API-ului Vercel, dezvoltatorii pot automatiza sarcinile repetitive și pot integra funcționalitățile Vercel în propriile aplicații și fluxuri de lucru. API-ul este bine documentat și ușor de utilizat, fiind disponibil prin intermediul unor cereri HTTP simple și clare. <br/> 
 
    
Pe langa API-urile prezentate mai sus am utilizat si Postman. Aceasta aplicatie este folosita pentru testarea si dezvoltarea de API-uri (interfețe de programare a aplicațiilor). Este un instrument de dezvoltare și testare a API-urilor care permite dezvoltatorilor să trimită cereri HTTP sau HTTPS către un API și să primească răspunsuri în timp real. Postman poate fi utilizat pentru a testa o varietate de metode HTTP, inclusiv GET, POST, PUT și DELETE. În plus, Postman permite dezvoltatorilor sa gestioneze cererile, să creeze colecții de cereri, să automatizeze fluxurile de lucru și să genereze documentații pentru API-uri.<br/> 


In figura 1 se observa o cerere de tip GET care intoarce toate inregistrarile din baza de date MongoDB sub forma de JSON, iar in figura 2 am facut o cerere de tip DELETE; am adaugat anterior o inregistrare de test pe care am sters-o. Toate elementele de tip JSON sunt de forma:
-	id
-	denumirePrajitura
-	categoriePrajitura
-	pretPrajitura

![Figura 1 - cerere de tip GET](Figurile1%262.jpg)


## Fluxul de date
Aplicatia creata contine 4 fisiere principale de tip .jsx si anume: 
<br/>
•	MainPage

Funcția MainPage() din fișierul MainPage.jsx are un apel de tip GET către ruta '/api/records' pentru a colecta datele din baza de date, primind un JSON response ca răspuns, care este stocat într-un array de obiecte numit records. Aceste date sunt apoi afișate pe interfața aplicației folosind o mapare a fiecărui obiect din array-ul records și afișarea unui div pentru fiecare înregistrare. Fiecare înregistrare este identificată prin id-ul său, iar detaliile specifice sunt extrase din baza de date, cum ar fi denumirea prajiturii, categoria si pretul acesteia. 
De asemenea, la final se regasesc butoanele care conduc catre fiecare dintre celelalte pagini ale aplicatiei, iar pentru produse exista posibilitatea de stergere prin metoda deleteRecord prezentata mai jos <br/>

```
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
```
•	InsertPage

Pagina InsertPage.jsx este o pagină a aplicației care permite utilizatorului să adauge un nou înregistrare în baza de date prin intermediul unui formular. Pagina conține un component formular cu câmpuri precum denumire, categorie și preț ale prăjiturii. După completarea câmpurilor, utilizatorul poate apăsa butonul de "Salveaza" care declanșează un request de tip POST către endpoint-ul "/api/records" cu obiectul format din datele introduse de utilizator.
Dacă request-ul este realizat cu succes, pagina se actualizează și afișează toate înregistrările din baza de date inclusiv cea adăugată de către utilizator, prin intermediul unui apel de tip GET la endpoint-ul "/api/records".

 ```
 fetch("/api/records", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		})
  ```
•	Search

Funcția din pagina Search.jsx efectuează un apel GET către endpoint-ul '/api/records' și primește un JSON cu datele din baza de date, care sunt stocate în variabila state numită records prin intermediul funcției setRecords. Însă, spre deosebire de MainPage, Search are un parametru suplimentar numit searchText, care este actualizat în funcție de input-ul utilizatorului prin intermediul metodei setSearchText. Acesta este utilizat pentru a cauta si filtra înregistrările din baza de date, astfel încât numai înregistrările care conțin textul introdus vor fi afișate. 
Inregistrările filtrate sunt apoi mapate și afișate în interfața aplicației prin intermediul metodei map, în cadrul căreia se afișează detalii specifice din baza de date, cum ar fi denumirea, categoria și pretul. Aceste detalii sunt afișate într-o listă ordonată prin intermediul elementului li, și fiecare înregistrare are un key unic atribuit prin intermediul proprietății key. În acest fel, utilizatorul poate căuta și filtra înregistrările din baza de date în funcție de preferințele sale și poate vedea informații relevante despre acestea.

 ```
          <div className={"grid grid-cols-1 gap-4 mt-4 text-black"} style={{ paddingLeft: "15px" }}>
                <input type="text" value={searchText} onChange={handleSearchTextChange} style={{ border: "1px solid black" }} /> <ul>
                    {filteredRecords.map((record) => (
                        <li key={record.id}>{record.denumirePrajitura} -- {record.pretPrajitura} -- {record.categoriePrajitura}</li>
                    ))}
                </ul>
            </div>
```
•	Filter

Pe pagina Filter.jsx a acestei aplicații este afișată o interfață care permite utilizatorului să filtreze și să caute înregistrări din baza de date. La încărcarea paginii, se face un apel de tip GET către endpoint-ul '/api/records' și se preiau datele din baza de date. Acestea sunt stocate în variabila de stare setRecords, pentru a fi afișate în interfață.
Utilizatorul poate selecta un tip de prăjitură dintr-un meniu drop-down, iar prin intermediul funcției setFilterType, se setează variabila filterType cu valoarea selectată. Apoi, prin intermediul funcției setRecords și a metodei filter() din JavaScript, se filtrează înregistrările din baza de date și se actualizează starea variabilei setRecords cu înregistrările filtrate.
În interfața aplicației, înregistrările sunt afișate prin intermediul metodei map(), care creează o listă de elemente < li > pentru fiecare înregistrare. Se afișează detaliile înregistrării, cum ar fi denumirea, categoria și pretul prăjiturii. Aceste informații sunt preluate din obiectul înregistrării și afișate în interfață.


 ```
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
```

# Referințe
1. [Mongo DB Atlas] (https://www.mongodb.com/docs/atlas/api/data-api/)
2. [Vercel] (https://vercel.com/docs/concepts/get-started)
3. [Postman] (https://www.postman.com/company/about-postman/)
