import styled from 'styled-components/native';
import { BACKGROUND_COLOR, MASTER_PADDING } from '../config/const';

const Container = styled.View`
  height: 100%;
  background-color: ${BACKGROUND_COLOR};
  padding: ${MASTER_PADDING};
`;

export default function ScreenWrapper({ children }) {
    return (
        <Container>
            {children}
        </Container>
    );
}
