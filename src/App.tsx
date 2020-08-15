/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { COLORS } from './styling/variables';
import Screen from './components/Screen';

const AppStyle = css({
    backgroundColor: COLORS.DARK,
    color: COLORS.PRIMARY,
    height: '100%',
    width: '100%',
});

function App() {
  return (
    <div css={AppStyle}>
      <Screen />
    </div>
  );
}

export default App;
