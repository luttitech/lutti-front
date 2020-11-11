import styled from 'styled-components/native';
import colors from './colors';

export const ButtonPrimary = styled.TouchableOpacity`
    background: ${colors.secondaryColor};
    border-radius: 10px;
    width: 120px;
    height: 45px;
    align-items: center;
    justify-content: center;
`;

export const Button = styled.TouchableOpacity`
    background: ${colors.primaryColor};
    border-color: ${colors.secondaryColor};
    border-width: 2px;
    border-radius: 11px;
    width: 120px;
    height: 45px;
    align-items: center;
    justify-content: center;
`;

export const ButtonDisabled = styled.View`
    background: ${colors.disabledButtonColor};
    border-radius: 11px;
    width: 120px;
    height: 45px;
    align-items: center;
    justify-content: center;
`;

export const TextButton = styled.Text`
    font-size: 15px;
    font-family: Sen Bold;
    color: ${props => props.textColor};
`;

export const Container = styled.View`
    background-color: ${colors.primaryColor};
    flex: 1;
    align-items: center;
    justify-content: center;
`

export const ViewRow = styled.View`
    flex-direction: row;
`

export const Dot = styled.View`
    width: 10px;
    height: 10px;
    border-radius: 50px;
    margin-right: 7px;
    background-color: ${props => props.choiced ? colors.secondaryColor : colors.grayColor};
`

export const WhiteDot = styled.View`
    width: 10px;
    height: 10px;
    border-radius: 50px;
    margin-right: 7px;
    background-color: #ffffff;
`