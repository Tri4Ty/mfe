import { mount } from 'auth/AuthApp';
import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default ({ onSignIn }) => {
    const ref = useRef(null);
    const history = useHistory();

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            initialPath: history.location.pathname,
            onNavigate: ({ pathname: nextPathname }) => {
                const { pathname } = history.location;
                if (pathname !== nextPathname) {
                    history.push(nextPathname);
                }
            },
            onSignIn, // this is shorthand for the following 3 lines
            // onSignIn: () => {
            //     onSignIn();
            // }
        });

        history.listen(onParentNavigate);
    }, []); // [] ensures this effect is only run once (on initialize)

    return <div ref={ref} />
};