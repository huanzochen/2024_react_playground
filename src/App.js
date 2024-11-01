import "./App.css";
import { useState } from "react";
import cx from "classnames";
import styles from "./page.module.scss";
// https://github.com/reactjs/react-tabs/tree/v4.2.1
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

const TABS = [
  { id: 0, name: "全部優惠", description: "全部優惠的列表" },
  { id: 1, name: "買一送一", description: "This is a BOGO campaign" },
  { id: 2, name: "點數回饋", description: "This is a point  back offer" },
];

function App() {
  const [tabId, setTabId] = useState(1);

  const selectTabs = (id) => () => {
    setTabId(id);
  };

  const renderTabPanel = () => {
    if (tabId === 0) {
      return TABS.map((TAB) => <div>{TAB.name}</div>);
    } else {
      const TAB = TABS[tabId];
      return <div>{TAB.name}</div>;
    }
  };

  return (
    <div className="App">
      <h2>React Tabs</h2>
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

      <h2>Custom Tabs</h2>
      <div>
        <div className={cx(styles.container, styles.tabList)}>
          {TABS.map((TAB) => (
            <div className={styles.tab} onClick={selectTabs(TAB.id)}>
              {TAB.name}
            </div>
          ))}
        </div>
        {renderTabPanel()}
      </div>
    </div>
  );
}

export default App;
