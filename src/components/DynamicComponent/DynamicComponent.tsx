import React, { ReactElement, lazy, Suspense, useState, SyntheticEvent, useDeferredValue, useMemo } from 'react';

import * as S from './DynamicComponent.style';

const SampleComponentLazy = lazy(() => import('../SampleComponent/SampleComponent'))

const DynamicComponent = (): ReactElement => {
    const [message, setMessage] = useState<string>('youarelit');

    const deferredValue = useDeferredValue(message);

    const handleChange = ((event: SyntheticEvent<HTMLInputElement>) => {
        setMessage(event.currentTarget?.value || '');
    })

    return (<S.Container>
        <Suspense fallback={<div>loading...</div>}>
            <SampleComponentLazy content={deferredValue}/> 
        </Suspense>
        <input type="text" value={message} onChange={handleChange} style={{maxWidth:"500px"}}></input>
    </S.Container>)
}

export default DynamicComponent;
