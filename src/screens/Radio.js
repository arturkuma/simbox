import { View } from 'react-native';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { useEffect } from 'react';
import styled from 'styled-components/native';
import { CONFIG_REDUCER } from '../store';
import aircraftConfig from '../config/aircraft/aircraft';
import { BOEING } from '../enum/Template';
import { emitActionInfo, getSimValue } from '../services/sim-data';
import { COM1, COM2, NAV1 } from '../enum/ActiveSlot';
import { setActiveSlot } from '../store/action-creator/config';
import NumericDisplay from '../components/NumericDisplay';
import Button from '../components/Button';
import Text from '../components/Text';

const Container = styled.View`
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Row = styled.View`
  flex-direction: column;
  width: 80%;
  margin-bottom: ${props => (props.lastChild ? 0 : '20px')};
`;

const RowHeader = styled(Text)`
  font-size: ${props => (props.scale || 1) * 18}px;
  margin-bottom: 10px;
`;

const RowContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

const WrappedNumericDisplay = styled(NumericDisplay)`
  
`;

const WrappedButton = styled(Button)`
  margin: 0 20px;
`;

function Radio({ template, setActiveSlot }) {
    const scale = 0.8;
    const hasNavRadio = template === BOEING;

    const comSelectedMode = getSimValue('comSelectedMode');

    const activeSlot = comSelectedMode === 1 ? COM1 : COM2;

    useEffect(() => {
        setActiveSlot(activeSlot);
    }, [activeSlot]);

    return (
        <Container>
            <Row>
                <RowHeader scale={scale}>COM1</RowHeader>
                <RowContent>
                    <WrappedNumericDisplay
                        scale={scale}
                        title="ACTIVE"
                        value={getSimValue('com1Freq')}
                    />

                    <WrappedButton title="<=>" onPress={() => emitActionInfo('com1Flip')} scale={scale} />

                    <WrappedNumericDisplay
                        scale={scale}
                        selected={activeSlot === COM1}
                        onPress={() => {
                            emitActionInfo('com1ActiveClick');
                        }}
                        title="STANDBY"
                        value={getSimValue('com1SdbyFreq')}
                    />
                </RowContent>
            </Row>

            <Row>
                <RowHeader scale={scale}>COM2</RowHeader>
                <RowContent>
                    <WrappedNumericDisplay
                        scale={scale}
                        title="ACTIVE"
                        value={getSimValue('com2Freq')}
                    />

                    <WrappedButton title="<=>" onPress={() => emitActionInfo('com2Flip')} scale={scale} />

                    <WrappedNumericDisplay
                        scale={scale}
                        selected={activeSlot === COM2}
                        onPress={() => {
                            emitActionInfo('com2ActiveClick');
                        }}
                        title="STANDBY"
                        value={getSimValue('com2SdbyFreq')}
                    />
                </RowContent>
            </Row>

            {hasNavRadio && (
                <Row lastChild>
                    <RowHeader scale={scale}>NAV1</RowHeader>
                    <RowContent>
                        <WrappedNumericDisplay
                            scale={scale}
                            title="ACTIVE"
                            value={getSimValue('nav1Freq')}
                        />

                        <WrappedButton title="<=>" onPress={() => emitActionInfo('nav1Flip')} scale={scale} />

                        <WrappedNumericDisplay
                            scale={scale}
                            selected={activeSlot === NAV1}
                            onPress={() => setActiveSlot(NAV1)}
                            title="STANDBY"
                            value={getSimValue('nav1SdbyFreq')}
                        />
                    </RowContent>
                </Row>
            )}
        </Container>
    );
}

Radio = connect(
    ({ [CONFIG_REDUCER]: { commonStore, activeSlot } }) => ({
        template: get(aircraftConfig, [get(commonStore, 'aircraftConfig'), 'template', 'radios']),
        activeSlot,
        commonStore
    }),
    { setActiveSlot }
)(Radio);

export default Radio;
