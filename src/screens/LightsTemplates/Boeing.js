import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components/native';
import { CONFIG_REDUCER } from '../../store';
import { emitActionInfo, getSimValue } from '../../services/sim-data';
import Switch from '../../components/Switch';
import { MASTER_PADDING } from '../../config/const';

const Container = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Section = styled.View`
  flex-direction: row;
  background-color: black;
  padding: ${MASTER_PADDING};
  border-radius: 10px;
`;

const WrappedSwitch = styled(Switch)`
  margin-right: ${props => (props.lastChild ? 0 : '-50px')};
`;

function Boeing() {
    return (
        <Container>
            <Section>
                {getSimValue('hasLedLights') && (
                    <>
                        <WrappedSwitch
                            wide
                            position={0}
                            clickAreas={3}
                            bottomText="L"
                            leftText="TAXI"
                            onPress={(i) => {
                                emitActionInfo(`landLightsRetLeftPosChange${i}`);
                                console.log('elo', i);
                            }}
                        />

                        <WrappedSwitch
                            wide={false}
                            position={1}
                            clickAreas={3}
                            bottomText="R"
                            onClick={(i) => emitActionInfo(`landLightsRetRightPosChange${i}`)}
                        />
                    </>
                )}

                <WrappedSwitch
                    wide
                    position={2}
                    clickAreas={2}
                    bottomText="L"
                    onClick={(i) => emitActionInfo(`landLightLeftPosChange${i}`)}
                />

                <WrappedSwitch
                    wide
                    position={getSimValue('landLightsRightPos')}
                    clickAreas={2}
                    bottomText="R"
                    onClick={(i) => emitActionInfo(`landLightRightPosChange${i}`)}
                    lastChild
                />
            </Section>
        </Container>
    );
}

Boeing = connect(
    ({ [CONFIG_REDUCER]: { commonStore } }) => ({ commonStore })
)(Boeing);

export default Boeing;
