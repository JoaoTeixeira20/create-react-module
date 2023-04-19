import React, { ReactElement, lazy, Suspense } from 'react';

import * as S from './DynamicComponent.style';

const SampleComponentLazy = lazy(() => import('../SampleComponent/SampleComponent'))

const DynamicComponent = (): ReactElement => {
    return (<S.Container>
        <Suspense fallback={<div>loading...</div>}>
            <SampleComponentLazy content={`i'm lazy.. D:`}/> 
        </Suspense>
    </S.Container>)
}

export default DynamicComponent;
