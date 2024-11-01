import "./App.css";
import cx from "classnames";
import styles from "./page.module.scss";
// https://github.com/reactjs/react-tabs/tree/v4.2.1
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const TABS = [
  { name: "全部優惠", description: "全部優惠的列表" },
  { name: "買一送一", description: "This is a BOGO campaign" },
];

function App() {
  return (
    <div className="App">
      <Tabs>
        <TabList className={cx(styles.container, styles.tabList)}>
          {TABS.map((TAB) => (
            <Tab className={styles.tab}>{TAB.name}</Tab>
          ))}
        </TabList>
        {TABS.map((TAB) => (
          <TabPanel>{TAB.description}</TabPanel>
        ))}
      </Tabs>
    </div>
  );
}

export default App;
