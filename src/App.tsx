import Header from "./components/Header"
import ChatsList from "./components/ChatsList"
import ChatBlock from "./components/ChatBlock";

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <div className="contentContainer">
        <ChatsList />
        <ChatBlock />
      </div>
    </div>
  );
}

export default App
