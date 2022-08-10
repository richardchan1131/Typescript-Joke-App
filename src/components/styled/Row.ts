import styled from 'styled-components';
import { DefaultTheme } from 'styled-components';

interface RowProps{
    theme: DefaultTheme,
}

const Row = styled.div<RowProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

export default Row;