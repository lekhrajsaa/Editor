import './App.css';
import Editor from './Component/Editor';
import { ThemeProvider } from 'styled-components';

import { ColorPalette } from './Theme/pinak-theme';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles.css';
const theme = {
  colors: ColorPalette,
};
function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Editor />
      </ThemeProvider>
    </div>
  );
}

export default App;
