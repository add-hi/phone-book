import React , {FC} from 'react'

interface GapProps {
    width?: number; 
    height: number; 
}

const Gap : FC<GapProps> = ({ width, height }) => {
    return (
        <div style={{ width, height }} />
    )
}

export default Gap