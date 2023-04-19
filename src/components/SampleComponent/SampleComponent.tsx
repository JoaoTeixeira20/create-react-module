import { animated, useTrail } from '@react-spring/web';
import React, { ReactElement, useEffect, useRef } from 'react';

export type SampleComponentProps = {
    content: string;
}

const SampleComponent = (props: SampleComponentProps): ReactElement => {

    const [trail, api] = useTrail(9, () => ({
        transform: 'perspective(600px) rotateX(0deg)',
        backgroundColor: '#747899',
        to: {
            color: 'transparent',
            transform: 'perspective(600px) rotateX(180deg)',
            backgroundColor: '#789974'
        },
    }));

    const isFlipped = useRef(false)

    const loopFunc = () => {
        if (isFlipped.current) {
            api.start({
                color: 'transparent',
                transform: 'perspective(600px) rotateX(180deg)',
                backgroundColor: '#789974'
            })
            isFlipped.current = false
        } else {
            api.start({
                color: 'black',
                transform: 'perspective(600px) rotateX(0deg)',
                backgroundColor: '#747899',
            })
            isFlipped.current = true
        }
    }

    const interval = setInterval(loopFunc, 2500)
    const unmount = () => clearInterval(interval);

    useEffect(() => {
        return unmount;
    },[])

    return (<div style={{
        display: "flex",
        flexDirection: "row",
        width: "500px",
        height: "500px",
        flexWrap: "wrap",
    }}>
        {trail.map((style, i) => {
            return (<animated.div style={{
                width: "100%",
                flex: "0 0 33.333333%",
                outline: "1px solid black",
                transformStyle: 'preserve-3d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ...style,
            }} key={i}>
                <p>{`${props.content}`}</p>
            </animated.div>)
        })}
    </div>)
}

export default SampleComponent;
