//import Image from "next/image";
//import styles from "./page.module.css";

export default function HomePage() {
  return (
    <div>
      <h1>Home</h1>
      <p>Dimostrazione server actions, fetch, streaming</p>

      <div className="grid"></div>
        
        <div className="card">
          <h3>Caratteristiche</h3>
          <ul>
            <li>Server Actions</li>
            <li>Fetch</li>
            <li>Streaming</li>
          </ul>
        </div>

      <div className="card">
          <h3>Sezioni Pagina</h3>
          <ul>
            <li>Utenti: gestione con server actions</li>
            <li>Posts: ottimizazioni fetch</li>
            <li>Todos: CRUD con form</li>
            <li>Streaming: caricamento dati</li>
          </ul>
        </div>



    </div>
  );
}