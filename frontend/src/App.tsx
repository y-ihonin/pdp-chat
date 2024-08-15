import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";

// components
import Router from "./pages/Router";

// assets
import "./assets/styles/variables.scss";

const queryClient = new QueryClient()

function App() {
  return (
    <div className="App" data-testid="react-root-component">
      <QueryClientProvider client={queryClient}>
        <Router/>
      </QueryClientProvider>
    </div>
  );
}

export default App;
