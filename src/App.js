import logo from "./logo.svg";
import "./App.css";
import styles from "./page.module.scss";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>

      {/* https://github.com/reactjs/react-tabs/tree/v4.2.1 */}
      <div className={styles.test}>{"content here"}</div>
    </div>
  );
}

export default App;
