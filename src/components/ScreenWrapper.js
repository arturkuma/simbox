import styled from 'styled-components/native';
import { get } from 'lodash';
import { BACKGROUND_COLOR, MASTER_PADDING } from '../config/const';

const Container = styled.View`
  height: 100%;
  background-color: ${BACKGROUND_COLOR};
  padding: ${(props) => get(props, 'style.padding', MASTER_PADDING)};
`;

export default function ScreenWrapper({ children, style: propsStyle }) {
    return (
        <Container style={propsStyle}>
            {children}
        </Container>
    );
}
