import styled from 'styled-components'

function genMaterialShadow(level) {
    if (level === 1) return '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)'
    if (level === 2) return '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)'
    if (level === 3) return '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)'
    if (level === 4) return '0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22)'
    if (level === 5) return '0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22)'
    return ''
}

const Card = styled.div`
    display: flex;
    flex-flow: column nowrap;
    margin: 1rem;
    padding: 1rem;
    box-shadow: ${({ level }) => `${genMaterialShadow(level)}`};
`

export default Card
