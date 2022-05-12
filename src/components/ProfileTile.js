import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import Text from './Text';
import { FONT_STANDARD_BOLD } from '../config/const';

const Container = styled.View`
  background-color: #1e1e1e;
  border-radius: 10px;
  padding: 15px;
  border: 1px solid #3e3e3e;
`;

const HeaderContainer = styled.View`
    flex-direction: row;
    justify-content: space-between; 
    align-items: center;
    margin-bottom: 10px;
`;

const HeaderText = styled(Text)`
    font-size: 16px;
`;

const SimulatorText = styled(HeaderText)`
`;

const AuthorText = styled(HeaderText)`
  color: #3e3e3e;
`;

const NameText = styled(Text)`
    font-size: 30px;
    font-family: ${FONT_STANDARD_BOLD};
`;

export default function ProfileTile({ name, simulator, author, style: propsStyle, onPress }) {
    return (
        <TouchableOpacity onPress={onPress} activeOpacity={1}>
            <Container style={propsStyle}>
                <HeaderContainer>
                    <SimulatorText>{simulator}</SimulatorText>
                    <AuthorText>{author}</AuthorText>
                </HeaderContainer>

                <NameText>{name}</NameText>
            </Container>
        </TouchableOpacity>
    );
}
