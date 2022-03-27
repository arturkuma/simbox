import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import NumericDisplay from '../../components/NumericDisplay';
import { CONFIG_REDUCER } from '../../store';
import { setActiveSlot } from '../../store/action-creator/config';
import { ALTITUDE, HEADING, SPEED, VERTICAL_SPEED } from '../../enum/ActiveSlot';
import { emitActionInfo, getSimValue } from '../../services/sim-data';
import Button from '../../components/Button';
import { MASTER_PADDING } from '../../config/const';

const Container = styled.View`
  justify-content: space-between;
  flex: 1;
`;

const NumericDisplaysContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: ${MASTER_PADDING};
`;

const WrappedNumericDisplay = styled(NumericDisplay)`
    margin-right: ${props => (props.lastChild ? 0 : MASTER_PADDING)};
`;

const WrappedButton = styled(Button)`
    margin-right: ${props => (props.lastChild ? 0 : MASTER_PADDING)};
`;

const ButtonsContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
`;

const ButtonsSectionHorizontal = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: ${props => (props.lastChild ? 0 : MASTER_PADDING)};
`;

const ButtonsSectionVertical = styled.View`
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

function Airbus({ activeSlot, setActiveSlot }) {
    useEffect(() => {
        setActiveSlot(SPEED);
    }, []);

    return (
        <Container>
            <NumericDisplaysContainer>
                <WrappedNumericDisplay
                    selected={activeSlot === SPEED}
                    onPress={() => setActiveSlot(SPEED)}
                    title={getSimValue('isMatch') ? 'MACH' : 'SPD'}
                    value={getSimValue('speed') || '--- •'}
                />

                <WrappedNumericDisplay
                    selected={activeSlot === HEADING}
                    onPress={() => setActiveSlot(HEADING)}
                    title={getSimValue('fpaModeActive') ? 'TRK' : 'HDG'}
                    value={getSimValue('heading')}
                />

                <WrappedNumericDisplay
                    selected={activeSlot === ALTITUDE}
                    onPress={() => setActiveSlot(ALTITUDE)}
                    title="ALT"
                    value={getSimValue('altitude')}
                />

                <WrappedNumericDisplay
                    selected={activeSlot === VERTICAL_SPEED}
                    onPress={() => setActiveSlot(VERTICAL_SPEED)}
                    title="V/S"
                    value={getSimValue('verticalSpeed')}
                    lastChild
                />
            </NumericDisplaysContainer>

            <ButtonsContainer>
                <ButtonsSectionHorizontal lastChild>
                    <WrappedButton title="LOC" active={getSimValue('locStatus')} onPress={() => emitActionInfo('locButtonClick')} />
                </ButtonsSectionHorizontal>

                <ButtonsSectionVertical lastChild>
                    <ButtonsSectionHorizontal>
                        <WrappedButton title="AP 1" active={getSimValue('ap1Status')} onPress={() => emitActionInfo('ap1ButtonClick')} />
                        <WrappedButton title="AP 2" active={getSimValue('ap2Status')} onPress={() => emitActionInfo('ap2ButtonClick')} />
                    </ButtonsSectionHorizontal>

                    <ButtonsSectionVertical lastChild>
                        <WrappedButton title="A/THR" active={getSimValue('athrStatus')} onPress={() => emitActionInfo('athrButtonClick')} />
                    </ButtonsSectionVertical>
                </ButtonsSectionVertical>

                <ButtonsSectionHorizontal lastChild>
                    <WrappedButton title="EXPED" active={getSimValue('expedStatus')} onPress={() => emitActionInfo('expedButtonClick')} />
                </ButtonsSectionHorizontal>

                <ButtonsSectionHorizontal lastChild>
                    <WrappedButton title="APPR" active={getSimValue('apprStatus')} onPress={() => emitActionInfo('apprButtonClick')} />
                </ButtonsSectionHorizontal>
            </ButtonsContainer>
        </Container>
    );
}

Airbus = connect(
    ({ [CONFIG_REDUCER]: { commonStore } }) => ({ activeSlot: commonStore.activeSlot, commonStore }),
    { setActiveSlot }
)(Airbus);

export default Airbus;
